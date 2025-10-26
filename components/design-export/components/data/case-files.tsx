import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Calendar,
  User,
  Building2,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  FolderOpen,
  Upload,
  MoreVertical,
  Shield,
  Paperclip,
  MapPin,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { toast } from 'sonner';

// Mock data untuk berkas perkara PDF dari sistem sebelumnya
const mockCaseFiles = [
  {
    id: 'BP-2024-001',
    title: 'Berkas Perkara Korupsi Pengadaan Alat Kesehatan',
    caseNumber: 'REG-001/PID.SUS/2024/PN.JKT.PST',
    defendant: 'Budi Santoso',
    institution: 'Rumah Sakit Umum Pusat',
    fileDate: '2024-01-15',
    fileSize: '45.2 MB',
    pageCount: 287,
    status: 'Lengkap',
    category: 'Korupsi',
    prosecutor: 'Jaksa Agung Muda Tindak Pidana Khusus',
    uploadedBy: 'Siti Rahayu',
    uploadDate: '2024-01-18 14:30',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 45,
    confidentiality: 'Rahasia',
  },
  {
    id: 'BP-2024-002',
    title: 'Berkas Perkara Pencucian Uang Real Estate',
    caseNumber: 'REG-002/PID.SUS/2024/PN.JKT.SEL',
    defendant: 'PT Sentosa Jaya Properti',
    institution: 'Bank Indonesia',
    fileDate: '2024-02-10',
    fileSize: '89.7 MB',
    pageCount: 512,
    status: 'Lengkap',
    category: 'Pencucian Uang',
    prosecutor: 'Jaksa Agung Muda Tindak Pidana Khusus',
    uploadedBy: 'Ahmad Sutanto',
    uploadDate: '2024-02-12 09:15',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 78,
    confidentiality: 'Sangat Rahasia',
  },
  {
    id: 'BP-2024-003',
    title: 'Berkas Perkara Gratifikasi Pejabat Negara',
    caseNumber: 'REG-003/PID.SUS/2024/PN.BDG',
    defendant: 'Hendra Kusuma, S.H.',
    institution: 'Kementerian Pekerjaan Umum',
    fileDate: '2024-01-28',
    fileSize: '23.4 MB',
    pageCount: 156,
    status: 'Lengkap',
    category: 'Gratifikasi',
    prosecutor: 'Kejaksaan Tinggi Jawa Barat',
    uploadedBy: 'Dedi Firmansyah',
    uploadDate: '2024-01-30 16:45',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 28,
    confidentiality: 'Rahasia',
  },
  {
    id: 'BP-2024-004',
    title: 'Berkas Perkara Penipuan Investasi Bodong',
    caseNumber: 'REG-004/PID.SUS/2024/PN.SBY',
    defendant: 'Robert Chen & 5 lainnya',
    institution: 'OJK & Bareskrim Polri',
    fileDate: '2024-03-05',
    fileSize: '125.8 MB',
    pageCount: 824,
    status: 'Dalam Proses',
    category: 'Penipuan',
    prosecutor: 'Kejaksaan Tinggi Jawa Timur',
    uploadedBy: 'Rina Melati',
    uploadDate: '2024-03-07 11:20',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 156,
    confidentiality: 'Rahasia',
  },
  {
    id: 'BP-2023-089',
    title: 'Berkas Perkara Korupsi Dana Hibah Daerah',
    caseNumber: 'REG-089/PID.SUS/2023/PN.MDN',
    defendant: 'Andi Wijaya, M.M.',
    institution: 'Pemerintah Daerah Sumatera Utara',
    fileDate: '2023-11-12',
    fileSize: '34.6 MB',
    pageCount: 198,
    status: 'Lengkap',
    category: 'Korupsi',
    prosecutor: 'Kejaksaan Tinggi Sumatera Utara',
    uploadedBy: 'Ahmad Sutanto',
    uploadDate: '2023-11-15 10:00',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 42,
    confidentiality: 'Rahasia',
  },
  {
    id: 'BP-2024-005',
    title: 'Berkas Perkara Suap Perizinan Tambang',
    caseNumber: 'REG-005/PID.SUS/2024/PN.SMD',
    defendant: 'CV Karya Mandiri Sejahtera',
    institution: 'Kementerian ESDM',
    fileDate: '2024-02-20',
    fileSize: '67.3 MB',
    pageCount: 423,
    status: 'Lengkap',
    category: 'Suap',
    prosecutor: 'Jaksa Agung Muda Tindak Pidana Khusus',
    uploadedBy: 'Siti Rahayu',
    uploadDate: '2024-02-22 15:10',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 89,
    confidentiality: 'Sangat Rahasia',
  },
  {
    id: 'BP-2024-006',
    title: 'Berkas Perkara Penggelapan Pajak Korporasi',
    caseNumber: 'REG-006/PID.SUS/2024/PN.JKT.UTR',
    defendant: 'PT Global Finance Indonesia',
    institution: 'Direktorat Jenderal Pajak',
    fileDate: '2024-03-15',
    fileSize: '156.2 MB',
    pageCount: 967,
    status: 'Dalam Proses',
    category: 'Perpajakan',
    prosecutor: 'Jaksa Agung Muda Perdata dan Tata Usaha Negara',
    uploadedBy: 'Dedi Firmansyah',
    uploadDate: '2024-03-17 13:40',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 203,
    confidentiality: 'Sangat Rahasia',
  },
  {
    id: 'BP-2024-007',
    title: 'Berkas Perkara Pengadaan Fiktif',
    caseNumber: 'REG-007/PID.SUS/2024/PN.YK',
    defendant: 'Diana Permata & 3 lainnya',
    institution: 'Pemerintah Kota Yogyakarta',
    fileDate: '2024-01-05',
    fileSize: '28.9 MB',
    pageCount: 174,
    status: 'Lengkap',
    category: 'Korupsi',
    prosecutor: 'Kejaksaan Tinggi D.I. Yogyakarta',
    uploadedBy: 'Rina Melati',
    uploadDate: '2024-01-08 09:30',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 35,
    confidentiality: 'Rahasia',
  },
  {
    id: 'BP-2023-092',
    title: 'Berkas Perkara Korupsi Anggaran Pendidikan',
    caseNumber: 'REG-092/PID.SUS/2023/PN.MLG',
    defendant: 'Yayasan Peduli Pendidikan',
    institution: 'Kementerian Pendidikan dan Kebudayaan',
    fileDate: '2023-12-18',
    fileSize: '41.7 MB',
    pageCount: 245,
    status: 'Tidak Lengkap',
    category: 'Korupsi',
    prosecutor: 'Kejaksaan Tinggi Jawa Timur',
    uploadedBy: 'Ahmad Sutanto',
    uploadDate: '2023-12-20 14:25',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 51,
    confidentiality: 'Rahasia',
  },
  {
    id: 'BP-2024-008',
    title: 'Berkas Perkara Penyalahgunaan Wewenang',
    caseNumber: 'REG-008/PID.SUS/2024/PN.DPS',
    defendant: 'I Wayan Surya, S.T., M.T.',
    institution: 'Pemerintah Provinsi Bali',
    fileDate: '2024-02-28',
    fileSize: '52.1 MB',
    pageCount: 312,
    status: 'Lengkap',
    category: 'Penyalahgunaan Wewenang',
    prosecutor: 'Kejaksaan Tinggi Bali',
    uploadedBy: 'Siti Rahayu',
    uploadDate: '2024-03-02 10:15',
    source: 'Sistem SIMKARA',
    hasAttachments: true,
    attachmentCount: 64,
    confidentiality: 'Rahasia',
  },
];

