import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Users,
  Building2,
  CreditCard,
  User,
  Search,
  ZoomIn,
  ZoomOut,
  Edit,
  Trash2,
  ArrowUp,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';

// Configuration for different node types
const nodeConfig = {
  suspect: { color: '#ef4444', icon: User },
  relative: { color: '#3b82f6', icon: Users },
  asset: { color: '#22c55e', icon: Building2 },
  transaction: { color: '#f59e0b', icon: CreditCard },
  organization: { color: '#8b5cf6', icon: Building2 },
};

// Mock data untuk setiap project dengan target yang sesuai
const projectOntologyData = {
  // Project 1: Investigasi Aset Tersangka Korupsi - Budi Santoso
  '1': {
    targetName: 'Budi Santoso',
    nodes: [
      {
        id: 'suspect-1',
        type: 'suspect',
        name: 'Budi Santoso',
        category: 'Tersangka Utama',
        riskLevel: 'critical',
        relationToTarget: 'Target Utama',
        position: { x: 400, y: 300 },
        connections: ['relative-1', 'asset-1', 'transaction-1'],
        attributes: {
          usia: '45 tahun',
          jabatan: 'Direktur Utama PT Maju Sejahtera',
          alamat: 'Jl. Sudirman No.88, Jakarta Pusat',
          kekayaan: 'Rp 125 Miliar (LHKPN)',
          statusHukum: 'Tersangka aktif',
        },
      },
      {
        id: 'relative-1',
        type: 'relative',
        name: 'Siti Santoso',
        category: 'Istri',
        riskLevel: 'high',
        relationToTarget: 'Istri',
        position: { x: 200, y: 200 },
        connections: ['suspect-1', 'asset-2'],
        attributes: {
          usia: '42 tahun',
          pekerjaan: 'Pengusaha Boutique',
          alamat: 'Sama dengan tersangka',
          catatan: 'Memiliki beberapa aset atas nama sendiri',
        },
      },
      {
        id: 'asset-1',
        type: 'asset',
        name: 'Villa Puncak',
        category: 'Properti',
        riskLevel: 'medium',
        relationToTarget: 'Aset Tersangka',
        position: { x: 600, y: 150 },
        connections: ['suspect-1'],
        attributes: {
          nilai: 'Rp 8.5 Miliar',
          lokasi: 'Jl. Raya Puncak KM 87',
          status: 'Atas nama PT Maju Sejahtera',
          tahunPembelian: '2019',
          luasTanah: '2.500 m²',
        },
      },
      {
        id: 'asset-2',
        type: 'asset',
        name: 'Apartemen Kemang',
        category: 'Properti',
        riskLevel: 'medium',
        relationToTarget: 'Aset Istri',
        position: { x: 100, y: 400 },
        connections: ['relative-1'],
        attributes: {
          nilai: 'Rp 4.2 Miliar',
          lokasi: 'Kemang Village Tower B',
          status: 'Atas nama Siti Santoso',
          tahunPembelian: '2020',
          luasBangunan: '150 m²',
        },
      },
      {
        id: 'transaction-1',
        type: 'transaction',
        name: 'Transfer Mencurigakan',
        category: 'Transaksi Besar',
        riskLevel: 'high',
        relationToTarget: 'Transaksi Tersangka',
        position: { x: 500, y: 450 },
        connections: ['suspect-1'],
        attributes: {
          jumlah: 'Rp 15 Miliar',
          tanggal: '15 Januari 2024',
          rekening: 'Bank Mandiri *** 1234',
          tujuan: 'Rekening offshore Singapore',
          catatan: 'Transfer tanpa dokumen pendukung',
        },
      },
    ],
  },

  // Project 2: Investigasi Pejabat Daerah - Jennifer Kusuma
  '2': {
    targetName: 'Jennifer Kusuma',
    nodes: [
      {
        id: 'suspect-2',
        type: 'suspect',
        name: 'Jennifer Kusuma',
        category: 'Pejabat Daerah',
        riskLevel: 'critical',
        relationToTarget: 'Target Utama',
        position: { x: 400, y: 300 },
        connections: ['relative-2', 'asset-4', 'organization-2'],
        attributes: {
          usia: '48 tahun',
          jabatan: 'Kepala Dinas Pendidikan Kota Makmur',
          alamat: 'Jl. Diponegoro No.25, Kota Makmur',
          masaJabatan: '2020-2025',
          statusHukum: 'Dalam penyelidikan markup anggaran',
        },
      },
      {
        id: 'relative-2',
        type: 'relative',
        name: 'Andi Kusuma',
        category: 'Suami',
        riskLevel: 'medium',
        relationToTarget: 'Suami',
        position: { x: 200, y: 200 },
        connections: ['suspect-2', 'organization-2'],
        attributes: {
          usia: '52 tahun',
          pekerjaan: 'Kontraktor Bangunan',
          alamat: 'Sama dengan tersangka',
          catatan: 'Memiliki CV konstruksi',
        },
      },
      {
        id: 'asset-4',
        type: 'asset',
        name: 'Rumah Mewah BSD',
        category: 'Properti Pribadi',
        riskLevel: 'high',
        relationToTarget: 'Aset Tersangka',
        position: { x: 600, y: 150 },
        connections: ['suspect-2'],
        attributes: {
          nilai: 'Rp 6.8 Miliar',
          lokasi: 'BSD City, Tangerang Selatan',
          status: 'Atas nama Jennifer Kusuma',
          tahunPembelian: '2022',
          luasTanah: '800 m²',
        },
      },
      {
        id: 'organization-2',
        type: 'organization',
        name: 'CV Mitra Konstruksi',
        category: 'Perusahaan Konstruksi',
        riskLevel: 'high',
        relationToTarget: 'Perusahaan Suami',
        position: { x: 150, y: 450 },
        connections: ['relative-2'],
        attributes: {
          bidangUsaha: 'Konstruksi Sekolah',
          tahunBerdiri: '2021',
          modalDasar: 'Rp 5 Miliar',
          proyekUtama: 'Renovasi sekolah-sekolah negeri',
          catatan: 'Selalu menang tender dinas pendidikan',
        },
      },
    ],
  },

  // Project 3: Investigasi Direktur BUMN - Ahmad Rahman
  '3': {
    targetName: 'Ahmad Rahman',
    nodes: [
      {
        id: 'suspect-3',
        type: 'suspect',
        name: 'Ahmad Rahman',
        category: 'Direktur BUMN',
        riskLevel: 'critical',
        relationToTarget: 'Target Utama',
        position: { x: 400, y: 300 },
        connections: ['organization-3', 'asset-5', 'transaction-2'],
        attributes: {
          usia: '55 tahun',
          jabatan: 'Direktur Utama PT Pelindo Regional',
          alamat: 'Jl. Rasuna Said No.100, Jakarta Selatan',
          masaJabatan: '2019-2024',
          statusHukum: 'Tersangka suap tender pelabuhan',
        },
      },
      {
        id: 'organization-3',
        type: 'organization',
        name: 'PT Maritim Jaya',
        category: 'Vendor BUMN',
        riskLevel: 'high',
        relationToTarget: 'Perusahaan Rekanan',
        position: { x: 250, y: 150 },
        connections: ['suspect-3', 'transaction-2'],
        attributes: {
          bidangUsaha: 'Kontraktor Pelabuhan',
          tahunBerdiri: '2018',
          modalDasar: 'Rp 100 Miliar',
          proyekUtama: 'Pembangunan terminal kontainer',
          catatan: 'Selalu menang tender besar Pelindo',
        },
      },
      {
        id: 'asset-5',
        type: 'asset',
        name: 'Yacht Mewah',
        category: 'Kendaraan Mewah',
        riskLevel: 'high',
        relationToTarget: 'Aset Tersangka',
        position: { x: 550, y: 200 },
        connections: ['suspect-3'],
        attributes: {
          nilai: 'Rp 45 Miliar',
          lokasi: 'Marina Ancol, Jakarta Utara',
          status: 'Atas nama Ahmad Rahman',
          tahunPembelian: '2023',
          spesifikasi: 'Yacht 80 feet, merk Azimut',
        },
      },
      {
        id: 'transaction-2',
        type: 'transaction',
        name: 'Fee Proyek Pelabuhan',
        category: 'Kickback',
        riskLevel: 'critical',
        relationToTarget: 'Suap Tersangka',
        position: { x: 500, y: 450 },
        connections: ['suspect-3', 'organization-3'],
        attributes: {
          jumlah: 'Rp 25 Miliar',
          tanggal: '10 Desember 2023',
          rekening: 'Bank BCA *** 5678',
          tujuan: 'Rekening pribadi Ahmad Rahman',
          catatan: '10% dari nilai kontrak Rp 250 Miliar',
        },
      },
    ],
  },

  // Project 4: Investigasi Pengusaha Swasta - Maria Sari
  '4': {
    targetName: 'Maria Sari',
    nodes: [
      {
        id: 'suspect-4',
        type: 'suspect',
        name: 'Maria Sari',
        category: 'Pengusaha Swasta',
        riskLevel: 'critical',
        relationToTarget: 'Target Utama',
        position: { x: 400, y: 300 },
        connections: ['organization-4', 'asset-6', 'relative-3'],
        attributes: {
          usia: '43 tahun',
          jabatan: 'CEO PT Digital Finance Indonesia',
          alamat: 'Jl. Thamrin No.50, Jakarta Pusat',
          kekayaan: 'Rp 500 Miliar (Forbes)',
          statusHukum: 'Tersangka penipuan skema ponzi',
        },
      },
      {
        id: 'organization-4',
        type: 'organization',
        name: 'PT Digital Finance Indonesia',
        category: 'Fintech Ilegal',
        riskLevel: 'critical',
        relationToTarget: 'Perusahaan Milik',
        position: { x: 250, y: 150 },
        connections: ['suspect-4'],
        attributes: {
          bidangUsaha: 'Investasi Digital',
          tahunBerdiri: '2020',
          modalDasar: 'Rp 10 Miliar',
          nasabah: '2.5 juta investor',
          catatan: 'Tanpa izin OJK, dana hilang Rp 18 Triliun',
        },
      },
      {
        id: 'asset-6',
        type: 'asset',
        name: 'Penthouse Sudirman',
        category: 'Properti Mewah',
        riskLevel: 'medium',
        relationToTarget: 'Aset Tersangka',
        position: { x: 550, y: 200 },
        connections: ['suspect-4'],
        attributes: {
          nilai: 'Rp 35 Miliar',
          lokasi: 'The Peak Sudirman Lantai 60',
          status: 'Atas nama Maria Sari',
          tahunPembelian: '2022',
          luasBangunan: '500 m²',
        },
      },
      {
        id: 'relative-3',
        type: 'relative',
        name: 'David Tanoto',
        category: 'Partner Bisnis',
        riskLevel: 'high',
        relationToTarget: 'Mitra Usaha',
        position: { x: 200, y: 450 },
        connections: ['suspect-4'],
        attributes: {
          usia: '47 tahun',
          jabatan: 'COO PT Digital Finance Indonesia',
          alamat: 'Singapura (WNA)',
          catatan: 'Handle operasional dan teknologi',
        },
      },
    ],
  },
};

