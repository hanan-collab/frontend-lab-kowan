import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
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
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Plus,
  Search,
  User,
  Building,
  MapPin,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { toast } from 'sonner';

const mockEntities = [
  {
    id: '1',
    name: 'Budi Santoso',
    category: 'Tersangka',
    status: 'Aktif',
    attributes: {
      age: '45',
      nationality: 'Indonesia',
      occupation: 'Pemilik Bisnis',
      address: 'Jl. Sudirman No. 123, Jakarta',
      phone: '+62-21-555-0123',
    },
    connections: 5,
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sari Indah',
    category: 'Korban',
    status: 'Aktif',
    attributes: {
      age: '32',
      nationality: 'Indonesia',
      occupation: 'Analis Keuangan',
      address: 'Jl. Gatot Subroto No. 456, Jakarta',
      phone: '+62-21-555-0789',
    },
    connections: 3,
    lastUpdated: '2024-01-18',
  },
  {
    id: '3',
    name: 'PT Maju Bersama',
    category: 'Organisasi',
    status: 'Menunggu',
    attributes: {
      type: 'Perseroan Terbatas',
      registered: '2019-03-15',
      jurisdiction: 'Jakarta',
      address: 'Jl. Thamrin No. 789, Jakarta',
      taxId: '12-3456789',
    },
    connections: 8,
    lastUpdated: '2024-01-20',
  },
  {
    id: '4',
    name: 'Gedung Perkantoran Sudirman',
    category: 'Lokasi',
    status: 'Aktif',
    attributes: {
      type: 'Properti Komersial',
      address: 'Jl. Sudirman No. 100, Jakarta',
      coordinates: '-6.2088, 106.8456',
      relevance: 'Lokasi pertemuan',
    },
    connections: 4,
    lastUpdated: '2024-01-22',
  },
  {
    id: '5',
    name: 'Transfer Bank #TF001',
    category: 'Transaksi',
    status: 'Ditutup',
    attributes: {
      amount: 'Rp 3.500.000.000',
      date: '2024-01-10',
      source: 'Rekening Bank A',
      destination: 'Rekening Bank B',
      reference: 'TF001-2024',
    },
    connections: 2,
    lastUpdated: '2024-01-25',
  },
];

const categoryColors = {
  Tersangka: 'bg-red-600/20 text-red-400 border-red-500/50',
  Korban: 'bg-green-600/20 text-green-400 border-green-500/50',
  Organisasi: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  Lokasi: 'bg-purple-600/20 text-purple-400 border-purple-500/50',
  Transaksi: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
};

const statusColors = {
  Aktif: 'bg-green-600/20 text-green-400 border-green-500/50',
  Menunggu: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  Ditutup: 'bg-slate-600/20 text-slate-400 border-slate-500/50',
};

const categoryIcons = {
  Tersangka: User,
  Korban: User,
  Organisasi: Building,
  Lokasi: MapPin,
  Transaksi: DollarSign,
};

