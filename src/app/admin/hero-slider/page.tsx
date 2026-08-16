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

            toast.success("Slide added");
            fetchSlides();
        } catch (error) {
            toast.error("Failed to add slide");
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this slide?")) return;
        try {
            const res = await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Failed");
            toast.success("Deleted slide");
            fetchSlides();
        } catch (_e) {
            toast.error("Delete failed");
        }
    };

    if (status === "loading" || loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#E3572D]" /></div>;
    }

    if (status === "unauthenticated") return null;

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="bg-white border"><ArrowLeft size={18} /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Hero Slider Management</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="font-bold text-lg">Manage Slides</h2>
                            <p className="text-sm text-gray-500">Upload background images for the premium dark hero slider.</p>
                        </div>
                        <Button disabled={uploading} className="bg-[#E3572D] hover:bg-[#c74c28] relative">
                            {uploading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                            {uploading ? "Uploading..." : "Add Slide"}
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleUpload} disabled={uploading} />
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {slides.length === 0 && <p className="text-gray-500 text-center py-8">No slides found.</p>}
                        {slides.map((slide, index) => (
                            <div key={slide.id} className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                                <span className="font-bold text-gray-400 w-6">{index + 1}.</span>
                                <div className="relative w-32 h-20 rounded bg-gray-200 overflow-hidden shrink-0">
                                    <Image src={slide.image_url} alt="Slide" fill className="object-cover" />
                                </div>
                                <div className="flex-1 text-xs font-mono text-gray-500 truncate">{slide.image_url}</div>
                                <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(slide.id)}>
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
