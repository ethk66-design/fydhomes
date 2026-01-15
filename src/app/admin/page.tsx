"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Property } from "@/lib/types";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ExternalLink,
  Loader2,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchProperties();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch properties");
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete property");
    } else {
      toast.success("Property deleted");
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#2d7a8c]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
      <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

      <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black font-serif mb-1 sm:mb-2">Admin Dashboard</h1>
            <p className="text-[#5c5c5c] text-sm sm:text-base">Manage your property listings</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-[#eeeeee] text-[#5c5c5c] hover:bg-gray-50 text-xs sm:text-sm flex-1 sm:flex-none"
            >
              <LogOut size={14} className="mr-1 sm:mr-2" />
              Logout
            </Button>
            <Link href="/admin/properties/new" className="flex-1 sm:flex-none">
              <Button className="bg-[#2d7a8c] hover:bg-[#256a7a] text-white font-bold text-xs sm:text-sm w-full">
                <Plus size={14} className="mr-1 sm:mr-2" />
                Add Property
              </Button>
            </Link>
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
                {properties.map((property) => (
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
                        <span className={`text-[9px] lg:text-[10px] font-bold px-1.5 py-0.5 rounded-sm w-fit uppercase ${
                          property.status === 'featured' ? 'bg-[#1db954] text-white' : 
                          property.status === 'sold' ? 'bg-black text-white' : 
                          'bg-[#f4f8fb] text-[#5c5c5c]'
                        }`}>
                          {property.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-black text-xs lg:text-sm">
                      {property.price || 'N/A'}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-[#5c5c5c]">
                      {property.location}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                      <div className="flex items-center justify-end gap-1 lg:gap-2">
                        <Link href={`/listings/${property.id}`} target="_blank">
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
            {properties.map((property) => (
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
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                        property.status === 'featured' ? 'bg-[#1db954] text-white' : 
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
                    <div className="font-bold text-black text-sm">{property.price || 'N/A'}</div>
                    <div className="text-xs text-[#5c5c5c]">{property.location}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link href={`/listings/${property.id}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#5c5c5c] hover:text-[#2d7a8c]">
                        <ExternalLink size={16} />
                      </Button>
                    </Link>
                    <Link href={`/admin/properties/${property.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#5c5c5c] hover:text-[#2d7a8c]">
                        <Pencil size={16} />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-[#5c5c5c] hover:text-red-600"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {properties.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <p className="text-[#5c5c5c] text-sm sm:text-base">No properties listed yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
