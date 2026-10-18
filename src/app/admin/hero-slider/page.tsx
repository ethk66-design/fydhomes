"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface HeroSlide {
    id: string;
    image_url: string;
    order: number;
}

export default function AdminHeroSliderPage() {
    const { status } = useSession();
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchSlides();
        }
    }, [status, router]);

    const fetchSlides = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/hero-slides");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setSlides(data || []);
        } catch (_err) {
            toast.error("Failed to fetch slides");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();

            // create slide
            const slideRes = await fetch('/api/hero-slides', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_url: data.url, order: slides.length })
            });
            if (!slideRes.ok) throw new Error("Failed to save slide");

            toast.success("Slide added successfully");
            fetchSlides();
        } catch (_error) {
            toast.error("Failed to add slide");
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this hero slide?")) return;
        try {
            const res = await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Failed to delete");
            toast.success("Slide deleted successfully");
            fetchSlides();
        } catch (_e) {
            toast.error("Delete failed");
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#E3572D]" />
                <span className="text-sm text-gray-500 font-medium">Loading hero slides...</span>
            </div>
        );
    }

    if (status === "unauthenticated") return null;

    return (
        <div className="pb-12 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
                <div className="mb-6 sm:mb-8">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#E3572D] transition-colors mb-2"
                    >
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Hero Slider Management</h1>
                            <p className="text-gray-500 text-sm mt-1">Upload and manage rotating hero banner backgrounds on the homepage.</p>
                        </div>

                        <Button disabled={uploading} className="bg-[#E3572D] hover:bg-[#cf4b22] text-white font-bold text-xs sm:text-sm h-10 px-4 rounded-lg shadow-sm relative overflow-hidden">
                            {uploading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                            {uploading ? "Uploading..." : "Add New Slide"}
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                                onChange={handleUpload}
                                disabled={uploading}
                            />
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6">
                    <div className="space-y-4">
                        {slides.length === 0 && (
                            <div className="text-center py-12 px-4">
                                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-600 font-semibold text-base">No custom hero slides yet.</p>
                                <p className="text-gray-400 text-xs mt-1">
                                    The homepage is currently displaying the default high-resolution luxury villa image.
                                </p>
                            </div>
                        )}

                        {slides.map((slide, index) => (
                            <div key={slide.id} className="flex items-center gap-4 p-4 border border-gray-200/80 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                <span className="font-bold text-gray-400 text-sm w-6 text-center">{index + 1}.</span>
                                <div className="relative w-36 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                                    <Image src={slide.image_url} alt={`Slide ${index + 1}`} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-semibold text-gray-900 mb-1">Slide #{index + 1}</div>
                                    <div className="text-[11px] font-mono text-gray-400 truncate">{slide.image_url}</div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                    onClick={() => handleDelete(slide.id)}
                                    title="Delete Slide"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
