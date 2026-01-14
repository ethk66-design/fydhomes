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
    <div className="min-h-screen bg-[#f4f8fb] pb-20">
      {/* Header Spacer */}
      <div className="h-[80px] bg-white border-b border-[#eeeeee]"></div>

      <div className="container mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-black font-serif mb-2">Admin Dashboard</h1>
            <p className="text-[#5c5c5c]">Manage your property listings</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-[#eeeeee] text-[#5c5c5c] hover:bg-gray-50"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
            <Link href="/admin/properties/new">
              <Button className="bg-[#2d7a8c] hover:bg-[#256a7a] text-white font-bold">
                <Plus size={16} className="mr-2" />
                Add Property
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f4f8fb] border-b border-[#eeeeee]">
                  <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Type / Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeeeee]">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0 border border-[#eeeeee]">
                          <Image
                            src={property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=200'}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-[250px]">
                          <div className="font-bold text-black text-sm line-clamp-1">{property.title}</div>
                          <div className="text-xs text-[#5c5c5c]">Updated {new Date(property.updated_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-[#2d7a8c] uppercase tracking-wider">{property.type || 'N/A'}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm w-fit uppercase ${
                          property.status === 'featured' ? 'bg-[#1db954] text-white' : 
                          property.status === 'sold' ? 'bg-black text-white' : 
                          'bg-[#f4f8fb] text-[#5c5c5c]'
                        }`}>
                          {property.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-black text-sm">
                      {property.price || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#5c5c5c]">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {properties.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#5c5c5c]">No properties listed yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
