"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload, X, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        content: "",
        rating: 5
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchTestimonial();
        }
    }, [status, id, router]);

    const fetchTestimonial = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/testimonials/${id}`);
            if (!res.ok) {
                if (res.status === 404) {
                    toast.error("Testimonial not found.");
                    router.push("/admin/testimonials");
                    return;
                }
                throw new Error("Failed to fetch testimonial");
            }
            const data = await res.json();

            setFormData({
                name: data.name || "",
                role: data.role || "",
                content: data.content || "",
                rating: data.rating || 5
            });
            setImage(data.image_url || null);
        } catch (error) {
            console.error("Error fetching testimonial:", error);
            toast.error("Failed to load testimonial details");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append('file', files[0]);
            uploadFormData.append('folder', 'testimonials');

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Upload failed');
            }

            const data = await res.json();
            setImage(data.url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error(error instanceof Error ? error.message : "Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.content.trim()) {
            toast.error("Please fill in client name and testimonial content.");
            return;
        }

        setSaving(true);

        try {
            const res = await fetch(`/api/testimonials/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    image_url: image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                })
            });

            if (!res.ok) throw new Error("Failed to update testimonial");

            toast.success("Testimonial updated successfully!");
            router.push("/admin/testimonials");
            router.refresh();
        } catch (error) {
            console.error("Error updating testimonial:", error);
            toast.error("Failed to update testimonial");
        } finally {
            setSaving(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#E3572D]" />
                <span className="text-sm text-gray-500 font-medium">Loading testimonial...</span>
            </div>
        );
    }

    if (status === "unauthenticated") return null;

    return (
        <div className="pb-12 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-2xl">
                <Link href="/admin/testimonials" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#E3572D] transition-colors mb-3">
                    <ArrowLeft size={16} /> Back to Testimonials
                </Link>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-1">Edit Testimonial</h1>
                <p className="text-gray-500 text-sm mb-6">Update review by &quot;{formData.name}&quot;</p>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 space-y-5">
                    {/* Image Upload */}
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Client Photo</label>
                        <div className="flex items-center gap-4">
                            {image ? (
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200 shrink-0">
                                    <Image src={image} alt="Client Preview" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setImage(null)}
                                        className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 hover:border-[#E3572D] flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition-colors shrink-0">
                                    {uploading ? (
                                        <Loader2 className="animate-spin text-[#E3572D] w-5 h-5" />
                                    ) : (
                                        <Upload className="text-gray-400 w-5 h-5" />
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            )}
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">
                                    {image ? "Photo uploaded. Click to change or X to remove." : "Upload a square portrait photo."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Full Name *</label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. John Doe"
                            required
                            className="border-gray-200 h-10 text-sm"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Role / Location</label>
                        <Input
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="e.g. INFOPARK or Villa Buyer"
                            className="border-gray-200 h-10 text-sm"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Rating (Stars)</label>
                        <div className="flex items-center gap-1 py-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                    className="p-1 hover:scale-110 transition-transform"
                                >
                                    <Star
                                        size={20}
                                        className={star <= formData.rating ? "fill-[#F9A825] text-[#F9A825]" : "text-gray-300"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Testimonial Content *</label>
                        <Textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Share their experience working with FYD Homes..."
                            required
                            rows={4}
                            className="border-gray-200 text-sm resize-none"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.back()} className="text-gray-600">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#E3572D] hover:bg-[#cf4b22] text-white font-semibold shadow-sm"
                            disabled={saving || uploading}
                        >
                            {saving && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
                            Update Testimonial
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
