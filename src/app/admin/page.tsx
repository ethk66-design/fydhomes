"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Property } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Loader2,
  LogOut,
  Star,
  Search,
  Building2,
  CheckCircle,
  Tag,
  Home
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchProperties();
    }
  }, [status, router]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Property deleted successfully");
      setProperties(properties.filter(p => p.id !== id));
    } catch (_error) {
      toast.error("Failed to delete property");
    }
  };

  const toggleFeatured = async (property: Property) => {
    const newStatus = property.status === 'featured' ? 'active' : 'featured';

    // Optimistic update
    setProperties(properties.map(p =>
      p.id === property.id ? { ...p, status: newStatus } : p
    ));

    try {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error("Failed to update");
      toast.success(newStatus === 'featured' ? "Marked as Featured" : "Removed from Featured");
    } catch (_error) {
      toast.error("Failed to update status");
      fetchProperties();
    }
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (property.location && property.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (property.type && property.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Quick stats calculations
  const totalCount = properties.length;
  const featuredCount = properties.filter(p => p.status === 'featured').length;
  const forSaleCount = properties.filter(p => p.listing_type === 'Sale').length;
  const forRentCount = properties.filter(p => p.listing_type === 'Rent').length;

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-transparent">
        <Loader2 className="w-9 h-9 animate-spin text-[#E3572D]" />
        <span className="text-sm font-medium text-gray-500">Loading dashboard...</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="pb-12 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Property Management</h1>
              <span className="text-xs px-2.5 py-1 bg-gray-100 font-bold rounded-full text-gray-600">
                {totalCount} Total
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Logged in as <span className="font-semibold text-gray-700">{session?.user?.name || session?.user?.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white border-gray-200 h-10 text-sm shadow-sm rounded-lg"
              />
            </div>

            {/* Add Property Button */}
            <Link href="/admin/properties/new">
              <Button className="bg-[#E3572D] hover:bg-[#cf4b22] text-white font-bold text-xs sm:text-sm h-10 px-4 rounded-lg shadow-sm whitespace-nowrap">
                <Plus size={16} className="mr-1.5" />
                Add Property
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0A192F]/5 flex items-center justify-center text-[#0A192F]">
              <Building2 size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{totalCount}</div>
              <div className="text-xs text-gray-500 font-medium">All Properties</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3572D]/10 flex items-center justify-center text-[#E3572D]">
              <Star size={20} className="fill-current" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{featuredCount}</div>
              <div className="text-xs text-gray-500 font-medium">Featured Listings</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Home size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{forSaleCount}</div>
              <div className="text-xs text-gray-500 font-medium">For Sale</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Tag size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{forRentCount}</div>
              <div className="text-xs text-gray-500 font-medium">For Rent</div>
            </div>
          </div>
        </div>

        {/* Properties Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <th className="px-5 py-3.5">Property</th>
                  <th className="px-5 py-3.5">Type & Status</th>
                  <th className="px-5 py-3.5">Price</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-16 h-11 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <Image
                            src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=200'}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-[260px] lg:max-w-[340px]">
                          <div className="font-semibold text-gray-900 text-sm line-clamp-1 hover:text-[#E3572D] transition-colors">
                            <Link href={`/listings/${property.id}`} target="_blank">
                              {property.title}
                            </Link>
                          </div>
                          <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                            <span>ID: {property.id.slice(0, 8)}...</span>
                            <span>•</span>
                            <span>{new Date(property.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                          {property.type || 'Property'}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            property.status === 'featured'
                              ? 'bg-[#E3572D]/15 text-[#E3572D] border border-[#E3572D]/20'
                              : property.status === 'sold'
                              ? 'bg-gray-800 text-white'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {property.status}
                        </span>
                        {property.listing_type && (
                          <span className="text-[10px] font-semibold text-gray-500 uppercase">
                            ({property.listing_type})
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-gray-900 text-sm">
                      {formatPrice(property.price)}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-600 max-w-[200px] truncate">
                      {property.location || '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 rounded-lg ${
                            property.status === 'featured'
                              ? 'text-[#E3572D] bg-[#E3572D]/10 hover:bg-[#E3572D]/20'
                              : 'text-gray-400 hover:text-[#E3572D] hover:bg-gray-100'
                          }`}
                          onClick={() => toggleFeatured(property)}
                          title={property.status === 'featured' ? "Remove from Featured" : "Add to Featured"}
                        >
                          <Star size={15} className={property.status === 'featured' ? "fill-current" : ""} />
                        </Button>

                        <Link href={`/listings/${property.id}`} target="_blank" title="View Public Listing">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                            <ExternalLink size={15} />
                          </Button>
                        </Link>

                        <Link href={`/admin/properties/${property.id}/edit`} title="Edit Property">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#E3572D] hover:bg-[#E3572D]/10 rounded-lg">
                            <Pencil size={15} />
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          onClick={() => handleDelete(property.id)}
                          title="Delete Property"
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-gray-100">
            {filteredProperties.map((property) => (
              <div key={property.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex gap-3 mb-3">
                  <div className="relative w-20 h-16 rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                    <Image
                      src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=200'}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1">{property.title}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                        {property.type || 'Property'}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          property.status === 'featured'
                            ? 'bg-[#E3572D] text-white'
                            : property.status === 'sold'
                            ? 'bg-black text-white'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{formatPrice(property.price)}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[150px]">{property.location}</div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-9 w-9 rounded-lg ${
                        property.status === 'featured' ? 'text-[#E3572D]' : 'text-gray-400'
                      }`}
                      onClick={() => toggleFeatured(property)}
                    >
                      <Star size={16} className={property.status === 'featured' ? "fill-current" : ""} />
                    </Button>
                    <Link href={`/listings/${property.id}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 rounded-lg">
                        <ExternalLink size={16} />
                      </Button>
                    </Link>
                    <Link href={`/admin/properties/${property.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-[#E3572D] rounded-lg">
                        <Pencil size={16} />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-gray-400 hover:text-red-600 rounded-lg"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-16 px-4">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-semibold text-base">
                {searchQuery ? "No properties match your search criteria." : "No properties listed yet."}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {searchQuery ? "Try searching for a different keyword or location." : "Click 'Add Property' to create your first listing."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
