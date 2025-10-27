import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Badge } from '../../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../../ui/sheet';
import { Card, CardHeader, CardTitle, CardContent } from '../../../ui/card';
import { Label } from '../../../ui/label';
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
  AlertCircle,
  AlertTriangle,
  Database,
  Target,
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

// Global ontology database with all entities
const globalOntologyDatabase = {
  'budi santoso': {
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

  'jennifer kusuma': {
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

  'ahmad rahman': {
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

  'maria sari': {
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

export function StandaloneOntology() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [nodes, setNodes] = useState([]);
  const [targetName, setTargetName] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showOntology, setShowOntology] = useState(false);

  // Handle entity search - now shows search results as cards
  const handleEntitySearch = useCallback(async () => {
    if (!searchTerm || searchTerm.length < 3) {
      toast.error('Masukkan minimal 3 karakter untuk pencarian');
      return;
    }

    setIsLoading(true);
    setShowOntology(false);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Search through all entities in database
    const results = [];
    Object.keys(globalOntologyDatabase).forEach(key => {
      const entityData = globalOntologyDatabase[key];
      if (entityData.targetName.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({
          id: key,
          name: entityData.targetName,
          entityCount: entityData.nodes.length,
          connectionCount: entityData.nodes.reduce(
            (acc, node) => acc + (node.connections?.length || 0),
            0
          ),
          category:
            entityData.nodes.find(n => n.type === 'suspect')?.category || 'Target Investigasi',
          riskLevel: entityData.nodes.find(n => n.type === 'suspect')?.riskLevel || 'medium',
          occupation:
            entityData.nodes.find(n => n.type === 'suspect')?.attributes?.jabatan ||
            'Tidak diketahui',
        });
      }
    });

    setSearchResults(results);

    if (results.length > 0) {
      toast.success(`Ditemukan ${results.length} entitas yang cocok`);
    } else {
      toast.info('Tidak ditemukan entitas yang sesuai');
    }

    setIsLoading(false);
  }, [searchTerm]);

  // Handle card click to load ontology
  const handleCardClick = useCallback(async entityResult => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const ontologyData = globalOntologyDatabase[entityResult.id];

    if (ontologyData) {
      setNodes(ontologyData.nodes);
      setTargetName(ontologyData.targetName);
      setSelectedEntity(ontologyData.targetName);
      setShowOntology(true);
      setSearchResults([]); // Clear search results when showing ontology
      toast.success(`Ontologi ${ontologyData.targetName} berhasil dimuat`);
    }

    setIsLoading(false);
  }, []);

  // Filter nodes based on filters
  const filteredNodes = nodes.filter(node => {
    const matchesType = filterType === 'all' || node.type === filterType;
    const matchesRisk = filterRisk === 'all' || node.riskLevel === filterRisk;
    return matchesType && matchesRisk;
  });

  // Handlers
  const handleNodeClick = useCallback(node => {
    setSelectedNode(node);
    setIsDrawerOpen(true);
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
            // Calculate center positions (accounting for transform translate(-50%, -50%))
            const x1 = node.position.x * zoomLevel;
            const y1 = node.position.y * zoomLevel;
            const x2 = connectedNode.position.x * zoomLevel;
            const y2 = connectedNode.position.y * zoomLevel;

            // Create unique key to avoid duplicate lines
            const lineKey = [node.id, connectionId].sort().join('-');
            if (!connections.find(conn => conn.key === lineKey)) {
              connections.push(
                <g key={lineKey} className="connection-group">
                  {/* Connection line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="8,4"
                    opacity="0.7"
                    className="transition-all duration-200 hover:opacity-100 hover:stroke-cyan-400 drop-shadow-sm"
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Connection label background */}
                  <rect
                    x={(x1 + x2) / 2 - 25}
                    y={(y1 + y2) / 2 - 12}
                    width="50"
                    height="16"
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="1"
                    rx="3"
                    opacity="0.9"
                  />

                  {/* Connection label */}
                  <text
                    x={(x1 + x2) / 2}
                    y={(y1 + y2) / 2}
                    fill="#94a3b8"
                    fontSize="9"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none font-medium"
                  >
                    {node.relationToTarget?.length > 8
                      ? node.relationToTarget.substring(0, 8) + '...'
                      : node.relationToTarget || 'Terhubung'}
                  </text>

                  {/* Connection midpoint indicator */}
                  <circle
                    cx={(x1 + x2) / 2}
                    cy={(y1 + y2) / 2}
                    r="4"
                    fill="#3b82f6"
                    stroke="#1e293b"
                    strokeWidth="1"
                    opacity="0.8"
                    className="transition-all duration-200 hover:r-5 hover:fill-cyan-400"
                  />
                </g>
              );
            }
          }
        });
      }
    });

    return connections;
  };

  const renderSearchResultCard = result => {
    return (
      <Card
        key={result.id}
        className="bg-slate-800 border-slate-600 hover:border-slate-500 cursor-pointer transition-colors"
        onClick={() => handleCardClick(result)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white">{result.name}</h3>
                <div className="flex gap-2">
                  <Badge
                    className={`text-xs ${
                      result.riskLevel === 'critical'
                        ? 'bg-red-500/20 text-red-400'
                        : result.riskLevel === 'high'
                          ? 'bg-orange-500/20 text-orange-400'
                          : result.riskLevel === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {result.riskLevel?.toUpperCase() || 'MEDIUM'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{result.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{result.occupation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>
                    {result.entityCount} entitas, {result.connectionCount} koneksi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full bg-slate-900 overflow-y-auto">
      {/* Header - Removed sticky positioning */}
      <div className="p-6 bg-slate-800 border-b border-slate-600">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">Ontologi Explorer</h1>
            <p className="text-slate-400">
              Pencarian dan visualisasi entitas dalam database investigasi
            </p>
          </div>
        </div>

        {/* Warning Card */}
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-yellow-400 font-medium mb-1">💡 Panduan Pencarian Ontologi:</p>
                <ul className="text-yellow-300 space-y-1 text-xs">
                  <li>
                    • Masukkan <strong>minimal 3 karakter</strong> untuk pencarian yang optimal
                  </li>
                  <li>• Sistem akan menampilkan daftar entitas yang cocok dengan pencarian</li>
                  <li>• Klik salah satu card hasil pencarian untuk melihat ontologi lengkap</li>
                  <li>• Contoh: "Budi" akan menampilkan semua entitas dengan nama Budi</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <div className="space-y-4 mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Masukkan nama entitas untuk mencari ontologi..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleEntitySearch()}
              className="pl-10 bg-slate-700 border-slate-500 text-white text-lg h-12"
            />

            {/* Search Button */}
            <Button
              onClick={handleEntitySearch}
              disabled={isLoading || searchTerm.length < 3}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Mencari...' : 'Cari'}
            </Button>
          </div>

          {/* Current Selection - Redesigned to 2 rows */}
          {showOntology && selectedEntity && (
            <div className="bg-slate-700/50 rounded-lg border border-slate-600 p-3 space-y-3">
              {/* Baris Pertama: Ontologi Aktif Info */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">Ontologi Aktif: {targetName}</span>
                <span className="text-slate-300">•</span>
                <span className="text-cyan-400">{nodes.length} Entitas</span>
                <span className="text-slate-300">•</span>
                <span className="text-cyan-400">
                  {nodes.reduce((acc, node) => acc + (node.connections?.length || 0), 0)} Koneksi
                </span>
              </div>

              {/* Baris Kedua: Controls */}
              {nodes.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Back to Search Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShowOntology(false);
                        setSelectedEntity('');
                        setNodes([]);
                        setTargetName('');
                      }}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      ← Kembali ke Pencarian
                    </Button>

                    {/* Filters */}
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
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex gap-1">
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
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen relative bg-slate-900 pb-20">
        <div className="px-6 pt-6">
          {/* Show search results when there are search results */}
          {searchResults.length > 0 && !showOntology && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-white mb-4">
                Hasil Pencarian ({searchResults.length} entitas ditemukan)
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {searchResults.map(renderSearchResultCard)}
              </div>
            </div>
          )}

          {/* Show ontology visualization when an entity is selected */}
          {showOntology && (
            <>
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

              {/* Ontology Content */}
              {nodes.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-slate-400 text-lg mb-2">Tidak ada data ontologi</div>
                    <div className="text-slate-500 text-sm">
                      Entitas "{selectedEntity}" tidak memiliki data ontologi
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
                <div className="relative w-full min-h-[800px] p-8">
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full">
                      <defs>
                        <pattern
                          id="ontology-grid"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="#475569"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#ontology-grid)" />
                    </svg>
                  </div>

                  {/* Connections SVG Layer */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    {renderConnections()}
                  </svg>

                  {/* Nodes Layer */}
                  <div className="relative w-full h-full z-20">{filteredNodes.map(renderNode)}</div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-slate-800/90 border border-slate-600 rounded-lg p-3 z-30">
                    <h4 className="text-white text-sm font-medium mb-2">Legenda</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-slate-300">Garis Koneksi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-slate-300">Risiko Tinggi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-slate-300">Risiko Sedang</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-slate-300">Risiko Rendah</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Default state when no search or results */}
          {!showOntology && searchResults.length === 0 && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-slate-400 text-lg mb-2">Belum ada ontologi yang dimuat</div>
                <div className="text-slate-500 text-sm">
                  Gunakan pencarian di atas untuk mencari dan memuat ontologi entitas
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <div className="text-slate-400 text-lg mb-2">
                  {showOntology ? 'Memuat ontologi...' : 'Mencari entitas...'}
                </div>
              </div>
            </div>
          )}
        </div>
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
                  <h3 className="text-white text-lg font-medium mb-1">{selectedNode.name}</h3>
                  <p className="text-slate-300 text-sm mb-2">{selectedNode.category}</p>
                  <Badge
                    className={`text-xs ${
                      selectedNode.riskLevel === 'critical'
                        ? 'bg-red-500/20 text-red-400 border-red-500'
                        : selectedNode.riskLevel === 'high'
                          ? 'bg-orange-500/20 text-orange-400 border-orange-500'
                          : selectedNode.riskLevel === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
                            : 'bg-green-500/20 text-green-400 border-green-500'
                    }`}
                  >
                    {selectedNode.riskLevel?.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Atribut Entitas */}
              <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700">
                <Label className="text-slate-300 text-sm font-medium mb-3 block">
                  Informasi Detail
                </Label>
                <div className="space-y-3">
                  {Object.entries(selectedNode.attributes || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start gap-3">
                      <span className="text-slate-400 text-sm capitalize min-w-0 flex-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-white text-sm text-right min-w-0 flex-1 font-medium">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Koneksi */}
              {selectedNode.connections && selectedNode.connections.length > 0 && (
                <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700">
                  <Label className="text-slate-300 text-sm font-medium mb-3 block">
                    Terhubung dengan ({selectedNode.connections.length})
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
                    analisis pola transaksi dan hubungan dengan target utama. Diperlukan monitoring
                    ketat terhadap aktivitas finansial dan pergerakan aset.
                  </p>
                  <p className="text-slate-400 text-xs">Terakhir diperbarui: 2 jam yang lalu</p>
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
    </div>
  );
}
