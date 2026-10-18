"use client";

export const dynamic = 'force-dynamic';

import React, { useCallback, useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Loader2,
    ArrowLeft,
    Save,
    Map,
    ImageIcon,
    Upload
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

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditSiteImagePage({ params }: PageProps) {
    const resolvedParams = use(params);
    const { status } = useSession();
    const [asset, setAsset] = useState<PageAsset | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const fetchAsset = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/page-assets/${id}`);
            if (!res.ok) throw new Error("Failed to fetch asset");
            const data = await res.json();
            setAsset(data);
        } catch (error) {
            console.error("Error fetching site image:", error);
            toast.error("Failed to fetch image details");
            router.push("/admin/site-images");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated" && resolvedParams.id) {
            fetchAsset(resolvedParams.id);
        }
    }, [status, resolvedParams.id, router, fetchAsset]);

    const handleSave = async () => {
        if (!asset) return;

        try {
            setSaving(true);
            const res = await fetch(`/api/page-assets/${resolvedParams.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    label: asset.label,
                    asset_url: asset.asset_url,
                    alt_text: asset.alt_text,
                })
            });

            if (!res.ok) throw new Error("Failed to update");

            toast.success("Site image updated successfully");
            router.push("/admin/site-images");
            router.refresh();
        } catch (error) {
            console.error("Error updating site image:", error);
            toast.error("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !asset) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Upload failed");
            }

            const data = await res.json();
            setAsset({ ...asset, asset_url: data.url });
            toast.success("New image uploaded successfully");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to upload image");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#E3572D]" />
                <span className="text-sm text-gray-500 font-medium">Loading asset details...</span>
            </div>
        );
    }

    if (status === "unauthenticated" || !asset) return null;

    return (
        <div className="pb-12 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-2xl">
                <div className="mb-6 sm:mb-8">
                    <Link
                        href="/admin/site-images"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#E3572D] transition-colors mb-3"
                    >
                        <ArrowLeft size={16} /> Back to Site Images
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#E3572D]/10 rounded-xl text-[#E3572D]">
                            <ImageIcon size={22} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Edit Site Media</h1>
                            <p className="text-gray-500 text-sm mt-0.5 font-mono">{asset.section_key} • {asset.page_route}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 space-y-5">
                    {/* Live Preview */}
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Current Media Preview</label>
                        <div className="relative w-full h-52 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                            <Image
                                src={asset.asset_url}
                                alt={asset.alt_text || asset.label}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Replace Image</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                                value={asset.asset_url}
                                onChange={(e) => setAsset({ ...asset, asset_url: e.target.value })}
                                className="font-mono text-xs text-gray-600 bg-slate-50 border-gray-200 flex-1"
                                placeholder="Paste image URL or upload below..."
                            />
                            <div className="relative overflow-hidden">
                                <Button
                                    variant="outline"
                                    disabled={uploading}
                                    type="button"
                                    className="cursor-pointer relative overflow-hidden text-xs font-semibold whitespace-nowrap"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-1.5 h-3.5 w-3.5" />
                                            Upload File
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        aria-label="Upload new image"
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Display Label *</label>
                        <Input
                            value={asset.label}
                            onChange={(e) => setAsset({ ...asset, label: e.target.value })}
                            className="border-gray-200 text-sm h-10"
                            placeholder="e.g. Hero Background Image"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Alt Text (Accessibility)</label>
                        <Input
                            value={asset.alt_text || ""}
                            onChange={(e) => setAsset({ ...asset, alt_text: e.target.value })}
                            className="border-gray-200 text-sm h-10"
                            placeholder="Descriptive text for SEO and screen readers"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.push("/admin/site-images")} className="text-gray-600">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={saving || !asset.label.trim() || !asset.asset_url.trim()}
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
                                    Save Asset Changes
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
