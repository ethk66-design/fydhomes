"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from "react";
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
    const resolvedParams = React.use(params);
    const { status } = useSession();
    const [asset, setAsset] = useState<PageAsset | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated" && resolvedParams.id) {
            fetchAsset(resolvedParams.id);
        }
    }, [status, resolvedParams.id, router]);

    const fetchAsset = async (id: string) => {
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
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // validation: Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size too large (Max 5MB)");
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            // Append folder if needed, though route defaults to 'general' or uses randomUUID

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Upload failed');
            }

            const data = await res.json();

            setAsset(prev => prev ? { ...prev, asset_url: data.url } : null);
            toast.success("Image uploaded successfully");
        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error(error.message || "Failed to upload image");
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleSave = async () => {
        if (!asset) return;

        try {
            setSaving(true);
            const res = await fetch(`/api/page-assets/${asset.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    label: asset.label,
                    asset_url: asset.asset_url,
                    alt_text: asset.alt_text
                })
            });

            if (!res.ok) throw new Error("Failed to update");

            toast.success("Site image updated successfully");
            router.push("/admin/site-images");
        } catch (error) {
            console.error("Error updating site image:", error);
            toast.error("Failed to update site image");
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

    if (status === "unauthenticated" || !asset) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 sm:mb-8">
                        <Link href="/admin/site-images">
                            <Button variant="ghost" size="icon" className="h-10 w-10 bg-white border border-[#eeeeee] hover:bg-gray-50 text-[#5c5c5c]">
                                <ArrowLeft size={18} />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
                                Edit Site Image
                                <span className="font-mono text-sm font-normal text-[#2d7a8c] bg-blue-50/50 px-2 py-1 rounded">
                                    {asset.section_key}
                                </span>
                            </h1>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] p-6 sm:p-8">
                        <div className="space-y-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black uppercase tracking-wider">Page Route</label>
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 border border-[#eeeeee] rounded text-[#5c5c5c]">
                                        <Map size={16} />
                                        <span className="font-mono text-sm">{asset.page_route}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black uppercase tracking-wider">Section Key</label>
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 border border-[#eeeeee] rounded text-[#5c5c5c]">
                                        <ImageIcon size={16} />
                                        <span className="font-mono text-sm">{asset.section_key}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black uppercase tracking-wider">Label (Internal Name) <span className="text-red-500">*</span></label>
                                <Input
                                    value={asset.label}
                                    onChange={(e) => setAsset({ ...asset, label: e.target.value })}
                                    className="bg-white border-[#eeeeee]"
                                />
                            </div>

                            {/* Image Upload Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black uppercase tracking-wider">Image Asset</label>
                                <div className="p-4 border-2 border-dashed border-[#eeeeee] rounded-xl flex flex-col items-center gap-4 hover:bg-gray-50 transition-colors">
                                    {asset.asset_url && (
                                        <div className="relative w-full h-[200px] sm:h-[300px] rounded-lg overflow-hidden bg-gray-100 shadow-sm group">
                                            <Image
                                                src={asset.asset_url}
                                                alt="Preview"
                                                fill
                                                className="object-contain"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                    )}

                                    <div className="flex flex-col items-center gap-2 w-full">
                                        <Input
                                            type="text"
                                            value={asset.asset_url}
                                            onChange={(e) => setAsset({ ...asset, asset_url: e.target.value })}
                                            className="text-xs font-mono text-[#5c5c5c] bg-gray-50"
                                            placeholder="https://..."
                                        />
                                        <div className="relative">
                                            <Button
                                                variant="outline"
                                                disabled={uploading}
                                                className="cursor-pointer relative overflow-hidden"
                                            >
                                                {uploading ? (
                                                    <span className="flex items-center">
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Uploading... (please wait)
                                                    </span>
                                                ) : "Upload New Image"}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    disabled={uploading}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black uppercase tracking-wider">Alt Text</label>
                                <Input
                                    value={asset.alt_text || ""}
                                    onChange={(e) => setAsset({ ...asset, alt_text: e.target.value })}
                                    className="bg-white border-[#eeeeee]"
                                    placeholder="Descriptive text for accessibility"
                                />
                            </div>

                            <div className="pt-4 border-t border-[#eeeeee] flex justify-end">
                                <Button
                                    onClick={handleSave}
                                    disabled={saving || !asset.label}
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
