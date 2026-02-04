import { getSeoMetadata } from "@/lib/seo";
import { getPageAsset } from "@/lib/assets";
import SellPageForm from "@/components/SellPageForm";

export const revalidate = 0;

export async function generateMetadata() {
  return getSeoMetadata("/sell", "Sell Your Property | FYD Homes", "Sell your property confidently with FYD Homes. Reach thousands of buyers.");
}

export default async function SellPage() {
  const heroBg = await getPageAsset('/sell', 'hero_bg', "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000");

  return (
    <div className="min-h-screen bg-white">
      <SellPageForm heroBg={heroBg} />
    </div>
  );
}
