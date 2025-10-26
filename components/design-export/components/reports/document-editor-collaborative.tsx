import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  ArrowLeft,
  Save,
  Users,
  MessageSquare,
  Clock,
  Eye,
  Edit,
  Share2,
  Download,
  FileText,
  CheckCircle2,
  AlertCircle,
  Info,
  Undo,
  Redo,
  History,
  UserPlus,
  Settings,
  Lock,
  Globe,
  Mail,
  Copy,
  X,
  Check,
  MoreVertical,
  Trash2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Strikethrough,
  Subscript,
  Superscript,
  Highlighter,
  Type,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';

// Mock users
const mockUsers = [
  {
    id: 'USR001',
    name: 'Ahmad Sutanto',
    role: 'Kepala BPA',
    email: 'ahmad.sutanto@bpa.go.id',
    avatar: 'AS',
    status: 'online',
    color: 'bg-blue-500',
  },
  {
    id: 'USR002',
    name: 'Siti Rahayu',
    role: 'Direktur Eksekutif',
    email: 'siti.rahayu@bpa.go.id',
    avatar: 'SR',
    status: 'online',
    color: 'bg-green-500',
  },
  {
    id: 'USR003',
    name: 'Budi Santoso',
    role: 'Kepala Bagian Hukum',
    email: 'budi.santoso@bpa.go.id',
    avatar: 'BS',
    status: 'offline',
    color: 'bg-purple-500',
  },
  {
    id: 'USR004',
    name: 'Rina Pertiwi',
    role: 'Sekretaris BPA',
    email: 'rina.pertiwi@bpa.go.id',
    avatar: 'RP',
    status: 'online',
    color: 'bg-pink-500',
  },
  {
    id: 'USR005',
    name: 'Dedi Firmansyah',
    role: 'Koordinator Tim Penyidik',
    email: 'dedi.firmansyah@bpa.go.id',
    avatar: 'DF',
    status: 'online',
    color: 'bg-orange-500',
  },
  {
    id: 'USR006',
    name: 'Maya Sari',
    role: 'Analisis Hukum',
    email: 'maya.sari@bpa.go.id',
    avatar: 'MS',
    status: 'away',
    color: 'bg-red-500',
  },
  {
    id: 'USR007',
    name: 'Agus Wibowo',
    role: 'Tim Penelusuran Aset',
    email: 'agus.wibowo@bpa.go.id',
    avatar: 'AW',
    status: 'online',
    color: 'bg-teal-500',
  },
  {
    id: 'USR008',
    name: 'Linda Kusuma',
    role: 'Supervisor Investigasi',
    email: 'linda.kusuma@bpa.go.id',
    avatar: 'LK',
    status: 'offline',
    color: 'bg-yellow-500',
  },
];

interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
  resolved: boolean;
  replies?: Comment[];
}

interface EditHistory {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  field?: string;
  oldValue?: string;
  newValue?: string;
}

interface ActiveEditor {
  userId: string;
  field: string;
  cursor: number;
  timestamp: Date;
}

