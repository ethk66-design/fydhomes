"use client";

export const dynamic = 'force-dynamic';


import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";
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
            toast.success("Testimonial deleted");
            setTestimonials(testimonials.filter(t => t.id !== id));
        } catch (error) {
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

    if (status === "unauthenticated") {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-10">
                    <div>
                        <Link href="/admin" className="flex items-center gap-2 text-sm text-[#5c5c5c] hover:text-[#2d7a8c] mb-2">
                            <ArrowLeft size={14} /> Back to Dashboard
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">Testimonials</h1>
                        <p className="text-[#5c5c5c] text-sm">Manage what your clients say</p>
                    </div>
                    <Link href="/admin/testimonials/new">
                        <Button className="bg-[#2d7a8c] hover:bg-[#256a7a] text-white font-bold text-xs sm:text-sm">
                            <Plus size={14} className="mr-1 sm:mr-2" />
                            Add Testimonial
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] overflow-hidden">
                    {testimonials.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-[#5c5c5c]">No testimonials items yet.</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-[#f4f8fb] border-b border-[#eeeeee]">
                                            <th className="px-6 py-4 text-xs font-bold text-black uppercase">Client</th>
                                            <th className="px-6 py-4 text-xs font-bold text-black uppercase">Message</th>
                                            <th className="px-6 py-4 text-xs font-bold text-black uppercase text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#eeeeee]">
                                        {testimonials.map((t) => (
                                            <tr key={t.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                                            <Image src={t.image_url || '/placeholder-user.jpg'} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm text-black">{t.name}</div>
                                                            <div className="text-xs text-[#5c5c5c]">{t.role}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 max-w-lg">
                                                    <p className="text-sm text-[#5c5c5c] line-clamp-2">"{t.content}"</p>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-[#5c5c5c] hover:text-red-600"
                                                        onClick={() => handleDelete(t.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-[#eeeeee]">
                                {testimonials.map((t) => (
                                    <div key={t.id} className="p-4 hover:bg-gray-50">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                                <Image src={t.image_url || '/placeholder-user.jpg'} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="font-bold text-sm text-black">{t.name}</div>
                                                        <div className="text-xs text-[#5c5c5c]">{t.role}</div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 text-[#5c5c5c] hover:text-red-600 -mt-2 -mr-2"
                                                        onClick={() => handleDelete(t.id)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pl-[52px]">
                                            <p className="text-sm text-[#5c5c5c] leading-relaxed italic">"{t.content}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
