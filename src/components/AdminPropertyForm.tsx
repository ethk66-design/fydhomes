"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/lib/types";
import { stripHtml } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, X, Upload, Star } from "lucide-react";
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newImageUrl, setNewImageUrl] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    location: initialData?.location || "",
    beds: initialData?.beds || 0,
    baths: initialData?.baths || 0,
    area: initialData?.area || "",
    land_area: initialData?.land_area || "",
    type: initialData?.type || "Villa",
    listing_type: initialData?.listing_type || "Sale",
    status: initialData?.status || "active",
    youtube_video: initialData?.youtube_video || "",
    parkings: initialData?.parkings || 0,
    meta_title: initialData?.meta_title || "",
    meta_description: initialData?.meta_description || "",
    tags: initialData?.tags || [],
  });

  // Sync state with initialData when it changes (e.g. after router.refresh())
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        location: initialData.location || "",
        beds: initialData.beds || 0,
        baths: initialData.baths || 0,
        area: initialData.area || "",
        land_area: initialData.land_area || "",
        type: initialData.type || "Villa",
        listing_type: initialData.listing_type || "Sale",
        status: initialData.status || "active",
        youtube_video: initialData.youtube_video || "",
        parkings: initialData.parkings || 0,
        meta_title: initialData.meta_title || "",
        meta_description: initialData.meta_description || "",
        tags: initialData.tags || [],
      });
      setImages(initialData.images || []);
    }
  }, [initialData]);

  const handleCheckboxChange = (checked: boolean, tag: string) => {
    setFormData(prev => {
      const currentTags = prev.tags || [];
      if (checked) {
        return { ...prev, tags: [...currentTags, tag] };
      } else {
        return { ...prev, tags: currentTags.filter(t => t !== tag) };
      }
    });
  };

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
    setUploadProgress(0);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'properties');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || `Failed to upload ${file.name}`);
        }

        const { url } = await res.json();
        uploadedUrls.push(url);

        // Update progress
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }

      // Add new images to the list
      setImages(prev => [...prev, ...uploadedUrls]);
      toast.success(`Successfully uploaded ${uploadedUrls.length} images`);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      e.target.value = ''; // Reset file input
    }
  };

  const addImageByUrl = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
      toast.success("Image added!");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const setAsMain = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const [selectedImage] = newImages.splice(index, 1);
    newImages.unshift(selectedImage);
    setImages(newImages);
    toast.success("Main image updated");
  };

  const removeAllImages = () => {
    if (confirm("Are you sure you want to remove all images?")) {
      setImages([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const propertyData = {
      ...formData,
      beds: Number(formData.beds) || 0,
      baths: Number(formData.baths) || 0,
      parkings: Number(formData.parkings) || 0,
      description: stripHtml(formData.description),
      meta_description: stripHtml(formData.meta_description),
      images,
    };

    try {
      let res;
      if (isEditing && initialData) {
        res = await fetch(`/api/properties/${initialData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(propertyData)
        });
      } else {
        res = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(propertyData)
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || errorData.error || "Failed to save property");
      }

      toast.success(`Property ${isEditing ? "updated" : "created"} successfully`);
      router.push("/admin");
      router.refresh();
    } catch (error: unknown) {
      console.error("Error saving property:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save property");
    } finally {
      setLoading(false);
    }
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
              className="border-[#eeeeee] text-base sm:text-sm h-11"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed description of the property..."
              className="min-h-[120px] sm:min-h-[150px] border-[#eeeeee] text-base sm:text-sm"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">YouTube Video Link</label>
            <Input
              name="youtube_video"
              value={formData.youtube_video}
              onChange={handleInputChange}
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              className="border-[#eeeeee] text-base sm:text-sm h-11"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-[#eeeeee]">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">SEO Settings (Optional)</h3>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-[#5c5c5c]">Meta Title</label>
              <Input
                name="meta_title"
                value={formData.meta_title}
                onChange={handleInputChange}
                placeholder="Custom title for search engines"
                className="border-[#eeeeee] text-base sm:text-sm h-11"
              />
              <div className="text-[10px] text-[#5c5c5c] text-right">{formData.meta_title.length}/60</div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-[#5c5c5c]">Meta Description</label>
              <Textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleInputChange}
                placeholder="Custom description for search engines"
                className="min-h-[80px] border-[#eeeeee] text-base sm:text-sm"
              />
              <div className="text-[10px] text-[#5c5c5c] text-right">{formData.meta_description.length}/160</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Price</label>
              <div className="space-y-2">
                <Input
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="₹ 1.25 CR"
                  className="border-[#eeeeee] text-base sm:text-sm h-11"
                />
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Kakkanad, Kochi"
                className="border-[#eeeeee] text-base sm:text-sm h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Beds</label>
              <Input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleInputChange}
                className="border-[#eeeeee] text-base sm:text-sm h-11"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Baths</label>
              <Input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleInputChange}
                className="border-[#eeeeee] text-base sm:text-sm h-11"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Area</label>
              <Input
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="2500 sqft"
                className="border-[#eeeeee] text-base sm:text-sm h-11"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Land Area</label>
              <Input
                name="land_area"
                value={formData.land_area}
                onChange={handleInputChange}
                placeholder="e.g. 5 Cents"
                className="border-[#eeeeee] text-base sm:text-sm h-11"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Parking Spaces</label>
              <Input
                type="number"
                name="parkings"
                value={formData.parkings}
                onChange={handleInputChange}
                className="border-[#eeeeee] text-base sm:text-sm h-11"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Property Type</label>
              <Select value={formData.type} onValueChange={(v) => handleSelectChange("type", v)}>
                <SelectTrigger className="border-[#eeeeee] text-base sm:text-sm h-11">
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
                <SelectTrigger className="border-[#eeeeee] text-base sm:text-sm h-11">
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
              <SelectTrigger className="border-[#eeeeee] text-base sm:text-sm h-11">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 border border-[#eeeeee] h-11 px-3 rounded-md bg-white">
            <input
              type="checkbox"
              id="tag-budget"
              checked={formData.tags?.includes('budget-friendly') || false}
              onChange={(e) => handleCheckboxChange(e.target.checked, 'budget-friendly')}
              className="w-4 h-4 text-[#2d7a8c] rounded border-gray-300 focus:ring-[#2d7a8c]"
            />
            <label htmlFor="tag-budget" className="text-sm font-medium text-black cursor-pointer select-none">
              Budget Friendly
            </label>
          </div>

          <div className="space-y-2 mt-3">
            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag (e.g. Sea View)"
                className="border-[#eeeeee] text-base sm:text-sm h-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = e.currentTarget.value.trim();
                    if (val && !formData.tags?.includes(val)) {
                      setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), val] }));
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.filter(t => t !== 'budget-friendly').map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                  {tag}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))}
                    className="hover:text-red-500"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider block">
                Property Images ({images.length})
              </label>
              {images.length > 0 && (
                <button
                  type="button"
                  onClick={removeAllImages}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove All
                </button>
              )}
            </div>

            {/* Add image by URL */}
            <div className="flex gap-2">
              <Input
                placeholder="Paste image URL here..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="border-[#eeeeee] text-base sm:text-sm h-10 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addImageByUrl();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addImageByUrl}
                variant="outline"
                className="border-[#2d7a8c] text-[#2d7a8c] h-10"
              >
                Add
              </Button>
            </div>
            <p className="text-xs text-[#5c5c5c]">Add images using their URLs (e.g., from Supabase storage or other image hosts)</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 max-h-[400px] overflow-y-auto pr-1">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-[#eeeeee] group touch-none">
                  <Image src={img} alt={`Property ${idx}`} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover" />

                  {/* Actions Overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2 transition-opacity duration-200 ${idx === 0 ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'}`}>
                    {idx === 0 ? (
                      <span className="bg-[#1db954] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide cursor-default">
                        Main
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setAsMain(idx)}
                        className="bg-white text-black hover:bg-gray-100 text-[10px] font-bold h-9 px-4 rounded-sm uppercase tracking-wide shadow-sm active:scale-95 transition-transform flex items-center"
                      >
                        Set Main
                      </button>
                    )}
                  </div>

                  {/* Top Badges (Visible Always) */}
                  {idx === 0 && (
                    <div className="absolute top-1 left-1 bg-[#1db954] text-white p-1.5 rounded-full shadow-sm z-10">
                      <Star size={12} className="fill-current" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-9 w-9 flex items-center justify-center shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600 active:scale-90"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <label className={`aspect-square rounded-md border-2 border-dashed border-[#eeeeee] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${uploading ? 'cursor-not-allowed opacity-70' : ''}`}>
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="animate-spin text-[#2d7a8c] w-5 h-5 mb-1" />
                    <span className="text-[9px] font-bold text-[#2d7a8c]">{uploadProgress}%</span>
                  </div>
                ) : (
                  <>
                    <Upload className="text-[#5c5c5c] w-5 h-5" />
                    <span className="text-[8px] sm:text-[10px] font-bold text-[#5c5c5c] mt-1 sm:mt-2 uppercase text-center px-1">Upload</span>
                  </>
                )}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            {uploading && (
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  ref={(el) => {
                    if (el) el.style.width = `${uploadProgress}%`;
                  }}
                  className="bg-[#2d7a8c] h-1.5 rounded-full transition-all duration-300"
                />
              </div>
            )}
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
          disabled={loading || uploading}
          className="bg-[#2d7a8c] hover:bg-[#256a7a] text-white px-6 sm:px-10 w-full sm:w-auto order-1 sm:order-2"
        >
          {loading ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : null}
          {isEditing ? "Update Property" : "Create Property"}
        </Button>
      </div>
    </form >
  );
}
