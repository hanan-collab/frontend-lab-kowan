import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import {
  Users,
  Building2,
  CreditCard,
  User,
  Search,
  Plus,
  ZoomIn,
  ZoomOut,
  Filter,
  Download,
  Upload,
  Settings,
  Edit,
  Trash2,
  ArrowUp,
  Activity,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';

// Node configuration for different entity types
const nodeConfig = {
  suspect: { color: '#ef4444', icon: User },
  relative: { color: '#f97316', icon: Users },
  asset: { color: '#22c55e', icon: Building2 },
  transaction: { color: '#eab308', icon: CreditCard },
  organization: { color: '#8b5cf6', icon: Building2 },
};

// Mock data for different investigation cases
const investigationCases = {
  'budi-santoso': {
    name: 'Kasus Budi Santoso',
    description: 'Investigasi dugaan korupsi pengadaan barang dan jasa senilai Rp 250 Miliar',
    nodes: [
      {
        id: 'suspect-1',
        type: 'suspect',
        name: 'Budi Santoso',
        category: 'Tersangka Utama',
        riskLevel: 'critical',
        relationToTarget: 'Target Utama',
        attributes: {
          usia: '45 tahun',
          jabatan: 'Direktur Utama PT Maju Sejahtera',
          alamat: 'Jl. Sudirman No.88, Jakarta Pusat',
          kekayaan: 'Rp 125 Miliar (LHKPN)',
        },
        position: { x: 400, y: 300 },
        connections: ['relative-1', 'asset-1', 'transaction-1', 'organization-1'],
      },
      {
        id: 'relative-1',
        type: 'relative',
        name: 'Siti Santoso',
        category: 'Istri',
        riskLevel: 'high',
        relationToTarget: 'Istri',
        attributes: {
          hubungan: 'Istri',
          pekerjaan: 'Pengusaha Properti',
          usia: '42 tahun',
        },
        position: { x: 200, y: 200 },
        connections: ['suspect-1', 'asset-1'],
      },
      {
        id: 'asset-1',
        type: 'asset',
        name: 'Villa Puncak Resort',
        category: 'Properti Mewah',
        riskLevel: 'high',
        relationToTarget: 'Aset Tersangka',
        attributes: {
          jenis: 'Villa Resort',
          lokasi: 'Puncak, Bogor',
          nilai: 'Rp 35 Miliar',
        },
        position: { x: 600, y: 200 },
        connections: ['suspect-1', 'relative-1'],
      },
      {
        id: 'transaction-1',
        type: 'transaction',
        name: 'Transfer Bank #47291',
        category: 'Transfer Internasional',
        riskLevel: 'high',
        relationToTarget: 'Transaksi Tersangka',
        attributes: {
          jumlah: 'Rp 8 Miliar',
          tanggal: '5 Januari 2024',
          tujuan: 'Cayman Islands Trust',
        },
        position: { x: 500, y: 400 },
        connections: ['suspect-1', 'organization-1'],
      },
      {
        id: 'organization-1',
        type: 'organization',
        name: 'PT Maju Sejahtera',
        category: 'Perusahaan Induk',
        riskLevel: 'medium',
        relationToTarget: 'Perusahaan Tersangka',
        attributes: {
          jenis: 'PT',
          bidang: 'Perdagangan & Investasi',
          modal: 'Rp 50 Miliar',
        },
        position: { x: 200, y: 400 },
        connections: ['suspect-1', 'transaction-1'],
      },
    ],
  },
  'jennifer-kusuma': {
    name: 'Kasus Jennifer Kusuma',
    description: 'Investigasi penyalahgunaan wewenang proyek infrastruktur daerah',
    nodes: [
      {
        id: 'suspect-1',
        type: 'suspect',
        name: 'Jennifer Kusuma',
        category: 'Pejabat Daerah',
        riskLevel: 'high',
        relationToTarget: 'Target Utama',
        attributes: {
          usia: '38 tahun',
          jabatan: 'Kepala Dinas Pekerjaan Umum',
          alamat: 'Jl. Veteran No.45, Bandung',
          gaji: 'Rp 25 Juta/bulan',
        },
        position: { x: 400, y: 300 },
        connections: ['asset-1', 'asset-2', 'transaction-1', 'organization-1'],
      },
      {
        id: 'asset-1',
        type: 'asset',
        name: 'Rumah Mewah Dago',
        category: 'Properti Pribadi',
        riskLevel: 'critical',
        relationToTarget: 'Aset Pribadi',
        attributes: {
          jenis: 'Rumah Tinggal',
          lokasi: 'Dago, Bandung',
          nilai: 'Rp 8 Miliar',
        },
        position: { x: 200, y: 200 },
        connections: ['suspect-1'],
      },
      {
        id: 'asset-2',
        type: 'asset',
        name: 'Investasi Saham',
        category: 'Portofolio Investasi',
        riskLevel: 'medium',
        relationToTarget: 'Investasi Tersangka',
        attributes: {
          jenis: 'Saham Blue Chip',
          nilai: 'Rp 3.5 Miliar',
          platform: 'Various Brokers',
        },
        position: { x: 600, y: 200 },
        connections: ['suspect-1'],
      },
      {
        id: 'transaction-1',
        type: 'transaction',
        name: 'Kontrak Proyek Infrastruktur',
        category: 'Kontrak Pemerintah',
        riskLevel: 'critical',
        relationToTarget: 'Kontrak Terkait',
        attributes: {
          nilai: 'Rp 150 Miliar',
          periode: '2023-2024',
          kontraktor: 'PT Pembangunan Jaya',
        },
        position: { x: 500, y: 400 },
        connections: ['suspect-1', 'organization-1'],
      },
      {
        id: 'organization-1',
        type: 'organization',
        name: 'PT Pembangunan Jaya',
        category: 'Kontraktor Swasta',
        riskLevel: 'high',
        relationToTarget: 'Perusahaan Keluarga',
        attributes: {
          jenis: 'Perusahaan Konstruksi',
          didirikan: '2018',
          kepemilikan: 'Keluarga Besar Jennifer',
        },
        position: { x: 300, y: 450 },
        connections: ['transaction-1'],
      },
    ],
  },
};

export function CrimeOntologyPlatform() {
  const [selectedCase, setSelectedCase] = useState('budi-santoso');
  const [nodes, setNodes] = useState(investigationCases[selectedCase].nodes);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [panOffset, setPanOffset] = useState({ x: 150, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState(null);
  const canvasRef = useRef(null);

  // Initialize view when case changes
  useEffect(() => {
    const caseData = investigationCases[selectedCase];
    setNodes(caseData.nodes);
    setSelectedNode(null);
    setIsDrawerOpen(false);
    setZoomLevel(0.8);
    setPanOffset({ x: 150, y: 100 });
  }, [selectedCase]);

  // Handle node selection
  const handleNodeClick = node => {
    setSelectedNode(node);
    setIsDrawerOpen(true);
  };

  // Filter nodes berdasarkan pencarian dan filter
  const filteredNodes = nodes.filter(node => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || node.type === filterType;
    const matchesRisk = filterRisk === 'all' || node.riskLevel === filterRisk;

    return matchesSearch && matchesType && matchesRisk;
  });

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const handleResetView = () => {
    setZoomLevel(0.8);
    setPanOffset({ x: 150, y: 100 });
  };

  // Pan controls
  const handleMouseDown = useCallback(
    (e, node = null) => {
      if (node) {
        e.stopPropagation();
        setDraggedNode(node);
      } else {
        setIsDragging(true);
        setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      }
    },
    [panOffset]
  );

  const handleMouseMove = useCallback(
    e => {
      if (isDragging) {
        setPanOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      } else if (draggedNode && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const newX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
        const newY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

        setNodes(prev =>
          prev.map(node =>
            node.id === draggedNode.id ? { ...node, position: { x: newX, y: newY } } : node
          )
        );
      }
    },
    [isDragging, draggedNode, dragStart, panOffset, zoomLevel]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDraggedNode(null);
  }, []);

  // Event listeners
  useEffect(() => {
    const handleGlobalMouseMove = e => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging || draggedNode) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, draggedNode, handleMouseMove, handleMouseUp]);

  // Render node
  const renderNode = useCallback(
    node => {
      const config = nodeConfig[node.type];
      if (!config) return null;

      const Icon = config.icon;
      const isSelected = selectedNode?.id === node.id;

      const transformedX = node.position.x * zoomLevel + panOffset.x;
      const transformedY = node.position.y * zoomLevel + panOffset.y;

      return (
        <div
          key={node.id}
          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            isSelected ? 'z-30' : 'z-10'
          }`}
          style={{ left: transformedX, top: transformedY }}
          onClick={() => handleNodeClick(node)}
          onMouseDown={e => {
            e.stopPropagation();
            handleMouseDown(e, node);
          }}
        >
          <div
            className={`relative w-16 h-16 rounded-full border-3 shadow-lg backdrop-blur-sm flex items-center justify-center ${
              isSelected
                ? 'border-white bg-slate-700/95 scale-110 shadow-xl'
                : 'border-slate-500 bg-slate-700/85 hover:border-slate-400 hover:bg-slate-700/95 hover:scale-105'
            }`}
            style={{
              borderColor: isSelected ? config.color : undefined,
              backgroundColor: `${config.color}15`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: config.color }} />

            {/* Risk indicator */}
            <div
              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
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

          {/* Node label with relationship */}
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center min-w-max">
            <p className="text-xs text-white font-medium bg-slate-800/90 px-2 py-1 rounded backdrop-blur-sm">
              {node.name}
            </p>
            <p className="text-xs text-cyan-400 bg-slate-700/80 px-2 py-1 rounded mt-1 backdrop-blur-sm">
              {node.relationToTarget}
            </p>
          </div>
        </div>
      );
    },
    [selectedNode, zoomLevel, panOffset, handleMouseDown, handleNodeClick]
  );

  // Render connections
  const renderConnections = useCallback(() => {
    const connections = [];

    filteredNodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const connectedNode = nodes.find(n => n.id === connectionId);
        if (connectedNode && filteredNodes.find(n => n.id === connectionId)) {
          const startX = node.position.x * zoomLevel + panOffset.x;
          const startY = node.position.y * zoomLevel + panOffset.y;
          const endX = connectedNode.position.x * zoomLevel + panOffset.x;
          const endY = connectedNode.position.y * zoomLevel + panOffset.y;

          connections.push(
            <line
              key={`${node.id}-${connectionId}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="8,4"
              opacity="0.7"
              className="drop-shadow-sm"
            />
          );
        }
      });
    });

    return connections;
  }, [nodes, filteredNodes, zoomLevel, panOffset]);

  // Render selected node info in drawer
  const renderSelectedNodeInfo = useCallback(() => {
    if (!selectedNode) return null;

    const config = nodeConfig[selectedNode.type];
    if (!config) return null;

    const Icon = config.icon;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-600">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config.color}20`, border: `3px solid ${config.color}` }}
          >
            <Icon className="w-8 h-8" style={{ color: config.color }} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">{selectedNode.name}</h3>
            <p className="text-slate-400">{selectedNode.category}</p>
            <div className="flex gap-2 mt-2">
              <Badge
                className={`${
                  selectedNode.riskLevel === 'critical'
                    ? 'bg-red-500/20 text-red-400'
                    : selectedNode.riskLevel === 'high'
                      ? 'bg-orange-500/20 text-orange-400'
                      : selectedNode.riskLevel === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                }`}
              >
                {selectedNode.riskLevel.toUpperCase()}
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400">
                {selectedNode.relationToTarget}
              </Badge>
            </div>
          </div>
        </div>

        {/* Attributes */}
        <div>
          <h4 className="font-medium text-cyan-400 mb-4">Informasi Detail</h4>
          <div className="space-y-3">
            {Object.entries(selectedNode.attributes || {}).map(([key, value]) => (
              <div key={key} className="bg-slate-700/30 p-3 rounded-lg">
                <span className="text-slate-400 capitalize block text-sm">{key}:</span>
                <span className="text-white mt-1 block">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connected entities */}
        <div>
          <h4 className="font-medium text-cyan-400 mb-4">
            Entitas Terhubung ({selectedNode.connections.length})
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {selectedNode.connections.map(connectionId => {
              const connectedNode = nodes.find(n => n.id === connectionId);
              if (!connectedNode) return null;

              const config = nodeConfig[connectedNode.type];
              if (!config) return null;
              const Icon = config.icon;

              return (
                <div
                  key={connectionId}
                  className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleNodeClick(connectedNode)}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${config.color}20`,
                      border: `2px solid ${config.color}`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{connectedNode.name}</p>
                    <p className="text-sm text-slate-400">{connectedNode.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-600">
          <Button variant="outline" className="w-full border-slate-600 hover:bg-slate-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit Entitas
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-600 hover:bg-red-700/20 text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus Entitas
          </Button>
        </div>
      </div>
    );
  }, [selectedNode, nodes, handleNodeClick]);

  return (
    <div className="h-full bg-slate-900 text-white">
      <Tabs defaultValue="visualization" className="h-full flex flex-col">
        <div className="border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-white">Crime Ontology Mapping Platform</h1>
              <p className="text-slate-400">Visualisasi dan analisis jaringan entitas kriminal</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedCase} onValueChange={setSelectedCase}>
                <SelectTrigger className="w-64 bg-slate-700 border-slate-500 text-white">
                  <SelectValue placeholder="Pilih kasus investigasi" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-500 text-white">
                  {Object.entries(investigationCases).map(([key, case_]) => (
                    <SelectItem key={key} value={key}>
                      {case_.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="border-slate-600">
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
              <Button variant="outline" size="sm" className="border-slate-600">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <TabsList className="bg-slate-800 border-slate-600">
            <TabsTrigger value="visualization" className="data-[state=active]:bg-slate-700">
              <Activity className="w-4 h-4 mr-2" />
              Visualisasi Graph
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700">
              <FileText className="w-4 h-4 mr-2" />
              Analisis & Laporan
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="visualization" className="flex-1 flex flex-col m-0">
          {/* Controls */}
          <div className="border-b border-slate-700 p-4 bg-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Cari entitas berdasarkan nama, jenis, atau hubungan..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="flex-1 bg-slate-700 border-slate-500 text-white placeholder:text-slate-300"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40 bg-slate-700 border-slate-500 text-white">
                  <SelectValue placeholder="Filter berdasarkan jenis" />
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
                  <SelectValue placeholder="Filter berdasarkan risiko" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-500 text-white">
                  <SelectItem value="all">Semua Tingkat Risiko</SelectItem>
                  <SelectItem value="low">Risiko Rendah</SelectItem>
                  <SelectItem value="medium">Risiko Sedang</SelectItem>
                  <SelectItem value="high">Risiko Tinggi</SelectItem>
                  <SelectItem value="critical">Risiko Kritis</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  className="border-slate-600"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-slate-400 min-w-12 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  className="border-slate-600"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetView}
                  className="border-slate-600"
                  title="Reset View"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 relative bg-slate-900 overflow-hidden min-h-[500px]">
            {/* Case Info */}
            <div className="absolute top-4 left-4 z-50 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-3">
              <div className="text-xs text-slate-300 space-y-1">
                <div className="font-medium text-cyan-400">
                  {investigationCases[selectedCase].name}
                </div>
                <div>
                  Entitas: {filteredNodes.length} dari {nodes.length}
                </div>
                <div className="text-xs">{investigationCases[selectedCase].description}</div>
              </div>
            </div>

            <div
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-move"
              onMouseDown={e => handleMouseDown(e)}
            >
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {renderConnections()}
              </svg>

              {/* Nodes */}
              {filteredNodes.map(renderNode)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Statistik Kasus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Entitas</span>
                    <span className="text-white font-medium">{nodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tersangka</span>
                    <span className="text-white font-medium">
                      {nodes.filter(n => n.type === 'suspect').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Keluarga/Kerabat</span>
                    <span className="text-white font-medium">
                      {nodes.filter(n => n.type === 'relative').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Aset</span>
                    <span className="text-white font-medium">
                      {nodes.filter(n => n.type === 'asset').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transaksi</span>
                    <span className="text-white font-medium">
                      {nodes.filter(n => n.type === 'transaction').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Organisasi</span>
                    <span className="text-white font-medium">
                      {nodes.filter(n => n.type === 'organization').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Tingkat Risiko</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Risiko Kritis</span>
                    <Badge className="bg-red-500/20 text-red-400">
                      {nodes.filter(n => n.riskLevel === 'critical').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Risiko Tinggi</span>
                    <Badge className="bg-orange-500/20 text-orange-400">
                      {nodes.filter(n => n.riskLevel === 'high').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Risiko Sedang</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                      {nodes.filter(n => n.riskLevel === 'medium').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Risiko Rendah</span>
                    <Badge className="bg-green-500/20 text-green-400">
                      {nodes.filter(n => n.riskLevel === 'low').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Node Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent
          side="right"
          className="w-[500px] sm:w-[540px] bg-slate-800 border-slate-600 text-white overflow-y-auto"
        >
          <SheetHeader className="px-6 pt-6">
            <SheetTitle className="text-white">Detail Entitas</SheetTitle>
          </SheetHeader>
          <div className="px-6 pb-6 mt-6">{renderSelectedNodeInfo()}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
