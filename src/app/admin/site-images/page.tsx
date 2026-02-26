"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Loader2,
    Pencil,
    Search,
    ArrowLeft,
    ImageIcon,
    Map
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

interface PageAsset {
    id: string;
    page_route: string;
    section_key: string;
    label: string;
    asset_url: string;
    alt_text?: string;
}

export default function AdminSiteImagesPage() {
    const { status } = useSession();
    const [assets, setAssets] = useState<PageAsset[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchAssets();
        }
    }, [status, router]);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/page-assets");
            if (!res.ok) throw new Error("Failed to fetch assets");
            const data = await res.json();
            setAssets(data || []);
        } catch (error) {
            console.error("Error fetching site images:", error);
            toast.error("Failed to fetch site images");
        } finally {
            setLoading(false);
        }
    };

    const filteredAssets = assets.filter(asset =>
        asset.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.page_route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.section_key.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#2d7a8c]" />
            </div>
        );
    }

    if (status === "unauthenticated") return null;

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
                            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">Site Images</h1>
                            <p className="text-[#5c5c5c] text-sm sm:text-base">Manage static images across the website (banners, backgrounds, etc.)</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c] h-4 w-4" />
                                <Input
                                    placeholder="Search images..."
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
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Image Preview</th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Label / Key</th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Page Route</th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#eeeeee]">
                                {filteredAssets.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 lg:px-6 py-3 lg:py-4 w-[120px]">
                                            <div className="relative w-20 h-14 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                                <Image
                                                    src={asset.asset_url}
                                                    alt={asset.alt_text || asset.label}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                                            <div className="font-bold text-black text-xs lg:text-sm">{asset.label}</div>
                                            <div className="text-[10px] text-[#5c5c5c] mt-0.5 font-mono">{asset.section_key}</div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                                            <div className="flex items-center gap-2 font-mono text-sm text-[#2d7a8c] bg-blue-50/50 px-2 py-1 rounded w-fit">
                                                <Map size={14} />
                                                {asset.page_route}
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                                            <Link href={`/admin/site-images/${asset.id}`}>
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
                        {filteredAssets.map((asset) => (
                            <div key={asset.id} className="p-4 hover:bg-gray-50">
                                <div className="flex gap-4">
                                    <div className="relative w-24 h-20 bg-gray-100 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                                        <Image
                                            src={asset.asset_url}
                                            alt={asset.alt_text || asset.label}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="font-bold text-black text-sm truncate pr-2">{asset.label}</div>
                                            <Link href={`/admin/site-images/${asset.id}`}>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-[#5c5c5c] hover:text-[#2d7a8c] -mt-1 -mr-2">
                                                    <Pencil size={16} />
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="text-[10px] text-[#5c5c5c] font-mono mb-2">{asset.section_key}</div>
                                        <div className="flex items-center gap-2 font-mono text-xs text-[#2d7a8c] bg-blue-50/50 px-2 py-1 rounded w-fit">
                                            <Map size={12} />
                                            {asset.page_route}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredAssets.length === 0 && (
                        <div className="text-center py-12 sm:py-20">
                            <ImageIcon className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                            <p className="text-[#5c5c5c] text-sm sm:text-base">
                                {searchQuery ? "No images match your search." : "No site images found."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
