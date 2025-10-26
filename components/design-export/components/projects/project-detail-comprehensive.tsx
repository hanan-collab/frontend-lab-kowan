import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Calendar,
  Users,
  Target,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Plus,
  Flag,
  Download,
  Edit,
  ExternalLink,
  ArrowLeft,
  Trash2,
  Network,
  Eye,
  MessageSquare,
  Upload,
  Filter,
  Search,
  MoreVertical,
  Share2,
  BookOpen,
  Activity,
  AlertTriangle,
  Shield,
  Database,
  ArrowUp,
  Settings,
  CheckSquare,
  Square,
} from 'lucide-react';
import { toast } from 'sonner';
import { ProjectOntologyView } from './project-ontology-view';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Checkbox } from '../ui/checkbox';

interface Project {
  id: string;
  name: string;
  description: string;
  type: 'person';
  target: string;
  status: 'investigating' | 'analyzing' | 'verifying' | 'completed' | 'suspended';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdDate: string;
  deadline: string;
  assignedTo: string[];
  progress: number;
  findings: number;
  lastUpdate: string;
}

// Mock data - same as in project management
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Investigasi Aset Tersangka Korupsi',
    description: 'Penelusuran aset properti dan keuangan tersangka kasus korupsi',
    type: 'person',
    target: 'Budi Santoso',
    status: 'investigating',
    priority: 'high',
    createdDate: '2024-01-15',
    deadline: '2024-03-15',
    assignedTo: ['Ahmad Pratama', 'Sari Wijaya'],
    progress: 65,
    findings: 8,
    lastUpdate: '2 jam yang lalu',
  },
  {
    id: '2',
    name: 'Investigasi Pejabat Daerah',
    description: 'Penelusuran kekayaan dan aktivitas keuangan pejabat daerah',
    type: 'person',
    target: 'Jennifer Kusuma',
    status: 'analyzing',
    priority: 'medium',
    createdDate: '2024-01-20',
    deadline: '2024-02-28',
    assignedTo: ['Sari Wijaya', 'Rizki Hakim'],
    progress: 75,
    findings: 5,
    lastUpdate: '1 hari yang lalu',
  },
  {
    id: '3',
    name: 'Investigasi Direktur BUMN',
    description: 'Analisis transaksi dan kepemilikan aset direktur BUMN',
    type: 'person',
    target: 'Ahmad Rahman',
    status: 'verifying',
    priority: 'critical',
    createdDate: '2024-01-25',
    deadline: '2024-04-15',
    assignedTo: ['Ahmad Pratama', 'Budi Santoso', 'Maya Kusuma'],
    progress: 40,
    findings: 12,
    lastUpdate: '3 jam yang lalu',
  },
  {
    id: '4',
    name: 'Investigasi Pengusaha Swasta',
    description: 'Penelusuran sumber dana dan jaringan bisnis pengusaha',
    type: 'person',
    target: 'Maria Sari',
    status: 'completed',
    priority: 'high',
    createdDate: '2024-01-10',
    deadline: '2024-02-10',
    assignedTo: ['Maya Kusuma', 'Rizki Hakim'],
    progress: 100,
    findings: 15,
    lastUpdate: '2 minggu yang lalu',
  },
];