export function DocumentEditorCollaborative() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Get document data from location state (if navigated from AdministrativeDocuments)
  const documentFromState = location.state?.document;

  // These variables are available for future use when implementing collaborative features
  // const collaboratorsFromState = location.state?.collaborators || [];
  // const permissionFromState = location.state?.permission || 'suggest';
  // const allowCommentsFromState = location.state?.allowComments !== undefined ? location.state.allowComments : true;
  // const docId = searchParams.get('id');

  // Document state
  const [document, setDocument] = useState(
    documentFromState || {
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
      content: `RENCANA KEGIATAN PENELUSURAN ASET
Nomor: RKPA/006/BPA/2024

I. PENDAHULUAN
Berdasarkan Surat Perintah Kegiatan Penelusuran Aset Nomor SPKA/004/BPA/2024 tanggal 25 Januari 2024, Tim Satgas Pemulihan Aset ditugaskan untuk melaksanakan kegiatan penelusuran aset terkait kasus korupsi pengadaan alat kesehatan.

II. DASAR HUKUM
1. Undang-Undang Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi
2. Peraturan Kejaksaan Agung Nomor 17 Tahun 2014 tentang Pengelolaan Benda Sitaan dan Barang Rampasan Negara
3. Surat Edaran Jaksa Agung tentang Petunjuk Teknis Penelusuran Aset

III. TUJUAN
1. Mengidentifikasi seluruh aset yang dimiliki atau dikuasai oleh tersangka
2. Melakukan verifikasi fisik dan yuridis terhadap aset yang teridentifikasi
3. Memperkirakan nilai total aset untuk keperluan perampasan negara
4. Memberikan rekomendasi tindak lanjut kepada penyidik

IV. WAKTU PELAKSANAAN
Kegiatan penelusuran aset dilaksanakan selama 4 bulan:
- Tahap Persiapan: 1-15 Februari 2024
- Tahap Pengumpulan Data: 16 Februari - 15 Maret 2024
- Tahap Verifikasi Lapangan: 16 Maret - 15 April 2024
- Tahap Analisis & Pelaporan: 16 April - 30 Mei 2024

V. PERSONIL YANG TERLIBAT
1. Koordinator Tim: Dedi Firmansyah
2. Analis Data: 3 orang
3. Tim Lapangan: 5 orang
4. Ahli Penilai: 2 orang
5. Administrasi: 2 orang

VI. SARANA DAN PRASARANA
1. Kendaraan operasional: 3 unit
2. Peralatan komunikasi dan dokumentasi
3. Laptop dan software pendukung
4. Ruang kerja dan fasilitas kantor

VII. METODE PENELUSURAN
1. Profiling tersangka dan keluarga
2. Koordinasi dengan instansi terkait (BPN, PPATK, Bank, dll)
3. Penelusuran digital melalui database publik
4. Verifikasi fisik di lapangan
5. Analisis dan cross-checking data

VIII. ANGGARAN BIAYA
Total anggaran kegiatan: Rp 450.000.000,-
Rincian:
- Transportasi dan akomodasi: Rp 200.000.000,-
- Biaya koordinasi dan komunikasi: Rp 100.000.000,-
- Biaya penilai dan ahli: Rp 100.000.000,-
- Biaya operasional lainnya: Rp 50.000.000,-

IX. HASIL YANG DIHARAPKAN
1. Database lengkap aset tersangka
2. Dokumentasi verifikasi fisik
3. Estimasi nilai total aset
4. Laporan akhir hasil penelusuran aset

X. PENUTUP
Rencana kegiatan ini disusun sebagai panduan pelaksanaan penelusuran aset dan dapat disesuaikan dengan kondisi di lapangan.

Jakarta, 28 Januari 2024
Koordinator Tim Satgas

Dedi Firmansyah`,
      version: '1.4',
      lastModified: new Date(),
      lastModifiedBy: 'USR005',
    }
  );

  // Collaboration state
  const [activeCollaborators, setActiveCollaborators] = useState(['USR005', 'USR007', 'USR008']);
  const [sharedWith, setSharedWith] = useState(['USR002', 'USR005', 'USR007', 'USR008']);
  const [permission, setPermission] = useState('edit');
  const [allowComments, setAllowComments] = useState(true);

  // Comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'C001',
      userId: 'USR007',
      text: 'Apakah anggaran transportasi sudah termasuk biaya rental kendaraan untuk tim lapangan?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: false,
      replies: [
        {
          id: 'C001-R1',
          userId: 'USR005',
          text: 'Ya, sudah termasuk. Kita akan sewa 3 unit mobil untuk durasi 4 bulan.',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          resolved: false,
        },
      ],
    },
    {
      id: 'C002',
      userId: 'USR008',
      text: 'Mohon tambahkan item peralatan GPS untuk memudahkan mapping lokasi properti',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      resolved: false,
    },
    {
      id: 'C003',
      userId: 'USR002',
      text: 'Timeline terlihat realistis. Pastikan koordinasi dengan PPATK dilakukan di minggu pertama.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      resolved: true,
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Edit history
  const [editHistory, setEditHistory] = useState<EditHistory[]>([
    {
      id: 'H001',
      userId: 'USR005',
      action: 'Mengubah anggaran total',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      field: 'content',
      oldValue: 'Rp 400.000.000,-',
      newValue: 'Rp 450.000.000,-',
    },
    {
      id: 'H002',
      userId: 'USR007',
      action: 'Menambahkan detail metode penelusuran',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      field: 'content',
    },
    {
      id: 'H003',
      userId: 'USR008',
      action: 'Mengubah jumlah tim lapangan',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      field: 'content',
      oldValue: '4 orang',
      newValue: '5 orang',
    },
  ]);

  // Active editors (simulated real-time)
  const [activeEditors, setActiveEditors] = useState<ActiveEditor[]>([
    {
      userId: 'USR007',
      field: 'content',
      cursor: 450,
      timestamp: new Date(),
    },
  ]);

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPermission, setNewUserPermission] = useState('suggest');

  // Auto-save functionality
  useEffect(() => {
    if (unsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleSave(true);
      }, 3000);

      return () => clearTimeout(autoSaveTimer);
    }
  }, [document, unsavedChanges]);

  const handleSave = async (isAutoSave = false) => {
    setIsSaving(true);

    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSaving(false);
    setUnsavedChanges(false);

    if (!isAutoSave) {
      toast.success('Dokumen berhasil disimpan', {
        description: 'Perubahan telah tersimpan dan disinkronkan ke semua kolaborator',
      });
    }

    // Add to history
    const newHistory: EditHistory = {
      id: `H${String(editHistory.length + 1).padStart(3, '0')}`,
      userId: 'current-user',
      action: 'Menyimpan perubahan',
      timestamp: new Date(),
    };
    setEditHistory([newHistory, ...editHistory]);
  };

  const handleDocumentChange = (field: string, value: any) => {
    setDocument(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `C${String(comments.length + 1).padStart(3, '0')}`,
      userId: 'current-user',
      text: newComment,
      timestamp: new Date(),
      resolved: false,
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment('');

    toast.success('Komentar ditambahkan', {
      description: 'Kolaborator lain akan menerima notifikasi',
    });
  };

  const addReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: `${commentId}-R${Date.now()}`,
      userId: 'current-user',
      text: replyText,
      timestamp: new Date(),
      resolved: false,
    };

    setComments(prev =>
      prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        }
        return comment;
      })
    );

    setReplyText('');
    setReplyingTo(null);

    toast.success('Balasan ditambahkan');
  };

  const toggleResolveComment = (commentId: string) => {
    setComments(prev =>
      prev.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, resolved: !comment.resolved };
        }
        return comment;
      })
    );
  };

  const addCollaborator = () => {
    if (!newUserEmail) return;

    // Simulate finding user by email
    const user = mockUsers.find(u => u.email === newUserEmail);

    if (user) {
      if (sharedWith.includes(user.id)) {
        toast.error('Pengguna sudah menjadi kolaborator');
        return;
      }

      setSharedWith([...sharedWith, user.id]);
      setNewUserEmail('');

      toast.success(`${user.name} ditambahkan sebagai kolaborator`, {
        description: `Hak akses: ${newUserPermission === 'edit' ? 'Edit' : newUserPermission === 'suggest' ? 'Saran' : 'Lihat'}`,
      });
    } else {
      toast.error('Pengguna tidak ditemukan');
    }
  };

  const removeCollaborator = (userId: string) => {
    setSharedWith(prev => prev.filter(id => id !== userId));
    toast.success('Kolaborator dihapus');
  };

  const getUserById = (userId: string) => {
    return mockUsers.find(u => u.id === userId);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Baru saja';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} menit yang lalu`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam yang lalu`;
    return date.toLocaleDateString('id-ID');
  };

  const unreadComments = comments.filter(c => !c.resolved).length;

  return (
    <div className="min-h-screen bg-slate-900 pb-6">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/reports/documents')}
                className="text-slate-300 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-white">{document.title}</h1>
                  {isSaving && (
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      Menyimpan...
                    </div>
                  )}
                  {!isSaving && !unsavedChanges && (
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Tersimpan
                    </div>
                  )}
                  {unsavedChanges && !isSaving && (
                    <div className="flex items-center gap-2 text-sm text-yellow-400">
                      <AlertCircle className="w-4 h-4" />
                      Perubahan belum tersimpan
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <Badge
                    variant="outline"
                    className="bg-blue-600/20 text-blue-400 border-blue-500/50"
                  >
                    {document.number}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    v{document.version} • Terakhir diubah {getTimeAgo(document.lastModified)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Active Collaborators */}
              <TooltipProvider>
                <div className="flex items-center gap-1 px-3 py-2 bg-slate-700/50 rounded-lg">
                  <Users className="w-4 h-4 text-slate-400 mr-2" />
                  <div className="flex -space-x-2">
                    {activeCollaborators.map(userId => {
                      const user = getUserById(userId);
                      return user ? (
                        <Tooltip key={userId}>
                          <TooltipTrigger>
                            <div className="relative">
                              <Avatar className="w-7 h-7 border-2 border-slate-800">
                                <AvatarFallback className={`${user.color} text-white text-xs`}>
                                  {user.avatar}
                                </AvatarFallback>
                              </Avatar>
                              {user.status === 'online' && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-800" />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {user.name} -{' '}
                              {user.status === 'online' ? 'Sedang mengedit' : user.status}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ) : null;
                    })}
                  </div>
                </div>
              </TooltipProvider>

              <Button
                variant="outline"
                onClick={() => setShowHistoryDialog(true)}
                className="border-slate-600 text-slate-300 hover:text-white"
              >
                <History className="w-4 h-4 mr-2" />
                Riwayat
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowShareDialog(true)}
                className="border-slate-600 text-slate-300 hover:text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>

              <Button
                onClick={() => handleSave(false)}
                disabled={!unsavedChanges || isSaving}
                className="bg-blue-600 hover:bg-blue-500"
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-300">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-700 border-slate-600">
                  <DropdownMenuItem className="text-slate-300 hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Unduh PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Unduh DOCX
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-600" />
                  <DropdownMenuItem className="text-slate-300 hover:text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Pengaturan Dokumen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-6 max-w-[1920px] mx-auto">
        {/* Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Informasi Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Judul Dokumen</Label>
                  <Input
                    value={document.title}
                    onChange={e => handleDocumentChange('title', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nomor Dokumen</Label>
                  <Input
                    value={document.number}
                    onChange={e => handleDocumentChange('number', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Penerbit</Label>
                  <Input
                    value={document.issuer}
                    onChange={e => handleDocumentChange('issuer', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ditujukan Kepada</Label>
                  <Input
                    value={document.issuedTo}
                    onChange={e => handleDocumentChange('issuedTo', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Referensi Kasus</Label>
                  <Input
                    value={document.caseReference}
                    onChange={e => handleDocumentChange('caseReference', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={document.status}
                    onValueChange={value => handleDocumentChange('status', value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                      <SelectItem value="Selesai">Selesai</SelectItem>
                      <SelectItem value="Menunggu Persetujuan">Menunggu Persetujuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Konten Dokumen</CardTitle>
              <p className="text-sm text-slate-400 mt-1">
                Kolaborator lain dapat melihat perubahan secara real-time
              </p>
            </CardHeader>
            <CardContent className="space-y-0 p-0">
              {/* WYSIWYG Toolbar */}
              <div className="bg-slate-700/50 border-b border-slate-600 p-3">
                <div className="flex flex-wrap gap-1">
                  {/* Text Formatting */}
                  <div className="flex items-center gap-0.5 mr-2 pr-2 border-r border-slate-600">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Bold className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Bold (Ctrl+B)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Italic className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Italic (Ctrl+I)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Underline className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Underline (Ctrl+U)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Strikethrough className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Strikethrough</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Headings */}
                  <div className="flex items-center gap-0.5 mr-2 pr-2 border-r border-slate-600">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Heading1 className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Heading 1</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Heading2 className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Heading 2</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Heading3 className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Heading 3</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Type className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Normal Text</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Alignment */}
                  <div className="flex items-center gap-0.5 mr-2 pr-2 border-r border-slate-600">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <AlignLeft className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Align Left</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <AlignCenter className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Align Center</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <AlignRight className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Align Right</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <AlignJustify className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Justify</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Lists */}
                  <div className="flex items-center gap-0.5 mr-2 pr-2 border-r border-slate-600">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <List className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Bullet List</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <ListOrdered className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Numbered List</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Quote className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Quote</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Insert */}
                  <div className="flex items-center gap-0.5 mr-2 pr-2 border-r border-slate-600">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Link className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Insert Link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Image className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Insert Image</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Code className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Code Block</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Advanced */}
                  <div className="flex items-center gap-0.5">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Highlighter className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Highlight</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Subscript className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Subscript</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
                          >
                            <Superscript className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Superscript</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              {/* Editor Area */}
              <div className="p-6">
                <div className="relative">
                  {/* Active editor indicator */}
                  {activeEditors
                    .filter(e => e.field === 'content')
                    .map(editor => {
                      const user = getUserById(editor.userId);
                      return user && user.id !== 'current-user' ? (
                        <div
                          key={editor.userId}
                          className="absolute -top-8 left-0 flex items-center gap-2 text-xs"
                        >
                          <Avatar className="w-5 h-5">
                            <AvatarFallback className={`${user.color} text-white text-xs`}>
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-slate-400">{user.name} sedang mengedit...</span>
                        </div>
                      ) : null;
                    })}

                  <Textarea
                    value={document.content}
                    onChange={e => handleDocumentChange('content', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white text-sm min-h-[500px] resize-y leading-relaxed"
                    placeholder="Tulis konten dokumen di sini..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Comments & Activity */}
        <div className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <Tabs defaultValue="comments" className="w-full">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                  <TabsTrigger value="comments" className="relative">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Komentar
                    {unreadComments > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0">
                        {unreadComments}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="activity">
                    <Clock className="w-4 h-4 mr-2" />
                    Aktivitas
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="pt-4">
                <TabsContent value="comments" className="mt-0 space-y-4">
                  {/* Add Comment */}
                  <div className="space-y-2">
                    <Textarea
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      placeholder="Tambahkan komentar..."
                      className="bg-slate-700 border-slate-600 text-white resize-none"
                      rows={3}
                    />
                    <Button
                      onClick={addComment}
                      disabled={!newComment.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-500"
                      size="sm"
                    >
                      Tambah Komentar
                    </Button>
                  </div>

                  <Separator className="bg-slate-600" />

                  {/* Comments List */}
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {comments.map(comment => {
                        const user = getUserById(comment.userId);
                        return user ? (
                          <div
                            key={comment.id}
                            className={`p-3 rounded-lg border ${
                              comment.resolved
                                ? 'bg-slate-700/30 border-slate-600/50'
                                : 'bg-slate-700/50 border-slate-600'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className={`${user.color} text-white text-xs`}>
                                    {user.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm text-white">{user.name}</p>
                                  <p className="text-xs text-slate-400">
                                    {getTimeAgo(comment.timestamp)}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleResolveComment(comment.id)}
                                className={comment.resolved ? 'text-green-400' : 'text-slate-400'}
                              >
                                {comment.resolved ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <Check className="w-4 h-4" />
                                )}
                              </Button>
                            </div>

                            <p
                              className={`text-sm mb-2 ${comment.resolved ? 'text-slate-400 line-through' : 'text-slate-200'}`}
                            >
                              {comment.text}
                            </p>

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-4 mt-3 space-y-2 border-l-2 border-slate-600 pl-3">
                                {comment.replies.map(reply => {
                                  const replyUser = getUserById(reply.userId);
                                  return replyUser ? (
                                    <div key={reply.id} className="bg-slate-800/50 p-2 rounded">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Avatar className="w-5 h-5">
                                          <AvatarFallback
                                            className={`${replyUser.color} text-white text-xs`}
                                          >
                                            {replyUser.avatar}
                                          </AvatarFallback>
                                        </Avatar>
                                        <p className="text-xs text-white">{replyUser.name}</p>
                                        <p className="text-xs text-slate-400">
                                          {getTimeAgo(reply.timestamp)}
                                        </p>
                                      </div>
                                      <p className="text-sm text-slate-200">{reply.text}</p>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            )}

                            {/* Reply Input */}
                            {replyingTo === comment.id ? (
                              <div className="mt-3 space-y-2">
                                <Textarea
                                  value={replyText}
                                  onChange={e => setReplyText(e.target.value)}
                                  placeholder="Tulis balasan..."
                                  className="bg-slate-700 border-slate-600 text-white text-sm resize-none"
                                  rows={2}
                                />
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => addReply(comment.id)}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-500"
                                  >
                                    Balas
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyText('');
                                    }}
                                    size="sm"
                                    variant="ghost"
                                  >
                                    Batal
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setReplyingTo(comment.id)}
                                className="text-blue-400 hover:text-blue-300 mt-2"
                              >
                                Balas
                              </Button>
                            )}
                          </div>
                        ) : null;
                      })}

                      {comments.length === 0 && (
                        <div className="text-center py-8 text-slate-400">
                          <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>Belum ada komentar</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="activity" className="mt-0">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {editHistory.map(history => {
                        const user = getUserById(history.userId);
                        return user ? (
                          <div
                            key={history.id}
                            className="flex gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50"
                          >
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className={`${user.color} text-white text-xs`}>
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white">
                                <span className="font-medium">{user.name}</span>
                                <span className="text-slate-400"> {history.action}</span>
                              </p>
                              {history.oldValue && history.newValue && (
                                <div className="mt-1 text-xs">
                                  <span className="text-red-400 line-through">
                                    {history.oldValue}
                                  </span>
                                  <span className="text-slate-400"> → </span>
                                  <span className="text-green-400">{history.newValue}</span>
                                </div>
                              )}
                              <p className="text-xs text-slate-400 mt-1">
                                {getTimeAgo(history.timestamp)}
                              </p>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Kelola Kolaborator</DialogTitle>
            <DialogDescription className="text-slate-400">
              Undang pengguna untuk berkolaborasi pada dokumen ini
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Add Collaborator */}
            <div className="flex gap-2">
              <Input
                value={newUserEmail}
                onChange={e => setNewUserEmail(e.target.value)}
                placeholder="Masukkan email pengguna..."
                className="bg-slate-700 border-slate-600 text-white flex-1"
              />
              <Select value={newUserPermission} onValueChange={setNewUserPermission}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="suggest">Saran</SelectItem>
                  <SelectItem value="view">Lihat</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addCollaborator} className="bg-blue-600 hover:bg-blue-500">
                <UserPlus className="w-4 h-4 mr-2" />
                Undang
              </Button>
            </div>

            <Separator className="bg-slate-600" />

            {/* Current Collaborators */}
            <div className="space-y-2">
              <h4 className="font-medium text-white">Kolaborator Saat Ini ({sharedWith.length})</h4>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {sharedWith.map(userId => {
                    const user = getUserById(userId);
                    return user ? (
                      <div
                        key={userId}
                        className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className={`${user.color} text-white text-xs`}>
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-white">{user.name}</p>
                            <p className="text-xs text-slate-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {permission === 'edit'
                              ? 'Edit'
                              : permission === 'suggest'
                                ? 'Saran'
                                : 'Lihat'}
                          </Badge>
                          {activeCollaborators.includes(userId) && (
                            <Badge className="bg-green-600 text-white text-xs">Online</Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCollaborator(userId)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Riwayat Perubahan</DialogTitle>
            <DialogDescription className="text-slate-400">
              Lihat semua perubahan yang dilakukan pada dokumen ini
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-96">
            <div className="space-y-3">
              {editHistory.map((history, index) => {
                const user = getUserById(history.userId);
                return user ? (
                  <div key={history.id} className="relative">
                    {index < editHistory.length - 1 && (
                      <div className="absolute left-4 top-12 w-0.5 h-full bg-slate-600" />
                    )}
                    <div className="flex gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarFallback className={`${user.color} text-white`}>
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-white">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-slate-400"> {history.action}</span>
                        </p>
                        {history.oldValue && history.newValue && (
                          <div className="mt-2 p-2 bg-slate-800 rounded text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-red-400">-</span>
                              <span className="text-red-400/80">{history.oldValue}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-green-400">+</span>
                              <span className="text-green-400/80">{history.newValue}</span>
                            </div>
                          </div>
                        )}
                        <p className="text-sm text-slate-400 mt-2">
                          {history.timestamp.toLocaleString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
