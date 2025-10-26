import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  TrendingUp,
  AlertCircle,
  BarChart3,
  Target,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Link } from 'react-router-dom';

const mockMonthlyReports = [
  {
    id: 'RPT001',
    title: 'Laporan Bulanan - Ringkasan Investigasi September 2024',
    reportType: 'Bulanan',
    investigator: 'Ahmad Wijaya',
    investigatorRole: 'Senior Investigator',
    dateCreated: '2024-10-01',
    reportDate: '2024-10-01',
    periodStart: '2024-09-01',
    periodEnd: '2024-09-30',
    lastModified: '2024-10-03',
    status: 'Selesai',
    caseReference: 'MULTI-CASE',
    entities: 45,
    relationships: 32,
    pages: 78,
    confidentiality: 'Sangat Rahasia',
    achievements: [
      '12 kasus berhasil diselesaikan',
      'Aset senilai Rp 156 M berhasil dilacak',
      '25 entitas kriminal teridentifikasi',
    ],
    metrics: {
      casesCompleted: 12,
      assetsRecovered: '156 M',
      investigationHours: 856,
    },
  },
  {
    id: 'RPT002',
    title: 'Laporan Bulanan - Analisis Keuangan Agustus 2024',
    reportType: 'Bulanan',
    investigator: 'Budi Hartono',
    investigatorRole: 'Akuntan Forensik',
    dateCreated: '2024-09-01',
    reportDate: '2024-09-01',
    periodStart: '2024-08-01',
    periodEnd: '2024-08-31',
    lastModified: '2024-09-05',
    status: 'Selesai',
    caseReference: 'MULTI-CASE',
    entities: 38,
    relationships: 28,
    pages: 65,
    confidentiality: 'Rahasia',
    achievements: [
      'Audit forensik 8 perusahaan selesai',
      'Ditemukan potensi kerugian Rp 89 M',
      '15 laporan analisis keuangan diterbitkan',
    ],
    metrics: {
      casesCompleted: 8,
      assetsRecovered: '89 M',
      investigationHours: 712,
    },
  },
  {
    id: 'RPT003',
    title: 'Laporan Bulanan - Pemulihan Aset Juli 2024',
    reportType: 'Bulanan',
    investigator: 'Diana Kusuma',
    investigatorRole: 'Analis Intelijen',
    dateCreated: '2024-08-01',
    reportDate: '2024-08-01',
    periodStart: '2024-07-01',
    periodEnd: '2024-07-31',
    lastModified: '2024-08-03',
    status: 'Dalam Proses',
    caseReference: 'MULTI-CASE',
    entities: 42,
    relationships: 35,
    pages: 82,
    confidentiality: 'Sangat Rahasia',
    achievements: [
      '18 properti berhasil diidentifikasi',
      'Koordinasi dengan 6 instansi penegak hukum',
      'Database aset diperluas 35%',
    ],
    metrics: {
      casesCompleted: 10,
      assetsRecovered: '203 M',
      investigationHours: 924,
    },
  },
];

const statusColors = {
  Selesai: 'bg-green-600/20 text-green-400 border-green-500/50',
  Draft: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  'Dalam Review': 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  'Dalam Proses': 'bg-purple-600/20 text-purple-400 border-purple-500/50',
};

const confidentialityColors = {
  'Sangat Rahasia': 'bg-red-600/20 text-red-400 border-red-500/50',
  Rahasia: 'bg-orange-600/20 text-orange-400 border-orange-500/50',
  Terbatas: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
};

export function MonthlyReports() {
  const [reports, setReports] = useState(mockMonthlyReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [investigatorFilter, setInvestigatorFilter] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.caseReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.investigator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesInvestigator =
      investigatorFilter === 'all' || report.investigator === investigatorFilter;

    return matchesSearch && matchesStatus && matchesInvestigator;
  });

  const uniqueInvestigators = [...new Set(reports.map(r => r.investigator))];

  const totalCasesCompleted = reports.reduce((sum, r) => sum + r.metrics.casesCompleted, 0);
  const totalInvestigationHours = reports.reduce((sum, r) => sum + r.metrics.investigationHours, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-white">Laporan Bulanan</h1>
              <p className="text-slate-400 mt-1">
                Evaluasi komprehensif kinerja investigasi per bulan
              </p>
            </div>
          </div>
        </div>

        <Link to="/reports/create">
          <Button className="bg-purple-600 hover:bg-purple-500">
            <Plus className="w-4 h-4 mr-2" />
            Buat Laporan Bulanan
          </Button>
        </Link>
      </div>

      {/* Info Card */}
      <Card className="bg-purple-600/10 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-purple-300 text-sm">
                <span className="font-medium">Laporan Bulanan</span> menyajikan evaluasi menyeluruh
                terhadap seluruh aktivitas investigasi dalam satu bulan, mencakup pencapaian target,
                analisis tren, dan rekomendasi strategis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari laporan bulanan..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Dalam Review">Dalam Review</SelectItem>
                <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
              </SelectContent>
            </Select>

            <Select value={investigatorFilter} onValueChange={setInvestigatorFilter}>
              <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Investigator" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Semua Investigator</SelectItem>
                {uniqueInvestigators.map(investigator => (
                  <SelectItem key={investigator} value={investigator}>
                    {investigator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid gap-6">
        {filteredReports.map(report => (
          <Card
            key={report.id}
            className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{report.title}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={statusColors[report.status]}>{report.status}</Badge>
                      <Badge className={confidentialityColors[report.confidentiality]}>
                        {report.confidentiality}
                      </Badge>
                      <span className="text-xs text-slate-400">{report.pages} halaman</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                            {report.investigator
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{report.investigator}</span>
                      </div>
                      <span>•</span>
                      <span>
                        Periode:{' '}
                        {new Date(report.periodStart).toLocaleDateString('id-ID', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Achievements */}
                    <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm text-slate-300 font-medium mb-2">Pencapaian Utama:</h4>
                      <ul className="space-y-1">
                        {report.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                            <Target className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1">Kasus Selesai</p>
                        <p className="text-xl text-white font-medium">
                          {report.metrics.casesCompleted}
                        </p>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1">Aset Dilacak</p>
                        <p className="text-xl text-white font-medium">
                          Rp {report.metrics.assetsRecovered}
                        </p>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1">Jam Investigasi</p>
                        <p className="text-xl text-white font-medium">
                          {report.metrics.investigationHours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                      <Eye className="w-4 h-4 mr-2" />
                      Lihat Laporan
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Laporan
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                      <Download className="w-4 h-4 mr-2" />
                      Unduh PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 focus:bg-red-600/20">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus Laporan
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">{reports.length}</p>
            <p className="text-sm text-slate-400">Total Laporan</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Target className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{totalCasesCompleted}</p>
            <p className="text-sm text-slate-400">Kasus Selesai</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {reports.reduce((sum, r) => sum + r.entities, 0)}
            </p>
            <p className="text-sm text-slate-400">Total Entitas</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-orange-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {totalInvestigationHours.toLocaleString()}
            </p>
            <p className="text-sm text-slate-400">Jam Investigasi</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