export function ProjectDetailComprehensive() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // States for Explore Ontology
  const [showDataSourceModal, setShowDataSourceModal] = useState(false);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionContent, setNewDiscussionContent] = useState('');
  const [newDiscussionCategory, setNewDiscussionCategory] = useState('general');

  useEffect(() => {
    if (id) {
      const foundProject = mockProjects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        toast.error('Proyek tidak ditemukan');
        navigate('/projects');
      }
    }
  }, [id, navigate]);

  // Mock data for project activities
  const [activities] = useState([
    {
      id: '1',
      type: 'progress',
      title: 'Update Progress Investigasi',
      description: 'Ditemukan 5 rekening bank baru yang terkait dengan target',
      timestamp: '2 jam yang lalu',
      user: 'Ahmad Pratama',
      status: 'completed',
      severity: 'medium',
    },
    {
      id: '2',
      type: 'finding',
      title: 'Temuan Transaksi Mencurigakan',
      description: 'Transfer senilai Rp 2.5M ke rekening offshore pada tanggal 15 Januari',
      timestamp: '5 jam yang lalu',
      user: 'Sari Wijaya',
      status: 'pending',
      severity: 'high',
    },
    {
      id: '3',
      type: 'milestone',
      title: 'Fase Investigasi Selesai',
      description: 'Semua dokumen awal telah dikumpulkan dan diverifikasi',
      timestamp: '1 hari yang lalu',
      user: 'Ahmad Pratama',
      status: 'completed',
      severity: 'low',
    },
    {
      id: '4',
      type: 'alert',
      title: 'Deadline Mendekati',
      description: 'Proyek akan berakhir dalam 30 hari, percepat verifikasi dokumen',
      timestamp: '2 hari yang lalu',
      user: 'System',
      status: 'warning',
      severity: 'high',
    },
  ]);

  // Mock data for tasks
  const [tasks] = useState([
    {
      id: '1',
      title: 'Analisis transaksi rekening utama',
      description:
        'Menganalisis aliran dana dalam 6 bulan terakhir untuk mengidentifikasi pola transaksi mencurigakan',
      status: 'completed',
      assignee: 'Sari Wijaya',
      dueDate: '2024-01-20',
      priority: 'high',
      category: 'financial',
      estimatedHours: 12,
      actualHours: 10,
    },
    {
      id: '2',
      title: 'Verifikasi dokumen kepemilikan aset',
      description: 'Konfirmasi kepemilikan properti dan kendaraan melalui verifikasi dokumen legal',
      status: 'in-progress',
      assignee: 'Budi Santoso',
      dueDate: '2024-01-25',
      priority: 'medium',
      category: 'legal',
      estimatedHours: 8,
      actualHours: 5,
    },
    {
      id: '3',
      title: 'Background check target',
      description:
        'Penelusuran latar belakang dan jejak digital termasuk media sosial dan aktivitas online',
      status: 'pending',
      assignee: 'Rizki Hakim',
      dueDate: '2024-01-30',
      priority: 'high',
      category: 'osint',
      estimatedHours: 15,
      actualHours: 0,
    },
    {
      id: '4',
      title: 'Wawancara saksi kunci',
      description: 'Melakukan wawancara dengan mantan rekan kerja dan partner bisnis target',
      status: 'pending',
      assignee: 'Ahmad Pratama',
      dueDate: '2024-02-05',
      priority: 'medium',
      category: 'field',
      estimatedHours: 20,
      actualHours: 0,
    },
  ]);

  // Mock data for findings
  const [findings] = useState([
    {
      id: '1',
      title: 'Rekening Bank Offshore',
      type: 'financial',
      description:
        'Ditemukan rekening di Bank Swiss dengan saldo USD 500K yang tidak dilaporkan dalam LHKPN',
      severity: 'critical',
      date: '2024-01-18',
      evidence: ['Screenshot transaksi', 'Dokumen bank', 'Email konfirmasi'],
      status: 'verified',
      impact: 'high',
      confidentiality: 'secret',
    },
    {
      id: '2',
      title: 'Properti Tidak Tercatat',
      type: 'asset',
      description: 'Villa senilai Rp 15M di Puncak tidak tercatat dalam LHKPN tahun 2023',
      severity: 'critical',
      date: '2024-01-17',
      evidence: ['Sertifikat properti', 'Foto lokasi', 'Dokumen PBB'],
      status: 'investigating',
      impact: 'high',
      confidentiality: 'confidential',
    },
    {
      id: '3',
      title: 'Pola Transaksi Mencurigakan',
      type: 'financial',
      description:
        'Transfer rutin setiap tanggal 1 sebesar Rp 100M ke rekening yang sama selama 12 bulan',
      severity: 'high',
      date: '2024-01-16',
      evidence: ['Laporan bank', 'Analysis pattern', 'Grafik transaksi'],
      status: 'verified',
      impact: 'medium',
      confidentiality: 'internal',
    },
    {
      id: '4',
      title: 'Kendaraan Mewah',
      type: 'asset',
      description:
        'Kepemilikan 3 kendaraan mewah senilai total Rp 8M yang tidak sesuai dengan penghasilan resmi',
      severity: 'medium',
      date: '2024-01-15',
      evidence: ['STNK', 'Foto kendaraan', 'Dokumen pembelian'],
      status: 'verified',
      impact: 'medium',
      confidentiality: 'internal',
    },
  ]);

  // Mock documents
  const [documents] = useState([
    {
      id: '1',
      name: 'LHKPN_BudiSantoso_2023.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      category: 'legal',
      uploader: 'Ahmad Pratama',
      status: 'verified',
    },
    {
      id: '2',
      name: 'Bank_Statement_Analysis.xlsx',
      type: 'excel',
      size: '1.8 MB',
      uploadDate: '2024-01-18',
      category: 'financial',
      uploader: 'Sari Wijaya',
      status: 'draft',
    },
    {
      id: '3',
      name: 'Property_Investigation_Report.docx',
      type: 'word',
      size: '5.2 MB',
      uploadDate: '2024-01-20',
      category: 'asset',
      uploader: 'Budi Santoso',
      status: 'review',
    },
  ]);

  // Data sources for explore ontology
  const dataSources = [
    {
      id: 'dukcapil',
      name: 'Data Dukcapil',
      description: 'Data kependudukan dan identitas penduduk',
      category: 'identity',
    },
    {
      id: 'korlantas',
      name: 'Data Korlantas Polri',
      description: 'Data kendaraan bermotor dan SIM',
      category: 'vehicle',
    },
    { id: 'pajak', name: 'Data Pajak', description: 'Data NPWP dan perpajakan', category: 'tax' },
    {
      id: 'perbankan',
      name: 'Data Perbankan',
      description: 'Data rekening dan transaksi perbankan',
      category: 'financial',
    },
    {
      id: 'bpn',
      name: 'Data Properti (BPN)',
      description: 'Data kepemilikan tanah dan properti',
      category: 'asset',
    },
    {
      id: 'kemenkumham',
      name: 'Data Perusahaan (Kemenkumham)',
      description: 'Data perusahaan dan badan hukum',
      category: 'legal',
    },
    {
      id: 'ppatk',
      name: 'Data PPATK',
      description: 'Transaksi keuangan mencurigakan',
      category: 'financial',
    },
    {
      id: 'imigrasi',
      name: 'Data Imigrasi',
      description: 'Data paspor dan perjalanan',
      category: 'travel',
    },
  ];

  // Mock discussions
  const [discussions] = useState([
    {
      id: '1',
      title: 'Pola Transfer Mencurigakan ke Rekening Offshore',
      content:
        'Berdasarkan analisis bank statement, ditemukan pola transfer rutin setiap tanggal 1 dengan nominal yang cukup besar ke rekening di luar negeri. Perlu dilakukan penelusuran lebih lanjut terkait tujuan dan penerima dana.',
      category: 'financial',
      author: 'Ahmad Pratama',
      role: 'Investigator Senior',
      timestamp: '3 jam yang lalu',
      lastActivity: '1 jam yang lalu',
      status: 'open',
      priority: 'high',
      replies: 5,
      likes: 8,
      attachments: ['Bank_Analysis_Q1.pdf'],
      repliesList: [
        {
          id: 'r1',
          author: 'Sari Wijaya',
          role: 'Analis Keuangan',
          content:
            'Saya sudah melakukan cross-check dengan data PPATK. Rekening tujuan terdaftar di Swiss dengan beneficial owner yang sama dengan target. Ini sangat mencurigakan.',
          timestamp: '2 jam yang lalu',
          likes: 5,
        },
        {
          id: 'r2',
          author: 'Budi Santoso',
          role: 'Investigator',
          content:
            'Apakah kita sudah mengajukan permintaan data ke otoritas Swiss melalui jalur MLA? Ini penting untuk mendapatkan detail lebih lanjut.',
          timestamp: '1 jam yang lalu',
          likes: 3,
        },
      ],
    },
    {
      id: '2',
      title: 'Update Koordinasi dengan Tim Lapangan',
      content:
        'Tim lapangan telah melakukan verifikasi fisik terhadap properti yang tercantum dalam LHKPN. Ada beberapa temuan menarik yang perlu didiskusikan.',
      category: 'field',
      author: 'Rizki Hakim',
      role: 'Koordinator Lapangan',
      timestamp: '1 hari yang lalu',
      lastActivity: '5 jam yang lalu',
      status: 'open',
      priority: 'medium',
      replies: 3,
      likes: 6,
      attachments: ['Field_Report_Jan.pdf', 'Property_Photos.zip'],
      repliesList: [],
    },
    {
      id: '3',
      title: 'Aspek Legal - Potensi Pelanggaran UU TPPU',
      content:
        'Berdasarkan temuan investigasi, terdapat indikasi kuat pelanggaran UU Tindak Pidana Pencucian Uang. Perlu dilakukan analisis legal lebih mendalam.',
      category: 'legal',
      author: 'Maya Kusuma',
      role: 'Legal Analyst',
      timestamp: '2 hari yang lalu',
      lastActivity: '1 hari yang lalu',
      status: 'resolved',
      priority: 'critical',
      replies: 8,
      likes: 12,
      attachments: ['Legal_Opinion.pdf'],
      repliesList: [],
    },
  ]);

  const toggleDataSource = (sourceId: string) => {
    setSelectedDataSources(prev =>
      prev.includes(sourceId) ? prev.filter(id => id !== sourceId) : [...prev, sourceId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'investigating':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'analyzing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'verifying':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'verified':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'draft':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'review':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Memuat detail proyek...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
            <p className="text-gray-400">{project.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(project.status)}>{project.status.toUpperCase()}</Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success('Fitur edit akan segera tersedia')}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success('Fitur share akan segera tersedia')}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Target</p>
                <p className="font-medium text-white">{project.target}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Progress</p>
                <p className="font-medium text-white">{project.progress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Flag className="h-8 w-8 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Temuan</p>
                <p className="font-medium text-white">{project.findings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Tim</p>
                <p className="font-medium text-white">{project.assignedTo.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-red-400" />
              <div>
                <p className="text-sm text-gray-400">Deadline</p>
                <p className="font-medium text-white">
                  {new Date(project.deadline).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress Keseluruhan</span>
              <span className="text-white">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Mulai: {new Date(project.createdDate).toLocaleDateString('id-ID')}</span>
              <span>Target: {new Date(project.deadline).toLocaleDateString('id-ID')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ontologi Workbook Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Network className="h-5 w-5" />
              Ontologi Workbook - {project.target}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                Project #{id}
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-500/20 text-purple-400 border-purple-500/30"
              >
                Editable
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success('Fitur fullscreen akan segera tersedia')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Ontologi kerja yang dapat dikustomisasi untuk investigasi {project.target}. Anda dapat
            menambah, mengedit, dan menghapus entitas sesuai kebutuhan investigasi.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[600px] border-t border-slate-700">
            <ProjectOntologyView projectId={id || '1'} />
          </div>
        </CardContent>
      </Card>

      {/* Explore Ontologi Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="h-5 w-5" />
              Explore Ontologi - Sumber Data Eksternal
            </CardTitle>
            <div className="flex items-center gap-2">
              {selectedDataSources.length > 0 && (
                <Badge
                  variant="outline"
                  className="bg-green-500/20 text-green-400 border-green-500/30"
                >
                  {selectedDataSources.length} sumber dipilih
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDataSourceModal(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Pilih Sumber Data
              </Button>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Eksplorasi data dari berbagai sumber eksternal untuk memperkaya investigasi. Pilih
            sumber data yang ingin ditampilkan dalam visualisasi ontologi.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {selectedDataSources.length === 0 ? (
            <div className="h-[500px] border-t border-slate-700 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Database className="h-16 w-16 text-gray-600 mx-auto" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Belum Ada Sumber Data Dipilih
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 max-w-md">
                    Klik tombol "Pilih Sumber Data" untuk memilih sumber data eksternal yang ingin
                    ditampilkan dalam ontologi eksplorasi.
                  </p>
                  <Button
                    onClick={() => setShowDataSourceModal(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Pilih Sumber Data
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-t border-slate-700">
              {/* Selected Data Sources Summary */}
              <div className="p-4 bg-slate-700/50 border-b border-slate-600">
                <div className="flex flex-wrap gap-2">
                  {selectedDataSources.map(sourceId => {
                    const source = dataSources.find(s => s.id === sourceId);
                    return source ? (
                      <Badge
                        key={sourceId}
                        variant="outline"
                        className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                      >
                        {source.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
              {/* Ontology Visualization */}
              <div className="h-[500px]">
                <ProjectOntologyView
                  projectId={id || '1'}
                  dataSources={selectedDataSources}
                  isExploreMode={true}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Source Selection Modal */}
      <Dialog open={showDataSourceModal} onOpenChange={setShowDataSourceModal}>
        <DialogContent className="max-w-3xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Pilih Sumber Data Eksternal</DialogTitle>
            <DialogDescription className="text-gray-400">
              Pilih sumber data yang ingin ditampilkan dalam ontologi eksplorasi. Data akan
              ditampilkan secara real-time setelah dipilih.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Group by category */}
            <div className="space-y-6">
              {['identity', 'vehicle', 'tax', 'financial', 'asset', 'legal', 'travel'].map(
                category => {
                  const categorySources = dataSources.filter(s => s.category === category);
                  if (categorySources.length === 0) return null;

                  const categoryLabels: Record<string, string> = {
                    identity: 'Data Identitas',
                    vehicle: 'Data Kendaraan',
                    tax: 'Data Perpajakan',
                    financial: 'Data Keuangan',
                    asset: 'Data Aset',
                    legal: 'Data Hukum & Perusahaan',
                    travel: 'Data Perjalanan',
                  };

                  return (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium text-white flex items-center gap-2">
                        <div className="w-1 h-5 bg-blue-500 rounded"></div>
                        {categoryLabels[category]}
                      </h4>
                      <div className="space-y-2 pl-4">
                        {categorySources.map(source => (
                          <div
                            key={source.id}
                            className="flex items-start gap-3 p-3 bg-slate-700 rounded border border-slate-600 hover:border-blue-500/50 transition-colors cursor-pointer"
                            onClick={() => toggleDataSource(source.id)}
                          >
                            <div className="flex items-center pt-1">
                              {selectedDataSources.includes(source.id) ? (
                                <CheckSquare className="h-5 w-5 text-blue-400" />
                              ) : (
                                <Square className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">{source.name}</h5>
                              <p className="text-sm text-gray-400">{source.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="text-sm text-gray-400">
              {selectedDataSources.length} sumber data dipilih
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedDataSources([])}
                disabled={selectedDataSources.length === 0}
              >
                Reset Semua
              </Button>
              <Button
                onClick={() => setShowDataSourceModal(false)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Terapkan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
          <TabsTrigger value="overview" className="text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="tasks" className="text-sm">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="findings" className="text-sm">
            Temuan
          </TabsTrigger>
          <TabsTrigger value="timeline" className="text-sm">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-sm">
            Dokumen
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-sm">
            Laporan
          </TabsTrigger>
          <TabsTrigger value="discussions" className="text-sm">
            Diskusi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tim Investigasi */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Tim Investigasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.assignedTo.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-700 rounded border border-slate-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        {member
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </div>
                      <span className="text-white">{member}</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      Active
                    </Badge>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => toast.success('Fitur tambah anggota tim akan segera tersedia')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Anggota
                </Button>
              </CardContent>
            </Card>

            {/* Informasi Proyek */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informasi Proyek
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Jenis:</span>
                  <span className="text-white capitalize">Investigasi Individu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Prioritas:</span>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dibuat:</span>
                  <span className="text-white">
                    {new Date(project.createdDate).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Update Terakhir:</span>
                  <span className="text-white">{project.lastUpdate}</span>
                </div>
                <Separator className="bg-slate-600" />
                <div className="space-y-2">
                  <span className="text-gray-400 text-sm">Deskripsi:</span>
                  <p className="text-white text-sm">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activities.slice(0, 3).map(activity => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-slate-700 rounded border border-slate-600"
                >
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${
                      activity.type === 'finding'
                        ? 'bg-orange-400'
                        : activity.type === 'progress'
                          ? 'bg-blue-400'
                          : activity.type === 'milestone'
                            ? 'bg-green-400'
                            : 'bg-amber-400'
                    }`}
                  ></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{activity.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">by {activity.user}</span>
                      <span className="text-xs text-gray-400">• {activity.timestamp}</span>
                      <Badge className={getSeverityColor(activity.severity)} variant="outline">
                        {activity.severity}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setActiveTab('timeline')}
              >
                Lihat Semua Aktivitas
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Daftar Tugas</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success('Fitur filter akan segera tersedia')}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                onClick={() => toast.success('Fitur tambah tugas akan segera tersedia')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Tugas
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {tasks.map(task => (
              <Card key={task.id} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-white">{task.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>Assignee: {task.assignee}</span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString('id-ID')}</span>
                        <span>Est: {task.estimatedHours}h</span>
                        <span>Actual: {task.actualHours}h</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Temuan Investigasi</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success('Fitur export akan segera tersedia')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={() => toast.success('Fitur tambah temuan akan segera tersedia')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Temuan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {findings.map(finding => (
              <Card key={finding.id} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{finding.title}</h4>
                        <Badge className={getSeverityColor(finding.severity)}>
                          {finding.severity}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs mb-2">
                        {finding.type}
                      </Badge>
                      <p className="text-sm text-gray-400 mb-3">{finding.description}</p>
                    </div>
                    <Badge className={getStatusColor(finding.status)}>{finding.status}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        Date: {new Date(finding.date).toLocaleDateString('id-ID')}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          finding.confidentiality === 'secret'
                            ? 'border-red-500/30 text-red-400'
                            : finding.confidentiality === 'confidential'
                              ? 'border-orange-500/30 text-orange-400'
                              : 'border-blue-500/30 text-blue-400'
                        }`}
                      >
                        {finding.confidentiality}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {finding.evidence.length} bukti • Impact: {finding.impact}
                      </span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Timeline Aktivitas</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari aktivitas..."
                  className="pl-9 bg-slate-700 border-slate-600 text-white w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      activity.type === 'finding'
                        ? 'bg-orange-400'
                        : activity.type === 'progress'
                          ? 'bg-blue-400'
                          : activity.type === 'milestone'
                            ? 'bg-green-400'
                            : 'bg-amber-400'
                    }`}
                  ></div>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 h-16 bg-slate-600 mt-2"></div>
                  )}
                </div>
                <Card className="flex-1 bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white">{activity.title}</h4>
                          <Badge className={getSeverityColor(activity.severity)}>
                            {activity.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{activity.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">by {activity.user}</span>
                          <span className="text-xs text-gray-400">• {activity.timestamp}</span>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Dokumen Proyek</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success('Fitur filter akan segera tersedia')}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                onClick={() => toast.success('Fitur upload akan segera tersedia')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {documents.map(doc => (
              <Card
                key={doc.id}
                className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{doc.name}</h4>
                      <p className="text-sm text-gray-400">{doc.size}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {doc.category}
                        </Badge>
                        <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">
                          {new Date(doc.uploadDate).toLocaleDateString('id-ID')} • {doc.uploader}
                        </span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Laporan Proyek</h3>
            <Button
              onClick={() => toast.success('Fitur generate laporan akan segera tersedia')}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Laporan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Summary Report */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                  <div>
                    <h4 className="font-medium text-white">Laporan Ringkasan</h4>
                    <p className="text-sm text-gray-400">Executive Summary</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Ringkasan temuan utama dan rekomendasi untuk pengambilan keputusan eksekutif.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>

            {/* Technical Report */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="h-8 w-8 text-green-400" />
                  <div>
                    <h4 className="font-medium text-white">Laporan Teknis</h4>
                    <p className="text-sm text-gray-400">Technical Analysis</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Analisis teknis mendalam dengan bukti digital dan metodologi investigasi.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>

            {/* Legal Report */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-8 w-8 text-orange-400" />
                  <div>
                    <h4 className="font-medium text-white">Laporan Legal</h4>
                    <p className="text-sm text-gray-400">Legal Assessment</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Analisis aspek hukum dan rekomendasi tindak lanjut proses legal.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Forum Diskusi</h3>
              <p className="text-sm text-gray-400">
                Kolaborasi dan komunikasi antar anggota tim investigasi
              </p>
            </div>
            <Button
              onClick={() => setShowNewDiscussionForm(!showNewDiscussionForm)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Diskusi Baru
            </Button>
          </div>

          {/* New Discussion Form */}
          {showNewDiscussionForm && (
            <Card className="bg-slate-800 border-slate-700 border-blue-500/50">
              <CardContent className="p-4 space-y-3">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Judul Diskusi</label>
                  <Input
                    placeholder="Masukkan judul diskusi..."
                    value={newDiscussionTitle}
                    onChange={e => setNewDiscussionTitle(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Kategori</label>
                  <select
                    value={newDiscussionCategory}
                    onChange={e => setNewDiscussionCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  >
                    <option value="general">General</option>
                    <option value="financial">Financial</option>
                    <option value="asset">Asset</option>
                    <option value="legal">Legal</option>
                    <option value="field">Field Work</option>
                    <option value="coordination">Coordination</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Konten Diskusi</label>
                  <Textarea
                    placeholder="Tuliskan detail diskusi, pertanyaan, atau informasi yang ingin dibagikan..."
                    value={newDiscussionContent}
                    onChange={e => setNewDiscussionContent(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowNewDiscussionForm(false);
                      setNewDiscussionTitle('');
                      setNewDiscussionContent('');
                      setNewDiscussionCategory('general');
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      toast.success('Diskusi berhasil dibuat');
                      setShowNewDiscussionForm(false);
                      setNewDiscussionTitle('');
                      setNewDiscussionContent('');
                      setNewDiscussionCategory('general');
                    }}
                  >
                    Posting Diskusi
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Discussions List */}
          <div className="space-y-3">
            {discussions.map(discussion => (
              <Card
                key={discussion.id}
                className="bg-slate-800 border-slate-700 hover:border-blue-500/30 transition-colors"
              >
                <CardContent className="p-4">
                  {/* Discussion Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-white">{discussion.title}</h4>
                        <Badge variant="outline" className="text-xs capitalize">
                          {discussion.category}
                        </Badge>
                        {discussion.priority === 'high' && (
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                            High Priority
                          </Badge>
                        )}
                        {discussion.priority === 'critical' && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                            Critical
                          </Badge>
                        )}
                        <Badge
                          className={
                            discussion.status === 'open'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30 text-xs'
                              : 'bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs'
                          }
                        >
                          {discussion.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                            {discussion.author
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </div>
                          <span className="text-white">{discussion.author}</span>
                          <span className="text-gray-500">•</span>
                          <span>{discussion.role}</span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <span>{discussion.timestamp}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{discussion.content}</p>

                      {/* Attachments */}
                      {discussion.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {discussion.attachments.map((attachment, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 px-2 py-1 bg-slate-700 rounded text-xs text-blue-400 border border-slate-600"
                            >
                              <FileText className="h-3 w-3" />
                              <span>{attachment}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Discussion Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies} Balasan</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                          <ArrowUp className="h-4 w-4" />
                          <span>{discussion.likes} Likes</span>
                        </button>
                        <span className="text-gray-500">•</span>
                        <span>Aktivitas terakhir: {discussion.lastActivity}</span>
                      </div>

                      {/* Replies Section */}
                      {discussion.repliesList && discussion.repliesList.length > 0 && (
                        <div className="mt-4 space-y-3 border-l-2 border-blue-500/30 pl-4">
                          {discussion.repliesList.map(reply => (
                            <div
                              key={reply.id}
                              className="bg-slate-700/50 p-3 rounded border border-slate-600"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                                  {reply.author
                                    .split(' ')
                                    .map(n => n[0])
                                    .join('')}
                                </div>
                                <span className="text-white text-sm">{reply.author}</span>
                                <span className="text-gray-500 text-xs">•</span>
                                <span className="text-gray-400 text-xs">{reply.role}</span>
                                <span className="text-gray-500 text-xs">•</span>
                                <span className="text-gray-400 text-xs">{reply.timestamp}</span>
                              </div>
                              <p className="text-gray-300 text-sm mb-2">{reply.content}</p>
                              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-400 transition-colors">
                                <ArrowUp className="h-3 w-3" />
                                <span>{reply.likes} Likes</span>
                              </button>
                            </div>
                          ))}

                          {/* Reply Form */}
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mt-2">
                              AP
                            </div>
                            <div className="flex-1">
                              <Textarea
                                placeholder="Tulis balasan..."
                                className="bg-slate-700 border-slate-600 text-white text-sm min-h-[60px] mb-2"
                              />
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => toast.success('Balasan berhasil ditambahkan')}
                              >
                                Kirim Balasan
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Add Reply Button for discussions without replies */}
                      {(!discussion.repliesList || discussion.repliesList.length === 0) && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.success('Fitur balas akan segera tersedia')}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Balas Diskusi
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State if no discussions */}
          {discussions.length === 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h4 className="text-white mb-2">Belum Ada Diskusi</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Mulai diskusi pertama untuk berkolaborasi dengan tim investigasi
                </p>
                <Button
                  onClick={() => setShowNewDiscussionForm(true)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Diskusi Pertama
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
