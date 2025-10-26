import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import {
  Plus,
  Search,
  Filter,
  Building2,
  Car,
  Banknote,
  Briefcase,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  FileText,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { toast } from 'sonner';

const mockAssets = [
  {
    id: '1',
    name: 'Penthouse Mewah Jakarta',
    type: 'Properti',
    owner: 'Budi Santoso',
    ownerId: '1',
    value: 'Rp 40,000,000,000',
    location: 'Jl. Sudirman No. 789, Jakarta Pusat',
    status: 'Disita',
    dateAdded: '2024-01-15',
    hasDocuments: true,
  },
  {
    id: '2',
    name: 'Ferrari 488 GTB',
    type: 'Kendaraan',
    owner: 'PT ABC Holdings',
    ownerId: '2',
    value: 'Rp 4,480,000,000',
    location: 'Garasi Pribadi, Kelapa Gading',
    status: 'Menunggu',
    dateAdded: '2024-01-20',
    hasDocuments: false,
  },
  {
    id: '3',
    name: 'Rekening Bank Swiss #CH789',
    type: 'Rekening Bank',
    owner: 'Budi Santoso',
    ownerId: '1',
    value: 'Rp 7,200,000,000',
    location: 'Credit Suisse, Zurich',
    status: 'Bebas',
    dateAdded: '2024-02-01',
    hasDocuments: true,
  },
  {
    id: '4',
    name: 'PT Teknologi Startup',
    type: 'Perusahaan',
    owner: 'Siti Rahayu',
    ownerId: '3',
    value: 'Rp 19,200,000,000',
    location: 'Jakarta, Indonesia',
    status: 'Disita',
    dateAdded: '2024-02-10',
    hasDocuments: true,
  },
  {
    id: '5',
    name: 'Koleksi Seni',
    type: 'Lainnya',
    owner: 'PT Kolektor Pribadi',
    ownerId: '4',
    value: 'Rp 13,600,000,000',
    location: 'Gudang Penyimpanan, Bekasi',
    status: 'Menunggu',
    dateAdded: '2024-02-15',
    hasDocuments: false,
  },
];

const assetTypeIcons = {
  Properti: Building2,
  Kendaraan: Car,
  'Rekening Bank': Banknote,
  Perusahaan: Briefcase,
  Lainnya: FileText,
};

const statusColors = {
  Disita: 'bg-red-600/20 text-red-400 border-red-500/50',
  Menunggu: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  Bebas: 'bg-green-600/20 text-green-400 border-green-500/50',
};

export function AssetManagement() {
  const [assets, setAssets] = useState(mockAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editingAsset, setEditingAsset] = useState(null);
  const [newAsset, setNewAsset] = useState({
    name: '',
    type: '',
    owner: '',
    value: '',
    location: '',
    status: 'Menunggu',
  });

  const filteredAssets = assets.filter(asset => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddAsset = () => {
    const asset = {
      id: Date.now().toString(),
      ...newAsset,
      ownerId: Date.now().toString(),
      dateAdded: new Date().toISOString().split('T')[0],
      hasDocuments: false,
    };
    setAssets([...assets, asset]);
    setNewAsset({
      name: '',
      type: '',
      owner: '',
      value: '',
      location: '',
      status: 'Menunggu',
    });
    setShowAddDialog(false);
    toast.success('Aset berhasil ditambahkan!');
  };

  const handleViewDetail = asset => {
    setSelectedAsset(asset);
    setShowDetailDialog(true);
  };

  const handleEdit = asset => {
    setEditingAsset({ ...asset });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    setAssets(prev => prev.map(asset => (asset.id === editingAsset.id ? editingAsset : asset)));
    setShowEditDialog(false);
    setEditingAsset(null);
    toast.success('Aset berhasil diperbarui!');
  };

  const handleDelete = assetId => {
    if (window.confirm('Apakah Anda yakin ingin menghapus aset ini?')) {
      setAssets(prev => prev.filter(asset => asset.id !== assetId));
      toast.success('Aset berhasil dihapus!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Manajemen Aset</h1>
          <p className="text-slate-400 mt-1">
            Lacak dan kelola semua aset yang disita dan dipantau
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Aset
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Aset Baru</DialogTitle>
              <DialogDescription className="text-slate-400">
                Daftarkan aset baru dalam sistem untuk pelacakan dan pemantauan
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Aset</Label>
                <Input
                  value={newAsset.name}
                  onChange={e => setNewAsset(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan nama aset"
                />
              </div>
              <div className="space-y-2">
                <Label>Jenis Aset</Label>
                <Select
                  value={newAsset.type}
                  onValueChange={value => setNewAsset(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="Properti">Properti</SelectItem>
                    <SelectItem value="Kendaraan">Kendaraan</SelectItem>
                    <SelectItem value="Rekening Bank">Rekening Bank</SelectItem>
                    <SelectItem value="Perusahaan">Perusahaan</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pemilik</Label>
                <Input
                  value={newAsset.owner}
                  onChange={e => setNewAsset(prev => ({ ...prev, owner: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan nama pemilik"
                />
              </div>
              <div className="space-y-2">
                <Label>Estimasi Nilai</Label>
                <Input
                  value={newAsset.value}
                  onChange={e => setNewAsset(prev => ({ ...prev, value: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Rp 0"
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label>Lokasi</Label>
                <Input
                  value={newAsset.location}
                  onChange={e => setNewAsset(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan lokasi"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={newAsset.status}
                  onValueChange={value => setNewAsset(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="Disita">Disita</SelectItem>
                    <SelectItem value="Menunggu">Menunggu</SelectItem>
                    <SelectItem value="Bebas">Bebas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                className="border-slate-600 text-slate-300"
              >
                Batal
              </Button>
              <Button onClick={handleAddAsset} className="bg-blue-600 hover:bg-blue-500">
                Tambah Aset
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari aset atau pemilik..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-slate-600 border-slate-500 text-white">
                  <SelectValue placeholder="Filter berdasarkan jenis" />
                </SelectTrigger>
                <SelectContent className="bg-slate-600 border-slate-500 text-white">
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="Properti">Properti</SelectItem>
                  <SelectItem value="Kendaraan">Kendaraan</SelectItem>
                  <SelectItem value="Rekening Bank">Rekening Bank</SelectItem>
                  <SelectItem value="Perusahaan">Perusahaan</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-slate-600 border-slate-500 text-white">
                  <SelectValue placeholder="Filter berdasarkan status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-600 border-slate-500 text-white">
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Disita">Disita</SelectItem>
                  <SelectItem value="Menunggu">Menunggu</SelectItem>
                  <SelectItem value="Bebas">Bebas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Aset ({filteredAssets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Aset</TableHead>
                  <TableHead className="text-slate-300">Jenis</TableHead>
                  <TableHead className="text-slate-300">Pemilik</TableHead>
                  <TableHead className="text-slate-300">Nilai</TableHead>
                  <TableHead className="text-slate-300">Lokasi</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Dokumen</TableHead>
                  <TableHead className="text-slate-300">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map(asset => {
                  const Icon = assetTypeIcons[asset.type] || FileText;
                  return (
                    <TableRow key={asset.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{asset.name}</p>
                            <p className="text-xs text-slate-400">Ditambahkan {asset.dateAdded}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                          {asset.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{asset.owner}</TableCell>
                      <TableCell className="text-white font-medium">{asset.value}</TableCell>
                      <TableCell className="text-slate-300 max-w-48 truncate">
                        {asset.location}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[asset.status]}>{asset.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {asset.hasDocuments ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        ) : (
                          <span className="text-slate-500 text-sm">Tidak ada</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-slate-800 border-slate-700"
                          >
                            <DropdownMenuItem
                              className="text-slate-300 focus:bg-slate-700"
                              onClick={() => handleViewDetail(asset)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-slate-300 focus:bg-slate-700"
                              onClick={() => handleEdit(asset)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Aset
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-400 focus:bg-red-600/20"
                              onClick={() => handleDelete(asset.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus Aset
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredAssets.map(asset => {
              const Icon = assetTypeIcons[asset.type] || FileText;
              return (
                <Card key={asset.id} className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-medium truncate">{asset.name}</p>
                          <p className="text-xs text-slate-400">Ditambahkan {asset.dateAdded}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem
                            className="text-slate-300 focus:bg-slate-700"
                            onClick={() => handleViewDetail(asset)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-slate-300 focus:bg-slate-700"
                            onClick={() => handleEdit(asset)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Aset
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-400 focus:bg-red-600/20"
                            onClick={() => handleDelete(asset.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus Aset
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-slate-400">Type</p>
                        <Badge variant="secondary" className="bg-slate-600 text-slate-200 text-xs">
                          {asset.type}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-slate-400">Status</p>
                        <Badge className={`${statusColors[asset.status]} text-xs`}>
                          {asset.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-slate-400">Owner</p>
                        <p className="text-slate-200 truncate">{asset.owner}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Value</p>
                        <p className="text-white font-medium">{asset.value}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-slate-400 text-sm">Location</p>
                      <p className="text-slate-200 text-sm truncate">{asset.location}</p>
                    </div>

                    {asset.hasDocuments && (
                      <div className="mt-3 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Documents
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Aset</DialogTitle>
            <DialogDescription className="text-slate-400">
              Informasi lengkap tentang aset yang dipilih
            </DialogDescription>
          </DialogHeader>
          {selectedAsset && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Aset</Label>
                <Input
                  value={selectedAsset.name}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan nama aset"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label>Jenis Aset</Label>
                <Select
                  value={selectedAsset.type}
                  onValueChange={value => setNewAsset(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="Properti">Properti</SelectItem>
                    <SelectItem value="Kendaraan">Kendaraan</SelectItem>
                    <SelectItem value="Rekening Bank">Rekening Bank</SelectItem>
                    <SelectItem value="Perusahaan">Perusahaan</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pemilik</Label>
                <Input
                  value={selectedAsset.owner}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan nama pemilik"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label>Estimasi Nilai</Label>
                <Input
                  value={selectedAsset.value}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Rp 0"
                  readOnly
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label>Lokasi</Label>
                <Input
                  value={selectedAsset.location}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan lokasi"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={selectedAsset.status}
                  onValueChange={value => setNewAsset(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="Disita">Disita</SelectItem>
                    <SelectItem value="Menunggu">Menunggu</SelectItem>
                    <SelectItem value="Bebas">Bebas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowDetailDialog(false)}
              className="border-slate-600 text-slate-300"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Aset</DialogTitle>
            <DialogDescription className="text-slate-400">
              Perbarui informasi aset yang dipilih
            </DialogDescription>
          </DialogHeader>
          {editingAsset && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Aset</Label>
                <Input
                  value={editingAsset.name}
                  onChange={e => setEditingAsset(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan nama aset"
                />
              </div>
              <div className="space-y-2">
                <Label>Jenis Aset</Label>
                <Select
                  value={editingAsset.type}
                  onValueChange={value => setEditingAsset(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="Properti">Properti</SelectItem>
                    <SelectItem value="Kendaraan">Kendaraan</SelectItem>
                    <SelectItem value="Rekening Bank">Rekening Bank</SelectItem>
                    <SelectItem value="Perusahaan">Perusahaan</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pemilik</Label>
                <Input
                  value={editingAsset.owner}
                  onChange={e => setEditingAsset(prev => ({ ...prev, owner: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan nama pemilik"
                />
              </div>
              <div className="space-y-2">
                <Label>Estimasi Nilai</Label>
                <Input
                  value={editingAsset.value}
                  onChange={e => setEditingAsset(prev => ({ ...prev, value: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Rp 0"
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label>Lokasi</Label>
                <Input
                  value={editingAsset.location}
                  onChange={e => setEditingAsset(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan lokasi"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={editingAsset.status}
                  onValueChange={value => setEditingAsset(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="Disita">Disita</SelectItem>
                    <SelectItem value="Menunggu">Menunggu</SelectItem>
                    <SelectItem value="Bebas">Bebas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              className="border-slate-600 text-slate-300"
            >
              Batal
            </Button>
            <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-500">
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
