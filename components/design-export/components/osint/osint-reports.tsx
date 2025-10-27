import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Textarea } from '../../../ui/textarea';
import {
  FileText,
  Download,
  Trash2,
  Plus,
  Search,
  Calendar,
  Filter,
  Eye,
  Share2,
  Clock,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  FileImage,
  Archive,
} from 'lucide-react';
import { toast } from 'sonner';

const mockReports = [
  {
    id: '1',
    name: 'Social Media Intelligence Report - February 2024',
    description: 'Comprehensive analysis of social media mentions related to financial crimes',
    period: '2024-02-01 to 2024-02-18',
    sources: ['Twitter/X', 'Facebook', 'LinkedIn'],
    format: 'PDF',
    size: '2.4 MB',
    createdDate: '2024-02-18 15:30',
    status: 'Ready',
    downloadCount: 8,
    keywords: ['pencucian uang', 'korupsi', 'aset tersembunyi'],
  },
  {
    id: '2',
    name: 'Entity Network Analysis Q1 2024',
    description: 'Network visualization and analysis of connected entities from OSINT data',
    period: '2024-01-01 to 2024-02-18',
    sources: ['Multiple OSINT Sources'],
    format: 'Excel',
    size: '5.7 MB',
    createdDate: '2024-02-18 14:15',
    status: 'Ready',
    downloadCount: 3,
    keywords: ['network analysis', 'entity mapping', 'connections'],
  },
  {
    id: '3',
    name: 'Keyword Pattern Analysis - Weekly Report',
    description: 'Weekly trending patterns in financial crime-related keywords',
    period: '2024-02-12 to 2024-02-18',
    sources: ['News Portals', 'Social Media'],
    format: 'PDF',
    size: '1.8 MB',
    createdDate: '2024-02-18 13:00',
    status: 'Processing',
    downloadCount: 0,
    keywords: ['trend analysis', 'keywords', 'patterns'],
  },
  {
    id: '4',
    name: 'Cross-Platform Data Correlation Report',
    description: 'Correlation analysis across multiple data sources and platforms',
    period: '2024-02-01 to 2024-02-15',
    sources: ['Twitter/X', 'News Sites', 'Financial Records'],
    format: 'JSON',
    size: '12.3 MB',
    createdDate: '2024-02-17 16:45',
    status: 'Ready',
    downloadCount: 15,
    keywords: ['correlation', 'cross-platform', 'data fusion'],
  },
  {
    id: '5',
    name: 'OSINT Data Quality Assessment',
    description: 'Quality metrics and reliability assessment of collected OSINT data',
    period: '2024-02-01 to 2024-02-18',
    sources: ['All Active Sources'],
    format: 'PDF',
    size: '3.1 MB',
    createdDate: '2024-02-17 11:20',
    status: 'Ready',
    downloadCount: 5,
    keywords: ['data quality', 'assessment', 'reliability'],
  },
];

const statusColors = {
  Ready: 'bg-green-600/20 text-green-400 border-green-500/50',
  Processing: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  Failed: 'bg-red-600/20 text-red-400 border-red-500/50',
};

const formatIcons = {
  PDF: FileText,
  Excel: FileSpreadsheet,
  JSON: FileText,
  CSV: FileSpreadsheet,
  PNG: FileImage,
  ZIP: Archive,
};

