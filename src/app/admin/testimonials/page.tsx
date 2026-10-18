"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Loader2, Pencil, Star, MessageSquareQuote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    image_url: string;
    created_at: string;
}

export default function AdminTestimonialsPage() {
    const { status } = useSession();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchTestimonials();
        }
    }, [status, router]);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/testimonials");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setTestimonials(data || []);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
            toast.error("Failed to fetch testimonials");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            toast.success("Testimonial deleted successfully");
            setTestimonials(testimonials.filter(t => t.id !== id));
        } catch (_error) {
            toast.error("Failed to delete testimonial");
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#E3572D]" />
                <span className="text-sm text-gray-500 font-medium">Loading testimonials...</span>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return null;
    }

    return (
        <div className="pb-12 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                    <div>
                        <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#E3572D] transition-colors mb-2">
                            <ArrowLeft size={16} /> Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Client Testimonials</h1>
                            <span className="text-xs px-2.5 py-1 bg-gray-100 font-bold rounded-full text-gray-600">
                                {testimonials.length} Total
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Manage reviews displayed on the homepage testimonials slider.</p>
                    </div>

                    <Link href="/admin/testimonials/new">
                        <Button className="bg-[#E3572D] hover:bg-[#cf4b22] text-white font-bold text-xs sm:text-sm h-10 px-4 rounded-lg shadow-sm">
                            <Plus size={16} className="mr-1.5" />
                            Add Testimonial
                        </Button>
                    </Link>
                </div>

                {/* Testimonials List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
                    {testimonials.length === 0 ? (
                        <div className="text-center py-16 px-4">
                            <MessageSquareQuote className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-600 font-semibold text-base">No testimonials added yet.</p>
                            <p className="text-gray-400 text-xs mt-1">
                                Click &apos;Add Testimonial&apos; to feature client reviews on the homepage.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {testimonials.map((t) => (
                                <div key={t.id} className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                            <Image
                                                src={t.image_url || '/assets/placeholder-house.svg'}
                                                alt={t.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="max-w-xl">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-sm text-gray-900">{t.name}</span>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span className="text-xs text-gray-500 font-medium">{t.role}</span>
                                            </div>
                                            <div className="flex gap-0.5 mb-2">
                                                {[...Array(t.rating || 5)].map((_, i) => (
                                                    <Star key={i} size={13} className="fill-[#F9A825] text-[#F9A825]" />
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-2">
                                                &quot;{t.content}&quot;
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                        <Link href={`/admin/testimonials/edit/${t.id}`}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-400 hover:text-[#E3572D] hover:bg-[#E3572D]/10 rounded-lg"
                                                title="Edit Testimonial"
                                            >
                                                <Pencil size={15} />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            onClick={() => handleDelete(t.id)}
                                            title="Delete Testimonial"
                                        >
                                            <Trash2 size={15} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
