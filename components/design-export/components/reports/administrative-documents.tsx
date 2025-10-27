import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
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
  Plus,
  Search,
  FileText,
  CheckCircle2,
  Eye,
  Edit,
  Trash2,
  Download,
  MoreHorizontal,
  Building,
  Users,
  MessageSquare,
  Share2,
  Globe,
  Lock,
  CheckCircle,
  XCircle,
  History,
  Scroll,
  AlertTriangle,
  X,
  UserPlus,
  Filter,
  Mail,
  Upload,
  Calendar,
  UserCheck,
  Shield,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../../../ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../ui/tooltip';
import { Switch } from '../../../ui/switch';
import { Checkbox } from '../../../ui/checkbox';
import { Separator } from '../../../ui/separator';

// Mock users untuk sistem kolaborasi real-time
const mockUsers = [
  {
    id: 'USR001',
    name: 'Ahmad Sutanto',
    role: 'Kepala BPA',
    email: 'ahmad.sutanto@bpa.go.id',
    avatar: 'AS',
    status: 'online',
    color: 'bg-blue-500',
    approvalLevel: 3,
  },
  {
    id: 'USR002',
    name: 'Siti Rahayu',
    role: 'Kepala Pusat MPPA',
    email: 'siti.rahayu@bpa.go.id',
    avatar: 'SR',
    status: 'online',
    color: 'bg-green-500',
    approvalLevel: 2,
  },
  {
    id: 'USR003',
    name: 'Budi Santoso',
    role: 'Kepala Bidang Hukum',
    email: 'budi.santoso@bpa.go.id',
    avatar: 'BS',
    status: 'offline',
    color: 'bg-purple-500',
    approvalLevel: 1,
  },
  {
    id: 'USR004',
    name: 'Rina Pertiwi',
    role: 'Sekretaris BPA',
    email: 'rina.pertiwi@bpa.go.id',
    avatar: 'RP',
    status: 'online',
    color: 'bg-pink-500',
    approvalLevel: 2,
  },
  {
    id: 'USR005',
    name: 'Dedi Firmansyah',
    role: 'Koordinator Tim Penyidik',
    email: 'dedi.firmansyah@bpa.go.id',
    avatar: 'DF',
    status: 'online',
    color: 'bg-orange-500',
    approvalLevel: 1,
  },
  {
    id: 'USR006',
    name: 'Maya Sari',
    role: 'Analisis Hukum',
    email: 'maya.sari@bpa.go.id',
    avatar: 'MS',
    status: 'away',
    color: 'bg-red-500',
    approvalLevel: 0,
  },
  {
    id: 'USR007',
    name: 'Agus Wibowo',
    role: 'Tim Penelusuran Aset',
    email: 'agus.wibowo@bpa.go.id',
    avatar: 'AW',
    status: 'online',
    color: 'bg-teal-500',
    approvalLevel: 0,
  },
  {
    id: 'USR008',
    name: 'Linda Kusuma',
    role: 'Direktur Penyelesaian Aset',
    email: 'linda.kusuma@bpa.go.id',
    avatar: 'LK',
    status: 'offline',
    color: 'bg-yellow-500',
    approvalLevel: 2,
  },
];

// Approval level configuration
const approvalLevels = [
  { level: 1, name: 'Kepala Bidang/Koordinator', description: 'Review dan verifikasi dokumen' },
  { level: 2, name: 'Kepala Pusat/Direktur', description: 'Persetujuan tingkat menengah' },
  { level: 3, name: 'Kepala BPA/Pimpinan', description: 'Persetujuan final' },
];

interface DocumentType {
  id: string;
  title: string;
  type: string;
  category: string;
  subCategory: string;
  number: string;
  issuer: string;
  issuedTo: string;
  issueDate: string;
  status: string;
  priority: string;
  caseReference: string;
  description: string;
  validUntil: string;
  attachmentCount: number;
  isShared: boolean;
  shareSettings: {
    permission: string;
    sharedWith: string[];
    isPublic: boolean;
    allowComments: boolean;
  };
  activeCollaborators: string[];
  lastModified: string;
  lastModifiedBy: string;
  comments: number;
  version: string;
  approvalStatus: string;
  currentApprovalLevel: number;
  requiresApprovalLevels: number[];
  approvalHistory?: Array<{
    level: number;
    approverId: string;
    approverName: string;
    action: string;
    comment: string;
    timestamp: string;
  }>;
}

