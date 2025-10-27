import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  Trash2,
  MoreHorizontal,
  GitCompare,
  Calendar,
  Users,
  AlertCircle,
  Download,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';

interface HistoryItem {
  id: string;
  name: string;
  timestamp: string;
  caseIds: string[];
  caseCount: number;
  commonEntitiesCount: number;
}

export function ComparisonHistory() {
  const navigate = useNavigate();
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Load comparison history from localStorage
    const savedHistory = localStorage.getItem('comparisonHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistoryItems(parsed);
      } catch (error) {
        console.error('Error loading comparison history:', error);
      }
    }
  }, []);

  const handleViewComparison = (item: HistoryItem) => {
    navigate('/case-comparison/result', {
      state: {
        selectedCaseIds: item.caseIds,
        fromHistory: true,
      },
    });
  };

  const handleDeleteComparison = (id: string) => {
    const updatedHistory = historyItems.filter(item => item.id !== id);
    setHistoryItems(updatedHistory);
    localStorage.setItem('comparisonHistory', JSON.stringify(updatedHistory));
  };

  const handleClearAll = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua riwayat komparasi?')) {
      setHistoryItems([]);
      localStorage.removeItem('comparisonHistory');
    }
  };

  const handleExportHistory = () => {
    alert('Export History - akan menghasilkan CSV dengan daftar semua komparasi');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/case-comparison')}
            className="text-slate-400 hover:text-white mb-2 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Kasus
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center">
              <GitCompare className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-white">Riwayat Komparasi</h1>
              <p className="text-slate-400 mt-1">
                Lihat hasil komparasi kasus yang pernah dilakukan
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportHistory}
            className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
          {historyItems.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="bg-red-600/20 border-red-500/50 text-red-400 hover:bg-red-600/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus Semua
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      {historyItems.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Komparasi</p>
                  <p className="text-2xl font-bold text-white mt-1">{historyItems.length}</p>
                </div>
                <div className="w-10 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                  <GitCompare className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Terakhir</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {new Date(historyItems[0].timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Entitas Bersama</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {historyItems.reduce((sum, item) => sum + (item.commonEntitiesCount || 0), 0)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Rata-rata Kasus</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {Math.round(
                      historyItems.reduce((sum, item) => sum + item.caseCount, 0) /
                        historyItems.length
                    )}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {historyItems.length === 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GitCompare className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-white mb-2">Belum Ada Riwayat Komparasi</h3>
            <p className="text-slate-400 mb-6">
              Mulai bandingkan kasus untuk melihat riwayat di sini
            </p>
            <Button
              onClick={() => navigate('/case-comparison')}
              className="bg-cyan-600 hover:bg-cyan-500"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Mulai Komparasi
            </Button>
          </CardContent>
        </Card>
      )}

      {/* History Table */}
      {historyItems.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                Daftar Riwayat Komparasi ({historyItems.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Nama Komparasi</TableHead>
                  <TableHead className="text-slate-300">Tanggal</TableHead>
                  <TableHead className="text-slate-300">Jumlah Kasus</TableHead>
                  <TableHead className="text-slate-300">Kasus yang Dibandingkan</TableHead>
                  <TableHead className="text-slate-300">Entitas Bersama</TableHead>
                  <TableHead className="text-slate-300">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyItems.map(item => (
                  <TableRow key={item.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-xs text-slate-400">ID: {item.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-sm">
                            {new Date(item.timestamp).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(item.timestamp).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GitCompare className="w-4 h-4 text-cyan-400" />
                        <span className="text-white">{item.caseCount} kasus</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.caseIds.slice(0, 3).map((caseId, idx) => (
                          <Badge
                            key={idx}
                            className="bg-blue-600/20 text-blue-400 border-blue-500/50 text-xs"
                          >
                            {caseId}
                          </Badge>
                        ))}
                        {item.caseIds.length > 3 && (
                          <Badge className="bg-slate-700 text-slate-400 border-slate-600 text-xs">
                            +{item.caseIds.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-white">{item.commonEntitiesCount || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem
                            className="text-slate-300 focus:bg-slate-700"
                            onClick={() => handleViewComparison(item)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat Hasil
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-400 focus:bg-red-600/20"
                            onClick={() => handleDeleteComparison(item.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
