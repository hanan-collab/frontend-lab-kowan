import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import {
  Plus,
  Download,
  Save,
  Undo,
  Redo,
  HelpCircle,
  Filter,
  GripVertical,
  X,
  Settings,
  BarChart3,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  FolderOpen,
  Database,
  Hash,
  Calendar,
  Type,
  DollarSign,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data untuk dataset dengan kategori field
const mockDatasets = [
  {
    id: 'transactions',
    name: 'Data Transaksi Aset',
    categories: [
      {
        name: 'Identifikasi',
        icon: Hash,
        fields: [
          { name: 'ID Transaksi', type: 'text', icon: Hash },
          { name: 'Nomor Referensi', type: 'text', icon: Hash },
        ],
      },
      {
        name: 'Tanggal & Waktu',
        icon: Calendar,
        fields: [
          { name: 'Tanggal Transaksi', type: 'date', icon: Calendar },
          { name: 'Tanggal Pencatatan', type: 'date', icon: Calendar },
          { name: 'Waktu Proses', type: 'datetime', icon: Calendar },
        ],
      },
      {
        name: 'Informasi Aset',
        icon: Database,
        fields: [
          { name: 'Jenis Aset', type: 'text', icon: Type },
          { name: 'Nama Aset', type: 'text', icon: Type },
          { name: 'Kategori', type: 'text', icon: Type },
        ],
      },
      {
        name: 'Nilai & Status',
        icon: DollarSign,
        fields: [
          { name: 'Nilai Transaksi', type: 'currency', icon: DollarSign },
          { name: 'Status', type: 'text', icon: Type },
          { name: 'Nilai Estimasi', type: 'currency', icon: DollarSign },
        ],
      },
      {
        name: 'Lokasi & Pihak',
        icon: MapPin,
        fields: [
          { name: 'Lokasi', type: 'text', icon: MapPin },
          { name: 'Pemilik', type: 'text', icon: Type },
          { name: 'Pihak Terkait', type: 'text', icon: Type },
        ],
      },
    ],
  },
  {
    id: 'activities',
    name: 'Aktivitas Pengguna',
    categories: [
      {
        name: 'Identifikasi',
        icon: Hash,
        fields: [{ name: 'ID Aktivitas', type: 'text', icon: Hash }],
      },
      {
        name: 'Waktu',
        icon: Calendar,
        fields: [{ name: 'Timestamp', type: 'datetime', icon: Calendar }],
      },
      {
        name: 'Pengguna',
        icon: Type,
        fields: [
          { name: 'Pengguna', type: 'text', icon: Type },
          { name: 'IP Address', type: 'text', icon: Type },
        ],
      },
      {
        name: 'Aktivitas',
        icon: Database,
        fields: [
          { name: 'Aksi', type: 'text', icon: Type },
          { name: 'Modul', type: 'text', icon: Type },
          { name: 'Deskripsi', type: 'text', icon: Type },
        ],
      },
    ],
  },
  {
    id: 'entities',
    name: 'Data Entitas',
    categories: [
      {
        name: 'Identifikasi',
        icon: Hash,
        fields: [
          { name: 'ID Entitas', type: 'text', icon: Hash },
          { name: 'NIK/NPWP', type: 'text', icon: Hash },
        ],
      },
      {
        name: 'Informasi Dasar',
        icon: Type,
        fields: [
          { name: 'Nama', type: 'text', icon: Type },
          { name: 'Tipe', type: 'text', icon: Type },
          { name: 'Status', type: 'text', icon: Type },
        ],
      },
      {
        name: 'Kontak',
        icon: MapPin,
        fields: [
          { name: 'Alamat', type: 'text', icon: MapPin },
          { name: 'Telepon', type: 'text', icon: Type },
          { name: 'Email', type: 'text', icon: Type },
        ],
      },
    ],
  },
  {
    id: 'assets',
    name: 'Daftar Aset',
    categories: [
      {
        name: 'Identifikasi',
        icon: Hash,
        fields: [{ name: 'ID Aset', type: 'text', icon: Hash }],
      },
      {
        name: 'Informasi Aset',
        icon: Database,
        fields: [
          { name: 'Nama Aset', type: 'text', icon: Type },
          { name: 'Kategori', type: 'text', icon: Type },
          { name: 'Kondisi', type: 'text', icon: Type },
        ],
      },
      {
        name: 'Nilai',
        icon: DollarSign,
        fields: [
          { name: 'Nilai Estimasi', type: 'currency', icon: DollarSign },
          { name: 'Tahun Perolehan', type: 'number', icon: Calendar },
        ],
      },
      {
        name: 'Kepemilikan',
        icon: Type,
        fields: [
          { name: 'Pemilik', type: 'text', icon: Type },
          { name: 'Lokasi', type: 'text', icon: MapPin },
        ],
      },
    ],
  },
];

// Mock preview data
const mockPreviewData = [
  {
    id: 'TRX-001',
    tanggal: '2025-01-15',
    jenisAset: 'Properti',
    nilai: 'Rp 2.500.000.000',
    status: 'Aktif',
  },
  {
    id: 'TRX-002',
    tanggal: '2025-01-16',
    jenisAset: 'Kendaraan',
    nilai: 'Rp 450.000.000',
    status: 'Pending',
  },
  {
    id: 'TRX-003',
    tanggal: '2025-01-17',
    jenisAset: 'Rekening Bank',
    nilai: 'Rp 1.200.000.000',
    status: 'Aktif',
  },
  {
    id: 'TRX-004',
    tanggal: '2025-01-18',
    jenisAset: 'Saham',
    nilai: 'Rp 800.000.000',
    status: 'Aktif',
  },
  {
    id: 'TRX-005',
    tanggal: '2025-01-19',
    jenisAset: 'Properti',
    nilai: 'Rp 3.200.000.000',
    status: 'Pending',
  },
];

export function CustomReportBuilder() {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Get current dataset
  const currentDataset = selectedDataset ? mockDatasets.find(d => d.id === selectedDataset) : null;

  // Filter fields based on search query
  const filteredCategories = useMemo(() => {
    if (!currentDataset) return [];

    if (!searchQuery.trim()) {
      return currentDataset.categories;
    }

    const query = searchQuery.toLowerCase();
    return currentDataset.categories
      .map(category => ({
        ...category,
        fields: category.fields.filter(field => field.name.toLowerCase().includes(query)),
      }))
      .filter(category => category.fields.length > 0);
  }, [currentDataset, searchQuery]);

  const handleDatasetChange = value => {
    setSelectedDataset(value);
    setSelectedColumns([]);
    setActiveFilters([]);
    setSearchQuery('');
    setExpandedCategories([]);
    toast.success(`Dataset "${mockDatasets.find(d => d.id === value)?.name}" dipilih`);
  };

  const handleAddColumn = field => {
    if (!selectedColumns.find(col => col.name === field.name)) {
      setSelectedColumns([
        ...selectedColumns,
        {
          id: `col-${Date.now()}`,
          name: field.name,
          type: field.type,
          visible: true,
          sortable: true,
          aggregation: 'none',
          formatting: 'default',
        },
      ]);
      toast.success(`Field "${field.name}" ditambahkan ke laporan`);
    } else {
      toast.info(`Field "${field.name}" sudah ada dalam laporan`);
    }
  };

  const handleRemoveColumn = columnId => {
    setSelectedColumns(selectedColumns.filter(col => col.id !== columnId));
    toast.info('Kolom dihapus dari laporan');
  };

  const handleToggleColumnVisibility = columnId => {
    setSelectedColumns(
      selectedColumns.map(col => (col.id === columnId ? { ...col, visible: !col.visible } : col))
    );
  };

  const handleAddFilter = filterData => {
    setActiveFilters([
      ...activeFilters,
      {
        id: `filter-${Date.now()}`,
        ...filterData,
      },
    ]);
    setShowFilterDialog(false);
    toast.success('Filter ditambahkan');
  };

  const handleRemoveFilter = filterId => {
    setActiveFilters(activeFilters.filter(f => f.id !== filterId));
    toast.info('Filter dihapus');
  };

  const handleExport = format => {
    toast.success(`Mengekspor laporan dalam format ${format.toUpperCase()}...`);
  };

  const handleSaveTemplate = () => {
    toast.success('Template laporan berhasil disimpan');
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* HEADER / TOP BAR */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white">Custom Report Builder</h1>
            <p className="text-slate-400 text-sm mt-1">
              Buat dan ekspor laporan kustom dengan mudah
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={handleSaveTemplate}
            >
              <Save className="w-4 h-4 mr-2" />
              Simpan Template
            </Button>

            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Ekspor
              </Button>
              <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-40 bg-slate-700 border border-slate-600 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full px-4 py-2 text-left text-white hover:bg-slate-600 rounded-t-lg"
                >
                  Ekspor ke PDF
                </button>
                <button
                  onClick={() => handleExport('excel')}
                  className="w-full px-4 py-2 text-left text-white hover:bg-slate-600"
                >
                  Ekspor ke Excel
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-4 py-2 text-left text-white hover:bg-slate-600 rounded-b-lg"
                >
                  Ekspor ke CSV
                </button>
              </div>
            </div>

            <Separator orientation="vertical" className="h-8 bg-slate-600" />

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <Undo className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <Redo className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-700"
              title="Panduan Penggunaan"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA - Grid Layout 12 columns */}
      <div className="flex-1 overflow-hidden grid grid-cols-12 gap-0">
        {/* SIDEBAR KIRI - Panel Sumber Data (3 columns) */}
        <div className="col-span-3 bg-slate-800 border-r border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white mb-3">Sumber Data</h3>

            {/* Dataset Selection */}
            <div className="space-y-2">
              <Label className="text-slate-300">Dataset</Label>
              <Select value={selectedDataset} onValueChange={handleDatasetChange}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Pilih dataset..." />
                </SelectTrigger>
                <SelectContent>
                  {mockDatasets.map(dataset => (
                    <SelectItem key={dataset.id} value={dataset.id}>
                      {dataset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Available Fields with Search and Categories */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-700">
              <h4 className="text-white flex items-center gap-2 mb-3">
                <FolderOpen className="w-4 h-4 text-slate-400" />
                Daftar Field
              </h4>

              {/* Search Field */}
              {selectedDataset && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Cari field..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              <p className="text-slate-400 text-xs mt-2">Klik atau drag field ke area laporan</p>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4">
                {!selectedDataset ? (
                  <div className="text-center py-8">
                    <Database className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">Pilih dataset terlebih dahulu</p>
                  </div>
                ) : filteredCategories.length === 0 ? (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">
                      Tidak ada field yang cocok dengan "{searchQuery}"
                    </p>
                  </div>
                ) : (
                  <Accordion type="multiple" className="space-y-2">
                    {filteredCategories.map((category, catIndex) => (
                      <AccordionItem
                        key={catIndex}
                        value={`category-${catIndex}`}
                        className="border border-slate-600 rounded-lg bg-slate-800/50"
                      >
                        <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-slate-700/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <category.icon className="w-4 h-4 text-blue-400" />
                            <span className="text-white text-sm">{category.name}</span>
                            <Badge
                              variant="outline"
                              className="ml-2 text-xs border-slate-500 text-slate-400"
                            >
                              {category.fields.length}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-2 pb-2">
                          <div className="space-y-1">
                            {category.fields.map((field, fieldIndex) => {
                              const isSelected = selectedColumns.find(
                                col => col.name === field.name
                              );
                              return (
                                <div
                                  key={fieldIndex}
                                  className={`p-2 bg-slate-700 border rounded-lg cursor-pointer transition-all ${
                                    isSelected
                                      ? 'border-blue-500 bg-blue-600/10'
                                      : 'border-slate-600 hover:border-blue-400 hover:bg-slate-650'
                                  }`}
                                  draggable
                                  onClick={() => handleAddColumn(field)}
                                >
                                  <div className="flex items-center gap-2">
                                    <GripVertical className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                    <field.icon className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <span className="text-white text-xs block truncate">
                                        {field.name}
                                      </span>
                                      <span className="text-slate-400 text-xs">{field.type}</span>
                                    </div>
                                    {isSelected && (
                                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50 text-xs flex-shrink-0">
                                        ✓
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Add Filter Button */}
          <div className="p-4 border-t border-slate-700">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
              onClick={() => setShowFilterDialog(true)}
              disabled={!selectedDataset}
            >
              <Filter className="w-4 h-4 mr-2" />
              Tambah Filter
            </Button>
          </div>
        </div>

        {/* KANVAS UTAMA - Area Builder (6 columns) */}
        <div className="col-span-6 bg-slate-900 flex flex-col overflow-hidden">
          {/* Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="p-4 bg-slate-800 border-b border-slate-700">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-400 text-sm">Filter aktif:</span>
                {activeFilters.map(filter => (
                  <Badge
                    key={filter.id}
                    className="bg-cyan-600/20 text-cyan-400 border-cyan-500/50 pr-1"
                  >
                    {filter.field} {filter.operator} {filter.value}
                    <button
                      onClick={() => handleRemoveFilter(filter.id)}
                      className="ml-2 hover:bg-cyan-500/30 rounded p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tab Switch */}
          <Tabs value={viewMode} onValueChange={setViewMode} className="flex-1 flex flex-col">
            <div className="border-b border-slate-700 px-4 bg-slate-800">
              <TabsList className="bg-transparent">
                <TabsTrigger value="table" className="data-[state=active]:bg-slate-700">
                  <TableIcon className="w-4 h-4 mr-2" />
                  Tampilan Tabel
                </TabsTrigger>
                <TabsTrigger value="chart" className="data-[state=active]:bg-slate-700">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Tampilan Grafik
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              {/* Empty State */}
              {!selectedDataset ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-slate-800 border-4 border-dashed border-slate-700 flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-slate-600" />
                    </div>
                    <h3 className="text-white mb-2">Mulai Membuat Laporan Anda</h3>
                    <p className="text-slate-400 mb-6">
                      Pilih dataset untuk mulai membuat laporan kustom. Drag & drop kolom yang Anda
                      butuhkan, tambahkan filter, dan atur formatnya sesuai kebutuhan.
                    </p>
                    <div className="space-y-2 text-left bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <p className="text-slate-300 text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          1
                        </span>
                        Pilih dataset dari panel kiri
                      </p>
                      <p className="text-slate-300 text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          2
                        </span>
                        Drag kolom ke area laporan
                      </p>
                      <p className="text-slate-300 text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          3
                        </span>
                        Atur properti dan filter sesuai kebutuhan
                      </p>
                    </div>
                  </div>
                </div>
              ) : selectedColumns.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center">
                      <Plus className="w-12 h-12 text-slate-600" />
                    </div>
                    <h3 className="text-white mb-2">Tambahkan Field dari Panel Kiri</h3>
                    <p className="text-slate-400 mb-4">
                      Pilih field yang Anda butuhkan dari panel kiri untuk mulai membangun laporan
                      kustom
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-left space-y-2">
                      <p className="text-slate-300 text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          1
                        </span>
                        Cari atau pilih field dari kategori
                      </p>
                      <p className="text-slate-300 text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          2
                        </span>
                        Klik field untuk menambahkan
                      </p>
                      <p className="text-slate-300 text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          3
                        </span>
                        Atur properti dan filter di panel kanan
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <TabsContent value="table" className="h-full m-0 p-0">
                    <ScrollArea className="h-full">
                      <div className="p-4">
                        <Card className="bg-slate-800 border-slate-700">
                          <CardHeader>
                            <CardTitle className="text-white">Pratinjau Data</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow className="border-slate-700">
                                  {selectedColumns
                                    .filter(col => col.visible)
                                    .map(col => (
                                      <TableHead key={col.id} className="text-slate-300">
                                        {col.name}
                                      </TableHead>
                                    ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {mockPreviewData.map((row, index) => (
                                  <TableRow key={index} className="border-slate-700">
                                    {selectedColumns
                                      .filter(col => col.visible)
                                      .map(col => (
                                        <TableCell key={col.id} className="text-white">
                                          {row[Object.keys(row)[selectedColumns.indexOf(col)]] ||
                                            '-'}
                                        </TableCell>
                                      ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="chart" className="h-full m-0 p-0">
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-white mb-2">Visualisasi Grafik</h3>
                        <p className="text-slate-400">
                          Fitur visualisasi grafik akan tersedia segera
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </>
              )}
            </div>
          </Tabs>

          {/* BOTTOM BAR - Pagination */}
          {selectedDataset && selectedColumns.length > 0 && (
            <div className="bg-slate-800 border-t border-slate-700 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="text-slate-400 text-sm">Menampilkan 1-5 dari 247 baris</div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 bg-blue-600 text-white"
                    >
                      1
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      2
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      3
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PANEL KANAN - Properti (3 columns) */}
        <div className="col-span-3 bg-slate-800 border-l border-slate-700 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Properti Laporan
            </h3>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {!selectedDataset ? (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Pilih dataset untuk melihat properti</p>
                </div>
              ) : selectedColumns.length === 0 ? (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Tambahkan field untuk mengatur properti</p>
                </div>
              ) : (
                <>
                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white text-sm">Informasi Laporan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-slate-300 text-xs">Nama Laporan</Label>
                        <Input
                          placeholder="Laporan Tanpa Judul"
                          className="bg-slate-600 border-slate-500 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 text-xs">Deskripsi</Label>
                        <Input
                          placeholder="Tambahkan deskripsi..."
                          className="bg-slate-600 border-slate-500 text-white mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white text-sm">
                        Field Terpilih ({selectedColumns.length})
                      </CardTitle>
                      <p className="text-slate-400 text-xs mt-1">Drag untuk mengatur urutan</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedColumns.map((col, index) => (
                          <div
                            key={col.id}
                            className="p-2 bg-slate-600 border border-slate-500 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <GripVertical className="w-4 h-4 text-slate-400 cursor-move flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <span className="text-white text-sm block truncate">
                                    {col.name}
                                  </span>
                                  <span className="text-slate-400 text-xs">{col.type}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                                  onClick={() => handleToggleColumnVisibility(col.id)}
                                  title={col.visible ? 'Sembunyikan' : 'Tampilkan'}
                                >
                                  {col.visible ? (
                                    <Eye className="w-3 h-3" />
                                  ) : (
                                    <EyeOff className="w-3 h-3" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                                  onClick={() => handleRemoveColumn(col.id)}
                                  title="Hapus field"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-slate-400 text-xs">Sorting</Label>
                                <Select defaultValue="none">
                                  <SelectTrigger className="h-7 bg-slate-700 border-slate-600 text-white text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">Tidak Ada</SelectItem>
                                    <SelectItem value="asc">A → Z</SelectItem>
                                    <SelectItem value="desc">Z → A</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label className="text-slate-400 text-xs">Agregasi</Label>
                                <Select defaultValue="none">
                                  <SelectTrigger className="h-7 bg-slate-700 border-slate-600 text-white text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">Tidak Ada</SelectItem>
                                    <SelectItem value="sum">SUM</SelectItem>
                                    <SelectItem value="avg">AVG</SelectItem>
                                    <SelectItem value="count">COUNT</SelectItem>
                                    <SelectItem value="min">MIN</SelectItem>
                                    <SelectItem value="max">MAX</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white text-sm">Conditional Formatting</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-slate-400 text-xs">
                        Highlight nilai tertentu dalam laporan
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-slate-500 text-slate-300 hover:bg-slate-600"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Aturan
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Filter Builder Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Tambah Filter</DialogTitle>
            <DialogDescription className="text-slate-400">
              Buat kondisi filter untuk menyaring data laporan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Field</Label>
              <Select>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Pilih field..." />
                </SelectTrigger>
                <SelectContent>
                  {currentDataset?.categories.flatMap(category =>
                    category.fields.map((field, idx) => (
                      <SelectItem key={`${category.name}-${idx}`} value={field.name}>
                        {field.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Operator</Label>
              <Select>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Pilih operator..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Sama dengan (=)</SelectItem>
                  <SelectItem value="not-equals">Tidak sama dengan (≠)</SelectItem>
                  <SelectItem value="contains">Mengandung</SelectItem>
                  <SelectItem value="greater">Lebih besar (&gt;)</SelectItem>
                  <SelectItem value="less">Lebih kecil (&lt;)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Nilai</Label>
              <Input
                placeholder="Masukkan nilai..."
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowFilterDialog(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Batal
              </Button>
              <Button
                onClick={() =>
                  handleAddFilter({
                    field: 'Status',
                    operator: '=',
                    value: 'Aktif',
                  })
                }
                className="bg-blue-600 hover:bg-blue-500"
              >
                Tambahkan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
