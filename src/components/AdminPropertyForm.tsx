"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Property, PropertyStatus, ListingType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, X, Upload } from "lucide-react";
import Image from "next/image";

interface AdminPropertyFormProps {
  initialData?: Property;
  isEditing?: boolean;
}

export default function AdminPropertyForm({ initialData, isEditing = false }: AdminPropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    location: initialData?.location || "",
    beds: initialData?.beds || 0,
    baths: initialData?.baths || 0,
    area: initialData?.area || "",
    type: initialData?.type || "Villa",
    listing_type: initialData?.listing_type || "Sale",
    status: initialData?.status || "active",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `property-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) {
        toast.error(`Error uploading image: ${uploadError.message}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      newImages.push(publicUrl);
    }

    setImages(newImages);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const propertyData = {
      ...formData,
      images,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (isEditing && initialData) {
      const { error: updateError } = await supabase
        .from("properties")
        .update(propertyData)
        .eq("id", initialData.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("properties")
        .insert([propertyData]);
      error = insertError;
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Property ${isEditing ? "updated" : "created"} successfully`);
      router.push("/admin");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 bg-white p-4 sm:p-6 md:p-8 rounded-xl border border-[#eeeeee] shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Property Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g. Luxury 4BHK Villa in Kakkanad"
              className="border-[#eeeeee] text-sm sm:text-base h-10 sm:h-11"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed description of the property..."
              className="min-h-[120px] sm:min-h-[150px] border-[#eeeeee] text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Price</label>
              <Input
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="₹1.25 CR"
                className="border-[#eeeeee] text-sm sm:text-base h-10 sm:h-11"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Kakkanad, Kochi"
                className="border-[#eeeeee] text-sm sm:text-base h-10 sm:h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Beds</label>
              <Input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleInputChange}
                className="border-[#eeeeee] text-sm sm:text-base h-10 sm:h-11"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Baths</label>
              <Input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleInputChange}
                className="border-[#eeeeee] text-sm sm:text-base h-10 sm:h-11"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Area</label>
              <Input
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="2500 sqft"
                className="border-[#eeeeee] text-sm sm:text-base h-10 sm:h-11"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Property Type</label>
              <Select value={formData.type} onValueChange={(v) => handleSelectChange("type", v)}>
                <SelectTrigger className="border-[#eeeeee] text-sm sm:text-base h-10 sm:h-11">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Plot">Plot</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Listing Type</label>
              <Select value={formData.listing_type} onValueChange={(v) => handleSelectChange("listing_type", v)}>
                <SelectTrigger className="border-[#eeeeee] text-sm sm:text-base h-10 sm:h-11">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sale">Sale</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Status</label>
            <Select value={formData.status} onValueChange={(v) => handleSelectChange("status", v)}>
              <SelectTrigger className="border-[#eeeeee] text-sm sm:text-base h-10 sm:h-11">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider block">Property Images</label>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-[#eeeeee] group">
                  <Image src={img} alt={`Property ${idx}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 sm:p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} className="sm:w-3 sm:h-3" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-md border-2 border-dashed border-[#eeeeee] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                {uploading ? <Loader2 className="animate-spin text-[#2d7a8c] w-5 h-5" /> : <Upload className="text-[#5c5c5c] w-5 h-5" />}
                <span className="text-[8px] sm:text-[10px] font-bold text-[#5c5c5c] mt-1 sm:mt-2 uppercase">Upload</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-[#eeeeee]">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
          className="border-[#eeeeee] text-[#5c5c5c] w-full sm:w-auto order-2 sm:order-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#2d7a8c] hover:bg-[#256a7a] text-white px-6 sm:px-10 w-full sm:w-auto order-1 sm:order-2"
        >
          {loading ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : null}
          {isEditing ? "Update Property" : "Create Property"}
        </Button>
      </div>
    </form>
  );
}
