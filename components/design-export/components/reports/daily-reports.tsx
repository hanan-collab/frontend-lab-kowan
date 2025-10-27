import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Avatar, AvatarFallback } from '../../../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { Calendar as CalendarComponent } from '../../../ui/calendar';
import {
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { Link } from 'react-router-dom';

const mockDailyReports = [
  {
    id: 'RPT001',
    title: 'Laporan Harian - Aktivitas Mencurigakan Rekening PT Mega',
    reportType: 'Harian',
    investigator: 'Ahmad Wijaya',
    investigatorRole: 'Senior Investigator',
    dateCreated: '2024-10-10',
    reportDate: '2024-10-10',
    lastModified: '2024-10-10',
    status: 'Selesai',
    caseReference: 'KASUS-2024-001',
    entities: 5,
    relationships: 3,
    pages: 8,
    confidentiality: 'Rahasia',
    highlights: [
      'Transaksi mencurigakan senilai Rp 2,5 M terdeteksi',
      'Pola transfer dana ke 3 rekening berbeda',
      'Koordinasi dengan PPATK dilakukan',
    ],
  },
  {
    id: 'RPT002',
    title: 'Laporan Harian - Update Profiling Tersangka Korupsi',
    reportType: 'Harian',
    investigator: 'Sari Indrawati',
    investigatorRole: 'Analis Keuangan',
    dateCreated: '2024-10-09',
    reportDate: '2024-10-09',
    lastModified: '2024-10-09',
    status: 'Selesai',
    caseReference: 'KASUS-2024-002',
    entities: 3,
    relationships: 2,
    pages: 5,
    confidentiality: 'Terbatas',
    highlights: [
      'Data profiling 2 tersangka baru ditambahkan',
      'Ditemukan kepemilikan properti tersembunyi',
      'Update tree keluarga tersangka',
    ],
  },
  {
    id: 'RPT003',
    title: 'Laporan Harian - Verifikasi Dokumen Properti Tersita',
    reportType: 'Harian',
    investigator: 'Budi Hartono',
    investigatorRole: 'Akuntan Forensik',
    dateCreated: '2024-10-08',
    reportDate: '2024-10-08',
    lastModified: '2024-10-08',
    status: 'Selesai',
    caseReference: 'KASUS-2024-003',
    entities: 4,
    relationships: 3,
    pages: 6,
    confidentiality: 'Rahasia',
    highlights: [
      'Verifikasi 5 sertifikat tanah selesai',
      'Ditemukan ketidaksesuaian data di 2 dokumen',
      'Rekomendasi pemeriksaan lanjutan',
    ],
  },
  {
    id: 'RPT004',
    title: 'Laporan Harian - Monitoring Rekening Bank Tersangka',
    reportType: 'Harian',
    investigator: 'Diana Kusuma',
    investigatorRole: 'Analis Intelijen',
    dateCreated: '2024-10-07',
    reportDate: '2024-10-07',
    lastModified: '2024-10-07',
    status: 'Dalam Review',
    caseReference: 'KASUS-2024-004',
    entities: 6,
    relationships: 4,
    pages: 7,
    confidentiality: 'Rahasia',
    highlights: [
      'Aktivitas transaksi meningkat 300%',
      '12 transaksi di atas Rp 500 juta terdeteksi',
      'Pola transfer ke luar negeri teridentifikasi',
    ],
  },
  {
    id: 'RPT005',
    title: 'Laporan Harian - Hasil Wawancara Saksi',
    reportType: 'Harian',
    investigator: 'Eko Prasetyo',
    investigatorRole: 'Investigator',
    dateCreated: '2024-10-06',
    reportDate: '2024-10-06',
    lastModified: '2024-10-06',
    status: 'Selesai',
    caseReference: 'KASUS-2024-005',
    entities: 2,
    relationships: 1,
    pages: 4,
    confidentiality: 'Sangat Rahasia',
    highlights: [
      'Wawancara 3 saksi kunci selesai',
      'Informasi baru tentang alur dana',
      'Lead baru untuk investigasi lanjutan',
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

export function DailyReports() {
  const [reports, setReports] = useState(mockDailyReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [investigatorFilter, setInvestigatorFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.caseReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.investigator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesInvestigator =
      investigatorFilter === 'all' || report.investigator === investigatorFilter;

    // Date filter
    let matchesDate = true;
    if (dateFrom) {
      const reportDate = new Date(report.reportDate);
      matchesDate = matchesDate && reportDate >= dateFrom;
    }
    if (dateTo) {
      const reportDate = new Date(report.reportDate);
      matchesDate = matchesDate && reportDate <= dateTo;
    }

    return matchesSearch && matchesStatus && matchesInvestigator && matchesDate;
  });

  const uniqueInvestigators = [...new Set(reports.map(r => r.investigator))];

  const formatDateRange = (from, to) => {
    if (!from && !to) return 'Pilih Rentang Tanggal';
    if (from && !to) return `Dari ${from.toLocaleDateString('id-ID')}`;
    if (!from && to) return `Sampai ${to.toLocaleDateString('id-ID')}`;
    return `${from.toLocaleDateString('id-ID')} - ${to.toLocaleDateString('id-ID')}`;
  };

  const clearDateFilter = () => {
    setDateFrom(null);
    setDateTo(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-white">Laporan Harian</h1>
              <p className="text-slate-400 mt-1">Laporan aktivitas investigasi harian</p>
            </div>
          </div>
        </div>

        <Link to="/reports/create">
          <Button className="bg-blue-600 hover:bg-blue-500">
            <Plus className="w-4 h-4 mr-2" />
            Buat Laporan Harian
          </Button>
        </Link>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-600/10 border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-blue-300 text-sm">
                <span className="font-medium">Laporan Harian</span> adalah dokumentasi aktivitas
                investigasi yang dibuat setiap hari untuk merekam perkembangan, temuan, dan tindakan
                yang dilakukan dalam penanganan kasus.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Cari laporan harian..."
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

            {/* Date Range Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">Filter Tanggal:</span>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDateRange(dateFrom, dateTo)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-sm text-slate-300 mb-2">Dari Tanggal</p>
                      <CalendarComponent
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        className="bg-slate-800 text-white rounded-md border-slate-700"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300 mb-2">Sampai Tanggal</p>
                      <CalendarComponent
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        className="bg-slate-800 text-white rounded-md border-slate-700"
                        disabled={date => (dateFrom ? date < dateFrom : false)}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {(dateFrom || dateTo) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearDateFilter}
                  className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                >
                  Reset Tanggal
                </Button>
              )}

              {(dateFrom || dateTo) && (
                <div className="text-sm text-slate-400">
                  {filteredReports.length} laporan ditemukan
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Laporan Harian ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Laporan</TableHead>
                <TableHead className="text-slate-300">Investigator</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Tanggal</TableHead>
                <TableHead className="text-slate-300">Highlight</TableHead>
                <TableHead className="text-slate-300">Klasifikasi</TableHead>
                <TableHead className="text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map(report => (
                <TableRow key={report.id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-400" />
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
                    <Badge className={statusColors[report.status]}>{report.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-slate-300">
                      <p className="text-sm">
                        {new Date(report.reportDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-slate-500">
                        Diubah {new Date(report.lastModified).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <ul className="text-xs text-slate-300 space-y-1">
                        {report.highlights.slice(0, 2).map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <TrendingUp className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{highlight}</span>
                          </li>
                        ))}
                      </ul>
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
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{reports.length}</p>
            <p className="text-sm text-slate-400">Total Laporan</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {reports.filter(r => r.status === 'Selesai').length}
            </p>
            <p className="text-sm text-slate-400">Selesai</p>
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
            <p className="text-sm text-slate-400">Dalam Review</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">{uniqueInvestigators.length}</p>
            <p className="text-sm text-slate-400">Investigator Aktif</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
