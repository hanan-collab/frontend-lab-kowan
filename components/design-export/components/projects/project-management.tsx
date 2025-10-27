import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Badge } from '../../../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '../../../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  Plus,
  Search,
  Users,
  Package,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
  UserCircle,
} from 'lucide-react';
import { CreateProjectForm } from './create-project-form';

interface Project {
  id: string;
  name: string;
  description: string;
  type: 'person'; // Only person now
  target: string;
  status: 'investigating' | 'analyzing' | 'verifying' | 'completed' | 'suspended';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdDate: string;
  deadline: string;
  assignedTo: string[];
  progress: number;
  findings: number;
  lastUpdate: string;
  sourceType: 'internal' | 'external';
  relatedCaseId?: string;
  relatedCaseNumber?: string;
  externalRequestor?: string;
  externalInstitution?: string;
}

export function ProjectManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data for projects - Target User only
  const [projects] = useState<Project[]>([
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
      sourceType: 'internal',
      relatedCaseId: 'BP-2024-001',
      relatedCaseNumber: 'REG-001/PID.SUS/2024/PN.JKT.PST',
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
      sourceType: 'external',
      externalRequestor: 'Inspektorat Jenderal Kemendagri',
      externalInstitution: 'Kementerian Dalam Negeri',
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
      sourceType: 'internal',
      relatedCaseId: 'BP-2024-003',
      relatedCaseNumber: 'REG-003/PID.SUS/2024/PN.BDG',
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
      sourceType: 'external',
      externalRequestor: 'KPK',
      externalInstitution: 'Komisi Pemberantasan Korupsi',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'investigating':
        return <Clock className="h-4 w-4" />;
      case 'analyzing':
        return <TrendingUp className="h-4 w-4" />;
      case 'verifying':
        return <AlertCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'suspended':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
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

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    investigating: projects.filter(p => p.status === 'investigating').length,
    analyzing: projects.filter(p => p.status === 'analyzing').length,
    verifying: projects.filter(p => p.status === 'verifying').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  const openProjectDetail = (project: Project) => {
    // Navigate to project detail page using React Router
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Manajemen Proyek</h1>
          <p className="text-gray-400">Kelola proyek penelusuran aset dan investigasi</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Proyek Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-700 flex-shrink-0">
              <DialogTitle className="text-white">Buat Proyek Baru</DialogTitle>
              <DialogDescription className="text-slate-400">
                Buat proyek investigasi baru untuk melacak dan menganalisis aset atau individu
                tersangka.
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto px-6 py-4 flex-1 min-h-0 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              <CreateProjectForm onClose={() => setIsCreateDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Proyek</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Investigasi</p>
                <p className="text-2xl font-bold text-blue-400">{stats.investigating}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Analisis</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.analyzing}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Verifikasi</p>
                <p className="text-2xl font-bold text-orange-400">{stats.verifying}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Selesai</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari proyek atau target..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('all')}
                size="sm"
              >
                Semua
              </Button>
              <Button
                variant={selectedStatus === 'investigating' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('investigating')}
                size="sm"
              >
                Investigasi
              </Button>
              <Button
                variant={selectedStatus === 'analyzing' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('analyzing')}
                size="sm"
              >
                Analisis
              </Button>
              <Button
                variant={selectedStatus === 'verifying' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('verifying')}
                size="sm"
              >
                Verifikasi
              </Button>
              <Button
                variant={selectedStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('completed')}
                size="sm"
              >
                Selesai
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map(project => (
          <Card
            key={project.id}
            className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer"
            onClick={() => openProjectDetail(project)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white mb-2">{project.name}</CardTitle>
                  <p className="text-sm text-gray-400">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {project.sourceType === 'internal' ? (
                    <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                      <Building2 className="h-3 w-3 mr-1" />
                      Internal
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">
                      <UserCircle className="h-3 w-3 mr-1" />
                      Eksternal
                    </Badge>
                  )}
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.type === 'person' ? (
                      <Users className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Package className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-400">Target:</span>
                    <span className="text-sm text-white font-medium">{project.target}</span>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1 capitalize">{project.status}</span>
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">
                        Deadline: {new Date(project.deadline).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-400">{project.findings} temuan</span>
                    </div>
                  </div>
                </div>

                {project.sourceType === 'internal' && project.relatedCaseNumber && (
                  <div className="p-2 bg-green-600/10 border border-green-500/30 rounded-md">
                    <p className="text-xs text-green-400">
                      <Building2 className="h-3 w-3 inline mr-1" />
                      Terkait Perkara: {project.relatedCaseNumber}
                    </p>
                  </div>
                )}

                {project.sourceType === 'external' && project.externalRequestor && (
                  <div className="p-2 bg-blue-600/10 border border-blue-500/30 rounded-md">
                    <p className="text-xs text-blue-400">
                      <UserCircle className="h-3 w-3 inline mr-1" />
                      Permintaan: {project.externalRequestor}
                      {project.externalInstitution && ` (${project.externalInstitution})`}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      Tim: {project.assignedTo.join(', ')}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">Update: {project.lastUpdate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
