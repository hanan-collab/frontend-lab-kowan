import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import {
  Bot,
  Calendar,
  Database,
  Download,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  Settings,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { toast } from 'sonner';

const mockCrawlingData = [
  {
    id: '1',
    date: '2024-02-18 14:30',
    source: 'Twitter/X',
    dataCount: 1254,
    status: 'Selesai',
  },
  {
    id: '2',
    date: '2024-02-18 12:15',
    source: 'Facebook',
    dataCount: 876,
    status: 'Selesai',
  },
  {
    id: '3',
    date: '2024-02-18 10:45',
    source: 'Instagram',
    dataCount: 432,
    status: 'Proses',
  },
  {
    id: '4',
    date: '2024-02-18 09:20',
    source: 'LinkedIn',
    dataCount: 298,
    status: 'Selesai',
  },
  {
    id: '5',
    date: '2024-02-18 08:10',
    source: 'Tokopedia',
    dataCount: 156,
    status: 'Selesai',
  },
];

const statusColors = {
  Selesai: 'bg-green-600/20 text-green-400 border-green-500/50',
  Proses: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  Error: 'bg-red-600/20 text-red-400 border-red-500/50',
};

export function OSINTDashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartCrawling = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Crawling dimulai untuk semua sumber aktif');
    }, 2000);
  };

  const handleScheduleCrawling = () => {
    toast.info('Membuka pengaturan jadwal crawling...');
  };

  const totalDataToday = mockCrawlingData.reduce((sum, item) => sum + item.dataCount, 0);
  const completedCrawls = mockCrawlingData.filter(item => item.status === 'Selesai').length;
  const activeSources = 8;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">OSINT Collector Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Monitoring dan kontrol sistem pengumpulan data OSINT
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleScheduleCrawling}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Settings className="w-4 h-4 mr-2" />
            Schedule Crawling
          </Button>
          <Button
            onClick={handleStartCrawling}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500"
          >
            {isLoading ? (
              <>
                <Activity className="w-4 h-4 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Crawling
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Data Terkumpul Hari Ini</p>
                <p className="text-2xl font-bold text-white">{totalDataToday.toLocaleString()}</p>
                <p className="text-xs text-green-400 mt-1">
                  <TrendingUp className="inline w-3 h-3 mr-1" />
                  +15% dari kemarin
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Sumber Aktif</p>
                <p className="text-2xl font-bold text-white">{activeSources}</p>
                <p className="text-xs text-slate-400 mt-1">dari 12 total sumber</p>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Crawling Selesai</p>
                <p className="text-2xl font-bold text-white">{completedCrawls}</p>
                <p className="text-xs text-slate-400 mt-1">dari {mockCrawlingData.length} proses</p>
              </div>
              <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Rata-rata Waktu</p>
                <p className="text-2xl font-bold text-white">12m</p>
                <p className="text-xs text-slate-400 mt-1">per 1000 data</p>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Source Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-400" />
              Ringkasan Hasil Crawling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Twitter/X</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">1,254</span>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                    Aktif
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Facebook</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">876</span>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                    Aktif
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Instagram</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">432</span>
                  <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/50">
                    Proses
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">LinkedIn</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">298</span>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                    Aktif
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Marketplace</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">156</span>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                    Aktif
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Jadwal Crawling Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Social Media Sweep</p>
                  <p className="text-sm text-slate-400">15:00 - 16:00</p>
                </div>
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">Terjadwal</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">News Portal Scan</p>
                  <p className="text-sm text-slate-400">18:00 - 19:00</p>
                </div>
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">Terjadwal</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Marketplace Check</p>
                  <p className="text-sm text-slate-400">21:00 - 22:00</p>
                </div>
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">Terjadwal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Aktivitas Crawling Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Tanggal & Waktu</TableHead>
                <TableHead className="text-slate-300">Sumber</TableHead>
                <TableHead className="text-slate-300">Jumlah Data</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCrawlingData.map(item => (
                <TableRow key={item.id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell className="text-slate-300">{item.date}</TableCell>
                  <TableCell className="text-white font-medium">{item.source}</TableCell>
                  <TableCell className="text-white">{item.dataCount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[item.status]}>
                      {item.status === 'Selesai' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {item.status === 'Proses' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
