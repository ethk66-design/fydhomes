"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Loader2,
    Search,
    Mail,
    Phone,
    MessageSquare,
    Home,
    Calendar,
    User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import Link from "next/link";

interface Lead {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    message: string | null;
    source: string | null;
    created_at: string;
    property?: {
        id: string;
        title: string;
    } | null;
}

export const dynamic = 'force-dynamic';

export default function LeadsPage() {
    const { status } = useSession();
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchLeads();
        }
    }, [status, router]);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/leads");
            if (!res.ok) throw new Error("Failed to fetch leads");
            const data = await res.json();
            setLeads(data);
        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lead.phone && lead.phone.includes(searchQuery))
    );

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#2d7a8c]" />
            </div>
        );
    }

    if (status === "unauthenticated") return null;

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10">
                <div className="mb-6 sm:mb-10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <Link href="/admin" className="text-sm text-[#5c5c5c] hover:text-[#2d7a8c] mb-2 inline-block">
                                &larr; Back to Dashboard
                            </Link>
                            <h1 className="text-2xl sm:text-3xl font-bold text-black">Leads Manager</h1>
                            <p className="text-[#5c5c5c]">View and manage incoming inquiries.</p>
                        </div>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c] h-4 w-4" />
                            <Input
                                placeholder="Search leads..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-white"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#f4f8fb] border-b border-[#eeeeee]">
                                        <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Contact Details</th>
                                        <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Interest</th>
                                        <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Message</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#eeeeee]">
                                    {filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 align-top whitespace-nowrap text-sm text-[#5c5c5c]">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    {format(new Date(lead.created_at), "MMM d, yyyy")}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1 pl-6">
                                                    {format(new Date(lead.created_at), "h:mm a")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="font-bold text-black text-sm flex items-center gap-2">
                                                        <User size={14} className="text-[#2d7a8c]" />
                                                        {lead.name}
                                                    </div>
                                                    {lead.email && (
                                                        <a href={`mailto:${lead.email}`} className="text-xs text-[#5c5c5c] hover:text-[#2d7a8c] flex items-center gap-2">
                                                            <Mail size={14} />
                                                            {lead.email}
                                                        </a>
                                                    )}
                                                    {lead.phone && (
                                                        <a href={`tel:${lead.phone}`} className="text-xs text-[#5c5c5c] hover:text-[#2d7a8c] flex items-center gap-2">
                                                            <Phone size={14} />
                                                            {lead.phone}
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex flex-col gap-1">
                                                    {lead.property ? (
                                                        <Link href={`/listings/${lead.property.id}`} target="_blank" className="font-medium text-[#2d7a8c] hover:underline text-sm flex items-start gap-2">
                                                            <Home size={14} className="mt-0.5 shrink-0" />
                                                            {lead.property.title}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">General Inquiry</span>
                                                    )}
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded w-fit mt-1">
                                                        {lead.source || 'Website'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex items-start gap-2">
                                                    <MessageSquare size={14} className="mt-1 text-gray-400 shrink-0" />
                                                    <p className="text-sm text-[#5c5c5c] leading-relaxed max-w-xs">
                                                        {lead.message || "No message provided."}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredLeads.length === 0 && (
                            <div className="text-center py-20 text-[#5c5c5c]">
                                No leads found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
