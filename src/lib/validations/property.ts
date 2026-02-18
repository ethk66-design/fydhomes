import { z } from "zod";

export const propertySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    price: z.string().optional(), // Can remain string as per DB, but maybe validate format later
    location: z.string().optional(),
    beds: z.union([z.number(), z.string(), z.null()]).transform(val => Number(val) || 0).optional(),
    baths: z.union([z.number(), z.string(), z.null()]).transform(val => Number(val) || 0).optional(),
    area: z.string().optional(),
    land_area: z.string().optional(),
    status: z.enum(["active", "sold", "featured"]).default("active"),
    type: z.string().optional(),
    listing_type: z.enum(["Sale", "Rent"]).optional(),
    youtube_video: z.string().optional(),
    parkings: z.union([z.number(), z.string(), z.null()]).transform(val => Number(val) || 0).optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    images: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    agent_id: z.string().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
