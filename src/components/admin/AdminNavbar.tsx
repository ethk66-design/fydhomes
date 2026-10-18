"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Building2,
  Mail,
  MessageSquareQuote,
  Image as ImageIcon,
  Globe,
  Users,
  LogOut,
  ExternalLink,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/admin", label: "Properties", icon: Building2 },
  { href: "/admin/leads", label: "Leads", icon: Mail },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/hero-slider", label: "Hero Slider", icon: ImageIcon },
  { href: "/admin/site-images", label: "Site Images", icon: ImageIcon },
  { href: "/admin/seo", label: "SEO", icon: Globe },
  { href: "/admin/users", label: "Agents", icon: Users },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Do not render navbar on the login page
  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  const isLinkActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin" || pathname.startsWith("/admin/properties");
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A192F] text-white border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2.5 sm:gap-3 group">
              <ImageWithFallback
                src="/assets/fyd-logo.png"
                alt="FYD Homes Logo"
                width={220}
                height={75}
                className="h-10 sm:h-12 w-auto object-contain brightness-105"
                unoptimized={true}
                priority
              />
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#E3572D]/20 text-[#E3572D] border border-[#E3572D]/30 rounded">
                Admin
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? "bg-[#E3572D] text-white shadow-sm"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={14} className={active ? "text-white" : "text-gray-400"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/10"
              title="Open public website in new tab"
            >
              <ExternalLink size={14} />
              <span>View Site</span>
            </Link>

            <Link href="/admin/properties/new">
              <Button className="bg-[#E3572D] hover:bg-[#cf4b22] text-white font-bold text-xs px-3.5 py-2 h-auto rounded-lg shadow transition-all duration-200">
                <Plus size={14} className="mr-1.5" />
                Add Property
              </Button>
            </Link>

            {session?.user && (
              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <div className="text-right hidden lg:block">
                  <div className="text-xs font-semibold text-white leading-tight">
                    {session.user.name || "Administrator"}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate max-w-[120px]">
                    {session.user.email}
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                  title="Logout"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link href="/admin/properties/new" className="md:hidden">
              <Button size="sm" className="bg-[#E3572D] hover:bg-[#cf4b22] text-white font-bold text-xs h-8 px-2.5">
                <Plus size={13} className="mr-1" />
                Add
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071324] border-t border-white/10 px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => {
            const active = isLinkActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#E3572D] text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={16} className={active ? "text-white" : "text-gray-400"} />
                {item.label}
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
            >
              <ExternalLink size={16} />
              <span>View Public Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-left"
            >
              <LogOut size={16} />
              <span>Sign Out ({session?.user?.email || "Admin"})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