export function OSINTReports() {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    description: '',
    period: 'last_7_days',
    sources: [],
    format: 'PDF',
    includeGraphs: true,
    includeRawData: false,
  });

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesFormat = formatFilter === 'all' || report.format === formatFilter;
    return matchesSearch && matchesStatus && matchesFormat;
  });

  const handleGenerateReport = () => {
    if (!newReport.name || !newReport.description) {
      toast.error('Harap lengkapi nama dan deskripsi laporan');
      return;
    }

    const report = {
      id: Date.now().toString(),
      ...newReport,
      period: getPeriodText(newReport.period),
      size: '0 MB',
      createdDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Processing',
      downloadCount: 0,
      keywords: [],
    };

    setReports([report, ...reports]);
    setNewReport({
      name: '',
      description: '',
      period: 'last_7_days',
      sources: [],
      format: 'PDF',
      includeGraphs: true,
      includeRawData: false,
    });
    setShowGenerateDialog(false);
    toast.success('Laporan sedang diproses dan akan tersedia dalam beberapa menit');

    // Simulate report generation
    setTimeout(() => {
      setReports(prev =>
        prev.map(r => (r.id === report.id ? { ...r, status: 'Ready', size: '2.1 MB' } : r))
      );
      toast.success(`Laporan "${report.name}" berhasil dibuat dan siap diunduh`);
    }, 5000);
  };

  const getPeriodText = period => {
    const now = new Date();
    const formatDate = date => date.toISOString().split('T')[0];

    switch (period) {
      case 'last_7_days':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return `${formatDate(weekAgo)} to ${formatDate(now)}`;
      case 'last_30_days':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return `${formatDate(monthAgo)} to ${formatDate(now)}`;
      case 'current_month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return `${formatDate(monthStart)} to ${formatDate(now)}`;
      default:
        return period;
    }
  };

  const handleDownload = report => {
    toast.success(`Mengunduh laporan "${report.name}"`);
    setReports(prev =>
      prev.map(r => (r.id === report.id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );
  };

  const handleDelete = reportId => {
    setReports(prev => prev.filter(r => r.id !== reportId));
    toast.success('Laporan berhasil dihapus');
  };

  const totalSize = reports.reduce((sum, report) => {
    const size = parseFloat(report.size.replace(/[^\d.]/g, ''));
    return sum + (isNaN(size) ? 0 : size);
  }, 0);

  const readyReports = reports.filter(r => r.status === 'Ready').length;
  const processingReports = reports.filter(r => r.status === 'Processing').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">OSINT Reports & Export</h1>
          <p className="text-slate-400 mt-1">Kelola dan unduh laporan hasil analisis OSINT</p>
        </div>

        <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Generate New Report
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Buat laporan baru berdasarkan data OSINT yang telah dikumpulkan
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Nama Laporan</Label>
                  <Input
                    value={newReport.name}
                    onChange={e => setNewReport(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Nama laporan yang deskriptif"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Format Output</Label>
                  <Select
                    value={newReport.format}
                    onValueChange={value => setNewReport(prev => ({ ...prev, format: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Pilih format" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="PDF">PDF Document</SelectItem>
                      <SelectItem value="Excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="JSON">JSON Data</SelectItem>
                      <SelectItem value="CSV">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Deskripsi</Label>
                <Textarea
                  value={newReport.description}
                  onChange={e => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-700 border-slate-600"
                  placeholder="Deskripsi konten dan tujuan laporan"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Periode Data</Label>
                <Select
                  value={newReport.period}
                  onValueChange={value => setNewReport(prev => ({ ...prev, period: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Pilih periode" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="last_7_days">7 Hari Terakhir</SelectItem>
                    <SelectItem value="last_30_days">30 Hari Terakhir</SelectItem>
                    <SelectItem value="current_month">Bulan Ini</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Sumber Data</Label>
                <div className="grid grid-cols-2 gap-2 max-h-24 overflow-y-auto">
                  {[
                    'Twitter/X',
                    'Facebook',
                    'LinkedIn',
                    'Instagram',
                    'News Portals',
                    'Financial Records',
                  ].map(source => (
                    <label key={source} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={newReport.sources.includes(source)}
                        onChange={e => {
                          if (e.target.checked) {
                            setNewReport(prev => ({
                              ...prev,
                              sources: [...prev.sources, source],
                            }));
                          } else {
                            setNewReport(prev => ({
                              ...prev,
                              sources: prev.sources.filter(s => s !== source),
                            }));
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-slate-300">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-300">Opsi Tambahan</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newReport.includeGraphs}
                      onChange={e =>
                        setNewReport(prev => ({ ...prev, includeGraphs: e.target.checked }))
                      }
                      className="rounded"
                    />
                    <span className="text-slate-300 text-sm">Sertakan grafik dan visualisasi</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newReport.includeRawData}
                      onChange={e =>
                        setNewReport(prev => ({ ...prev, includeRawData: e.target.checked }))
                      }
                      className="rounded"
                    />
                    <span className="text-slate-300 text-sm">
                      Sertakan raw data sebagai lampiran
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowGenerateDialog(false)}
                className="border-slate-600 text-slate-300"
              >
                Batal
              </Button>
              <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-500">
                Generate Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{reports.length}</p>
            <p className="text-sm text-slate-400">Total Reports</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{readyReports}</p>
            <p className="text-sm text-slate-400">Ready to Download</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-yellow-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">{processingReports}</p>
            <p className="text-sm text-slate-400">Processing</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <HardDrive className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">{totalSize.toFixed(1)} MB</p>
            <p className="text-sm text-slate-400">Total Size</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari laporan..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Ready">Ready</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={formatFilter} onValueChange={setFormatFilter}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Filter Format" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Semua Format</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Excel">Excel</SelectItem>
                <SelectItem value="JSON">JSON</SelectItem>
                <SelectItem value="CSV">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Daftar Laporan ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Nama Laporan</TableHead>
                <TableHead className="text-slate-300">Periode</TableHead>
                <TableHead className="text-slate-300">Sumber</TableHead>
                <TableHead className="text-slate-300">Format</TableHead>
                <TableHead className="text-slate-300">Ukuran</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Dibuat</TableHead>
                <TableHead className="text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map(report => {
                const FormatIcon = formatIcons[report.format] || FileText;

                return (
                  <TableRow key={report.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{report.name}</p>
                        <p className="text-xs text-slate-400 mt-1">{report.description}</p>
                        {report.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {report.keywords.slice(0, 3).map(keyword => (
                              <Badge key={keyword} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm">{report.period}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {Array.isArray(report.sources) ? (
                          report.sources.slice(0, 2).map(source => (
                            <Badge key={source} variant="outline" className="text-xs mr-1">
                              {source}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            {report.sources}
                          </Badge>
                        )}
                        {Array.isArray(report.sources) && report.sources.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{report.sources.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FormatIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-white">{report.format}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{report.size}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[report.status]}>
                        {report.status === 'Ready' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {report.status === 'Processing' && <Clock className="w-3 h-3 mr-1" />}
                        {report.status === 'Failed' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm">{report.createdDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                          disabled={report.status !== 'Ready'}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                          disabled={report.status !== 'Ready'}
                          onClick={() => handleDownload(report)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                          disabled={report.status !== 'Ready'}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDelete(report.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