const mockDocuments: DocumentType[] = [
  // PERSIAPAN
  {
    id: 'DOC001',
    title: 'Permintaan Penelusuran Aset - Kasus Korupsi Pengadaan Alkes',
    type: 'Surat Permintaan Penelusuran Aset',
    category: 'persiapan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'SPPA/001/KPK/2024',
    issuer: 'Komisi Pemberantasan Korupsi (KPK)',
    issuedTo: 'Kepala BPA',
    issueDate: '2024-01-10',
    status: 'Selesai',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Permintaan resmi dari KPK untuk penelusuran aset terkait dugaan korupsi pengadaan alat kesehatan senilai Rp 125 Miliar',
    validUntil: '2024-12-31',
    attachmentCount: 3,
    isShared: true,
    shareSettings: {
      permission: 'view',
      sharedWith: ['USR001', 'USR002'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR002'],
    lastModified: '2024-01-12 14:30',
    lastModifiedBy: 'USR002',
    comments: 2,
    version: '1.0',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 3,
    requiresApprovalLevels: [1, 2, 3],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR003',
        approverName: 'Budi Santoso',
        action: 'approved',
        comment: 'Dokumen lengkap dan sesuai prosedur',
        timestamp: '2024-01-10 15:00',
      },
      {
        level: 2,
        approverId: 'USR002',
        approverName: 'Siti Rahayu',
        action: 'approved',
        comment: 'Disetujui untuk ditindaklanjuti',
        timestamp: '2024-01-11 10:30',
      },
      {
        level: 3,
        approverId: 'USR001',
        approverName: 'Ahmad Sutanto',
        action: 'approved',
        comment: 'Disetujui dan segera diproses',
        timestamp: '2024-01-12 14:30',
      },
    ],
  },
  {
    id: 'DOC002',
    title: 'Penunjukan Tim Satgas Pemulihan Aset - Kasus Alkes',
    type: 'Surat Perintah Penunjukan Tim Satgas',
    category: 'persiapan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'SP-TS/002/BPA/2024',
    issuer: 'Kepala BPA',
    issuedTo: 'Tim Satgas Pemulihan Aset',
    issueDate: '2024-01-15',
    status: 'Aktif',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Surat perintah penunjukan tim satuan tugas untuk melakukan telaah dan penelusuran aset kasus korupsi alkes',
    validUntil: '2024-07-15',
    attachmentCount: 1,
    isShared: true,
    shareSettings: {
      permission: 'edit',
      sharedWith: ['USR005', 'USR007', 'USR008'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR005', 'USR007'],
    lastModified: '2024-01-16 10:20',
    lastModifiedBy: 'USR005',
    comments: 4,
    version: '1.2',
    approvalStatus: 'Menunggu Persetujuan Level 2',
    currentApprovalLevel: 2,
    requiresApprovalLevels: [1, 2],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR005',
        approverName: 'Dedi Firmansyah',
        action: 'approved',
        comment: 'Tim sudah ditunjuk dengan kompeten',
        timestamp: '2024-01-15 16:00',
      },
    ],
  },
  {
    id: 'DOC003',
    title: 'Nota Pendapat (Telaah) - Analisis SWOT Kasus Alkes',
    type: 'Nota Pendapat (Telaah)',
    category: 'persiapan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'NP/003/BPA/2024',
    issuer: 'Tim Satgas Pemulihan Aset',
    issuedTo: 'Kepala Pusat MPPA',
    issueDate: '2024-01-20',
    status: 'Selesai',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Telaah komprehensif berisi dasar hukum, data pendukung, latar belakang, uraian permasalahan, analisis SWOT, kesimpulan dan saran',
    validUntil: '2024-12-31',
    attachmentCount: 8,
    isShared: true,
    shareSettings: {
      permission: 'edit',
      sharedWith: ['USR001', 'USR002', 'USR003'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR003'],
    lastModified: '2024-01-22 16:45',
    lastModifiedBy: 'USR003',
    comments: 6,
    version: '2.1',
    approvalStatus: 'Ditolak',
    currentApprovalLevel: 1,
    requiresApprovalLevels: [1, 2, 3],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR003',
        approverName: 'Budi Santoso',
        action: 'rejected',
        comment: 'Analisis SWOT perlu diperbaiki, data pendukung kurang lengkap',
        timestamp: '2024-01-21 14:00',
      },
    ],
  },
  {
    id: 'DOC004',
    title: 'Surat Perintah Pelaksanaan Kegiatan Penelusuran Aset',
    type: 'Surat Perintah Kegiatan Penelusuran Aset',
    category: 'persiapan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'SPKA/004/BPA/2024',
    issuer: 'Kepala Pusat MPPA',
    issuedTo: 'Tim Satgas Pemulihan Aset',
    issueDate: '2024-01-25',
    status: 'Aktif',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Surat perintah resmi untuk melaksanakan kegiatan penelusuran aset setelah permintaan disetujui berdasarkan nota pendapat',
    validUntil: '2024-06-25',
    attachmentCount: 2,
    isShared: true,
    shareSettings: {
      permission: 'view',
      sharedWith: ['USR005', 'USR007', 'USR008'],
      isPublic: false,
      allowComments: false,
    },
    activeCollaborators: [],
    lastModified: '2024-01-25 09:30',
    lastModifiedBy: 'USR002',
    comments: 0,
    version: '1.0',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 3,
    requiresApprovalLevels: [1, 2, 3],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR005',
        approverName: 'Dedi Firmansyah',
        action: 'approved',
        comment: 'Surat perintah sudah sesuai prosedur',
        timestamp: '2024-01-24 14:00',
      },
      {
        level: 2,
        approverId: 'USR002',
        approverName: 'Siti Rahayu',
        action: 'approved',
        comment: 'Disetujui untuk dilaksanakan',
        timestamp: '2024-01-24 16:30',
      },
      {
        level: 3,
        approverId: 'USR001',
        approverName: 'Ahmad Sutanto',
        action: 'approved',
        comment: 'Disetujui dan segera dilaksanakan',
        timestamp: '2024-01-25 09:00',
      },
    ],
  },
  {
    id: 'DOC005',
    title: 'Balasan Persetujuan Penelusuran Aset kepada KPK',
    type: 'Surat Balasan Disetujui',
    category: 'persiapan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'SB-S/005/BPA/2024',
    issuer: 'Kepala BPA',
    issuedTo: 'Komisi Pemberantasan Korupsi (KPK)',
    issueDate: '2024-01-26',
    status: 'Selesai',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Surat balasan resmi kepada KPK bahwa permintaan penelusuran aset telah disetujui dan akan segera dilaksanakan',
    validUntil: '2024-12-31',
    attachmentCount: 1,
    isShared: false,
    shareSettings: {
      permission: 'view',
      sharedWith: [],
      isPublic: false,
      allowComments: false,
    },
    activeCollaborators: [],
    lastModified: '2024-01-26 11:15',
    lastModifiedBy: 'USR001',
    comments: 0,
    version: '1.0',
    approvalStatus: 'Menunggu Persetujuan Level 1',
    currentApprovalLevel: 1,
    requiresApprovalLevels: [1],
    approvalHistory: [],
  },
  {
    id: 'DOC006',
    title: 'Rencana Kegiatan Penelusuran Aset - Timeline & Resources',
    type: 'Rencana Kegiatan Penelusuran Aset',
    category: 'persiapan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'RKPA/006/BPA/2024',
    issuer: 'Koordinator Tim Satgas',
    issuedTo: 'Tim Satgas Pemulihan Aset',
    issueDate: '2024-01-28',
    status: 'Aktif',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Rencana detail memuat waktu pelaksanaan, personil yang terlibat, sarana/prasarana, metode penelusuran, koordinasi pihak terkait, anggaran biaya',
    validUntil: '2024-06-30',
    attachmentCount: 5,
    isShared: true,
    shareSettings: {
      permission: 'edit',
      sharedWith: ['USR002', 'USR005', 'USR007', 'USR008'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR005', 'USR007', 'USR008'],
    lastModified: '2024-01-30 14:20',
    lastModifiedBy: 'USR005',
    comments: 8,
    version: '1.4',
    approvalStatus: 'Menunggu Persetujuan Level 1',
    currentApprovalLevel: 1,
    requiresApprovalLevels: [1, 2],
    approvalHistory: [],
  },

  // PELAKSANAAN
  {
    id: 'DOC007',
    title: 'Data Profiling Target - Budi Santoso & Keluarga',
    type: 'Data Profiling & Pemetaan Aset',
    category: 'pelaksanaan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'DPP/007/BPA/2024',
    issuer: 'Tim Satgas - Divisi Profiling',
    issuedTo: 'Koordinator Tim Satgas',
    issueDate: '2024-02-05',
    status: 'Dalam Proses',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Data lengkap profiling tersangka dan keluarga, termasuk pemetaan kepemilikan dan penguasaan aset properti, kendaraan, rekening',
    validUntil: '2024-06-30',
    attachmentCount: 12,
    isShared: true,
    shareSettings: {
      permission: 'edit',
      sharedWith: ['USR005', 'USR007', 'USR008'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR007', 'USR008'],
    lastModified: '2024-02-10 16:30',
    lastModifiedBy: 'USR007',
    comments: 5,
    version: '2.3',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 1,
    requiresApprovalLevels: [1],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR005',
        approverName: 'Dedi Firmansyah',
        action: 'approved',
        comment: 'Data profiling sudah komprehensif',
        timestamp: '2024-02-10 17:00',
      },
    ],
  },
  {
    id: 'DOC008',
    title: 'Hasil Pengumpulan Data dari 15 Sumber Eksternal',
    type: 'Data/Informasi Hasil Pengumpulan',
    category: 'pelaksanaan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'DIHP/008/BPA/2024',
    issuer: 'Tim Satgas - Divisi Data',
    issuedTo: 'Koordinator Tim Satgas',
    issueDate: '2024-02-12',
    status: 'Dalam Proses',
    priority: 'Sedang',
    caseReference: 'CASE-2024-001',
    description:
      'Kompilasi data dari BPN, PPATK, Kepolisian, Dirjen Pajak, Imigrasi, Korlantas, SAMSAT, perbankan, dan sumber lainnya',
    validUntil: '2024-06-30',
    attachmentCount: 25,
    isShared: true,
    shareSettings: {
      permission: 'suggest',
      sharedWith: ['USR005', 'USR007'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR007'],
    lastModified: '2024-02-15 11:45',
    lastModifiedBy: 'USR007',
    comments: 3,
    version: '1.8',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 1,
    requiresApprovalLevels: [1],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR005',
        approverName: 'Dedi Firmansyah',
        action: 'approved',
        comment: 'Data hasil pengumpulan valid',
        timestamp: '2024-02-15 14:00',
      },
    ],
  },
  {
    id: 'DOC009',
    title: 'Dokumentasi Verifikasi Fisik 15 Properti',
    type: 'Dokumentasi Identifikasi & Verifikasi Fisik Aset',
    category: 'pelaksanaan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'DIVF/009/BPA/2024',
    issuer: 'Tim Satgas - Tim Lapangan',
    issuedTo: 'Koordinator Tim Satgas',
    issueDate: '2024-02-20',
    status: 'Dalam Proses',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Dokumentasi lengkap berupa foto, video, koordinat GPS, dan catatan lapangan hasil identifikasi fisik 15 properti tersangka',
    validUntil: '2024-06-30',
    attachmentCount: 47,
    isShared: true,
    shareSettings: {
      permission: 'view',
      sharedWith: ['USR002', 'USR005', 'USR008'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR008'],
    lastModified: '2024-02-25 15:20',
    lastModifiedBy: 'USR008',
    comments: 7,
    version: '3.1',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 2,
    requiresApprovalLevels: [1, 2],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR005',
        approverName: 'Dedi Firmansyah',
        action: 'approved',
        comment: 'Dokumentasi lengkap',
        timestamp: '2024-02-24 10:00',
      },
      {
        level: 2,
        approverId: 'USR002',
        approverName: 'Siti Rahayu',
        action: 'approved',
        comment: 'Disetujui',
        timestamp: '2024-02-25 09:00',
      },
    ],
  },
  {
    id: 'DOC010',
    title: 'Dokumentasi Konfirmasi Data dengan Pihak Terkait',
    type: 'Dokumentasi Konfirmasi & Verifikasi Data',
    category: 'pelaksanaan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'DKVD/010/BPA/2024',
    issuer: 'Tim Satgas - Divisi Verifikasi',
    issuedTo: 'Koordinator Tim Satgas',
    issueDate: '2024-03-01',
    status: 'Dalam Proses',
    priority: 'Sedang',
    caseReference: 'CASE-2024-001',
    description:
      'Hasil konfirmasi dan verifikasi data kepemilikan aset dengan BPN, bank, notaris, dan instansi terkait lainnya',
    validUntil: '2024-06-30',
    attachmentCount: 18,
    isShared: true,
    shareSettings: {
      permission: 'edit',
      sharedWith: ['USR005', 'USR007'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR007'],
    lastModified: '2024-03-05 09:30',
    lastModifiedBy: 'USR007',
    comments: 4,
    version: '1.5',
    approvalStatus: 'Menunggu Persetujuan Level 1',
    currentApprovalLevel: 1,
    requiresApprovalLevels: [1],
    approvalHistory: [],
  },
  {
    id: 'DOC011',
    title: 'Hasil Penelaahan Kesesuaian Data vs Kondisi Fisik',
    type: 'Hasil Penelaahan Data/Informasi Aset',
    category: 'pelaksanaan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'HPDI/011/BPA/2024',
    issuer: 'Tim Satgas - Analis Senior',
    issuedTo: 'Koordinator Tim Satgas',
    issueDate: '2024-03-10',
    status: 'Dalam Proses',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Laporan analisis kesesuaian antara data dokumen kepemilikan dengan kondisi fisik aset di lapangan, termasuk temuan diskrepansi',
    validUntil: '2024-06-30',
    attachmentCount: 9,
    isShared: true,
    shareSettings: {
      permission: 'edit',
      sharedWith: ['USR002', 'USR003', 'USR005'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR005'],
    lastModified: '2024-03-12 14:15',
    lastModifiedBy: 'USR005',
    comments: 6,
    version: '2.0',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 2,
    requiresApprovalLevels: [1, 2],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR005',
        approverName: 'Dedi Firmansyah',
        action: 'approved',
        comment: 'Analisis sudah mendalam',
        timestamp: '2024-03-11 16:00',
      },
      {
        level: 2,
        approverId: 'USR002',
        approverName: 'Siti Rahayu',
        action: 'approved',
        comment: 'Disetujui',
        timestamp: '2024-03-12 09:00',
      },
    ],
  },
  {
    id: 'DOC012',
    title: 'Estimasi Nilai Total Aset - Rp 285 Miliar',
    type: 'Data Perkiraan Nilai Aset',
    category: 'pelaksanaan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'DPNA/012/BPA/2024',
    issuer: 'Tim Satgas - Penilai Aset',
    issuedTo: 'Koordinator Tim Satgas',
    issueDate: '2024-03-15',
    status: 'Selesai',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Estimasi nilai seluruh aset berdasarkan harga pasar, NJOP, nilai jual objek pajak, dan metode penilaian standar lainnya',
    validUntil: '2024-12-31',
    attachmentCount: 15,
    isShared: true,
    shareSettings: {
      permission: 'view',
      sharedWith: ['USR001', 'USR002', 'USR003'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: [],
    lastModified: '2024-03-18 16:40',
    lastModifiedBy: 'USR005',
    comments: 2,
    version: '1.0',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 2,
    requiresApprovalLevels: [1, 2],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR005',
        approverName: 'Dedi Firmansyah',
        action: 'approved',
        comment: 'Estimasi nilai sudah akurat',
        timestamp: '2024-03-17 14:00',
      },
      {
        level: 2,
        approverId: 'USR002',
        approverName: 'Siti Rahayu',
        action: 'approved',
        comment: 'Disetujui',
        timestamp: '2024-03-18 10:00',
      },
    ],
  },

  // PELAPORAN & EVALUASI
  {
    id: 'DOC013',
    title: 'Laporan Akhir Penelusuran Aset - RAHASIA',
    type: 'Laporan Akhir Hasil Penelusuran Aset',
    category: 'pelaporan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'LAHPA/013/BPA/2024',
    issuer: 'Tim Satgas Pemulihan Aset',
    issuedTo: 'Kepala BPA',
    issueDate: '2024-03-25',
    status: 'Selesai',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Laporan akhir komprehensif berisi latar belakang, profil lengkap, hasil penelusuran detail, analisis ancaman/gangguan/hambatan/tantangan, kesimpulan, rekomendasi, dan lampiran pendukung (RAHASIA)',
    validUntil: '2025-03-25',
    attachmentCount: 52,
    isShared: true,
    shareSettings: {
      permission: 'view',
      sharedWith: ['USR001', 'USR002'],
      isPublic: false,
      allowComments: false,
    },
    activeCollaborators: [],
    lastModified: '2024-03-28 10:30',
    lastModifiedBy: 'USR002',
    comments: 1,
    version: '3.0',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 3,
    requiresApprovalLevels: [1, 2, 3],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR005',
        approverName: 'Dedi Firmansyah',
        action: 'approved',
        comment: 'Laporan komprehensif dan detail',
        timestamp: '2024-03-26 14:00',
      },
      {
        level: 2,
        approverId: 'USR002',
        approverName: 'Siti Rahayu',
        action: 'approved',
        comment: 'Disetujui untuk tingkat selanjutnya',
        timestamp: '2024-03-27 10:00',
      },
      {
        level: 3,
        approverId: 'USR001',
        approverName: 'Ahmad Sutanto',
        action: 'approved',
        comment: 'Disetujui dan siap disampaikan',
        timestamp: '2024-03-28 09:00',
      },
    ],
  },
  {
    id: 'DOC014',
    title: 'Surat Penyampaian Laporan Akhir kepada KPK',
    type: 'Surat Balasan kepada Pemohon',
    category: 'pelaporan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'SPLAK/014/BPA/2024',
    issuer: 'Kepala BPA',
    issuedTo: 'Komisi Pemberantasan Korupsi (KPK)',
    issueDate: '2024-03-30',
    status: 'Selesai',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Surat resmi penyampaian Laporan Akhir Hasil Penelusuran Aset kepada pemohon (KPK) beserta rekomendasi tindak lanjut',
    validUntil: '2024-12-31',
    attachmentCount: 2,
    isShared: false,
    shareSettings: {
      permission: 'view',
      sharedWith: [],
      isPublic: false,
      allowComments: false,
    },
    activeCollaborators: [],
    lastModified: '2024-03-30 14:00',
    lastModifiedBy: 'USR001',
    comments: 0,
    version: '1.0',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 1,
    requiresApprovalLevels: [1],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR003',
        approverName: 'Budi Santoso',
        action: 'approved',
        comment: 'Dokumen sudah sesuai format',
        timestamp: '2024-03-30 15:00',
      },
    ],
  },

  // Additional documents from different cases
  {
    id: 'DOC015',
    title: 'Permintaan Penelusuran Aset - Kasus Suap Perizinan',
    type: 'Surat Permintaan Penelusuran Aset',
    category: 'persiapan',
    subCategory: 'Kasus Suap Perizinan Tambang',
    number: 'SPPA/015/POLRI/2024',
    issuer: 'Bareskrim POLRI',
    issuedTo: 'Kepala BPA',
    issueDate: '2024-02-01',
    status: 'Aktif',
    priority: 'Sedang',
    caseReference: 'CASE-2024-002',
    description:
      'Permintaan penelusuran aset terkait dugaan suap perizinan tambang di Kalimantan Timur senilai Rp 45 Miliar',
    validUntil: '2024-12-31',
    attachmentCount: 2,
    isShared: true,
    shareSettings: {
      permission: 'view',
      sharedWith: ['USR002', 'USR003'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: [],
    lastModified: '2024-02-03 10:15',
    lastModifiedBy: 'USR002',
    comments: 1,
    version: '1.0',
    approvalStatus: 'Menunggu Persetujuan Level 2',
    currentApprovalLevel: 2,
    requiresApprovalLevels: [1, 2, 3],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR003',
        approverName: 'Budi Santoso',
        action: 'approved',
        comment: 'Permintaan valid dan lengkap',
        timestamp: '2024-02-02 14:00',
      },
    ],
  },
  {
    id: 'DOC016',
    title: 'Surat Balasan Tidak Disetujui - Kasus Pencucian Uang',
    type: 'Surat Balasan Tidak Disetujui',
    category: 'persiapan',
    subCategory: 'Kasus Pencucian Uang',
    number: 'SB-TD/016/BPA/2024',
    issuer: 'Kepala BPA',
    issuedTo: 'Kejaksaan Agung',
    issueDate: '2024-01-18',
    status: 'Selesai',
    priority: 'Rendah',
    caseReference: 'CASE-2024-003',
    description:
      'Surat balasan penolakan permintaan penelusuran aset karena kasus belum memiliki putusan pengadilan yang inkracht',
    validUntil: '2024-12-31',
    attachmentCount: 1,
    isShared: false,
    shareSettings: {
      permission: 'view',
      sharedWith: [],
      isPublic: false,
      allowComments: false,
    },
    activeCollaborators: [],
    lastModified: '2024-01-18 16:30',
    lastModifiedBy: 'USR001',
    comments: 0,
    version: '1.0',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 3,
    requiresApprovalLevels: [1, 2, 3],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR003',
        approverName: 'Budi Santoso',
        action: 'approved',
        comment: 'Alasan penolakan sudah tepat',
        timestamp: '2024-01-17 10:00',
      },
      {
        level: 2,
        approverId: 'USR002',
        approverName: 'Siti Rahayu',
        action: 'approved',
        comment: 'Setuju dengan penolakan',
        timestamp: '2024-01-17 14:30',
      },
      {
        level: 3,
        approverId: 'USR001',
        approverName: 'Ahmad Sutanto',
        action: 'approved',
        comment: 'Disetujui untuk dikirim',
        timestamp: '2024-01-18 09:00',
      },
    ],
  },
  {
    id: 'DOC017',
    title: 'Nota Dinas Pengantar Laporan Kegiatan - Kasus Alkes',
    type: 'Nota Dinas Pengantar Laporan Kegiatan',
    category: 'pelaksanaan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'NDPLK/017/BPA/2024',
    issuer: 'Koordinator Tim Satgas',
    issuedTo: 'Kepala Pusat MPPA',
    issueDate: '2024-03-20',
    status: 'Selesai',
    priority: 'Tinggi',
    caseReference: 'CASE-2024-001',
    description:
      'Nota dinas pengantar untuk menyampaikan laporan kegiatan penelusuran aset yang telah selesai dilakukan',
    validUntil: '2024-12-31',
    attachmentCount: 3,
    isShared: true,
    shareSettings: {
      permission: 'view',
      sharedWith: ['USR001', 'USR002', 'USR005'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: [],
    lastModified: '2024-03-22 11:20',
    lastModifiedBy: 'USR005',
    comments: 2,
    version: '1.1',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 2,
    requiresApprovalLevels: [1, 2],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR005',
        approverName: 'Dedi Firmansyah',
        action: 'approved',
        comment: 'Nota dinas sudah sesuai',
        timestamp: '2024-03-21 09:00',
      },
      {
        level: 2,
        approverId: 'USR002',
        approverName: 'Siti Rahayu',
        action: 'approved',
        comment: 'Disetujui untuk disampaikan',
        timestamp: '2024-03-22 10:30',
      },
    ],
  },
  {
    id: 'DOC018',
    title: 'Laporan Kegiatan Penelusuran Aset - Februari 2024',
    type: 'Laporan Kegiatan Penelusuran Aset',
    category: 'pelaksanaan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'LKPA/018/BPA/2024',
    issuer: 'Tim Satgas Pemulihan Aset',
    issuedTo: 'Kepala Pusat MPPA',
    issueDate: '2024-02-28',
    status: 'Selesai',
    priority: 'Sedang',
    caseReference: 'CASE-2024-001',
    description:
      'Laporan bulanan kegiatan penelusuran aset bulan Februari berisi progress, temuan, hambatan, dan rencana tindak lanjut',
    validUntil: '2024-12-31',
    attachmentCount: 7,
    isShared: true,
    shareSettings: {
      permission: 'suggest',
      sharedWith: ['USR002', 'USR005', 'USR007'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: [],
    lastModified: '2024-03-01 15:45',
    lastModifiedBy: 'USR005',
    comments: 3,
    version: '1.0',
    approvalStatus: 'Disetujui',
    currentApprovalLevel: 1,
    requiresApprovalLevels: [1],
    approvalHistory: [
      {
        level: 1,
        approverId: 'USR002',
        approverName: 'Siti Rahayu',
        action: 'approved',
        comment: 'Laporan komprehensif dan detail',
        timestamp: '2024-03-01 16:30',
      },
    ],
  },
  {
    id: 'DOC019',
    title: 'Dokumentasi Pelaksanaan Kegiatan - Verifikasi Lapangan',
    type: 'Dokumentasi Pelaksanaan Kegiatan',
    category: 'pelaksanaan',
    subCategory: 'Kasus Korupsi Pengadaan Alkes',
    number: 'DPK/019/BPA/2024',
    issuer: 'Tim Satgas - Tim Lapangan',
    issuedTo: 'Koordinator Tim Satgas',
    issueDate: '2024-02-18',
    status: 'Selesai',
    priority: 'Sedang',
    caseReference: 'CASE-2024-001',
    description:
      'Dokumentasi lengkap kegiatan verifikasi lapangan termasuk foto kegiatan, daftar hadir, berita acara, dan notulensi',
    validUntil: '2024-12-31',
    attachmentCount: 22,
    isShared: true,
    shareSettings: {
      permission: 'edit',
      sharedWith: ['USR005', 'USR007', 'USR008'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: ['USR008'],
    lastModified: '2024-02-22 14:10',
    lastModifiedBy: 'USR008',
    comments: 5,
    version: '2.0',
    approvalStatus: 'Menunggu Persetujuan Level 1',
    currentApprovalLevel: 1,
    requiresApprovalLevels: [1],
    approvalHistory: [],
  },
  {
    id: 'DOC020',
    title: 'Penunjukan Tim Satgas - Kasus Suap Perizinan',
    type: 'Surat Perintah Penunjukan Tim Satgas',
    category: 'persiapan',
    subCategory: 'Kasus Suap Perizinan Tambang',
    number: 'SP-TS/020/BPA/2024',
    issuer: 'Kepala BPA',
    issuedTo: 'Tim Satgas Pemulihan Aset',
    issueDate: '2024-02-05',
    status: 'Aktif',
    priority: 'Sedang',
    caseReference: 'CASE-2024-002',
    description:
      'Surat perintah penunjukan tim satgas untuk menangani kasus suap perizinan tambang',
    validUntil: '2024-08-05',
    attachmentCount: 1,
    isShared: true,
    shareSettings: {
      permission: 'view',
      sharedWith: ['USR003', 'USR006', 'USR007'],
      isPublic: false,
      allowComments: true,
    },
    activeCollaborators: [],
    lastModified: '2024-02-05 16:00',
    lastModifiedBy: 'USR001',
    comments: 1,
    version: '1.0',
    approvalStatus: 'Draft',
    currentApprovalLevel: 0,
    requiresApprovalLevels: [1, 2],
    approvalHistory: [],
  },
];

// Document categories based on SOP
const documentCategories = [
  {
    value: 'persiapan',
    label: 'Persiapan',
    color: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  },
  {
    value: 'pelaksanaan',
    label: 'Pelaksanaan',
    color: 'bg-green-600/20 text-green-400 border-green-500/50',
  },
  {
    value: 'pelaporan',
    label: 'Pelaporan & Evaluasi',
    color: 'bg-purple-600/20 text-purple-400 border-purple-500/50',
  },
];

const documentTypes = [
  // PERSIAPAN - 7 dokumen
  {
    value: 'Surat Permintaan Penelusuran Aset',
    label: 'Surat Permintaan Penelusuran Aset',
    icon: FileText,
    category: 'persiapan',
    description:
      'Permintaan resmi dari Satuan Kerja, Kementerian, Lembaga, Pemerintah Daerah/Desa, BUMN atau BUMD',
  },
  {
    value: 'Surat Perintah Penunjukan Tim Satgas',
    label: 'Surat Perintah Penunjukan Tim Satgas',
    icon: Users,
    category: 'persiapan',
    description: 'Surat tugas untuk melakukan telaah/penelusuran aset',
  },
  {
    value: 'Nota Pendapat (Telaah)',
    label: 'Nota Pendapat (Telaah)',
    icon: Scroll,
    category: 'persiapan',
    description:
      'Berisi dasar, data pendukung, latar belakang, uraian permasalahan, analisis, kesimpulan, dan saran',
  },
  {
    value: 'Surat Perintah Kegiatan Penelusuran Aset',
    label: 'Surat Perintah Kegiatan Penelusuran Aset',
    icon: AlertTriangle,
    category: 'persiapan',
    description: 'Surat perintah pelaksanaan kegiatan penelusuran aset jika disetujui',
  },
  {
    value: 'Surat Balasan Disetujui',
    label: 'Surat Balasan Disetujui',
    icon: CheckCircle2,
    category: 'persiapan',
    description: 'Balasan resmi ke pemohon bila permintaan disetujui',
  },
  {
    value: 'Surat Balasan Tidak Disetujui',
    label: 'Surat Balasan Tidak Disetujui',
    icon: X,
    category: 'persiapan',
    description: 'Balasan resmi ke pemohon bila permintaan ditolak, disertai alasan',
  },
  {
    value: 'Rencana Kegiatan Penelusuran Aset',
    label: 'Rencana Kegiatan Penelusuran Aset',
    icon: Calendar,
    category: 'persiapan',
    description: 'Memuat waktu pelaksanaan, personil, sarana/prasarana, metode, koordinasi, biaya',
  },

  // PELAKSANAAN - 9 dokumen
  {
    value: 'Data Profiling & Pemetaan Aset',
    label: 'Data Profiling & Pemetaan Aset',
    icon: Search,
    category: 'pelaksanaan',
    description: 'Data penguasaan atau kepemilikan aset dari profiling dan pemetaan',
  },
  {
    value: 'Data/Informasi Hasil Pengumpulan',
    label: 'Data/Informasi Hasil Pengumpulan',
    icon: FileText,
    category: 'pelaksanaan',
    description:
      'Hasil pengumpulan data atau informasi aset dari berbagai sumber internal/eksternal',
  },
  {
    value: 'Dokumentasi Identifikasi & Verifikasi Fisik Aset',
    label: 'Dokumentasi Identifikasi & Verifikasi Fisik',
    icon: Eye,
    category: 'pelaksanaan',
    description: 'Foto, video, koordinat, serta catatan hasil identifikasi di lapangan',
  },
  {
    value: 'Dokumentasi Konfirmasi & Verifikasi Data',
    label: 'Dokumentasi Konfirmasi & Verifikasi Data',
    icon: UserCheck,
    category: 'pelaksanaan',
    description: 'Hasil konfirmasi kepada pihak terkait mengenai kepemilikan atau penguasaan aset',
  },
  {
    value: 'Hasil Penelaahan Data/Informasi Aset',
    label: 'Hasil Penelaahan Data/Informasi Aset',
    icon: Scroll,
    category: 'pelaksanaan',
    description: 'Laporan kesesuaian antara data profil/dokumen dengan kondisi fisik aset',
  },
  {
    value: 'Data Perkiraan Nilai Aset',
    label: 'Data Perkiraan Nilai Aset',
    icon: Building,
    category: 'pelaksanaan',
    description:
      'Estimasi nilai aset berdasarkan harga pasar, nilai jual objek pajak, atau metode lain',
  },
  {
    value: 'Nota Dinas Pengantar Laporan Kegiatan',
    label: 'Nota Dinas Pengantar Laporan Kegiatan',
    icon: FileText,
    category: 'pelaksanaan',
    description:
      'Laporan akhir berisi dasar kegiatan, pelaksanaan, kesimpulan, saran, dan dokumentasi',
  },
  {
    value: 'Laporan Kegiatan Penelusuran Aset',
    label: 'Laporan Kegiatan Penelusuran Aset',
    icon: FileText,
    category: 'pelaksanaan',
    description: 'Laporan komprehensif hasil pelaksanaan kegiatan penelusuran aset',
  },
  {
    value: 'Dokumentasi Pelaksanaan Kegiatan',
    label: 'Dokumentasi Pelaksanaan Kegiatan',
    icon: Upload,
    category: 'pelaksanaan',
    description: 'Dokumentasi lengkap pelaksanaan kegiatan penelusuran aset',
  },

  // PELAPORAN & EVALUASI - 2 dokumen
  {
    value: 'Laporan Akhir Hasil Penelusuran Aset',
    label: 'Laporan Akhir Hasil Penelusuran Aset',
    icon: FileText,
    category: 'pelaporan',
    description:
      'Laporan akhir berisi latar belakang, profil, hasil penelusuran, analisis, kesimpulan (rahasia dan terbatas)',
  },
  {
    value: 'Surat Balasan kepada Pemohon',
    label: 'Surat Balasan kepada Pemohon',
    icon: Mail,
    category: 'pelaporan',
    description:
      'Surat resmi untuk menyampaikan Laporan Akhir Hasil Penelusuran Aset kepada pemohon',
  },
];

const statusColors: { [key: string]: string } = {
  Aktif: 'bg-green-600/20 text-green-400 border-green-500/50',
  'Dalam Proses': 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  Selesai: 'bg-slate-600/20 text-slate-300 border-slate-500/50',
  'Menunggu Persetujuan': 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  Dibatalkan: 'bg-red-600/20 text-red-400 border-red-500/50',
};

const approvalStatusColors: { [key: string]: string } = {
  Draft: 'bg-slate-600/20 text-slate-300 border-slate-500/50',
  'Menunggu Persetujuan Level 1': 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  'Menunggu Persetujuan Level 2': 'bg-orange-600/20 text-orange-400 border-orange-500/50',
  'Menunggu Persetujuan Level 3': 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  Disetujui: 'bg-green-600/20 text-green-400 border-green-500/50',
  Ditolak: 'bg-red-600/20 text-red-400 border-red-500/50',
};

const priorityColors: { [key: string]: string } = {
  Tinggi: 'bg-red-600/20 text-red-400 border-red-500/50',
  Sedang: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  Rendah: 'bg-green-600/20 text-green-400 border-green-500/50',
};

const permissionColors: { [key: string]: string } = {
  edit: 'bg-green-600/20 text-green-400 border-green-500/50',
  suggest: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  view: 'bg-slate-600/20 text-slate-300 border-slate-500/50',
};

export function AdministrativeDocuments() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<DocumentType[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [approvalStatusFilter, setApprovalStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, name-asc, name-desc, priority
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showApprovalHistoryDialog, setShowApprovalHistoryDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [shareEmail, setShareEmail] = useState('');
  const [sharePermission, setSharePermission] = useState('view');
  const [approvalAction, setApprovalAction] = useState('approve'); // 'approve' or 'reject'
  const [approvalComment, setApprovalComment] = useState('');
  const currentUserLevel = 3; // Simulate current user as level 3 (Kepala BPA) - in production, get from currentUser context
  const [newDocument, setNewDocument] = useState({
    title: '',
    type: '',
    category: '',
    subCategory: '',
    number: '',
    issuer: '',
    issuedTo: '',
    caseReference: '',
    description: '',
    priority: 'Sedang',
    validUntil: '',
  });

  // Collaboration state for new document
  const [enableCollaboration, setEnableCollaboration] = useState(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>([]);
  const [defaultPermission, setDefaultPermission] = useState('suggest');
  const [allowComments, setAllowComments] = useState(true);

  // Helper function to get user by ID
  const getUserById = (userId: string) => {
    return mockUsers.find(u => u.id === userId);
  };

  // Helper function to reset collaboration form
  const resetCollaborationForm = () => {
    setEnableCollaboration(false);
    setSelectedCollaborators([]);
    setDefaultPermission('suggest');
    setAllowComments(true);
  };

  // Helper function to toggle collaborator selection
  const toggleCollaborator = (userId: string) => {
    setSelectedCollaborators(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  // Get filtered document types based on selected category
  const availableTypes =
    categoryFilter === 'all'
      ? documentTypes
      : documentTypes.filter(dt => dt.category === categoryFilter);

  const filteredAndSortedDocuments = documents
    .filter(doc => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
      const matchesType = typeFilter === 'all' || doc.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || doc.priority === priorityFilter;
      const matchesApprovalStatus =
        approvalStatusFilter === 'all' || doc.approvalStatus === approvalStatusFilter;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesStatus &&
        matchesPriority &&
        matchesApprovalStatus
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        case 'oldest':
          return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'priority':
          const priorityOrder: { [key: string]: number } = { Tinggi: 3, Sedang: 2, Rendah: 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        default:
          return 0;
      }
    });

  const handleAddDocument = () => {
    // Validation
    if (!newDocument.title || !newDocument.category || !newDocument.type || !newDocument.number) {
      toast.error('Mohon lengkapi field yang wajib diisi', {
        description: 'Judul, kategori, jenis dokumen, dan nomor dokumen harus diisi',
      });
      return;
    }
    const document = {
      id: `DOC${String(documents.length + 1).padStart(3, '0')}`,
      ...newDocument,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Menunggu Persetujuan',
      attachmentCount: 0,
      isShared: enableCollaboration && selectedCollaborators.length > 0,
      shareSettings: {
        permission: defaultPermission,
        sharedWith: enableCollaboration ? selectedCollaborators : [],
        isPublic: false,
        allowComments: allowComments,
      },
      activeCollaborators: [],
      lastModified: new Date().toISOString(),
      lastModifiedBy: 'current-user',
      comments: 0,
      version: '1.0',
      approvalStatus: 'Menunggu Persetujuan Level 1',
      currentApprovalLevel: 1,
      requiresApprovalLevels: newDocument.priority === 'Tinggi' ? [1, 2, 3] : [1, 2],
      approvalHistory: [],
    };
    setDocuments([...documents, document]);

    // Show success notification
    if (enableCollaboration && selectedCollaborators.length > 0) {
      toast.success(
        `Dokumen berhasil dibuat dan dibagikan ke ${selectedCollaborators.length} kolaborator`,
        {
          description: `${document.title} siap untuk kolaborasi real-time`,
          duration: 4000,
        }
      );
    } else {
      toast.success('Dokumen berhasil dibuat', {
        description: `${document.title} telah ditambahkan ke sistem`,
        duration: 3000,
      });
    }

    // Reset form
    setNewDocument({
      title: '',
      type: '',
      category: '',
      subCategory: '',
      number: '',
      issuer: '',
      issuedTo: '',
      caseReference: '',
      description: '',
      priority: 'Sedang',
      validUntil: '',
    });
    resetCollaborationForm();
    setShowAddDialog(false);

    // Navigate to document editor with document data
    navigate('/reports/documents/edit', {
      state: {
        document: document,
        collaborators: enableCollaboration ? selectedCollaborators.map(id => getUserById(id)) : [],
        permission: defaultPermission,
        allowComments: allowComments,
      },
    });
  };

  const handleShare = () => {
    if (selectedDocument && shareEmail) {
      // Simulate sharing logic
      const updatedDocuments = documents.map(doc => {
        if (doc.id === selectedDocument.id) {
          return {
            ...doc,
            isShared: true,
            shareSettings: {
              ...doc.shareSettings,
              sharedWith: [...doc.shareSettings.sharedWith, shareEmail],
            },
          };
        }
        return doc;
      });
      setDocuments(updatedDocuments);
      setShareEmail('');
      setShowShareDialog(false);
      setSelectedDocument(null);
    }
  };

  const handleApproval = () => {
    if (!selectedDocument || !approvalComment.trim()) {
      toast.error('Komentar harus diisi', {
        description: 'Mohon berikan komentar untuk keputusan approval Anda',
      });
      return;
    }

    const currentUser = mockUsers.find(u => u.approvalLevel === currentUserLevel);

    if (!currentUser) {
      toast.error('User tidak ditemukan', {
        description: 'Tidak dapat menemukan user dengan level approval yang sesuai',
      });
      return;
    }

    const currentLevel = selectedDocument.currentApprovalLevel;

    const updatedDocuments = documents.map(doc => {
      if (doc.id === selectedDocument.id) {
        const newHistory = [...(doc.approvalHistory || [])];

        newHistory.push({
          level: currentLevel,
          approverId: currentUser.id,
          approverName: currentUser.name,
          action: approvalAction === 'approve' ? 'approved' : 'rejected',
          comment: approvalComment,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        });

        let newStatus = doc.approvalStatus;
        let newLevel = currentLevel;

        if (approvalAction === 'reject') {
          newStatus = 'Ditolak';
        } else {
          // Check if there are more levels to approve
          const requiredLevels = doc.requiresApprovalLevels || [];
          const currentIndex = requiredLevels.indexOf(currentLevel);

          if (currentIndex < requiredLevels.length - 1) {
            newLevel = requiredLevels[currentIndex + 1];
            newStatus = `Menunggu Persetujuan Level ${newLevel}`;
          } else {
            newStatus = 'Disetujui';
          }
        }

        return {
          ...doc,
          approvalStatus: newStatus,
          currentApprovalLevel: newLevel,
          approvalHistory: newHistory,
          status: newStatus === 'Disetujui' ? 'Aktif' : doc.status,
        };
      }
      return doc;
    });

    setDocuments(updatedDocuments);

    toast.success(approvalAction === 'approve' ? 'Dokumen berhasil disetujui' : 'Dokumen ditolak', {
      description:
        approvalAction === 'approve'
          ? 'Dokumen telah diteruskan ke tahap berikutnya'
          : 'Dokumen perlu diperbaiki oleh pembuat',
    });

    setApprovalComment('');
    setShowApprovalDialog(false);
    setSelectedDocument(null);
  };

  const canUserApprove = (doc: (typeof mockDocuments)[0]) => {
    if (
      !doc.approvalStatus ||
      doc.approvalStatus === 'Disetujui' ||
      doc.approvalStatus === 'Ditolak'
    ) {
      return false;
    }
    return doc.currentApprovalLevel === currentUserLevel;
  };

  const getTypeIcon = (type: string) => {
    const docType = documentTypes.find(dt => dt.value === type);
    return docType ? docType.icon : FileText;
  };

  const getShareStatusIcon = (doc: (typeof mockDocuments)[0]) => {
    if (!doc.isShared) return <Lock className="w-3 h-3 text-slate-400" />;
    if (doc.shareSettings.isPublic) return <Globe className="w-3 h-3 text-blue-400" />;
    return <Users className="w-3 h-3 text-green-400" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-white">Berkas Administrasi</h1>
          <p className="text-slate-400 mt-1">
            Kelola surat perintah, penelusuran, telaahan hukum, dan dokumen administrasi lainnya
            dengan kolaborasi real-time
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Dokumen
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Buat Dokumen Administrasi Baru</DialogTitle>
              <DialogDescription className="text-slate-400">
                Buat dokumen baru yang dapat dibagikan dan dikerjakan secara kolaboratif
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2 lg:col-span-2">
                <Label>
                  Judul Dokumen <span className="text-red-400">*</span>
                </Label>
                <Input
                  value={newDocument.title}
                  onChange={e => setNewDocument(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan judul dokumen"
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Kategori SOP <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={newDocument.category}
                  onValueChange={value => {
                    setNewDocument(prev => ({ ...prev, category: value, type: '' }));
                  }}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Pilih kategori SOP" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    {documentCategories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  Jenis Dokumen <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={newDocument.type}
                  onValueChange={value => {
                    const selectedType = documentTypes.find(dt => dt.value === value);
                    setNewDocument(prev => ({
                      ...prev,
                      type: value,
                      category: selectedType?.category || prev.category,
                    }));
                  }}
                  disabled={!newDocument.category}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue
                      placeholder={
                        newDocument.category
                          ? 'Pilih jenis dokumen'
                          : 'Pilih kategori terlebih dahulu'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    {documentTypes
                      .filter(dt => !newDocument.category || dt.category === newDocument.category)
                      .map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {newDocument.type &&
                  documentTypes.find(dt => dt.value === newDocument.type)?.description && (
                    <p className="text-xs text-slate-400 mt-1">
                      {documentTypes.find(dt => dt.value === newDocument.type)?.description}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label>Sub-kategori</Label>
                <Input
                  value={newDocument.subCategory}
                  onChange={e => setNewDocument(prev => ({ ...prev, subCategory: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Contoh: Kasus Korupsi Pengadaan Alkes, Proyek X, dll"
                />
                <p className="text-xs text-slate-400">
                  Opsional: Gunakan untuk mengelompokkan dokumen berdasarkan kasus, proyek, atau
                  tema tertentu
                </p>
              </div>
              <div className="space-y-2">
                <Label>
                  Nomor Dokumen <span className="text-red-400">*</span>
                </Label>
                <Input
                  value={newDocument.number}
                  onChange={e => setNewDocument(prev => ({ ...prev, number: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="SPP/001/BPA/2024"
                />
              </div>
              <div className="space-y-2">
                <Label>Penerbit</Label>
                <Input
                  value={newDocument.issuer}
                  onChange={e => setNewDocument(prev => ({ ...prev, issuer: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Kepala BPA"
                />
              </div>
              <div className="space-y-2">
                <Label>Ditujukan Kepada</Label>
                <Input
                  value={newDocument.issuedTo}
                  onChange={e => setNewDocument(prev => ({ ...prev, issuedTo: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Tim Penyidik"
                />
              </div>
              <div className="space-y-2">
                <Label>Referensi Kasus</Label>
                <Input
                  value={newDocument.caseReference}
                  onChange={e =>
                    setNewDocument(prev => ({ ...prev, caseReference: e.target.value }))
                  }
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="CASE-2024-001"
                />
              </div>
              <div className="space-y-2">
                <Label>Prioritas</Label>
                <Select
                  value={newDocument.priority}
                  onValueChange={value => setNewDocument(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="Tinggi">Tinggi</SelectItem>
                    <SelectItem value="Sedang">Sedang</SelectItem>
                    <SelectItem value="Rendah">Rendah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Berlaku Hingga</Label>
                <Input
                  type="date"
                  value={newDocument.validUntil}
                  onChange={e => setNewDocument(prev => ({ ...prev, validUntil: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white"
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label>Deskripsi</Label>
                <Textarea
                  value={newDocument.description}
                  onChange={e => setNewDocument(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300 resize-none"
                  placeholder="Deskripsi dokumen..."
                  rows={3}
                />
              </div>

              {/* Collaboration Section */}
              <div className="lg:col-span-2">
                <Separator className="bg-slate-600 my-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Kolaborasi Real-time
                      </h4>
                      <p className="text-slate-400 text-sm">
                        Undang kolaborator untuk bekerja bersama pada dokumen ini
                      </p>
                    </div>
                    <Switch
                      checked={enableCollaboration}
                      onCheckedChange={setEnableCollaboration}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>

                  {enableCollaboration && (
                    <div className="space-y-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                      {/* Collaborator Selection */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <UserPlus className="w-4 h-4" />
                          Pilih Kolaborator
                        </Label>
                        <div className="bg-slate-700 border border-slate-600 rounded-lg p-3 max-h-40 overflow-y-auto">
                          {mockUsers.map(user => (
                            <div key={user.id} className="flex items-center space-x-3 py-2">
                              <Checkbox
                                id={`collab-${user.id}`}
                                checked={selectedCollaborators.includes(user.id)}
                                onCheckedChange={() => toggleCollaborator(user.id)}
                                className="border-slate-500"
                              />
                              <label
                                htmlFor={`collab-${user.id}`}
                                className="flex items-center space-x-3 cursor-pointer flex-1"
                              >
                                <Avatar className="w-7 h-7">
                                  <AvatarFallback className={`${user.color} text-white text-xs`}>
                                    {user.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-white truncate">{user.name}</p>
                                  <p className="text-xs text-slate-400 truncate">{user.role}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      user.status === 'online'
                                        ? 'bg-green-400'
                                        : user.status === 'away'
                                          ? 'bg-yellow-400'
                                          : 'bg-slate-400'
                                    }`}
                                  ></div>
                                  <span className="text-xs text-slate-400">{user.status}</span>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>

                        {selectedCollaborators.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-xs text-slate-400">
                              Kolaborator Terpilih ({selectedCollaborators.length})
                            </Label>
                            <div className="flex flex-wrap gap-2">
                              {selectedCollaborators.map(userId => {
                                const user = getUserById(userId);
                                return user ? (
                                  <div
                                    key={userId}
                                    className="flex items-center gap-2 bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full text-xs"
                                  >
                                    <Avatar className="w-4 h-4">
                                      <AvatarFallback
                                        className={`${user.color} text-white text-xs`}
                                      >
                                        {user.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{user.name}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-4 w-4 p-0 hover:bg-red-500/20"
                                      onClick={() => toggleCollaborator(userId)}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Collaboration Settings */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm">Izin Default</Label>
                          <Select value={defaultPermission} onValueChange={setDefaultPermission}>
                            <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-600 border-slate-500 text-white">
                              <SelectItem value="view">
                                <div className="flex items-center gap-2">
                                  <Eye className="w-4 h-4" />
                                  Hanya Lihat
                                </div>
                              </SelectItem>
                              <SelectItem value="suggest">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="w-4 h-4" />
                                  Komentar & Saran
                                </div>
                              </SelectItem>
                              <SelectItem value="edit">
                                <div className="flex items-center gap-2">
                                  <Edit className="w-4 h-4" />
                                  Edit Dokumen
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">Pengaturan Komentar</Label>
                          <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
                            <Switch
                              checked={allowComments}
                              onCheckedChange={setAllowComments}
                              className="data-[state=checked]:bg-green-600"
                            />
                            <div>
                              <p className="text-sm text-white">Izinkan Komentar</p>
                              <p className="text-xs text-slate-400">
                                Kolaborator dapat menambah komentar dan saran
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Collaboration Preview */}
                      {selectedCollaborators.length > 0 && (
                        <div className="space-y-2 p-3 bg-slate-800 rounded-lg border border-slate-600">
                          <Label className="text-sm text-green-400 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Ringkasan Kolaborasi
                          </Label>
                          <div className="text-sm text-slate-300">
                            <p>
                              •{' '}
                              <span className="text-white">
                                {selectedCollaborators.length} kolaborator
                              </span>{' '}
                              akan diundang
                            </p>
                            <p>
                              • Izin default:{' '}
                              <Badge
                                className={`${permissionColors[defaultPermission]} text-xs ml-1`}
                              >
                                {defaultPermission === 'view'
                                  ? 'Hanya Lihat'
                                  : defaultPermission === 'suggest'
                                    ? 'Komentar & Saran'
                                    : 'Edit Dokumen'}
                              </Badge>
                            </p>
                            <p>
                              • Komentar:{' '}
                              <span className={allowComments ? 'text-green-400' : 'text-red-400'}>
                                {allowComments ? 'Diizinkan' : 'Dinonaktifkan'}
                              </span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddDialog(false);
                  resetCollaborationForm();
                }}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Batal
              </Button>
              <Button onClick={handleAddDocument} className="bg-blue-600 hover:bg-blue-500">
                {enableCollaboration && selectedCollaborators.length > 0
                  ? `Buat & Bagikan ke ${selectedCollaborators.length} Kolaborator`
                  : 'Buat Dokumen'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters & Sort */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari dokumen, nomor, atau penerbit..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
              />
            </div>

            {/* Filter Section */}
            <div className="flex flex-col lg:flex-row gap-3">
              <Select
                value={categoryFilter}
                onValueChange={value => {
                  setCategoryFilter(value);
                  setTypeFilter('all');
                }}
              >
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white w-full lg:w-56">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Kategori SOP" />
                </SelectTrigger>
                <SelectContent className="bg-slate-600 border-slate-500 text-white">
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {documentCategories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white w-full lg:w-56">
                  <SelectValue placeholder="Jenis Dokumen" />
                </SelectTrigger>
                <SelectContent className="bg-slate-600 border-slate-500 text-white">
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  {availableTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white w-full lg:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-600 border-slate-500 text-white">
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                  <SelectItem value="Menunggu Persetujuan">Menunggu Persetujuan</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white w-full lg:w-48">
                  <SelectValue placeholder="Prioritas" />
                </SelectTrigger>
                <SelectContent className="bg-slate-600 border-slate-500 text-white">
                  <SelectItem value="all">Semua Prioritas</SelectItem>
                  <SelectItem value="Tinggi">Tinggi</SelectItem>
                  <SelectItem value="Sedang">Sedang</SelectItem>
                  <SelectItem value="Rendah">Rendah</SelectItem>
                </SelectContent>
              </Select>

              <Select value={approvalStatusFilter} onValueChange={setApprovalStatusFilter}>
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white w-full lg:w-56">
                  <SelectValue placeholder="Status Approval" />
                </SelectTrigger>
                <SelectContent className="bg-slate-600 border-slate-500 text-white">
                  <SelectItem value="all">Semua Status Approval</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Menunggu Persetujuan Level 1">Menunggu Level 1</SelectItem>
                  <SelectItem value="Menunggu Persetujuan Level 2">Menunggu Level 2</SelectItem>
                  <SelectItem value="Menunggu Persetujuan Level 3">Menunggu Level 3</SelectItem>
                  <SelectItem value="Disetujui">Disetujui</SelectItem>
                  <SelectItem value="Ditolak">Ditolak</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-slate-600 border-slate-500 text-white w-full lg:w-48">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent className="bg-slate-600 border-slate-500 text-white">
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="oldest">Terlama</SelectItem>
                  <SelectItem value="name-asc">Nama A-Z</SelectItem>
                  <SelectItem value="name-desc">Nama Z-A</SelectItem>
                  <SelectItem value="priority">Prioritas Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">
            Dokumen Administrasi ({filteredAndSortedDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Dokumen</TableHead>
                  <TableHead className="text-slate-300">Kategori</TableHead>
                  <TableHead className="text-slate-300">Status Approval</TableHead>
                  <TableHead className="text-slate-300">Kolaborasi</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Prioritas</TableHead>
                  <TableHead className="text-slate-300">Terakhir Diubah</TableHead>
                  <TableHead className="text-slate-300">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedDocuments.map(doc => {
                  const TypeIcon = getTypeIcon(doc.type);
                  return (
                    <TableRow key={doc.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="w-4 h-4 text-blue-400" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-white text-sm truncate max-w-xs">{doc.title}</p>
                              {getShareStatusIcon(doc)}
                            </div>
                            <p className="text-xs text-slate-400">{doc.number}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${documentCategories.find(c => c.value === doc.category)?.color || 'bg-slate-600/20 text-slate-300 border-slate-500/50'} text-xs`}
                        >
                          {documentCategories.find(c => c.value === doc.category)?.label ||
                            doc.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${approvalStatusColors[doc.approvalStatus] || 'bg-slate-600/20 text-slate-300 border-slate-500/50'} text-xs`}
                        >
                          {doc.approvalStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* Active Collaborators */}
                          {doc.activeCollaborators.length > 0 ? (
                            <div className="flex items-center gap-1 text-xs text-green-400">
                              <Users className="w-3 h-3" />
                              <span>{doc.activeCollaborators.length}</span>
                            </div>
                          ) : doc.isShared ? (
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <Users className="w-3 h-3" />
                              <span>{doc.shareSettings.sharedWith.length}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-500">-</span>
                          )}

                          {/* Comments */}
                          {doc.comments > 0 && (
                            <div className="flex items-center gap-1 text-xs text-blue-400">
                              <MessageSquare className="w-3 h-3" />
                              <span>{doc.comments}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[doc.status]} text-xs`}>
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${priorityColors[doc.priority]} text-xs`}>
                          {doc.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="text-slate-300">
                            {new Date(doc.lastModified).toLocaleDateString('id-ID')}
                          </p>
                          <p className="text-xs text-slate-500">
                            oleh {getUserById(doc.lastModifiedBy)?.name || 'Unknown'}
                          </p>
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
                          <DropdownMenuContent
                            align="end"
                            className="bg-slate-800 border-slate-700"
                          >
                            <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                              <Eye className="w-4 h-4 mr-2" />
                              Buka Dokumen
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-green-400 focus:bg-green-600/20"
                              onClick={() => {
                                navigate(`/reports/documents/edit?id=${doc.id}`);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Dokumen
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-600" />
                            <DropdownMenuItem
                              className="text-blue-400 focus:bg-blue-600/20"
                              onClick={() => {
                                setSelectedDocument(doc);
                                setShowShareDialog(true);
                              }}
                            >
                              <Share2 className="w-4 h-4 mr-2" />
                              Bagikan
                            </DropdownMenuItem>
                            {canUserApprove(doc) && (
                              <>
                                <DropdownMenuSeparator className="bg-slate-600" />
                                <DropdownMenuItem
                                  className="text-green-400 focus:bg-green-600/20"
                                  onClick={() => {
                                    setSelectedDocument(doc);
                                    setApprovalAction('approve');
                                    setShowApprovalDialog(true);
                                  }}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Setujui Dokumen
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-400 focus:bg-red-600/20"
                                  onClick={() => {
                                    setSelectedDocument(doc);
                                    setApprovalAction('reject');
                                    setShowApprovalDialog(true);
                                  }}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Tolak Dokumen
                                </DropdownMenuItem>
                              </>
                            )}
                            {doc.approvalHistory && doc.approvalHistory.length > 0 && (
                              <DropdownMenuItem
                                className="text-cyan-400 focus:bg-cyan-600/20"
                                onClick={() => {
                                  setSelectedDocument(doc);
                                  setShowApprovalHistoryDialog(true);
                                }}
                              >
                                <History className="w-4 h-4 mr-2" />
                                Riwayat Approval
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-slate-600" />
                            <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Komentar ({doc.comments})
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-yellow-400 focus:bg-yellow-600/20">
                              <Clock className="w-4 h-4 mr-2" />
                              Riwayat Versi
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-600" />
                            <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                              <Download className="w-4 h-4 mr-2" />
                              Unduh PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 focus:bg-red-600/20">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus Dokumen
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

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredAndSortedDocuments.map(doc => {
              const TypeIcon = getTypeIcon(doc.type);
              return (
                <Card key={doc.id} className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TypeIcon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-white font-medium truncate">{doc.title}</p>
                            {getShareStatusIcon(doc)}
                          </div>
                          <p className="text-xs text-slate-400">{doc.number}</p>
                          {doc.subCategory && (
                            <p className="text-xs text-blue-400 flex items-center gap-1 mt-0.5">
                              <Building className="w-3 h-3" />
                              {doc.subCategory}
                            </p>
                          )}
                          <p className="text-xs text-slate-500">v{doc.version}</p>
                        </div>
                      </div>
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
                            Buka Dokumen
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-green-400 focus:bg-green-600/20"
                            onClick={() => {
                              navigate(`/reports/documents/edit?id=${doc.id}`);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Dokumen
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-600" />
                          <DropdownMenuItem
                            className="text-blue-400 focus:bg-blue-600/20"
                            onClick={() => {
                              setSelectedDocument(doc);
                              setShowShareDialog(true);
                            }}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Bagikan
                          </DropdownMenuItem>
                          {canUserApprove(doc) && (
                            <>
                              <DropdownMenuSeparator className="bg-slate-600" />
                              <DropdownMenuItem
                                className="text-green-400 focus:bg-green-600/20"
                                onClick={() => {
                                  setSelectedDocument(doc);
                                  setApprovalAction('approve');
                                  setShowApprovalDialog(true);
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Setujui Dokumen
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-400 focus:bg-red-600/20"
                                onClick={() => {
                                  setSelectedDocument(doc);
                                  setApprovalAction('reject');
                                  setShowApprovalDialog(true);
                                }}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Tolak Dokumen
                              </DropdownMenuItem>
                            </>
                          )}
                          {doc.approvalHistory && doc.approvalHistory.length > 0 && (
                            <DropdownMenuItem
                              className="text-cyan-400 focus:bg-cyan-600/20"
                              onClick={() => {
                                setSelectedDocument(doc);
                                setShowApprovalHistoryDialog(true);
                              }}
                            >
                              <History className="w-4 h-4 mr-2" />
                              Riwayat Approval
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-slate-600" />
                          <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Komentar ({doc.comments})
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                            <Download className="w-4 h-4 mr-2" />
                            Unduh PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Collaboration Info */}
                    {(doc.activeCollaborators.length > 0 || doc.isShared || doc.comments > 0) && (
                      <div className="flex items-center gap-3 mb-3 p-2 bg-slate-800 rounded-lg">
                        {doc.activeCollaborators.length > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1">
                              {doc.activeCollaborators.slice(0, 3).map(userId => {
                                const user = getUserById(userId);
                                return user ? (
                                  <Avatar key={userId} className="w-5 h-5 border border-slate-600">
                                    <AvatarFallback className={`${user.color} text-white text-xs`}>
                                      {user.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                ) : null;
                              })}
                            </div>
                            <span className="text-xs text-green-400">sedang mengedit</span>
                          </div>
                        )}

                        {doc.isShared && (
                          <div className="flex items-center gap-1 text-xs text-blue-400">
                            <Users className="w-3 h-3" />
                            <span>{doc.shareSettings.sharedWith.length} berbagi</span>
                          </div>
                        )}

                        {doc.comments > 0 && (
                          <div className="flex items-center gap-1 text-xs text-yellow-400">
                            <MessageSquare className="w-3 h-3" />
                            <span>{doc.comments} komentar</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <p className="text-slate-400">Kategori</p>
                        <Badge
                          className={`${documentCategories.find(c => c.value === doc.category)?.color || 'bg-slate-600/20 text-slate-300 border-slate-500/50'} text-xs`}
                        >
                          {documentCategories.find(c => c.value === doc.category)?.label ||
                            doc.category}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-slate-400">Approval</p>
                        {doc.approvalStatus ? (
                          <Badge className={`${approvalStatusColors[doc.approvalStatus]} text-xs`}>
                            {doc.approvalStatus}
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-600/20 text-slate-400 border-slate-500/50 text-xs">
                            Tanpa Approval
                          </Badge>
                        )}
                      </div>
                      {doc.subCategory && (
                        <div>
                          <p className="text-slate-400">Sub-kategori</p>
                          <p className="text-blue-400 text-xs truncate">{doc.subCategory}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-slate-400">Status</p>
                        <Badge className={`${statusColors[doc.status]} text-xs`}>
                          {doc.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-slate-400">Prioritas</p>
                        <Badge className={`${priorityColors[doc.priority]} text-xs`}>
                          {doc.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-slate-400">Penerbit</p>
                        <p className="text-slate-200">{doc.issuer}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Terakhir diubah</p>
                        <p className="text-slate-200">
                          {new Date(doc.lastModified).toLocaleDateString('id-ID')} oleh{' '}
                          {getUserById(doc.lastModifiedBy)?.name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Bagikan Dokumen
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Undang orang lain untuk berkolaborasi pada dokumen ini
            </DialogDescription>
          </DialogHeader>

          {selectedDocument && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-white font-medium text-sm">{selectedDocument.title}</p>
                <p className="text-slate-400 text-xs">{selectedDocument.number}</p>
              </div>

              <div className="space-y-2">
                <Label>Email kolaborator</Label>
                <Input
                  type="email"
                  value={shareEmail}
                  onChange={e => setShareEmail(e.target.value)}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="nama@bpa.go.id"
                />
              </div>

              <div className="space-y-2">
                <Label>Izin akses</Label>
                <Select value={sharePermission} onValueChange={setSharePermission}>
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="view">Hanya lihat</SelectItem>
                    <SelectItem value="suggest">Komentar & saran</SelectItem>
                    <SelectItem value="edit">Edit dokumen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedDocument.shareSettings.sharedWith.length > 0 && (
                <div className="space-y-2">
                  <Label>Sudah dibagikan dengan</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedDocument.shareSettings.sharedWith.map((userId, index) => {
                      const user = getUserById(userId);
                      return user ? (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-700 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className={`${user.color} text-white text-xs`}>
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm text-white">{user.name}</p>
                              <p className="text-xs text-slate-400">{user.role}</p>
                            </div>
                          </div>
                          <Badge
                            className={`${permissionColors[selectedDocument.shareSettings.permission]} text-xs`}
                          >
                            {selectedDocument.shareSettings.permission}
                          </Badge>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-700 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-white">{userId}</span>
                          </div>
                          <Badge
                            className={`${permissionColors[selectedDocument.shareSettings.permission]} text-xs`}
                          >
                            {selectedDocument.shareSettings.permission}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowShareDialog(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Batal
            </Button>
            <Button onClick={handleShare} className="bg-blue-600 hover:bg-blue-500">
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {approvalAction === 'approve' ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Setujui Dokumen
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  Tolak Dokumen
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {approvalAction === 'approve'
                ? 'Dokumen akan diteruskan ke tahap approval berikutnya'
                : 'Dokumen akan dikembalikan ke pembuat untuk diperbaiki'}
            </DialogDescription>
          </DialogHeader>

          {selectedDocument && (
            <div className="space-y-4">
              {/* Document Info */}
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-white font-medium">{selectedDocument.title}</p>
                      <p className="text-sm text-slate-400">{selectedDocument.number}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          className={
                            approvalStatusColors[selectedDocument.approvalStatus || 'Draft']
                          }
                        >
                          {selectedDocument.approvalStatus}
                        </Badge>
                        <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/50">
                          Level {selectedDocument.currentApprovalLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Approval Comment */}
              <div className="space-y-2">
                <Label className="text-slate-300">
                  Komentar <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  placeholder={
                    approvalAction === 'approve'
                      ? 'Berikan catatan atau komentar untuk persetujuan...'
                      : 'Jelaskan alasan penolakan dan perbaikan yang diperlukan...'
                  }
                  value={approvalComment}
                  onChange={e => setApprovalComment(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                />
              </div>

              {/* Current Approval Level Info */}
              <Card className="bg-blue-600/10 border-blue-500/50">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-400 font-medium">
                        {
                          approvalLevels.find(
                            l => l.level === selectedDocument?.currentApprovalLevel
                          )?.name
                        }
                      </p>
                      <p className="text-xs text-blue-300 mt-0.5">
                        {
                          approvalLevels.find(
                            l => l.level === selectedDocument?.currentApprovalLevel
                          )?.description
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowApprovalDialog(false);
                    setApprovalComment('');
                  }}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleApproval}
                  className={
                    approvalAction === 'approve'
                      ? 'bg-green-600 hover:bg-green-500'
                      : 'bg-red-600 hover:bg-red-500'
                  }
                >
                  {approvalAction === 'approve' ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Setujui
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Tolak
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval History Dialog */}
      <Dialog open={showApprovalHistoryDialog} onOpenChange={setShowApprovalHistoryDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-400" />
              Riwayat Approval Dokumen
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Timeline persetujuan dokumen dari berbagai tingkat
            </DialogDescription>
          </DialogHeader>

          {selectedDocument && (
            <div className="space-y-4">
              {/* Document Header */}
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">{selectedDocument.title}</p>
                        <p className="text-sm text-slate-400">{selectedDocument.number}</p>
                      </div>
                    </div>
                    <Badge
                      className={approvalStatusColors[selectedDocument.approvalStatus || 'Draft']}
                    >
                      {selectedDocument.approvalStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Approval Timeline */}
              <div className="space-y-3">
                <Label className="text-slate-300">Timeline Approval</Label>
                <div className="space-y-3">
                  {selectedDocument.approvalHistory &&
                    selectedDocument.approvalHistory.map((approval, index) => (
                      <Card
                        key={index}
                        className={`border-2 ${
                          approval.action === 'approved'
                            ? 'bg-green-600/10 border-green-500/50'
                            : 'bg-red-600/10 border-red-500/50'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                approval.action === 'approved' ? 'bg-green-600/20' : 'bg-red-600/20'
                              }`}
                            >
                              {approval.action === 'approved' ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p
                                      className={`font-medium ${
                                        approval.action === 'approved'
                                          ? 'text-green-400'
                                          : 'text-red-400'
                                      }`}
                                    >
                                      {approval.action === 'approved' ? 'Disetujui' : 'Ditolak'}
                                    </p>
                                    <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/50">
                                      Level {approval.level}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-slate-300 mt-1">
                                    {approval.approverName}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {approvalLevels.find(l => l.level === approval.level)?.name}
                                  </p>
                                </div>
                                <p className="text-xs text-slate-500">{approval.timestamp}</p>
                              </div>
                              {approval.comment && (
                                <div className="mt-3 p-3 bg-slate-800 rounded-lg border border-slate-600">
                                  <div className="flex items-start gap-2">
                                    <MessageSquare className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-slate-300">{approval.comment}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Remaining Approval Levels */}
              {selectedDocument.requiresApprovalLevels &&
                selectedDocument.approvalStatus !== 'Disetujui' &&
                selectedDocument.approvalStatus !== 'Ditolak' && (
                  <div className="space-y-2">
                    <Label className="text-slate-300">Tahap Approval Berikutnya</Label>
                    <div className="space-y-2">
                      {selectedDocument.requiresApprovalLevels
                        .filter(level => level > (selectedDocument.approvalHistory?.length || 0))
                        .map(level => (
                          <Card key={level} className="bg-slate-700 border-slate-600">
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center">
                                  <Clock className="w-4 h-4 text-yellow-400" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm text-white font-medium">
                                      {approvalLevels.find(l => l.level === level)?.name}
                                    </p>
                                    <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/50">
                                      Level {level}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-slate-400">
                                    {approvalLevels.find(l => l.level === level)?.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
