
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertTriangle, Play, RefreshCw, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ImageMigrationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [stats, setStats] = useState<any>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [migratedCount, setMigratedCount] = useState(0);

    const analyzeImages = async () => {
        try {
            setAnalyzing(true);
            const res = await fetch('/api/admin/migrator', {
                method: 'POST',
                body: JSON.stringify({ action: 'analyze' })
            });
            const data = await res.json();
            setStats(data);
        } catch (error) {
            toast.error("Failed to analyze images");
        } finally {
            setAnalyzing(false);
        }
    };

    const startMigration = async () => {
        if (!confirm("This will download all external images to the server. This may take a while. Continue?")) return;

        try {
            setLoading(true);
            setLogs(['Starting migration...']);

            const res = await fetch('/api/admin/migrator', {
                method: 'POST',
                body: JSON.stringify({ action: 'migrate' })
            });

            const data = await res.json();
            setStats(data);
            setLogs(data.logs || []);
            setMigratedCount(data.migrated);

            if (data.errors > 0) {
                toast.warning(`Migration complete with ${data.errors} errors.`);
            } else {
                toast.success("Migration completed successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Migration failed unexpectedly.");
            setLogs(prev => [...prev, "CRITICAL ERROR: Request failed."]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        analyzeImages();
    }, []);

    return (
        <div className="min-h-screen bg-[#f4f8fb] pb-12">
            <div className="h-[60px] bg-white border-b border-[#eeeeee]"></div>

            <div className="container mx-auto px-4 py-10">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/admin')}
                    className="mb-6 hover:bg-transparent pl-0 text-[#5c5c5c] hover:text-black"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>

                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-[#eeeeee] p-6 mb-6">
                        <h1 className="text-2xl font-bold mb-2">Image Migration Tool</h1>
                        <p className="text-[#5c5c5c] mb-6">
                            Migrate property images from external sources (Supabase, WordPress, etc.) to the local server filesystem.
                            This ensures you own your data and improves loading speed.
                        </p>

                        {analyzing ? (
                            <div className="flex items-center justify-center py-10">
                                <Loader2 className="animate-spin text-[#2d7a8c] h-8 w-8" />
                                <span className="ml-3 text-[#5c5c5c]">Analyzing database...</span>
                            </div>
                        ) : stats ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <div className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Total Properties</div>
                                    <div className="text-2xl font-bold text-blue-900">{stats.totalProperties}</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                    <div className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">Total Images</div>
                                    <div className="text-2xl font-bold text-purple-900">{stats.totalImages}</div>
                                </div>
                                <div className={`p-4 rounded-lg border ${stats.needsMigration > 0 ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100'}`}>
                                    <div className={`${stats.needsMigration > 0 ? 'text-amber-600' : 'text-green-600'} text-xs font-bold uppercase tracking-wider mb-1`}>
                                        Needs Migration
                                    </div>
                                    <div className={`text-2xl font-bold ${stats.needsMigration > 0 ? 'text-amber-900' : 'text-green-900'}`}>
                                        {stats.needsMigration}
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <div className="flex gap-4">
                            <Button onClick={analyzeImages} variant="outline" disabled={loading || analyzing}>
                                <RefreshCw className={`mr-2 h-4 w-4 ${analyzing ? 'animate-spin' : ''}`} />
                                Re-Analyze
                            </Button>

                            <Button
                                onClick={startMigration}
                                disabled={loading || analyzing || !stats || stats.needsMigration === 0}
                                className="bg-[#2d7a8c] hover:bg-[#256a7a] text-white flex-1"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Migrating ({migratedCount}...)
                                    </>
                                ) : (
                                    <>
                                        <Play className="mr-2 h-4 w-4" />
                                        Start Migration
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {logs.length > 0 && (
                        <div className="bg-black text-white p-4 rounded-xl shadow-sm text-xs font-mono h-64 overflow-y-auto">
                            <div className="mb-2 text-gray-400 uppercase font-bold tracking-wider">Migration Logs</div>
                            {logs.map((log, i) => (
                                <div key={i} className={`mb-1 ${log.includes('ERROR') ? 'text-red-400' : 'text-green-400'}`}>
                                    {log}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
