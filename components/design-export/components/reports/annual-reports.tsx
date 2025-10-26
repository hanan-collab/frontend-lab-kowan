import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  AlertCircle,
  BarChart3,
  Award,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Link } from 'react-router-dom';

const mockAnnualReports = [
  {
    id: 'RPT001',
    title: 'Laporan Tahunan - Evaluasi Kinerja BPA 2023',
    reportType: 'Tahunan',
    investigator: 'Ahmad Wijaya',
    investigatorRole: 'Senior Investigator',
    dateCreated: '2024-01-15',
    reportDate: '2024-01-15',
    periodStart: '2023-01-01',
    periodEnd: '2023-12-31',
    lastModified: '2024-01-30',
    status: 'Selesai',
    caseReference: 'ANNUAL-2023',
    entities: 156,
    relationships: 124,
    pages: 245,
    confidentiality: 'Sangat Rahasia',
    executiveSummary:
      'Tahun 2023 menunjukkan peningkatan signifikan dalam efektivitas pemulihan aset dengan total Rp 1,8 Triliun aset berhasil dilacak dan diamankan. Implementasi teknologi AI dan big data analytics meningkatkan akurasi investigasi sebesar 45%.',
    keyMetrics: {
      casesHandled: 148,
      casesCompleted: 126,
      assetsRecovered: '1.8 T',
      convictionRate: '87%',
      investigationHours: 12450,
      internationalCooperation: 28,
    },
    highlights: [
      'Kasus korupsi mega proyek senilai Rp 500 M berhasil diungkap',
      'Kerja sama internasional dengan 8 negara',
      'Implementasi sistem OSINT tingkat lanjut',
      'Pelatihan 45 investigator baru',
      '15 penghargaan dari lembaga nasional dan internasional',
    ],
  },
  {
    id: 'RPT002',
    title: 'Laporan Tahunan - Tren Kejahatan Keuangan 2022',
    reportType: 'Tahunan',
    investigator: 'Eko Prasetyo',
    investigatorRole: 'Spesialis Forensik Digital',
    dateCreated: '2023-02-01',
    reportDate: '2023-02-01',
    periodStart: '2022-01-01',
    periodEnd: '2022-12-31',
    lastModified: '2023-02-28',
    status: 'Selesai',
    caseReference: 'ANNUAL-2022',
    entities: 142,
    relationships: 98,
    pages: 198,
    confidentiality: 'Rahasia',
    executiveSummary:
      'Analisis komprehensif terhadap tren kejahatan keuangan di Indonesia tahun 2022 menunjukkan peningkatan kasus cryptocurrency fraud sebesar 65% dan pencucian uang melalui platform digital naik 42%. Diperlukan penguatan regulasi dan capacity building.',
    keyMetrics: {
      casesHandled: 132,
      casesCompleted: 108,
      assetsRecovered: '1.2 T',
      convictionRate: '82%',
      investigationHours: 10890,
      internationalCooperation: 22,
    },
    highlights: [
      'Identifikasi 12 modus operandi kejahatan keuangan baru',
      'Database 2,500+ entitas kriminal diperbarui',
      'Publikasi 8 research paper di jurnal internasional',
      'Workshop capacity building untuk 120+ penyidik',
      'Pengembangan 3 modul pelatihan baru',
    ],
  },
  {
    id: 'RPT003',
    title: 'Laporan Tahunan - Pemulihan Aset 2021',
    reportType: 'Tahunan',
    investigator: 'Budi Hartono',
    investigatorRole: 'Akuntan Forensik',
    dateCreated: '2022-01-20',
    reportDate: '2022-01-20',
    periodStart: '2021-01-01',
    periodEnd: '2021-12-31',
    lastModified: '2022-02-15',
    status: 'Selesai',
    caseReference: 'ANNUAL-2021',
    entities: 128,
    relationships: 89,
    pages: 215,
    confidentiality: 'Sangat Rahasia',
    executiveSummary:
      'Meskipun tantangan pandemi COVID-19, BPA berhasil memulihkan aset senilai Rp 956 Miliar dengan tingkat keberhasilan 79%. Adaptasi metode investigasi digital memungkinkan kontinuitas operasional di masa PPKM.',
    keyMetrics: {
      casesHandled: 118,
      casesCompleted: 94,
      assetsRecovered: '956 M',
      convictionRate: '79%',
      investigationHours: 9240,
      internationalCooperation: 18,
    },
    highlights: [
      'Transisi sukses ke digital investigation platform',
      'Pemulihan aset terbesar: Rp 245 M dari satu kasus',
      'Zero data breach sepanjang tahun',
      'Implementasi cloud-based case management',
      'Penghematan biaya operasional 23%',
    ],
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

export function AnnualReports() {
  const [reports, setReports] = useState(mockAnnualReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.caseReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.investigator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-white">Laporan Tahunan</h1>
              <p className="text-slate-400 mt-1">
                Evaluasi strategis dan analisis kinerja tahunan BPA
              </p>
            </div>
          </div>
        </div>

        <Link to="/reports/create">
          <Button className="bg-orange-600 hover:bg-orange-500">
            <Plus className="w-4 h-4 mr-2" />
            Buat Laporan Tahunan
          </Button>
        </Link>
      </div>

      {/* Info Card */}
      <Card className="bg-orange-600/10 border-orange-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-orange-300 text-sm">
                <span className="font-medium">Laporan Tahunan</span> merupakan dokumen strategis
                yang menyajikan evaluasi komprehensif kinerja BPA, analisis tren kejahatan keuangan,
                pencapaian target, dan rekomendasi kebijakan untuk tahun mendatang.
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
                placeholder="Cari laporan tahunan..."
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
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid gap-6">
        {filteredReports.map(report => (
          <Card
            key={report.id}
            className="bg-slate-800 border-slate-700 hover:border-orange-500/50 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-orange-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-white font-medium mb-2">{report.title}</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className={statusColors[report.status]}>{report.status}</Badge>
                      <Badge className={confidentialityColors[report.confidentiality]}>
                        {report.confidentiality}
                      </Badge>
                      <span className="text-sm text-slate-400">
                        Tahun {new Date(report.periodStart).getFullYear()}
                      </span>
                      <span className="text-sm text-slate-400">•</span>
                      <span className="text-sm text-slate-400">{report.pages} halaman</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                          {report.investigator
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{report.investigator}</span>
                      <span>���</span>
                      <span>{report.investigatorRole}</span>
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

              {/* Executive Summary */}
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm text-slate-300 font-medium mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400" />
                  Ringkasan Eksekutif
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">{report.executiveSummary}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <p className="text-xs text-slate-400">Kasus Ditangani</p>
                  </div>
                  <p className="text-2xl text-white font-medium">
                    {report.keyMetrics.casesHandled}
                  </p>
                  <p className="text-xs text-green-400 mt-1">
                    {report.keyMetrics.casesCompleted} selesai ({report.keyMetrics.convictionRate}{' '}
                    conviction rate)
                  </p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-slate-400">Aset Dipulihkan</p>
                  </div>
                  <p className="text-2xl text-white font-medium">
                    Rp {report.keyMetrics.assetsRecovered}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{report.entities} entitas terlibat</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <p className="text-xs text-slate-400">Kerja Sama</p>
                  </div>
                  <p className="text-2xl text-white font-medium">
                    {report.keyMetrics.internationalCooperation}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Institusi internasional</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-gradient-to-r from-orange-600/10 to-purple-600/10 rounded-lg p-4 border border-orange-500/20">
                <h4 className="text-sm text-slate-300 font-medium mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-400" />
                  Pencapaian Utama Tahun Ini
                </h4>
                <ul className="space-y-2">
                  {report.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <TrendingUp className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-orange-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-white">{reports.length}</p>
            <p className="text-sm text-slate-400">Laporan Tahunan</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <FileText className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {reports.reduce((sum, r) => sum + r.keyMetrics.casesCompleted, 0)}
            </p>
            <p className="text-sm text-slate-400">Total Kasus Selesai</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {reports.reduce((sum, r) => sum + r.entities, 0)}
            </p>
            <p className="text-sm text-slate-400">Total Entitas</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {reports
                .reduce((sum, r) => sum + r.keyMetrics.investigationHours, 0)
                .toLocaleString()}
            </p>
            <p className="text-sm text-slate-400">Jam Investigasi</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