interface ProjectOntologyViewProps {
  projectId: string;
  dataSources?: string[];
  isExploreMode?: boolean;
}

export function ProjectOntologyView({
  projectId,
  dataSources = [],
  isExploreMode = false,
}: ProjectOntologyViewProps) {
  const [nodes, setNodes] = useState([]);
  const [targetName, setTargetName] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Generate explore mode data based on selected data sources
  const generateExploreData = useCallback(
    (sources: string[]) => {
      const projectData = projectOntologyData[projectId] || projectOntologyData['1'];
      const baseNodes = [];

      // Add central suspect node
      const centralNode = projectData.nodes.find(n => n.type === 'suspect');
      if (centralNode) {
        baseNodes.push(centralNode);
      }

      // Generate nodes based on selected data sources
      sources.forEach((sourceId, index) => {
        const offset = index * 120 + 80;
        const angle = (index / sources.length) * 2 * Math.PI;
        const radius = 250;

        switch (sourceId) {
          case 'dukcapil':
            baseNodes.push({
              id: `dukcapil-${index}`,
              type: 'relative',
              name: 'Data Kependudukan',
              category: 'Dukcapil',
              riskLevel: 'medium',
              relationToTarget: 'Data NIK & KK',
              position: {
                x: 400 + radius * Math.cos(angle),
                y: 300 + radius * Math.sin(angle),
              },
              connections: [centralNode?.id || 'suspect-1'],
              attributes: {
                sumber: 'Dukcapil',
                nik: '3174************',
                namaLengkap: centralNode?.name || 'Target',
                tempatLahir: 'Jakarta',
                tanggalLahir: '15 Januari 1979',
                statusPerkawinan: 'Kawin',
              },
              dataSource: 'dukcapil',
            });
            break;
          case 'korlantas':
            baseNodes.push({
              id: `korlantas-${index}`,
              type: 'asset',
              name: 'Data Kendaraan',
              category: 'Korlantas',
              riskLevel: 'low',
              relationToTarget: 'Kepemilikan Kendaraan',
              position: {
                x: 400 + radius * Math.cos(angle),
                y: 300 + radius * Math.sin(angle),
              },
              connections: [centralNode?.id || 'suspect-1'],
              attributes: {
                sumber: 'Korlantas Polri',
                jumlahKendaraan: '5 unit',
                jenis: 'Mercedes-Benz S-Class, BMW X7, Toyota Alphard (2 unit), Honda CR-V',
                totalNilai: 'Rp 6.2 Miliar',
                statusSIM: 'Aktif (SIM A)',
              },
              dataSource: 'korlantas',
            });
            break;
          case 'pajak':
            baseNodes.push({
              id: `pajak-${index}`,
              type: 'transaction',
              name: 'Data Pajak',
              category: 'Perpajakan',
              riskLevel: 'high',
              relationToTarget: 'NPWP & SPT',
              position: {
                x: 400 + radius * Math.cos(angle),
                y: 300 + radius * Math.sin(angle),
              },
              connections: [centralNode?.id || 'suspect-1'],
              attributes: {
                sumber: 'Direktorat Jenderal Pajak',
                npwp: '01.234.567.8-901.000',
                penghasilanDilaporkan: 'Rp 850 Juta/tahun',
                pajakTerbayar: 'Rp 180 Juta/tahun',
                statusKepatuhan: 'Taat Pajak',
                catatan: 'Tidak sesuai dengan kekayaan aktual',
              },
              dataSource: 'pajak',
            });
            break;
          case 'perbankan':
            baseNodes.push({
              id: `perbankan-${index}`,
              type: 'transaction',
              name: 'Data Perbankan',
              category: 'Rekening Bank',
              riskLevel: 'critical',
              relationToTarget: 'Rekening & Transaksi',
              position: {
                x: 400 + radius * Math.cos(angle),
                y: 300 + radius * Math.sin(angle),
              },
              connections: [centralNode?.id || 'suspect-1'],
              attributes: {
                sumber: 'Data Perbankan',
                jumlahRekening: '12 rekening',
                bank: 'BCA, Mandiri, BNI, CIMB Niaga, HSBC',
                totalSaldo: 'Rp 45 Miliar',
                transaksiMencurigakan: '25 transaksi > Rp 1 M',
                rekeningOffshore: '2 rekening (Swiss, Singapore)',
              },
              dataSource: 'perbankan',
            });
            break;
          case 'bpn':
            baseNodes.push({
              id: `bpn-${index}`,
              type: 'asset',
              name: 'Data Properti',
              category: 'BPN',
              riskLevel: 'high',
              relationToTarget: 'Kepemilikan Tanah',
              position: {
                x: 400 + radius * Math.cos(angle),
                y: 300 + radius * Math.sin(angle),
              },
              connections: [centralNode?.id || 'suspect-1'],
              attributes: {
                sumber: 'Badan Pertanahan Nasional',
                jumlahProperti: '15 properti',
                lokasi: 'Jakarta (7), Bali (4), Puncak (2), Bandung (2)',
                luasTotal: '25.000 m²',
                nilaiTotal: 'Rp 285 Miliar',
                status: '8 atas nama pribadi, 7 atas nama PT',
              },
              dataSource: 'bpn',
            });
            break;
          case 'kemenkumham':
            baseNodes.push({
              id: `kemenkumham-${index}`,
              type: 'organization',
              name: 'Data Perusahaan',
              category: 'Kemenkumham',
              riskLevel: 'medium',
              relationToTarget: 'Kepemilikan Perusahaan',
              position: {
                x: 400 + radius * Math.cos(angle),
                y: 300 + radius * Math.sin(angle),
              },
              connections: [centralNode?.id || 'suspect-1'],
              attributes: {
                sumber: 'Kemenkumham',
                jumlahPerusahaan: '8 PT',
                perusahaan:
                  'PT Maju Sejahtera (Direktur), PT Digital Prima (Komisaris), 6 PT lainnya',
                modalDisetor: 'Total Rp 125 Miliar',
                bidangUsaha: 'Konstruksi, Trading, Properti, IT',
                status: 'Semua aktif',
              },
              dataSource: 'kemenkumham',
            });
            break;
          case 'ppatk':
            baseNodes.push({
              id: `ppatk-${index}`,
              type: 'transaction',
              name: 'Data PPATK',
              category: 'TPPU',
              riskLevel: 'critical',
              relationToTarget: 'Transaksi Mencurigakan',
              position: {
                x: 400 + radius * Math.cos(angle),
                y: 300 + radius * Math.sin(angle),
              },
              connections: [centralNode?.id || 'suspect-1'],
              attributes: {
                sumber: 'PPATK',
                jumlahLaporan: '18 laporan LTKM',
                totalNilai: 'Rp 125 Miliar',
                polaModus: 'Structuring, layering, placement',
                periode: '2020-2024',
                statusTindakLanjut: 'Dalam investigasi aktif',
              },
              dataSource: 'ppatk',
            });
            break;
          case 'imigrasi':
            baseNodes.push({
              id: `imigrasi-${index}`,
              type: 'transaction',
              name: 'Data Imigrasi',
              category: 'Perjalanan',
              riskLevel: 'medium',
              relationToTarget: 'Riwayat Perjalanan',
              position: {
                x: 400 + radius * Math.cos(angle),
                y: 300 + radius * Math.sin(angle),
              },
              connections: [centralNode?.id || 'suspect-1'],
              attributes: {
                sumber: 'Direktorat Jenderal Imigrasi',
                nomorPaspor: 'X1234567',
                statusPaspor: 'Aktif',
                frekuensiPerjalanan: '45 kali (3 tahun terakhir)',
                destinasiUtama: 'Singapura (15x), Swiss (8x), UAE (7x)',
                catatan: 'Pola perjalanan ke tax haven',
              },
              dataSource: 'imigrasi',
            });
            break;
        }
      });

      return {
        nodes: baseNodes,
        targetName: centralNode?.name || 'Target',
      };
    },
    [projectId]
  );

  // Initialize data
  useEffect(() => {
    console.log('Loading ontology data for project:', projectId);

    if (isExploreMode && dataSources.length > 0) {
      const exploreData = generateExploreData(dataSources);
      setNodes(exploreData.nodes);
      setTargetName(exploreData.targetName);
      toast.success(
        `Ontologi Explore: ${exploreData.nodes.length} entitas dari ${dataSources.length} sumber`
      );
    } else if (!isExploreMode) {
      const projectData = projectOntologyData[projectId] || projectOntologyData['1'];

      if (projectData) {
        console.log('Found project data:', projectData);
        setNodes(projectData.nodes);
        setTargetName(projectData.targetName);
        toast.success(`Ontologi dimuat: ${projectData.nodes.length} entitas`);
      } else {
        console.error('No project data found');
        setNodes([]);
        setTargetName('Unknown Target');
      }
    }
  }, [projectId, isExploreMode, dataSources, generateExploreData]);

  // Filter nodes based on search and filters
  const filteredNodes = nodes.filter(node => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.relationToTarget.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || node.type === filterType;
    const matchesRisk = filterRisk === 'all' || node.riskLevel === filterRisk;
    return matchesSearch && matchesType && matchesRisk;
  });

  // Handlers
  const handleNodeClick = useCallback(node => {
    setSelectedNode(node);
    setIsDrawerOpen(true);
  }, []);

  const handleAddEntity = useCallback(() => {
    setIsAddDialogOpen(true);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  }, []);

  const handleResetView = useCallback(() => {
    setZoomLevel(1);
  }, []);

  // Render single node
  const renderNode = node => {
    const config = nodeConfig[node.type];
    if (!config) return null;

    const Icon = config.icon;
    const isSelected = selectedNode?.id === node.id;

    const x = node.position.x * zoomLevel;
    const y = node.position.y * zoomLevel;

    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer transition-all duration-200 ${
          isSelected ? 'z-30' : 'z-10'
        }`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        onClick={() => handleNodeClick(node)}
      >
        {/* Node Circle */}
        <div
          className={`relative w-16 h-16 rounded-full border-2 shadow-lg flex items-center justify-center ${
            isSelected
              ? 'border-white bg-slate-700 scale-110 shadow-xl'
              : 'border-slate-500 bg-slate-700 hover:border-slate-400 hover:scale-105'
          }`}
          style={{
            borderColor: isSelected ? config.color : '#64748b',
            backgroundColor: '#475569',
          }}
        >
          <Icon className="w-6 h-6" style={{ color: config.color }} />

          {/* Risk indicator */}
          <div
            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-slate-800 ${
              node.riskLevel === 'critical'
                ? 'bg-red-500'
                : node.riskLevel === 'high'
                  ? 'bg-orange-500'
                  : node.riskLevel === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
            }`}
          ></div>
        </div>

        {/* Node label */}
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center min-w-max max-w-32">
          <p className="text-xs text-white font-medium bg-slate-800/90 px-2 py-1 rounded truncate">
            {node.name}
          </p>
          <p className="text-xs text-cyan-400 bg-slate-700/80 px-2 py-1 rounded mt-1 truncate">
            {node.relationToTarget}
          </p>
          {node.dataSource && (
            <p className="text-xs text-green-400 bg-green-500/20 border border-green-500/30 px-2 py-0.5 rounded mt-1 truncate">
              {node.attributes?.sumber || node.dataSource}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Render connections between nodes
  const renderConnections = () => {
    const connections = [];

    filteredNodes.forEach(node => {
      if (node.connections) {
        node.connections.forEach(connectionId => {
          const connectedNode = nodes.find(n => n.id === connectionId);
          if (connectedNode && filteredNodes.find(n => n.id === connectionId)) {
            const x1 = node.position.x * zoomLevel;
            const y1 = node.position.y * zoomLevel;
            const x2 = connectedNode.position.x * zoomLevel;
            const y2 = connectedNode.position.y * zoomLevel;

            connections.push(
              <line
                key={`${node.id}-${connectionId}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              />
            );
          }
        });
      }
    });

    return connections;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Title Section */}
      <div className="p-6 bg-slate-800 border-b border-slate-600">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              {isExploreMode ? 'Explore Ontologi - ' : 'Ontologi Target - '}
              {targetName}
            </h1>
            <p className="text-slate-400">
              {isExploreMode
                ? 'Visualisasi data dari sumber eksternal yang dipilih'
                : 'Visualisasi hubungan entitas, aset, dan transaksi terkait target investigasi'}
            </p>
          </div>

          {!isExploreMode && (
            <Button onClick={handleAddEntity} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Entitas
            </Button>
          )}
        </div>

        {/* Controls Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Cari entitas..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 w-64 bg-slate-700 border-slate-500 text-white"
            />
          </div>

          {/* Type Filter */}
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-500 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-500 text-white">
              <SelectItem value="all">Semua Jenis</SelectItem>
              <SelectItem value="suspect">Tersangka</SelectItem>
              <SelectItem value="relative">Keluarga</SelectItem>
              <SelectItem value="asset">Aset</SelectItem>
              <SelectItem value="transaction">Transaksi</SelectItem>
              <SelectItem value="organization">Organisasi</SelectItem>
            </SelectContent>
          </Select>

          {/* Risk Filter */}
          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-500 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-500 text-white">
              <SelectItem value="all">Semua Risiko</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Zoom Controls */}
          <div className="flex gap-1 ml-auto">
            <Button
              size="sm"
              onClick={handleZoomOut}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleResetView}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleZoomIn}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 w-full h-full opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#475569" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        {nodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-slate-400 text-lg mb-2">Tidak ada data ontologi</div>
              <div className="text-slate-500 text-sm">
                Tambahkan entitas pertama dengan mengklik tombol "Tambah Entitas"
              </div>
            </div>
          </div>
        ) : filteredNodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-slate-400 text-lg mb-2">
                Tidak ada entitas yang sesuai dengan filter
              </div>
              <div className="text-slate-500 text-sm">Coba ubah filter pencarian</div>
            </div>
          </div>
        ) : (
          <>
            {/* Connections SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {renderConnections()}
            </svg>

            {/* Nodes Layer */}
            <div className="absolute inset-0 w-full h-full">{filteredNodes.map(renderNode)}</div>
          </>
        )}
      </div>

      {/* Node Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="bg-slate-800 border-slate-600 text-white w-96 overflow-y-auto px-6">
          <SheetHeader className="pb-4 sticky top-0 bg-slate-800 z-10">
            <SheetTitle className="text-white text-lg">Detail Entitas</SheetTitle>
          </SheetHeader>

          {selectedNode && (
            <div className="space-y-6 pb-6">
              {/* Header dengan Icon dan Nama */}
              <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                {(() => {
                  const config = nodeConfig[selectedNode.type];
                  const Icon = config?.icon || User;
                  return (
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: config?.color || '#64748b',
                        backgroundColor: '#475569',
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: config?.color || '#64748b' }} />
                    </div>
                  );
                })()}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg text-white mb-1">{selectedNode.name}</h3>
                  <p className="text-slate-400 text-sm mb-2">{selectedNode.category}</p>
                  <Badge
                    className={`text-xs ${
                      selectedNode.riskLevel === 'critical'
                        ? 'bg-red-500 hover:bg-red-600'
                        : selectedNode.riskLevel === 'high'
                          ? 'bg-orange-500 hover:bg-orange-600'
                          : selectedNode.riskLevel === 'medium'
                            ? 'bg-yellow-500 hover:bg-yellow-600'
                            : 'bg-green-500 hover:bg-green-600'
                    } text-white border-0`}
                  >
                    RISIKO {selectedNode.riskLevel?.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Informasi Detail */}
              <div className="space-y-4">
                <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700">
                  <Label className="text-slate-300 text-sm font-medium">
                    Hubungan dengan Target
                  </Label>
                  <p className="text-cyan-400 mt-1 font-medium">{selectedNode.relationToTarget}</p>
                </div>

                {selectedNode.attributes && Object.keys(selectedNode.attributes).length > 0 && (
                  <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700">
                    <Label className="text-slate-300 text-sm font-medium mb-3 block">
                      Informasi Detail
                    </Label>
                    <div className="space-y-3">
                      {Object.entries(selectedNode.attributes).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-white text-sm">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connection Info */}
                {selectedNode.connections && selectedNode.connections.length > 0 && (
                  <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700">
                    <Label className="text-slate-300 text-sm font-medium mb-3 block">
                      Koneksi Entitas
                    </Label>
                    <div className="space-y-2">
                      {selectedNode.connections.map(connectionId => {
                        const connectedNode = nodes.find(n => n.id === connectionId);
                        if (!connectedNode) return null;

                        const config = nodeConfig[connectedNode.type];
                        const Icon = config?.icon || User;

                        return (
                          <div
                            key={connectionId}
                            className="flex items-center gap-3 p-2 bg-slate-800/50 rounded border border-slate-600"
                          >
                            <div
                              className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0"
                              style={{
                                borderColor: config?.color || '#64748b',
                                backgroundColor: '#475569',
                              }}
                            >
                              <Icon
                                className="w-4 h-4"
                                style={{ color: config?.color || '#64748b' }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-white text-sm font-medium">{connectedNode.name}</p>
                              <p className="text-slate-400 text-xs">
                                {connectedNode.relationToTarget}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Catatan Investigasi */}
                <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700">
                  <Label className="text-slate-300 text-sm font-medium mb-3 block">
                    Catatan Investigasi
                  </Label>
                  <div className="space-y-2">
                    <p className="text-white text-sm leading-relaxed">
                      Entitas ini memiliki tingkat risiko {selectedNode.riskLevel} berdasarkan
                      analisis pola transaksi dan hubungan dengan target utama. Diperlukan
                      monitoring ketat terhadap aktivitas finansial dan pergerakan aset.
                    </p>
                    <p className="text-slate-400 text-xs">Terakhir diperbarui: 2 jam yang lalu</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-slate-700 sticky bottom-0 bg-slate-800 pb-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-950 hover:border-red-500 flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Entity Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-600 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Tambah Entitas Baru</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Nama Entitas</Label>
              <Input
                placeholder="Masukkan nama entitas..."
                className="bg-slate-700 border-slate-500 text-white"
              />
            </div>

            <div>
              <Label>Jenis Entitas</Label>
              <Select>
                <SelectTrigger className="bg-slate-700 border-slate-500 text-white">
                  <SelectValue placeholder="Pilih jenis entitas" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-500 text-white">
                  <SelectItem value="suspect">Tersangka</SelectItem>
                  <SelectItem value="relative">Keluarga</SelectItem>
                  <SelectItem value="asset">Aset</SelectItem>
                  <SelectItem value="transaction">Transaksi</SelectItem>
                  <SelectItem value="organization">Organisasi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Hubungan dengan Target</Label>
              <Input
                placeholder="Contoh: Anak, Rekan Bisnis, dll..."
                className="bg-slate-700 border-slate-500 text-white"
              />
            </div>

            <div>
              <Label>Catatan</Label>
              <Textarea
                placeholder="Informasi tambahan..."
                className="bg-slate-700 border-slate-500 text-white resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => {
                  setIsAddDialogOpen(false);
                  toast.success('Entitas berhasil ditambahkan');
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Tambah Entitas
              </Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