const statusColors: Record<string, string> = {
  Lengkap: 'bg-green-600/20 text-green-400 border-green-500/50',
  'Dalam Proses': 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  'Tidak Lengkap': 'bg-red-600/20 text-red-400 border-red-500/50',
};

const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Lengkap: CheckCircle2,
  'Dalam Proses': Clock,
  'Tidak Lengkap': XCircle,
};

const confidentialityColors: Record<string, string> = {
  'Sangat Rahasia': 'bg-red-600/20 text-red-400 border-red-500/50',
  Rahasia: 'bg-orange-600/20 text-orange-400 border-orange-500/50',
  Terbatas: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  Biasa: 'bg-slate-600/20 text-slate-400 border-slate-500/50',
};

export function CaseFiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const filteredFiles = mockCaseFiles.filter(file => {
    const matchesSearch =
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.defendant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || file.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(mockCaseFiles.map(f => f.category)));

  const handleViewDetail = file => {
    setSelectedFile(file);
    setShowDetailDialog(true);
  };

  const handleDownload = file => {
    toast.success(`Mengunduh berkas: ${file.title}`);
    // Implement download logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-white">Daftar Perkara</h1>
            <p className="text-slate-400 mt-1">Data seluruh berkas perkara</p>
          </div>
        </div>

        <Button className="bg-purple-600 hover:bg-purple-500">
          <Upload className="w-4 h-4 mr-2" />
          Upload Berkas
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Berkas</p>
                <p className="text-2xl font-bold text-white mt-1">{mockCaseFiles.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Berkas Lengkap</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {mockCaseFiles.filter(f => f.status === 'Lengkap').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Dalam Proses</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {mockCaseFiles.filter(f => f.status === 'Dalam Proses').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Tidak Lengkap</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {mockCaseFiles.filter(f => f.status === 'Tidak Lengkap').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari berkas perkara, nomor perkara, atau terdakwa..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Lengkap">Lengkap</SelectItem>
                <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                <SelectItem value="Tidak Lengkap">Tidak Lengkap</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Files Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Berkas Perkara ({filteredFiles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">ID Berkas</TableHead>
                  <TableHead className="text-slate-300">Judul Perkara</TableHead>
                  <TableHead className="text-slate-300">Nomor Perkara</TableHead>
                  <TableHead className="text-slate-300">Terdakwa</TableHead>
                  <TableHead className="text-slate-300">Kategori</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Tanggal</TableHead>
                  <TableHead className="text-slate-300">Ukuran</TableHead>
                  <TableHead className="text-slate-300 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map(file => {
                  const StatusIcon = statusIcons[file.status];

                  return (
                    <TableRow key={file.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-400" />
                          <span className="text-white font-mono text-sm">{file.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white font-medium">{file.title}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {file.pageCount} halaman • {file.attachmentCount} lampiran
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-slate-300 font-mono text-sm">{file.caseNumber}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-500" />
                          <span className="text-white">{file.defendant}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">
                          {file.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="w-4 h-4" />
                          <Badge className={statusColors[file.status]}>{file.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="text-sm">
                            {new Date(file.fileDate).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-slate-300 text-sm">{file.fileSize}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-slate-800 border-slate-700"
                          >
                            <DropdownMenuItem
                              className="text-slate-300 focus:bg-slate-700 focus:text-white"
                              onClick={() => handleViewDetail(file)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-slate-300 focus:bg-slate-700 focus:text-white"
                              onClick={() => handleDownload(file)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      {selectedFile && (
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white">
                <FolderOpen className="w-5 h-5 text-purple-400" />
                Detail Berkas Perkara
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Informasi lengkap tentang berkas perkara yang dipilih
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-mono font-medium">{selectedFile.id}</span>
                  </div>
                  <Badge className={confidentialityColors[selectedFile.confidentiality]}>
                    <Shield className="w-3 h-3 mr-1" />
                    {selectedFile.confidentiality}
                  </Badge>
                </div>
                <h3 className="text-white font-medium mb-2">{selectedFile.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{selectedFile.pageCount} halaman</span>
                  <span>•</span>
                  <span>{selectedFile.attachmentCount} lampiran</span>
                  <span>•</span>
                  <span>{selectedFile.fileSize}</span>
                </div>
              </div>

              {/* Informasi Perkara */}
              <div className="space-y-4">
                <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                  Informasi Perkara
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Nomor Perkara</Label>
                    <p className="text-white font-mono text-sm">{selectedFile.caseNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Kategori</Label>
                    <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">
                      {selectedFile.category}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Status</Label>
                    <div className="flex items-center gap-2">
                      {React.createElement(statusIcons[selectedFile.status], {
                        className: 'w-4 h-4',
                      })}
                      <Badge className={statusColors[selectedFile.status]}>
                        {selectedFile.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Tanggal Berkas</Label>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">
                        {new Date(selectedFile.fileDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Pihak Terkait */}
              <div className="space-y-4">
                <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                  Pihak Terkait
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Terdakwa
                    </Label>
                    <p className="text-white">{selectedFile.defendant}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Institusi Terkait
                    </Label>
                    <p className="text-slate-300">{selectedFile.institution}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Jaksa Penuntut
                    </Label>
                    <p className="text-slate-300">{selectedFile.prosecutor}</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Informasi Upload */}
              <div className="space-y-4">
                <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                  Informasi Upload
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Diunggah Oleh</Label>
                    <p className="text-white">{selectedFile.uploadedBy}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Tanggal Upload</Label>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">
                        {new Date(selectedFile.uploadDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Sumber</Label>
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">{selectedFile.source}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-sm">Lampiran</Label>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Paperclip className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">
                        {selectedFile.hasAttachments
                          ? `${selectedFile.attachmentCount} file lampiran`
                          : 'Tidak ada lampiran'}
                      </span>
                    </div>
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
                onClick={() => handleDownload(selectedFile)}
                className="bg-purple-600 hover:bg-purple-500"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
