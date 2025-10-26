import React from 'react';
import { Card, CardContent } from '../ui/card';
import { AlertTriangle } from 'lucide-react';

interface SearchHintsProps {
  searchTerm: string;
}

export function SearchHints({ searchTerm }: SearchHintsProps) {
  return (
    <>
      {/* Live validation hint */}
      {searchTerm.length > 0 && searchTerm.length < 3 && (
        <div className="flex items-center gap-2 text-yellow-400 text-xs mt-2">
          <AlertTriangle className="w-3 h-3" />
          <span>
            ⚠️ Masukkan {3 - searchTerm.length} karakter lagi (sistem akan heavy jika terlalu
            pendek)
          </span>
        </div>
      )}

      {/* Search Guidelines */}
      <Card className="bg-yellow-500/10 border-yellow-500/30">
        <CardContent className="pt-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-yellow-400 font-medium mb-1">💡 Panduan Pencarian Efektif:</p>
              <ul className="text-yellow-300 space-y-1 text-xs">
                <li>
                  • Masukkan <strong>minimal 3 karakter</strong> untuk pencarian yang optimal
                </li>
                <li>• Hindari pencarian dengan 1-2 huruf saja (dapat memberatkan server)</li>
                <li>• Contoh: "Budi Santoso" atau "Santoso" lebih baik dari "B" atau "Bu"</li>
                <li>• Gunakan kata kunci yang spesifik untuk hasil yang lebih akurat</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