export function EntityManagement() {
  const [entities, setEntities] = useState(mockEntities);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [editingEntity, setEditingEntity] = useState(null);

  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || entity.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || entity.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewDetail = entity => {
    setSelectedEntity(entity);
    setShowDetailDialog(true);
  };

  const handleEdit = entity => {
    setEditingEntity({ ...entity });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    setEntities(prev =>
      prev.map(entity => (entity.id === editingEntity.id ? editingEntity : entity))
    );
    setShowEditDialog(false);
    setEditingEntity(null);
    toast.success('Entitas berhasil diperbarui!');
  };

  const handleDelete = entityId => {
    if (window.confirm('Apakah Anda yakin ingin menghapus entitas ini?')) {
      setEntities(prev => prev.filter(entity => entity.id !== entityId));
      toast.success('Entitas berhasil dihapus!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manajemen Entitas</h1>
          <p className="text-slate-400 mt-1">Kelola semua entitas dalam graf pengetahuan</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Entitas
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Entitas Baru</DialogTitle>
              <DialogDescription className="text-slate-400">
                Buat entitas baru dalam sistem graf pengetahuan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Entitas</Label>
                  <Input
                    className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                    placeholder="Masukkan nama entitas"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600 border-slate-500 text-white">
                      <SelectItem value="tersangka">Tersangka</SelectItem>
                      <SelectItem value="korban">Korban</SelectItem>
                      <SelectItem value="organisasi">Organisasi</SelectItem>
                      <SelectItem value="lokasi">Lokasi</SelectItem>
                      <SelectItem value="transaksi">Transaksi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Input
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Deskripsi singkat"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-500">Tambah Entitas</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari entitas..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Filter berdasarkan kategori" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600 border-slate-500 text-white">
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Tersangka">Tersangka</SelectItem>
                <SelectItem value="Korban">Korban</SelectItem>
                <SelectItem value="Organisasi">Organisasi</SelectItem>
                <SelectItem value="Lokasi">Lokasi</SelectItem>
                <SelectItem value="Transaksi">Transaksi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Filter berdasarkan status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600 border-slate-500 text-white">
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Menunggu">Menunggu</SelectItem>
                <SelectItem value="Ditutup">Ditutup</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Entities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntities.map(entity => {
          const Icon = categoryIcons[entity.category];
          return (
            <Card
              key={entity.id}
              className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 bg-slate-700">
                      <AvatarFallback className="bg-blue-600 text-white">
                        <Icon className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-white font-medium truncate max-w-32">{entity.name}</h3>
                      <p className="text-xs text-slate-400">Diperbarui {entity.lastUpdated}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem
                        className="text-slate-300 focus:bg-slate-700"
                        onClick={() => handleViewDetail(entity)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-slate-300 focus:bg-slate-700"
                        onClick={() => handleEdit(entity)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Entitas
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-400 focus:bg-red-600/20"
                        onClick={() => handleDelete(entity.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Entitas
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Badge className={categoryColors[entity.category]}>{entity.category}</Badge>
                  <Badge className={statusColors[entity.status]}>{entity.status}</Badge>
                </div>

                <div className="space-y-2">
                  {Object.entries(entity.attributes)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 capitalize">{key}:</span>
                        <span className="text-slate-300 truncate max-w-32 text-right">{value}</span>
                      </div>
                    ))}
                </div>

                <div className="pt-2 border-t border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Koneksi</span>
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                      {entity.connections}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
                  onClick={() => setSelectedEntity(entity)}
                >
                  Lihat di Graf
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Entitas</DialogTitle>
            <DialogDescription className="text-slate-400">
              Lihat detail entitas dalam sistem graf pengetahuan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Entitas</Label>
                <Input
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan nama entitas"
                  value={selectedEntity?.name}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select>
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="tersangka">Tersangka</SelectItem>
                    <SelectItem value="korban">Korban</SelectItem>
                    <SelectItem value="organisasi">Organisasi</SelectItem>
                    <SelectItem value="lokasi">Lokasi</SelectItem>
                    <SelectItem value="transaksi">Transaksi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Input
                className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                placeholder="Deskripsi singkat"
                value={selectedEntity?.attributes.description}
                readOnly
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Entitas</DialogTitle>
            <DialogDescription className="text-slate-400">
              Edit entitas dalam sistem graf pengetahuan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Entitas</Label>
                <Input
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Masukkan nama entitas"
                  value={editingEntity?.name}
                  onChange={e => setEditingEntity(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select>
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    <SelectItem value="tersangka">Tersangka</SelectItem>
                    <SelectItem value="korban">Korban</SelectItem>
                    <SelectItem value="organisasi">Organisasi</SelectItem>
                    <SelectItem value="lokasi">Lokasi</SelectItem>
                    <SelectItem value="transaksi">Transaksi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Input
                className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                placeholder="Deskripsi singkat"
                value={editingEntity?.attributes.description}
                onChange={e =>
                  setEditingEntity(prev => ({
                    ...prev,
                    attributes: { ...prev.attributes, description: e.target.value },
                  }))
                }
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-500" onClick={handleSaveEdit}>
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
