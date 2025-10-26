import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
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
  MessageSquare,
  Paperclip,
  Send,
  Flag,
  Search,
  Download,
  Edit,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';

interface ProjectDetailProps {
  project: {
    id: string;
    name: string;
    description: string;
    type: 'person' | 'asset';
    target: string;
    status: 'investigating' | 'analyzing' | 'verifying' | 'completed' | 'suspended';
    priority: 'low' | 'medium' | 'high' | 'critical';
    createdDate: string;
    deadline: string;
    assignedTo: string[];
    progress: number;
    findings: number;
    lastUpdate: string;
  };
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');

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

  const addComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      console.log('Adding comment:', newComment);
      setNewComment('');
      toast.success('Komentar berhasil ditambahkan');
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      // Add task logic here
      console.log('Adding task:', newTaskTitle);
      setNewTaskTitle('');
      toast.success('Tugas berhasil ditambahkan');
    }
  };

  const handleTargetClick = () => {
    // Determine entity type and navigate to ontology
    const entityType = project.type === 'person' ? 'suspect' : 'asset';
    const entityName = project.target;
    navigate(`/ontology?entity=${encodeURIComponent(entityName)}&type=${entityType}`);
    onClose(); // Close the project detail modal
  };

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(project.status)}>{project.status.toUpperCase()}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={e => {
                e.stopPropagation();
                console.log('Edit button clicked');
                toast.success('Fitur edit akan segera tersedia');
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className="bg-slate-700 border-slate-600 hover:border-blue-500/50 transition-colors cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              handleTargetClick();
            }}
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
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        {/* Desktop Tabs */}
        <TabsList className="hidden md:grid w-full grid-cols-5">
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
          <TabsTrigger value="discussion" className="text-sm">
            Diskusi
          </TabsTrigger>
        </TabsList>

        {/* Mobile Tabs - Split into two rows */}
        <div className="md:hidden space-y-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">
              Tasks
            </TabsTrigger>
          </TabsList>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="findings" className="text-xs">
              Temuan
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs">
              Timeline
            </TabsTrigger>
            <TabsTrigger value="discussion" className="text-xs">
              Diskusi
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="space-y-6">
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
                  <span className="text-white capitalize">
                    {project.type === 'person' ? 'Investigasi Individu' : 'Pelacakan Aset'}
                  </span>
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
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Daftar Tugas</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Judul tugas baru"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                onKeyPress={e => e.key === 'Enter' && addTask()}
              />
              <Button
                onClick={e => {
                  e.stopPropagation();
                  addTask();
                }}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
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
              onClick={e => {
                e.stopPropagation();
                toast.success('Fitur tambah temuan akan segera tersedia');
              }}
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
                        onClick={e => {
                          e.stopPropagation();
                          toast.success('Fitur download bukti akan segera tersedia');
                        }}
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

        <TabsContent value="discussion" className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Diskusi Tim</h3>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Tambahkan komentar atau diskusi..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation();
                      toast.success('Fitur lampiran akan segera tersedia');
                    }}
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Lampiran
                  </Button>
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      addComment();
                    }}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Kirim
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample discussions */}
          <div className="space-y-3">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">IA</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">Investigator A</span>
                      <span className="text-xs text-gray-400">2 jam yang lalu</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Update terbaru: telah ditemukan 3 rekening tambahan yang terkait dengan
                      target. Sedang dalam proses verifikasi dengan bank terkait.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
