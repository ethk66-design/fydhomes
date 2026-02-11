"use client";

export const dynamic = 'force-dynamic';


import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageSeo } from "@/lib/types";
import {
    Loader2,
    ArrowLeft,
    Save,
    Globe
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import React from "react";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditSeoPage({ params }: PageProps) {
    const resolvedParams = React.use(params);
    const { status } = useSession();
    const [page, setPage] = useState<PageSeo | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const fetchPage = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/page-seo/${id}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setPage(data);
        } catch (error) {
            console.error("Error fetching SEO page:", error);
            toast.error("Failed to fetch page details");
            router.push("/admin/seo");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated" && resolvedParams.id) {
            fetchPage(resolvedParams.id);
        }
    }, [status, resolvedParams.id, router, fetchPage]);

    const handleSave = async () => {
        if (!page) return;

        try {
            setSaving(true);
            const res = await fetch(`/api/page-seo/${page.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: page.title,
                    description: page.description
                })
            });

            if (!res.ok) throw new Error("Failed to update");

            toast.success("Page SEO updated successfully");
            router.push("/admin/seo");
        } catch (error) {
            console.error("Error updating SEO:", error);
            toast.error("Failed to update SEO");
        } finally {
            setSaving(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#2d7a8c]" />
            </div>
        );
    }

    if (status === "unauthenticated" || !page) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 sm:mb-8">
                        <Link href="/admin/seo">
                            <Button variant="ghost" size="icon" className="h-10 w-10 bg-white border border-[#eeeeee] hover:bg-gray-50 text-[#5c5c5c]">
                                <ArrowLeft size={18} />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
                                Edit SEO
                                <span className="font-mono text-sm font-normal text-[#2d7a8c] bg-blue-50/50 px-2 py-1 rounded">
                                    {page.route}
                                </span>
                            </h1>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] p-6 sm:p-8">
                        <div className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black uppercase tracking-wider">Page Route</label>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-[#eeeeee] rounded text-[#5c5c5c]">
                                    <Globe size={16} />
                                    <span className="font-mono text-sm">{page.route}</span>
                                </div>
                                <p className="text-xs text-[#5c5c5c]">The database route this SEO data applies to (cannot be changed).</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black uppercase tracking-wider">Meta Title <span className="text-red-500">*</span></label>
                                <Input
                                    value={page.title}
                                    onChange={(e) => setPage({ ...page, title: e.target.value })}
                                    className="bg-white border-[#eeeeee] text-base sm:text-sm"
                                    placeholder="e.g. FYD Homes | Best Real Estate in Kochi"
                                />
                                <div className="flex justify-between text-xs">
                                    <span className={`${page.title.length > 60 ? 'text-orange-500' : 'text-[#5c5c5c]'}`}>
                                        {page.title.length} characters
                                    </span>
                                    <span className="text-[#5c5c5c]">Recommended: ~60 chars</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black uppercase tracking-wider">Meta Description <span className="text-red-500">*</span></label>
                                <Textarea
                                    value={page.description || ""}
                                    onChange={(e) => setPage({ ...page, description: e.target.value })}
                                    className="bg-white border-[#eeeeee] min-h-[120px] text-base sm:text-sm"
                                    placeholder="e.g. Find your dream home with FYD Homes..."
                                />
                                <div className="flex justify-between text-xs">
                                    <span className={`${(page.description?.length || 0) > 160 ? 'text-orange-500' : 'text-[#5c5c5c]'}`}>
                                        {page.description?.length || 0} characters
                                    </span>
                                    <span className="text-[#5c5c5c]">Recommended: ~160 chars</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#eeeeee] flex justify-end">
                                <Button
                                    onClick={handleSave}
                                    disabled={saving || !page.title}
                                    className="bg-[#2d7a8c] hover:bg-[#256a7a] text-white font-bold w-full sm:w-auto"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 size={16} className="mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} className="mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
