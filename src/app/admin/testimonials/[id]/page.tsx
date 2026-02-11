"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Loader2,
    ArrowLeft,
    Save,
    Star,
    Trash2,
    Upload
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    image_url: string;
    content: string;
    rating: number;
}

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditTestimonialPage({ params }: PageProps) {
    const resolvedParams = React.use(params);
    const { status } = useSession();
    const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated" && resolvedParams.id) {
            fetchTestimonial(resolvedParams.id);
        }
    }, [status, resolvedParams.id, router]);

    const fetchTestimonial = async (id: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/testimonials/${id}`);
            if (!res.ok) throw new Error("Failed to fetch testimonial");
            const data = await res.json();
            setTestimonial(data);
        } catch (error) {
            console.error("Error fetching testimonial:", error);
            toast.error("Failed to fetch testimonial details");
            router.push("/admin/testimonials");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();

            setTestimonial(prev => prev ? { ...prev, image_url: data.url } : null);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error('Upload error:', error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!testimonial) return;

        try {
            setSaving(true);
            const res = await fetch(`/api/testimonials/${testimonial.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: testimonial.name,
                    role: testimonial.role,
                    image_url: testimonial.image_url,
                    content: testimonial.content,
                    rating: testimonial.rating
                })
            });

            if (!res.ok) throw new Error("Failed to update");

            toast.success("Testimonial updated successfully");
            router.push("/admin/testimonials");
        } catch (error) {
            console.error("Error updating testimonial:", error);
            toast.error("Failed to update testimonial");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!testimonial || !confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials/${testimonial.id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Failed to delete");

            toast.success("Testimonial deleted");
            router.push("/admin/testimonials");
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            toast.error("Failed to delete testimonial");
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#2d7a8c]" />
            </div>
        );
    }

    if (status === "unauthenticated" || !testimonial) return null;

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 sm:mb-8">
                        <Link href="/admin/testimonials">
                            <Button variant="ghost" size="icon" className="h-10 w-10 bg-white border border-[#eeeeee] hover:bg-gray-50 text-[#5c5c5c]">
                                <ArrowLeft size={18} />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
                                Edit Testimonial
                            </h1>
                        </div>
                        <div className="ml-auto">
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={handleDelete}
                                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] p-6 sm:p-8">
                        <div className="space-y-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black uppercase tracking-wider">Client Name <span className="text-red-500">*</span></label>
                                    <Input
                                        value={testimonial.name}
                                        onChange={(e) => setTestimonial({ ...testimonial, name: e.target.value })}
                                        className="bg-white border-[#eeeeee]"
                                        placeholder="e.g. John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black uppercase tracking-wider">Role / Title <span className="text-red-500">*</span></label>
                                    <Input
                                        value={testimonial.role}
                                        onChange={(e) => setTestimonial({ ...testimonial, role: e.target.value })}
                                        className="bg-white border-[#eeeeee]"
                                        placeholder="e.g. Home Buyer"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black uppercase tracking-wider">Rating (1-5)</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setTestimonial({ ...testimonial, rating: star })}
                                            className={`p-1 transition-transform hover:scale-110 ${testimonial.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                        >
                                            <Star size={24} fill={testimonial.rating >= star ? "currentColor" : "none"} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black uppercase tracking-wider">Content <span className="text-red-500">*</span></label>
                                <Textarea
                                    value={testimonial.content}
                                    onChange={(e) => setTestimonial({ ...testimonial, content: e.target.value })}
                                    className="bg-white border-[#eeeeee] min-h-[120px]"
                                    placeholder="Client feedback..."
                                />
                            </div>

                            {/* Image Upload Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-black uppercase tracking-wider">Client Photo</label>
                                <div className="flex items-start gap-6">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                        <Image
                                            src={testimonial.image_url || "/placeholder-user.jpg"}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            type="text"
                                            value={testimonial.image_url}
                                            onChange={(e) => setTestimonial({ ...testimonial, image_url: e.target.value })}
                                            className="text-xs font-mono text-[#5c5c5c] bg-gray-50"
                                            placeholder="https://..."
                                        />
                                        <div className="relative inline-block">
                                            <Button
                                                variant="outline"
                                                disabled={uploading}
                                                className="cursor-pointer relative overflow-hidden"
                                            >
                                                {uploading ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Upload className="mr-2 h-4 w-4" />
                                                )}
                                                {uploading ? "Uploading..." : "Upload New Photo"}
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

                            <div className="pt-4 border-t border-[#eeeeee] flex justify-end">
                                <Button
                                    onClick={handleSave}
                                    disabled={saving || !testimonial.name}
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
