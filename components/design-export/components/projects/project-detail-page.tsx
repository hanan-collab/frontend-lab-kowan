import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Progress } from '../../../ui/progress';
import { Separator } from '../../../ui/separator';
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
} from 'lucide-react';
import { toast } from 'sonner';
import { CrimeOntologyPlatform } from '../ontology/crime-ontology-platform';

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
    assignedTo: ['Investigator A', 'Analyst B'],
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
    assignedTo: ['Financial Analyst', 'Field Investigator'],
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
    assignedTo: ['Senior Investigator', 'Legal Expert', 'IT Forensic'],
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
    assignedTo: ['Business Analyst', 'Cyber Investigator'],
    progress: 100,
    findings: 15,
    lastUpdate: '2 minggu yang lalu',
  },
];

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    console.log('ProjectDetailPage mounted with id:', id);
    if (id) {
      const foundProject = mockProjects.find(p => p.id === id);
      console.log('Found project:', foundProject);
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
      user: 'Investigator A',
      status: 'completed',
    },
    {
      id: '2',
      type: 'finding',
      title: 'Temuan Transaksi Mencurigakan',
      description: 'Transfer senilai Rp 2.5M ke rekening offshore pada tanggal 15 Januari',
      timestamp: '5 jam yang lalu',
      user: 'Financial Analyst',
      status: 'pending',
    },
    {
      id: '3',
      type: 'milestone',
      title: 'Fase Investigasi Selesai',
      description: 'Semua dokumen awal telah dikumpulkan dan diverifikasi',
      timestamp: '1 hari yang lalu',
      user: 'Project Manager',
      status: 'completed',
    },
  ]);

  // Mock data for tasks
  const [tasks] = useState([
    {
      id: '1',
      title: 'Analisis transaksi rekening utama',
      description: 'Menganalisis aliran dana dalam 6 bulan terakhir',
      status: 'completed',
      assignee: 'Financial Analyst',
      dueDate: '2024-01-20',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Verifikasi dokumen kepemilikan aset',
      description: 'Konfirmasi kepemilikan properti dan kendaraan',
      status: 'in-progress',
      assignee: 'Legal Expert',
      dueDate: '2024-01-25',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Background check target',
      description: 'Penelusuran latar belakang dan jejak digital',
      status: 'pending',
      assignee: 'Cyber Investigator',
      dueDate: '2024-01-30',
      priority: 'high',
    },
  ]);

  // Mock data for findings
  const [findings] = useState([
    {
      id: '1',
      title: 'Rekening Bank Offshore',
      type: 'financial',
      description: 'Ditemukan rekening di Bank Swiss dengan saldo USD 500K',
      severity: 'high',
      date: '2024-01-18',
      evidence: ['Screenshot transaksi', 'Dokumen bank'],
      status: 'verified',
    },
    {
      id: '2',
      title: 'Properti Tidak Tercatat',
      type: 'asset',
      description: 'Villa senilai Rp 15M tidak tercatat dalam LHKPN',
      severity: 'critical',
      date: '2024-01-17',
      evidence: ['Sertifikat properti', 'Foto lokasi'],
      status: 'investigating',
    },
    {
      id: '3',
      title: 'Pola Transaksi Mencurigakan',
      type: 'financial',
      description: 'Transfer rutin setiap tanggal 1 ke rekening yang sama',
      severity: 'medium',
      date: '2024-01-16',
      evidence: ['Laporan bank', 'Analysis pattern'],
      status: 'verified',
    },
  ]);

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

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Memuat detail proyek... (ID: {id})</p>
          <p className="text-gray-500 text-sm mt-2">Available IDs: 1, 2, 3, 4</p>
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
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className="bg-slate-700 border-slate-600 hover:border-blue-500/50 transition-colors cursor-pointer"
          onClick={() =>
            navigate(`/ontology?entity=${encodeURIComponent(project.target)}&type=suspect`)
          }
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Target</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{project.target}</p>
                  <ExternalLink className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-xs text-blue-400 mt-1">Klik untuk lihat di Ontologi</p>
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
            <Progress value={project.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
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
          <TabsTrigger value="ontology" className="text-sm">
            Ontologi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                  <span className="text-white">{member}</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                    Active
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

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
                <Badge className={getSeverityColor(project.priority)}>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Daftar Tugas</h3>
            <Button
              onClick={() => toast.success('Fitur tambah tugas akan segera tersedia')}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Tugas
            </Button>
          </div>

          <div className="space-y-3">
            {tasks.map(task => (
              <Card key={task.id} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{task.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-400">Assignee: {task.assignee}</span>
                        <span className="text-xs text-gray-400">
                          Due: {new Date(task.dueDate).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(task.priority)}>{task.priority}</Badge>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
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
            <Button
              onClick={() => toast.success('Fitur tambah temuan akan segera tersedia')}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Temuan
            </Button>
          </div>

          <div className="space-y-4">
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
                      <p className="text-sm text-gray-400">{finding.description}</p>
                    </div>
                    <Badge className={getStatusColor(finding.status)}>{finding.status}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-400">Type: {finding.type}</span>
                      <span className="text-xs text-gray-400">
                        Date: {new Date(finding.date).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{finding.evidence.length} bukti</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.success('Fitur download bukti akan segera tersedia')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Timeline Aktivitas</h3>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-400' : 'bg-blue-400'
                    }`}
                  ></div>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 h-12 bg-slate-600 mt-2"></div>
                  )}
                </div>
                <Card className="flex-1 bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{activity.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">by {activity.user}</span>
                          <span className="text-xs text-gray-400">• {activity.timestamp}</span>
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

        <TabsContent value="ontology" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Network className="h-5 w-5" />
                Ontologi Terkait - {project.target}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success('Fitur tambah entitas akan segera tersedia')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Entitas
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success('Fitur hapus entitas akan segera tersedia')}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus Entitas
                </Button>
              </div>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-0">
                <div className="h-[800px]">
                  <CrimeOntologyPlatform />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
