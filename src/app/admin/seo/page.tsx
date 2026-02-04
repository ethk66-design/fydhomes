"use client";

export const dynamic = 'force-dynamic';


import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageSeo } from "@/lib/types";
import {
    Loader2,
    Pencil,
    Search,
    ArrowLeft,
    Globe
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminSeoPage() {
    const { status } = useSession();
    const [pages, setPages] = useState<PageSeo[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchPages();
        }
    }, [status, router]);

    const fetchPages = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/page-seo");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setPages(data || []);
        } catch (error) {
            console.error("Error fetching SEO pages:", error);
            toast.error("Failed to fetch SEO pages");
        } finally {
            setLoading(false);
        }
    };

    const filteredPages = pages.filter(page =>
        page.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#2d7a8c]" />
            </div>
        );
    }

    if (status === "unauthenticated") {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10">
                <div className="flex flex-col gap-6 mb-6 sm:mb-10">
                    {/* Header & Controls */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
                        <div>
                            <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-[#5c5c5c] hover:text-[#2d7a8c] mb-2">
                                <ArrowLeft size={16} />
                                Back to Dashboard
                            </Link>
                            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">SEO Manager</h1>
                            <p className="text-[#5c5c5c] text-sm sm:text-base">Manage titles and meta descriptions for your pages</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c] h-4 w-4" />
                                <Input
                                    placeholder="Search pages..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 bg-white border-[#eeeeee] h-10 sm:h-auto text-base sm:text-sm shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] overflow-hidden">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#f4f8fb] border-b border-[#eeeeee]">
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Page Route</th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Meta Title</th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Description</th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#eeeeee]">
                                {filteredPages.map((page) => (
                                    <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                                            <div className="flex items-center gap-2 font-mono text-sm text-[#2d7a8c] bg-blue-50/50 px-2 py-1 rounded w-fit">
                                                <Globe size={14} />
                                                {page.route}
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                                            <div className="font-bold text-black text-xs lg:text-sm line-clamp-1">{page.title}</div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                                            <div className="text-xs text-[#5c5c5c] line-clamp-2 max-w-[300px]">{page.description || '-'}</div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                                            <Link href={`/admin/seo/${page.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#5c5c5c] hover:text-[#2d7a8c]">
                                                    <Pencil size={14} />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden divide-y divide-[#eeeeee]">
                        {filteredPages.map((page) => (
                            <div key={page.id} className="p-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 font-mono text-sm text-[#2d7a8c] bg-blue-50/50 px-2 py-1 rounded w-fit">
                                        <Globe size={14} />
                                        {page.route}
                                    </div>
                                    <Link href={`/admin/seo/${page.id}`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#5c5c5c] hover:text-[#2d7a8c]">
                                            <Pencil size={16} />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="mb-2">
                                    <div className="text-[10px] uppercase font-bold text-[#5c5c5c] mb-1">Title</div>
                                    <div className="font-bold text-black text-sm">{page.title}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-[#5c5c5c] mb-1">Description</div>
                                    <div className="text-sm text-[#5c5c5c] line-clamp-2">{page.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPages.length === 0 && (
                        <div className="text-center py-12 sm:py-20">
                            <p className="text-[#5c5c5c] text-sm sm:text-base">
                                {searchQuery ? "No pages match your search." : "No pages found."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
