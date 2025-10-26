import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import {
  Search,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  Calendar,
  User,
  Filter,
  Clock,
  TrendingUp,
  BarChart3,
  Shield,
  Briefcase,
  Network,
  FileCheck,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const mockReports = [
  // LAPORAN HARIAN
  {
    id: 'RPT001',
    title: 'Laporan Harian Investigasi - Aktivitas Mencurigakan Rekening PT Mega',
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
  },
  {
    id: 'RPT002',
    title: 'Laporan Harian - Update Profiling Tersangka',
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
  },
  {
    id: 'RPT003',
    title: 'Laporan Harian - Verifikasi Dokumen Properti',
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
  },

  // LAPORAN MINGGUAN
  {
    id: 'RPT004',
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
  },
  {
    id: 'RPT005',
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
  },
  {
    id: 'RPT006',
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
  },

  // LAPORAN BULANAN
  {
    id: 'RPT007',
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
  },
  {
    id: 'RPT008',
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
  },
  {
    id: 'RPT009',
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
  },

  // LAPORAN TAHUNAN
  {
    id: 'RPT010',
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
  },
  {
    id: 'RPT011',
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
  },
  {
    id: 'RPT012',
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
  },
];

const reportTypeColors = {
  Harian: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  Mingguan: 'bg-green-600/20 text-green-400 border-green-500/50',
  Bulanan: 'bg-purple-600/20 text-purple-400 border-purple-500/50',
  Tahunan: 'bg-orange-600/20 text-orange-400 border-orange-500/50',
};

const reportTypeIcons = {
  Harian: Clock,
  Mingguan: Calendar,
  Bulanan: TrendingUp,
  Tahunan: BarChart3,
};

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

export function ReportsList() {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [investigatorFilter, setInvestigatorFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.caseReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.investigator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReportType = reportTypeFilter === 'all' || report.reportType === reportTypeFilter;
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

    return (
      matchesSearch && matchesReportType && matchesStatus && matchesInvestigator && matchesDate
    );
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

  const handleViewReport = report => {
    setSelectedReport(report);
    setShowDetailDialog(true);
  };

  const handleEditReport = report => {
    toast.info(`Mengedit laporan: ${report.title}`);
    // Implement edit report logic here
  };

  const handleDownloadReport = report => {
    toast.success(`Mengunduh laporan: ${report.title}`);
    // Implement download report logic here
  };

  const handleDeleteReport = reportId => {
    if (window.confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      setReports(prev => prev.filter(report => report.id !== reportId));
      toast.success('Laporan berhasil dihapus!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Laporan Investigasi</h1>
          <p className="text-slate-400 mt-1">Lihat dan kelola semua laporan investigasi</p>
        </div>

        <Link to="/reports/create">
          <Button className="bg-blue-600 hover:bg-blue-500">
            <Plus className="w-4 h-4 mr-2" />
            Buat Laporan
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Cari laporan..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <Select value={reportTypeFilter} onValueChange={setReportTypeFilter}>
                <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tipe Laporan" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="Harian">Laporan Harian</SelectItem>
                  <SelectItem value="Mingguan">Laporan Mingguan</SelectItem>
                  <SelectItem value="Bulanan">Laporan Bulanan</SelectItem>
                  <SelectItem value="Tahunan">Laporan Tahunan</SelectItem>
                </SelectContent>
              </Select>

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
          <CardTitle className="text-white">Laporan ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Laporan</TableHead>
                <TableHead className="text-slate-300">Tipe</TableHead>
                <TableHead className="text-slate-300">Investigator</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Tanggal</TableHead>
                <TableHead className="text-slate-300">Entitas</TableHead>
                <TableHead className="text-slate-300">Klasifikasi</TableHead>
                <TableHead className="text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map(report => {
                const TypeIcon = reportTypeIcons[report.reportType] || FileText;
                return (
                  <TableRow key={report.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${reportTypeColors[report.reportType] || 'bg-blue-600/20'} rounded-lg flex items-center justify-center`}
                        >
                          <TypeIcon
                            className={`w-5 h-5 ${report.reportType === 'Harian' ? 'text-blue-400' : report.reportType === 'Mingguan' ? 'text-green-400' : report.reportType === 'Bulanan' ? 'text-purple-400' : 'text-orange-400'}`}
                          />
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
                      <Badge className={reportTypeColors[report.reportType]}>
                        {report.reportType}
                      </Badge>
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
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                        {report.periodStart && report.periodEnd && (
                          <p className="text-xs text-slate-400">
                            Periode:{' '}
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
                        )}
                        <p className="text-xs text-slate-500">
                          Diubah {new Date(report.lastModified).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-white font-medium">{report.entities}</p>
                          <p className="text-xs text-slate-400">Entitas</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-medium">{report.relationships}</p>
                          <p className="text-xs text-slate-400">Hubungan</p>
                        </div>
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
                          <DropdownMenuItem
                            className="text-slate-300 focus:bg-slate-700"
                            onClick={() => handleViewReport(report)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat Laporan
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-slate-300 focus:bg-slate-700"
                            onClick={() => handleEditReport(report)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Laporan
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-slate-300 focus:bg-slate-700"
                            onClick={() => handleDownloadReport(report)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Unduh PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-400 focus:bg-red-600/20"
                            onClick={() => handleDeleteReport(report.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus Laporan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      {selectedReport && (
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5 text-blue-400" />
                Detail Laporan Investigasi
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Informasi lengkap tentang laporan yang dipilih
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 ${reportTypeColors[selectedReport.reportType]} rounded-lg flex items-center justify-center`}
                    >
                      {React.createElement(reportTypeIcons[selectedReport.reportType], {
                        className: `w-6 h-6 ${selectedReport.reportType === 'Harian' ? 'text-blue-400' : selectedReport.reportType === 'Mingguan' ? 'text-green-400' : selectedReport.reportType === 'Bulanan' ? 'text-purple-400' : 'text-orange-400'}`,
                      })}
                    </div>
                    <div>
                      <Badge className={reportTypeColors[selectedReport.reportType]}>
                        Laporan {selectedReport.reportType}
                      </Badge>
                      <p className="text-white font-mono text-sm mt-1">{selectedReport.id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={statusColors[selectedReport.status]}>
                      {selectedReport.status}
                    </Badge>
                    <Badge className={confidentialityColors[selectedReport.confidentiality]}>
                      <Shield className="w-3 h-3 mr-1" />
                      {selectedReport.confidentiality}
                    </Badge>
                  </div>
                </div>
                <h3 className="text-white font-medium text-lg">{selectedReport.title}</h3>
                <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <FileCheck className="w-4 h-4" />
                    <span>{selectedReport.pages} halaman</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Network className="w-4 h-4" />
                    <span>{selectedReport.entities} entitas</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Network className="w-4 h-4" />
                    <span>{selectedReport.relationships} hubungan</span>
                  </div>
                </div>
              </div>

              {/* Informasi Laporan */}
              <div className="space-y-4">
                <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                  Informasi Laporan
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Referensi Kasus</Label>
                    <p className="text-white font-mono">{selectedReport.caseReference}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Tipe Laporan</Label>
                    <Badge className={reportTypeColors[selectedReport.reportType]}>
                      Laporan {selectedReport.reportType}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Tanggal Laporan</Label>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">
                        {new Date(selectedReport.reportDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  {selectedReport.periodStart && selectedReport.periodEnd && (
                    <div className="space-y-2">
                      <Label className="text-slate-400 text-sm">Periode Laporan</Label>
                      <p className="text-slate-300 text-sm">
                        {new Date(selectedReport.periodStart).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        -{' '}
                        {new Date(selectedReport.periodEnd).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Investigator */}
              <div className="space-y-4">
                <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                  Investigator
                </h4>
                <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-600/20 text-blue-400">
                      {selectedReport.investigator
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">{selectedReport.investigator}</p>
                    <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                      <Briefcase className="w-4 h-4" />
                      {selectedReport.investigatorRole}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Informasi Metadata */}
              <div className="space-y-4">
                <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                  Metadata Dokumen
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Tanggal Dibuat</Label>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">
                        {new Date(selectedReport.dateCreated).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Terakhir Diubah</Label>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">
                        {new Date(selectedReport.lastModified).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Status</Label>
                    <Badge className={statusColors[selectedReport.status]}>
                      {selectedReport.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Klasifikasi Keamanan</Label>
                    <Badge className={confidentialityColors[selectedReport.confidentiality]}>
                      <Shield className="w-3 h-3 mr-1" />
                      {selectedReport.confidentiality}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Statistik Konten */}
              <div className="space-y-4">
                <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                  Statistik Konten
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <FileCheck className="w-4 h-4" />
                      <span className="text-sm">Jumlah Halaman</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedReport.pages}</p>
                  </div>
                  <div className="bg-green-600/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Entitas</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedReport.entities}</p>
                  </div>
                  <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-purple-400 mb-2">
                      <Network className="w-4 h-4" />
                      <span className="text-sm">Hubungan</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedReport.relationships}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-700">
              <Button
                variant="outline"
                onClick={() => setShowDetailDialog(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Tutup
              </Button>
              <Button
                onClick={() => {
                  handleEditReport(selectedReport);
                  setShowDetailDialog(false);
                }}
                className="bg-blue-600 hover:bg-blue-500"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Laporan
              </Button>
              <Button
                onClick={() => handleDownloadReport(selectedReport)}
                className="bg-green-600 hover:bg-green-500"
              >
                <Download className="w-4 h-4 mr-2" />
                Unduh PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
