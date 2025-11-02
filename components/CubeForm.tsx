'use client';
import { useState } from 'react';
import { hitungLuasKubus } from '@/lib/api';
import { Box } from 'lucide-react';

export default function CubeForm() {
    const [sisi, setSisi] = useState<number>(0);
    const [hasil, setHasil] = useState<{ luas_sisi: number; luas_permukaan: number } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await hitungLuasKubus(sisi);
            console.log(data); // pastikan ada luas_sisi & luas_permukaan
            setHasil({ luas_sisi: data.luas_sisi, luas_permukaan: data.luas_permukaan });
        } catch (err: any) {
            console.error(err);
            alert('Gagal menghitung');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 w-80 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 flex flex-col items-center animate-float">
            <Box className="w-12 h-12 text-green-400 mb-4" />
            <h2 className="text-xl font-bold mb-4 text-white">Hitung Luas Kubus</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                <input
                    type="number"
                    placeholder="Sisi"
                    value={sisi}
                    onChange={(e) => setSisi(Number(e.target.value))}
                    className="p-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="p-2 bg-green-500/80 text-white rounded-lg hover:bg-green-500/100 transition disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Hitung'}
                </button>
            </form>
            {hasil && (
                <div className="mt-4 text-white font-semibold">
                    <p>Luas Sisi: {hasil.luas_sisi}</p>
                    <p>Luas Permukaan: {hasil.luas_permukaan}</p>
                </div>
            )}

        </div>
    );
}
