"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

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

    // Redirect if not authenticated
    if (status === "unauthenticated") {
        router.push("/admin/login");
        return null; // Return null instead of executing hooks while redirecting
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (status === "authenticated") {
            const fetchTestimonial = async () => {
                try {
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
                    
                    if (data.image_url) {
                        setImage(data.image_url);
                    }
                } catch (error) {
                    console.error("Error fetching testimonial:", error);
                    toast.error("An error occurred while loading this testimonial.");
                } finally {
                    setLoading(false);
                }
            };

            fetchTestimonial();
        }
    }, [id, status, router]);

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
                const errorData = await res.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const { url } = await res.json();
            setImage(url);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image. You can also paste an external image URL below.');
        } finally {
            setUploading(false);
            // reset file input
            e.target.value = '';
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#E3572D]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10 max-w-2xl">
                <Link href="/admin/testimonials" className="flex items-center gap-2 text-sm text-[#5c5c5c] hover:text-[#E3572D] mb-4">
                    <ArrowLeft size={14} /> Back to Testimonials
                </Link>

                <h1 className="text-2xl font-bold text-black mb-6">Edit Testimonial</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-[#eeeeee] shadow-sm space-y-6">

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black uppercase">Client Photo</label>
                        <div className="flex items-center gap-4">
                            {image ? (
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-[#eeeeee]">
                                    <img 
                                        src={image} 
                                        alt="Preview" 
                                        className="object-cover w-full h-full" 
                                        onError={(e) => { e.currentTarget.src = '/assets/placeholder-house.svg'; }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImage(null)}
                                        className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity"
                                        aria-label="Remove image"
                                    >
                                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                            <X className="text-white w-6 h-6" />
                                        </div>
                                    </button>
                                </div>
                            ) : (
                                <label className="w-24 h-24 rounded-full border-2 border-dashed border-[#eeeeee] flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors relative">
                                    {uploading ? (
                                        <Loader2 className="w-6 h-6 animate-spin text-[#E3572D]" />
                                    ) : (
                                        <Upload className="text-[#5c5c5c] w-6 h-6" />
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
                                <p className="text-sm text-[#5c5c5c]">
                                    {image ? "Image uploaded successfully." : "Click the placeholder to upload an image directly from your device."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black uppercase">Name</label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. John Doe"
                            required
                            className="border-[#eeeeee] text-base sm:text-sm h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black uppercase">Role / Location</label>
                        <Input
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="e.g. INFOPARK or CEO"
                            className="border-[#eeeeee] text-base sm:text-sm h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black uppercase">Testimonial</label>
                        <Textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="What did they say?"
                            required
                            className="border-[#eeeeee] min-h-[100px] text-base sm:text-sm"
                        />
                    </div>

                    <div className="pt-4 border-t border-[#eeeeee] flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" className="bg-[#E3572D] text-white hover:bg-[#256a7a]" disabled={saving || uploading}>
                            {saving && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
                            Update Testimonial
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
