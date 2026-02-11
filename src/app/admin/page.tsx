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
  MessageSquareQuote,
  Search,
  User,
  Globe,
  Image as ImageIcon,
  Settings,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Property deleted");
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
      toast.success(newStatus === 'featured' ? "Added to Featured" : "Removed from Featured");
    } catch (_error) {
      toast.error("Failed to update status");
      fetchProperties();
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex flex-col gap-6 mb-6 sm:mb-10">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">Admin Dashboard</h1>
              <p className="text-[#5c5c5c] text-sm sm:text-base">Welcome, {session?.user?.name || session?.user?.email}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c] h-4 w-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white border-[#eeeeee] h-10 sm:h-auto text-base sm:text-sm shadow-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                {/* Management Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 sm:flex-none border-[#2d7a8c] text-[#2d7a8c] hover:bg-[#2d7a8c]/10 font-bold text-xs sm:text-sm">
                      <Settings size={14} className="mr-1 sm:mr-2" />
                      Manage
                      <ChevronDown size={14} className="ml-1 sm:ml-2 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Admin Tools</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/testimonials" className="w-full cursor-pointer">
                        <MessageSquareQuote size={14} className="mr-2" />
                        Testimonials
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/users" className="w-full cursor-pointer">
                        <User size={14} className="mr-2" />
                        Manage Agents
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/seo" className="w-full cursor-pointer">
                        <Globe size={14} className="mr-2" />
                        SEO Manager
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/site-images" className="w-full cursor-pointer">
                        <ImageIcon size={14} className="mr-2" />
                        Site Images
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Add Property */}
                <Link href="/admin/properties/new" className="flex-1 sm:flex-none">
                  <Button className="w-full bg-[#2d7a8c] hover:bg-[#256a7a] text-white font-bold text-xs sm:text-sm">
                    <Plus size={14} className="mr-1 sm:mr-2" />
                    Add Property
                  </Button>
                </Link>

                {/* Logout */}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="icon"
                  className="border-[#eeeeee] text-[#5c5c5c] hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  title="Logout"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f4f8fb] border-b border-[#eeeeee]">
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Property</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Type / Status</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Price</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider">Location</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold text-black uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeeeee]">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="relative w-14 h-10 lg:w-16 lg:h-12 rounded overflow-hidden flex-shrink-0 border border-[#eeeeee]">
                          <Image
                            src={property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=200'}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-[150px] lg:max-w-[250px]">
                          <div className="font-bold text-black text-xs lg:text-sm line-clamp-1">{property.title}</div>
                          <div className="text-[10px] lg:text-xs text-[#5c5c5c]">Updated {new Date(property.updated_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] lg:text-xs font-bold text-[#2d7a8c] uppercase tracking-wider">{property.type || 'N/A'}</span>
                        <span className={`text-[9px] lg:text-[10px] font-bold px-1.5 py-0.5 rounded-sm w-fit uppercase ${property.status === 'featured' ? 'bg-[#1db954] text-white' :
                          property.status === 'sold' ? 'bg-black text-white' :
                            'bg-[#f4f8fb] text-[#5c5c5c]'
                          }`}>
                          {property.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-black text-xs lg:text-sm">
                      {formatPrice(property.price)}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-[#5c5c5c]">
                      {property.location}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                      <div className="flex items-center justify-end gap-1 lg:gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-7 w-7 lg:h-8 lg:w-8 hover:bg-[#1db954]/10 ${property.status === 'featured' ? 'text-[#1db954]' : 'text-[#5c5c5c] hover:text-[#1db954]'}`}
                          onClick={() => toggleFeatured(property)}
                          title={property.status === 'featured' ? "Remove from Featured" : "Add to Featured"}
                        >
                          <Star size={14} className={property.status === 'featured' ? "fill-current" : ""} />
                        </Button>

                        <Link href={`/listings/${property.id}`} target="_blank" title="View in App">
                          <Button variant="ghost" size="icon" className="h-7 w-7 lg:h-8 lg:w-8 text-[#5c5c5c] hover:text-[#2d7a8c]">
                            <ExternalLink size={14} />
                          </Button>
                        </Link>
                        <Link href={`/admin/properties/${property.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 lg:h-8 lg:w-8 text-[#5c5c5c] hover:text-[#2d7a8c]">
                            <Pencil size={14} />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 lg:h-8 lg:w-8 text-[#5c5c5c] hover:text-red-600"
                          onClick={() => handleDelete(property.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-[#eeeeee]">
            {filteredProperties.map((property) => (
              <div key={property.id} className="p-4 hover:bg-gray-50">
                <div className="flex gap-3 mb-3">
                  <div className="relative w-20 h-16 rounded overflow-hidden flex-shrink-0 border border-[#eeeeee]">
                    <Image
                      src={property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=200'}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-black text-sm line-clamp-2 mb-1">{property.title}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#2d7a8c] uppercase">{property.type || 'N/A'}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${property.status === 'featured' ? 'bg-[#1db954] text-white' :
                        property.status === 'sold' ? 'bg-black text-white' :
                          'bg-[#f4f8fb] text-[#5c5c5c]'
                        }`}>
                        {property.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-black text-sm">{formatPrice(property.price)}</div>
                    <div className="text-xs text-[#5c5c5c]">{property.location}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-11 w-11 hover:bg-[#1db954]/10 ${property.status === 'featured' ? 'text-[#1db954]' : 'text-[#5c5c5c] hover:text-[#1db954]'}`}
                      onClick={() => toggleFeatured(property)}
                    >
                      <Star size={18} className={property.status === 'featured' ? "fill-current" : ""} />
                    </Button>
                    <Link href={`/listings/${property.id}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-11 w-11 text-[#5c5c5c] hover:text-[#2d7a8c]">
                        <ExternalLink size={18} />
                      </Button>
                    </Link>
                    <Link href={`/admin/properties/${property.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-11 w-11 text-[#5c5c5c] hover:text-[#2d7a8c]">
                        <Pencil size={18} />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 text-[#5c5c5c] hover:text-red-600"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <p className="text-[#5c5c5c] text-sm sm:text-base">
                {searchQuery ? "No properties match your search." : "No properties listed yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
