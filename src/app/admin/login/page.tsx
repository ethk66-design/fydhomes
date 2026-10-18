"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Welcome back! Logged in successfully.");
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A192F] px-4 py-12 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#E3572D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10">
        {/* Back to Public Site */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Public Website
          </Link>
        </div>

        <Card className="shadow-2xl border border-white/10 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardHeader className="text-center px-6 pt-8 pb-4">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0A192F] p-2 flex items-center justify-center border border-gray-100 shadow-md mb-4">
              <Image
                src="/fyd-logo.png"
                alt="FYD Homes Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 tracking-tight">Admin Portal</CardTitle>
            <p className="text-xs text-gray-500 mt-1">Sign in with authorized FYD Homes credentials</p>
          </CardHeader>

          <CardContent className="px-6 py-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="email"
                    placeholder="admin@fydhomes.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9 h-11 border-gray-200 text-sm rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-9 h-11 border-gray-200 text-sm rounded-lg"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#E3572D] hover:bg-[#cf4b22] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all duration-200 mt-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In to Control Center"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center text-[11px] text-gray-400 pb-6 pt-2 justify-center border-t border-gray-100/80">
            Secure Administrator & Agent Access Only
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
