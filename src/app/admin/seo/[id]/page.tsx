"use client";

export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useState, use } from "react";
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

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditSeoPage({ params }: PageProps) {
    const resolvedParams = use(params);
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
            const res = await fetch(`/api/page-seo/${resolvedParams.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: page.title,
                    description: page.description,
                    og_image: page.og_image
                })
            });

            if (!res.ok) throw new Error("Failed to update");

            toast.success("SEO settings updated successfully");
            router.push("/admin/seo");
            router.refresh();
        } catch (error) {
            console.error("Error updating SEO page:", error);
            toast.error("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#E3572D]" />
                <span className="text-sm text-gray-500 font-medium">Loading SEO details...</span>
            </div>
        );
    }

    if (status === "unauthenticated" || !page) return null;

    return (
        <div className="pb-12 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-2xl">
                <div className="mb-6 sm:mb-8">
                    <Link
                        href="/admin/seo"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#E3572D] transition-colors mb-3"
                    >
                        <ArrowLeft size={16} /> Back to SEO Manager
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#E3572D]/10 rounded-xl text-[#E3572D]">
                            <Globe size={22} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Edit Route SEO</h1>
                            <p className="text-gray-500 text-sm mt-0.5 font-mono">Route: {page.route}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Target Route (System Protected)</label>
                        <Input
                            value={page.route}
                            disabled
                            className="bg-slate-50 border-gray-200 text-gray-500 font-mono text-sm"
                        />
                        <p className="text-xs text-gray-400">The application URL route this metadata is mapped to.</p>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Meta Title *</label>
                            <span className={`text-xs ${page.title.length > 60 ? 'text-amber-600 font-semibold' : 'text-gray-400'}`}>
                                {page.title.length}/60 chars
                            </span>
                        </div>
                        <Input
                            value={page.title}
                            onChange={(e) => setPage({ ...page, title: e.target.value })}
                            className="border-gray-200 text-sm h-10"
                            placeholder="e.g. FYD Homes | Find Your Dream Home in Kochi"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Meta Description</label>
                            <span className={`text-xs ${(page.description?.length || 0) > 160 ? 'text-amber-600 font-semibold' : 'text-gray-400'}`}>
                                {page.description?.length || 0}/160 chars
                            </span>
                        </div>
                        <Textarea
                            value={page.description || ""}
                            onChange={(e) => setPage({ ...page, description: e.target.value })}
                            className="border-gray-200 text-sm min-h-[110px] resize-none"
                            placeholder="Brief summary displayed on Google search results..."
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.push("/admin/seo")} className="text-gray-600">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={saving || !page.title.trim()}
                            className="bg-[#E3572D] hover:bg-[#cf4b22] text-white font-semibold shadow-sm"
                        >
                            {saving ? (
                                <>
                                    <Loader2 size={16} className="mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={16} className="mr-2" />
                                    Save SEO Changes
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
