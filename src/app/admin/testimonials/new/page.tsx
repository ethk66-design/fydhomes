"use client";

export const dynamic = 'force-dynamic';


import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewTestimonialPage() {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const _handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('folder', 'testimonials');

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Upload failed');
            }

            const { url } = await res.json();
            setImage(url);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image. You can also paste an external image URL below.');
        } finally {
            setUploading(false);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    image_url: image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                })
            });

            if (!res.ok) throw new Error("Failed to create testimonial");

            toast.success("Testimonial added successfully!");
            router.push("/admin/testimonials");
            router.refresh();
        } catch (error) {
            console.error("Error creating testimonial:", error);
            toast.error("Failed to create testimonial");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#2d7a8c]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10 max-w-2xl">
                <Link href="/admin/testimonials" className="flex items-center gap-2 text-sm text-[#5c5c5c] hover:text-[#2d7a8c] mb-4">
                    <ArrowLeft size={14} /> Back to Testimonials
                </Link>

                <h1 className="text-2xl font-bold text-black mb-6">Add New Testimonial</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-[#eeeeee] shadow-sm space-y-6">

                    {/* Image Upload / URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black uppercase">Client Photo URL</label>
                        <div className="flex items-center gap-4">
                            {image ? (
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-[#eeeeee]">
                                    <Image src={image} alt="Preview" fill className="object-cover" />
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
                                <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#eeeeee] flex flex-col items-center justify-center bg-gray-50">
                                    <Upload className="text-[#5c5c5c] w-6 h-6" />
                                </div>
                            )}
                            <div className="flex-1">
                                <Input
                                    placeholder="Paste image URL here..."
                                    value={image || ""}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="border-[#eeeeee] text-base sm:text-sm h-11"
                                />
                                <p className="text-xs text-[#5c5c5c] mt-1">Use an external image URL (e.g., from Unsplash)</p>
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
                        <Button type="submit" className="bg-[#2d7a8c] text-white hover:bg-[#256a7a]" disabled={loading || uploading}>
                            {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
                            Save Testimonial
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
