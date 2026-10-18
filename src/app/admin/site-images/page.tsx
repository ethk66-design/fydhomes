"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Loader2,
    Pencil,
    Search,
    ArrowLeft,
    ImageIcon,
    Map
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

interface PageAsset {
    id: string;
    page_route: string;
    section_key: string;
    label: string;
    asset_url: string;
    alt_text?: string;
}

export default function AdminSiteImagesPage() {
    const { status } = useSession();
    const [assets, setAssets] = useState<PageAsset[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchAssets();
        }
    }, [status, router]);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/page-assets");
            if (!res.ok) throw new Error("Failed to fetch assets");
            const data = await res.json();
            setAssets(data || []);
        } catch (error) {
            console.error("Error fetching site images:", error);
            toast.error("Failed to fetch site images");
        } finally {
            setLoading(false);
        }
    };

    const filteredAssets = assets.filter(asset =>
        asset.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.page_route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.section_key.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#E3572D]" />
                <span className="text-sm text-gray-500 font-medium">Loading site media...</span>
            </div>
        );
    }

    if (status === "unauthenticated") return null;

    return (
        <div className="pb-12 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
                {/* Header & Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                    <div>
                        <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#E3572D] transition-colors mb-2">
                            <ArrowLeft size={16} /> Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Site Images & Media</h1>
                            <span className="text-xs px-2.5 py-1 bg-gray-100 font-bold rounded-full text-gray-600">
                                {assets.length} Assets
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Manage static brand banners, property type cards, and promotional backdrops.</p>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search images or keys..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-white border-gray-200 h-10 text-sm rounded-lg shadow-sm"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="px-5 py-3.5">Image Preview</th>
                                    <th className="px-5 py-3.5">Asset Label & Key</th>
                                    <th className="px-5 py-3.5">Page Route</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredAssets.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="px-5 py-3.5 w-[140px]">
                                            <div className="relative w-24 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                <Image
                                                    src={asset.asset_url}
                                                    alt={asset.alt_text || asset.label}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="font-semibold text-gray-900 text-sm">{asset.label}</div>
                                            <div className="text-[11px] text-gray-400 font-mono mt-0.5">{asset.section_key}</div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#E3572D] bg-[#E3572D]/10 px-2.5 py-1 rounded w-fit">
                                                <Map size={13} />
                                                {asset.page_route}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <Link href={`/admin/site-images/${asset.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#E3572D] hover:bg-[#E3572D]/10 rounded-lg">
                                                    <Pencil size={15} />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden divide-y divide-gray-100">
                        {filteredAssets.map((asset) => (
                            <div key={asset.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-3">
                                <div className="relative w-20 h-14 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                    <Image
                                        src={asset.asset_url}
                                        alt={asset.alt_text || asset.label}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900 text-sm truncate">{asset.label}</div>
                                    <div className="text-[11px] text-gray-400 font-mono">{asset.page_route}</div>
                                </div>
                                <Link href={`/admin/site-images/${asset.id}`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#E3572D]">
                                        <Pencil size={16} />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {filteredAssets.length === 0 && (
                        <div className="text-center py-16 px-4">
                            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-600 font-semibold text-base">No assets match your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
