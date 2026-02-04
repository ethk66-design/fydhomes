"use client";

import { useEffect, useState } from "react";
import { getAgentsAction, deleteAgentAction } from "@/app/actions/auth";
import { AgentUser } from "@/lib/types";
import { CreateAgentDialog } from "@/components/admin/CreateAgentDialog";
import { Button } from "@/components/ui/button";
import { Trash2, User, Loader2, Calendar, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";

export default function AdminUsersPage() {
    const [agents, setAgents] = useState<AgentUser[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAgents = async () => {
        setLoading(true);
        const result = await getAgentsAction();
        if (result.users) {
            setAgents(result.users as unknown as AgentUser[]);
        } else {
            toast.error(result.error || "Failed to fetch agents");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    const handleDelete = async (id: string, email: string) => {
        if (!confirm(`Are you sure you want to delete ${email}?`)) return;

        const result = await deleteAgentAction(id);
        if (result.success) {
            toast.success("Agent deleted successfully");
            setAgents(agents.filter(a => a.id !== id));
        } else {
            toast.error(result.error || "Failed to delete agent");
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12 sm:pb-20">
            <div className="h-[60px] sm:h-[80px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-10 max-w-5xl">
                <Link href="/admin" className="flex items-center gap-2 text-sm text-[#5c5c5c] hover:text-[#2d7a8c] mb-6">
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">Manage Agents</h1>
                        <p className="text-[#5c5c5c] text-sm">Create and manage agent accounts</p>
                    </div>
                    <CreateAgentDialog onSuccess={fetchAgents} />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center p-20">
                            <Loader2 className="w-8 h-8 animate-spin text-[#2d7a8c]" />
                        </div>
                    ) : agents.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">No agents found</h3>
                            <p className="text-gray-500 mb-6">Get started by creating a new agent account.</p>
                            <CreateAgentDialog onSuccess={fetchAgents} />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#f4f8fb] border-b border-[#eeeeee]">
                                        <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Agent Name</th>
                                        <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Joined Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Last Login</th>
                                        <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#eeeeee]">
                                    {agents.map((agent) => (
                                        <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#2d7a8c]/10 flex items-center justify-center text-[#2d7a8c] font-bold text-xs">
                                                        {agent.user_metadata?.full_name?.charAt(0).toUpperCase() || "A"}
                                                    </div>
                                                    <span className="font-medium text-black text-sm">{agent.user_metadata?.full_name || "Unknown"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#5c5c5c]">
                                                {agent.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#5c5c5c]">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    {format(new Date(agent.created_at), "MMM d, yyyy")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#5c5c5c]">
                                                {agent.last_sign_in_at ? (
                                                    format(new Date(agent.last_sign_in_at), "MMM d, HH:mm")
                                                ) : (
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Never</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(agent.id, agent.email || "")}
                                                    className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                                    title="Delete Agent"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
