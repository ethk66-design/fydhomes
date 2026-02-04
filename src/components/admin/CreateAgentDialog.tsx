"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { createAgentAction } from "@/app/actions/auth";
import { Plus, Loader2 } from "lucide-react";

export function CreateAgentDialog({ onSuccess }: { onSuccess: () => void }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await createAgentAction(null, formData);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Agent created successfully!");
            setOpen(false);
            onSuccess();
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#2d7a8c] hover:bg-[#256a7a] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Agent
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Add New Agent</DialogTitle>
                    <DialogDescription>
                        Create a new agent account. They will be able to log in immediately with these credentials.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input name="fullName" placeholder="e.g. John Doe" required className="border-[#eeeeee]" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input name="email" type="email" placeholder="agent@example.com" required className="border-[#eeeeee]" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input name="password" type="password" placeholder="••••••••" required className="border-[#eeeeee]" minLength={6} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="bg-[#2d7a8c] hover:bg-[#256a7a] text-white w-full sm:w-auto">
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Create Agent
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
