import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Avatar, AvatarFallback } from '../../../ui/avatar';
import {
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  Calendar,
  TrendingUp,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { Link } from 'react-router-dom';

const mockWeeklyReports = [
  {
    id: 'RPT001',
    title: 'Laporan Mingguan - Progress Investigasi Minggu 40/2024',
    reportType: 'Mingguan',
    investigator: 'Ahmad Wijaya',
    investigatorRole: 'Senior Investigator',
    dateCreated: '2024-10-06',
    reportDate: '2024-10-06',
    periodStart: '2024-09-30',
    periodEnd: '2024-10-06',
    lastModified: '2024-10-07',
    status: 'Selesai',
    caseReference: 'KASUS-2024-001',
    entities: 12,
    relationships: 8,
    pages: 25,
    confidentiality: 'Rahasia',
    summary:
      'Minggu ini berhasil mengidentifikasi 5 transaksi mencurigakan senilai total Rp 12 M, melakukan wawancara dengan 3 saksi kunci, dan mendapatkan bukti dokumen penting.',
  },
  {
    id: 'RPT002',
    title: 'Laporan Mingguan - Analisis Fraud Korporat Minggu 39/2024',
    reportType: 'Mingguan',
    investigator: 'Sari Indrawati',
    investigatorRole: 'Analis Keuangan',
    dateCreated: '2024-09-29',
    reportDate: '2024-09-29',
    periodStart: '2024-09-23',
    periodEnd: '2024-09-29',
    lastModified: '2024-09-30',
    status: 'Dalam Review',
    caseReference: 'KASUS-2024-002',
    entities: 8,
    relationships: 5,
    pages: 18,
    confidentiality: 'Terbatas',
    summary:
      'Analisis forensik keuangan mengungkap skema penggelapan dana melalui invoice fiktif. Total kerugian diperkirakan Rp 8,5 M selama 6 bulan terakhir.',
  },
  {
    id: 'RPT003',
    title: 'Laporan Mingguan - Tracking Aset Minggu 38/2024',
    reportType: 'Mingguan',
    investigator: 'Diana Kusuma',
    investigatorRole: 'Analis Intelijen',
    dateCreated: '2024-09-22',
    reportDate: '2024-09-22',
    periodStart: '2024-09-16',
    periodEnd: '2024-09-22',
    lastModified: '2024-09-23',
    status: 'Selesai',
    caseReference: 'KASUS-2024-004',
    entities: 15,
    relationships: 10,
    pages: 22,
    confidentiality: 'Rahasia',
    summary:
      'Berhasil melacak 8 properti tersembunyi senilai Rp 45 M yang diduga hasil tindak pidana. Koordinasi dengan BPN untuk verifikasi kepemilikan.',
  },
  {
    id: 'RPT004',
    title: 'Laporan Mingguan - Investigasi Pencucian Uang Minggu 37/2024',
    reportType: 'Mingguan',
    investigator: 'Budi Hartono',
    investigatorRole: 'Akuntan Forensik',
    dateCreated: '2024-09-15',
    reportDate: '2024-09-15',
    periodStart: '2024-09-09',
    periodEnd: '2024-09-15',
    lastModified: '2024-09-16',
    status: 'Selesai',
    caseReference: 'KASUS-2024-005',
    entities: 10,
    relationships: 7,
    pages: 20,
    confidentiality: 'Sangat Rahasia',
    summary:
      'Pola layering melalui 12 rekening perusahaan cangkang teridentifikasi. Total dana yang dicuci diperkirakan USD 2,3 juta.',
  },
  {
    id: 'RPT005',
    title: 'Laporan Mingguan - Koordinasi Multi-Lembaga Minggu 36/2024',
    reportType: 'Mingguan',
    investigator: 'Eko Prasetyo',
    investigatorRole: 'Spesialis Forensik Digital',
    dateCreated: '2024-09-08',
    reportDate: '2024-09-08',
    periodStart: '2024-09-02',
    periodEnd: '2024-09-08',
    lastModified: '2024-09-09',
    status: 'Dalam Proses',
    caseReference: 'KASUS-2024-006',
    entities: 14,
    relationships: 9,
    pages: 24,
    confidentiality: 'Rahasia',
    summary:
      'Pertemuan koordinasi dengan KPK, Polri, dan PPATK menghasilkan kesepakatan penanganan bersama untuk 3 kasus besar.',
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

export function WeeklyReports() {
  const [reports, setReports] = useState(mockWeeklyReports);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-white">Laporan Mingguan</h1>
              <p className="text-slate-400 mt-1">Ringkasan progress investigasi per minggu</p>
            </div>
          </div>
        </div>

        <Link to="/reports/create">
          <Button className="bg-green-600 hover:bg-green-500">
            <Plus className="w-4 h-4 mr-2" />
            Buat Laporan Mingguan
          </Button>
        </Link>
      </div>

      {/* Info Card */}
      <Card className="bg-green-600/10 border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-green-300 text-sm">
                <span className="font-medium">Laporan Mingguan</span> merangkum semua aktivitas
                investigasi, temuan penting, progress kasus, dan koordinasi yang dilakukan selama
                satu minggu untuk evaluasi dan perencanaan tindak lanjut.
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
                placeholder="Cari laporan mingguan..."
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

      {/* Reports Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Laporan Mingguan ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Laporan</TableHead>
                <TableHead className="text-slate-300">Investigator</TableHead>
                <TableHead className="text-slate-300">Periode</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Ringkasan</TableHead>
                <TableHead className="text-slate-300">Klasifikasi</TableHead>
                <TableHead className="text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map(report => (
                <TableRow key={report.id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{report.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-slate-400">{report.caseReference}</p>
                          <span className="text-slate-500">•</span>
                          <p className="text-xs text-slate-400">{report.pages} halaman</p>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                          {report.investigator
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white text-sm">{report.investigator}</p>
                        <p className="text-xs text-slate-400">{report.investigatorRole}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-slate-300">
                      <p className="text-sm">
                        {new Date(report.periodStart).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}{' '}
                        -{' '}
                        {new Date(report.periodEnd).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-slate-500">7 hari periode</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[report.status]}>{report.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-sm">
                      <p className="text-xs text-slate-300 line-clamp-2">{report.summary}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={confidentialityColors[report.confidentiality]}>
                      {report.confidentiality}
                    </Badge>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{reports.length}</p>
            <p className="text-sm text-slate-400">Total Laporan</p>
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
              <BarChart3 className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {reports.reduce((sum, r) => sum + r.relationships, 0)}
            </p>
            <p className="text-sm text-slate-400">Total Hubungan</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-yellow-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {reports.filter(r => r.status === 'Dalam Review').length}
            </p>
            <p className="text-sm text-slate-400">Perlu Review</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
