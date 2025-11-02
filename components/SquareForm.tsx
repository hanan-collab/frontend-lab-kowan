'use client';
import { useState } from 'react';
import { hitungLuasPersegi } from '@/lib/api';
import { Square } from 'lucide-react';

export default function SquareForm() {
    const [sisi, setSisi] = useState<number>(0);
    const [hasil, setHasil] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await hitungLuasPersegi(sisi);
            console.log(data); // pastikan ada luas_sisi & luas_permukaan
            setHasil(data.luas);
        } catch (err) {
            alert('Gagal menghitung');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 w-80 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 flex flex-col items-center animate-float">
            <Square className="w-12 h-12 text-blue-400 mb-4" />
            <h2 className="text-xl font-bold mb-4 text-white">Hitung Luas Persegi</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                <input
                    type="number"
                    placeholder="Sisi"
                    value={sisi}
                    onChange={(e) => setSisi(Number(e.target.value))}
                    className="p-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="p-2 bg-blue-500/80 text-white rounded-lg hover:bg-blue-500/100 transition disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Hitung'}
                </button>
            </form>
            {hasil !== null && <p className="mt-4 text-white font-semibold">Luas: {hasil}</p>}
        </div>
    );
}
