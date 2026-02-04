"use client";

export const dynamic = 'force-dynamic';


import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageAsset } from "@/lib/types";
import {
    Loader2,
    ArrowLeft,
    Search,
    Upload,
    Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

export default function SiteImagesPage() {
    const { status } = useSession();
    const [assets, setAssets] = useState<PageAsset[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [uploadingId, setUploadingId] = useState<string | null>(null);
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
            const res = await fetch("/api/assets");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setAssets(data || []);
        } catch (error) {
            console.error("Error fetching assets:", error);
            toast.error("Failed to fetch site images");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (file: File, asset: PageAsset) => {
        try {
            setUploadingId(asset.id);

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'assets');
            formData.append('oldUrl', asset.asset_url || '');

            // Upload file to server
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) {
                const error = await uploadRes.json();
                throw new Error(error.error || 'Upload failed');
            }

            const { url } = await uploadRes.json();

            // Update the asset in the database
            const updateRes = await fetch(`/api/page-assets/${asset.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ asset_url: url }),
            });

            if (!updateRes.ok) throw new Error('Failed to update asset');

            // Update local state
            setAssets(prev => prev.map(a =>
                a.id === asset.id ? { ...a, asset_url: url } : a
            ));

            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploadingId(null);
        }
    };


    const filteredAssets = assets.filter(asset =>
        asset.page_route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.label.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
                        <div>
                            <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-[#5c5c5c] hover:text-[#2d7a8c] mb-2">
                                <ArrowLeft size={16} />
                                Back to Dashboard
                            </Link>
                            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">Site Images</h1>
                            <p className="text-[#5c5c5c] text-sm sm:text-base">Manage hero banners and section backgrounds</p>
                        </div>

                        <div className="relative w-full lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c] h-4 w-4" />
                            <Input
                                placeholder="Search images..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-white border-[#eeeeee] h-10 text-base sm:text-sm shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAssets.map((asset) => (
                        <div key={asset.id} className="bg-white rounded-xl shadow-sm border border-[#eeeeee] overflow-hidden group">
                            {/* Image Preview Area */}
                            <div className="relative h-48 w-full bg-gray-100 border-b border-[#eeeeee]">
                                <Image
                                    src={asset.asset_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                    alt={asset.label}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Upload Overlay */}
                                <label className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${uploadingId === asset.id ? 'opacity-100 pointer-events-none' : ''}`}>
                                    {uploadingId === asset.id ? (
                                        <div className="flex flex-col items-center text-white">
                                            <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Uploading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                                <Upload className="w-5 h-5 text-black" />
                                            </div>
                                            <span className="text-white text-xs font-bold uppercase tracking-wider">Change Image</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleImageUpload(file, asset);
                                        }}
                                        disabled={!!uploadingId}
                                    />
                                </label>

                                {/* Page Badge */}
                                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {asset.page_route === '/' ? 'Home Page' : asset.page_route.replace('/', '')}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <h3 className="font-bold text-black text-sm sm:text-base line-clamp-1" title={asset.label}>
                                            {asset.label}
                                        </h3>
                                        <p className="text-xs text-[#5c5c5c] font-mono mt-0.5">{asset.section_key}</p>
                                    </div>
                                    <div className="bg-[#f0f9ff] text-[#2d7a8c] p-2 rounded-lg">
                                        <ImageIcon size={18} />
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-[#eeeeee] flex items-center justify-between text-xs text-[#5c5c5c]">
                                    <span>Last updated</span>
                                    <span>{new Date(asset.updated_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredAssets.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-white rounded-xl border border-[#eeeeee]">
                            <p className="text-[#5c5c5c]">No images matches your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
