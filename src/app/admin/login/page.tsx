"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Logged in successfully");
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f8fb] px-4 sm:px-5 py-10">
      <Card className="w-full max-w-[380px] sm:max-w-md shadow-lg border-[#eeeeee]">
        <CardHeader className="text-center px-4 sm:px-6 pt-6 sm:pt-8">
          <CardTitle className="text-xl sm:text-2xl font-bold font-serif text-black">Admin Login</CardTitle>
          <p className="text-xs sm:text-sm text-[#5c5c5c] mt-1">Access the FYD Homes management portal</p>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Email</label>
              <Input
                type="email"
                placeholder="admin@fydhomes.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 sm:h-12 border-[#eeeeee] text-sm sm:text-base"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10 sm:h-12 border-[#eeeeee] text-sm sm:text-base"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-10 sm:h-12 bg-[#2d7a8c] hover:bg-[#256a7a] text-white font-bold uppercase tracking-widest mt-3 sm:mt-4 text-xs sm:text-sm"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-[10px] sm:text-xs text-[#5c5c5c] pb-6 sm:pb-8">
          Authorized Personnel Only
        </CardFooter>
      </Card>
    </div>
  );
}
