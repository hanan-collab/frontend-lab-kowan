import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

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

// Mock data
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

export function ProjectDetailPageSimple() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    console.log('ProjectDetailPageSimple mounted with id:', id);

    if (id) {
      const foundProject = mockProjects.find(p => p.id === id);
      console.log('Found project:', foundProject);

      if (foundProject) {
        setProject(foundProject);
      } else {
        console.log('Project not found for id:', id);
        toast.error('Proyek tidak ditemukan');
        navigate('/projects');
      }
    } else {
      console.log('No ID provided');
      navigate('/projects');
    }
  }, [id, navigate]);

  console.log('Rendering ProjectDetailPageSimple. Project:', project);

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
      </div>

      {/* Simple Project Info */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Project Information</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Target:</span>
            <span className="text-white ml-2">{project.target}</span>
          </div>
          <div>
            <span className="text-gray-400">Status:</span>
            <span className="text-white ml-2">{project.status}</span>
          </div>
          <div>
            <span className="text-gray-400">Priority:</span>
            <span className="text-white ml-2">{project.priority}</span>
          </div>
          <div>
            <span className="text-gray-400">Progress:</span>
            <span className="text-white ml-2">{project.progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
