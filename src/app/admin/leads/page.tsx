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
    User,
    Trash2,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";

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
            setLoading(true);
            const res = await fetch("/api/leads");
            if (!res.ok) throw new Error("Failed to fetch leads");
            const data = await res.json();
            setLeads(data || []);
        } catch (error) {
            console.error("Error fetching leads:", error);
            toast.error("Failed to fetch leads");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteLead = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete inquiry from "${name}"?`)) return;

        try {
            const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete lead");
            toast.success("Lead deleted successfully");
            setLeads(leads.filter(l => l.id !== id));
        } catch (_error) {
            toast.error("Failed to delete lead");
        }
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lead.phone && lead.phone.includes(searchQuery)) ||
        (lead.message && lead.message.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#E3572D]" />
                <span className="text-sm text-gray-500 font-medium">Loading inquiries...</span>
            </div>
        );
    }

    if (status === "unauthenticated") return null;

    return (
        <div className="pb-12 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                    <div>
                        <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#E3572D] transition-colors mb-2">
                            <ArrowLeft size={16} /> Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Leads & Inquiries</h1>
                            <span className="text-xs px-2.5 py-1 bg-gray-100 font-bold rounded-full text-gray-600">
                                {leads.length} Received
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Review, follow up, and manage prospective buyer & seller leads.</p>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search by name, phone, email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-white border-gray-200 h-10 text-sm rounded-lg shadow-sm"
                        />
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="px-5 py-3.5">Received Date</th>
                                    <th className="px-5 py-3.5">Prospect Details</th>
                                    <th className="px-5 py-3.5">Property / Context</th>
                                    <th className="px-5 py-3.5">Inquiry Details</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="px-5 py-4 align-top whitespace-nowrap text-xs text-gray-500">
                                            <div className="flex items-center gap-1.5 font-medium text-gray-700">
                                                <Calendar size={13} className="text-gray-400" />
                                                {format(new Date(lead.created_at), "MMM d, yyyy")}
                                            </div>
                                            <div className="text-[11px] text-gray-400 mt-0.5 pl-5">
                                                {format(new Date(lead.created_at), "h:mm a")}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 align-top">
                                            <div className="flex flex-col gap-1">
                                                <div className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                                                    <User size={14} className="text-[#E3572D]" />
                                                    {lead.name}
                                                </div>
                                                {lead.phone && (
                                                    <a href={`tel:${lead.phone}`} className="text-xs text-gray-600 hover:text-[#E3572D] flex items-center gap-1.5 transition-colors">
                                                        <Phone size={12} className="text-gray-400" />
                                                        {lead.phone}
                                                    </a>
                                                )}
                                                {lead.email && (
                                                    <a href={`mailto:${lead.email}`} className="text-xs text-gray-600 hover:text-[#E3572D] flex items-center gap-1.5 transition-colors">
                                                        <Mail size={12} className="text-gray-400" />
                                                        {lead.email}
                                                    </a>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 align-top">
                                            <div className="flex flex-col gap-1">
                                                {lead.property ? (
                                                    <Link href={`/listings/${lead.property.id}`} target="_blank" className="font-semibold text-xs text-gray-900 hover:text-[#E3572D] flex items-center gap-1.5 transition-colors">
                                                        <Home size={13} className="text-[#E3572D] shrink-0" />
                                                        <span className="line-clamp-1">{lead.property.title}</span>
                                                    </Link>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">General Inquiry</span>
                                                )}
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded w-fit">
                                                    {lead.source || 'Website'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 align-top">
                                            <div className="flex items-start gap-1.5 max-w-sm">
                                                <MessageSquare size={13} className="mt-1 text-gray-400 shrink-0" />
                                                <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                                                    {lead.message || "No additional comments provided."}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 align-top text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                onClick={() => handleDeleteLead(lead.id, lead.name)}
                                                title="Delete Lead"
                                            >
                                                <Trash2 size={15} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Responsive Cards */}
                    <div className="md:hidden divide-y divide-gray-100">
                        {filteredLeads.map((lead) => (
                            <div key={lead.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start gap-3 mb-2">
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                                            <User size={14} className="text-[#E3572D]" />
                                            {lead.name}
                                        </div>
                                        <div className="text-[11px] text-gray-400 mt-0.5">
                                            {format(new Date(lead.created_at), "MMM d, yyyy • h:mm a")}
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                                        onClick={() => handleDeleteLead(lead.id, lead.name)}
                                        title="Delete Lead"
                                    >
                                        <Trash2 size={15} />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-2 my-2 text-xs">
                                    {lead.phone && (
                                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-gray-700 bg-gray-50 border border-gray-200/80 p-2 rounded-lg font-medium hover:text-[#E3572D]">
                                            <Phone size={13} className="text-[#E3572D]" />
                                            <span className="truncate">{lead.phone}</span>
                                        </a>
                                    )}
                                    {lead.email && (
                                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-gray-700 bg-gray-50 border border-gray-200/80 p-2 rounded-lg font-medium hover:text-[#E3572D]">
                                            <Mail size={13} className="text-[#E3572D]" />
                                            <span className="truncate">{lead.email}</span>
                                        </a>
                                    )}
                                </div>

                                {lead.property && (
                                    <div className="text-xs bg-slate-50 border border-gray-100 p-2 rounded-lg mb-2">
                                        <span className="text-gray-400 font-medium">Interested in: </span>
                                        <Link href={`/listings/${lead.property.id}`} target="_blank" className="font-semibold text-gray-900 hover:text-[#E3572D]">
                                            {lead.property.title}
                                        </Link>
                                    </div>
                                )}

                                {lead.message && (
                                    <div className="text-xs text-gray-600 bg-white border border-gray-100 p-2.5 rounded-lg whitespace-pre-line mt-2">
                                        {lead.message}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredLeads.length === 0 && (
                        <div className="text-center py-16 px-4">
                            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-600 font-semibold text-base">
                                {searchQuery ? "No inquiries match your search filter." : "No inquiries received yet."}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Inquiries submitted via website contact forms will appear here in real-time.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
