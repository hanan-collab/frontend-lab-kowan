import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Textarea } from '../../../ui/textarea';
import { Slider } from '../../../ui/slider';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import {
  Plus,
  Search,
  ArrowRight,
  Users,
  Building2,
  Banknote,
  Heart,
  Briefcase,
  CalendarIcon,
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
} from '../../../ui/dropdown-menu';
import { format } from 'date-fns';
import { toast } from 'sonner';

const mockRelationships = [
  {
    id: 'r1',
    sourceEntity: 'Budi Santoso',
    sourceCategory: 'Tersangka',
    targetEntity: 'PT Maju Bersama',
    targetCategory: 'Organisasi',
    type: 'Pemilik',
    strength: 95,
    description: 'Budi Santoso adalah pemilik manfaat PT Maju Bersama, menguasai 80% saham',
    dateEstablished: '2019-03-15',
    lastVerified: '2024-01-15',
    status: 'Dikonfirmasi',
    evidence: ['Dokumen akta pendirian', 'Laporan bank'],
  },
  {
    id: 'r2',
    sourceEntity: 'PT Maju Bersama',
    sourceCategory: 'Organisasi',
    targetEntity: 'Apartemen Mewah Sudirman',
    targetCategory: 'Aset',
    type: 'Kepemilikan',
    strength: 100,
    description: 'PT Maju Bersama adalah pemilik legal properti apartemen mewah',
    dateEstablished: '2020-06-20',
    lastVerified: '2024-01-20',
    status: 'Dikonfirmasi',
    evidence: ['Sertifikat tanah', 'Asuransi properti'],
  },
  {
    id: 'r3',
    sourceEntity: 'Budi Santoso',
    sourceCategory: 'Tersangka',
    targetEntity: 'Sari Indah',
    targetCategory: 'Korban',
    type: 'Keluarga',
    strength: 85,
    description: 'Budi Santoso menikah dengan Sari Indah sejak 2015',
    dateEstablished: '2015-08-12',
    lastVerified: '2024-01-18',
    status: 'Dikonfirmasi',
    evidence: ['Akta nikah', 'SPT pajak bersama'],
  },
  {
    id: 'r4',
    sourceEntity: 'Rekening Bank #CH789',
    sourceCategory: 'Aset',
    targetEntity: 'Transfer Bank #TF001',
    targetCategory: 'Transaksi',
    type: 'Aliran Keuangan',
    strength: 90,
    description: 'Rekening sumber untuk transfer senilai Rp 3.500.000.000',
    dateEstablished: '2024-01-10',
    lastVerified: '2024-01-25',
    status: 'Dalam Investigasi',
    evidence: ['Catatan bank', 'Pesan SWIFT'],
  },
  {
    id: 'r5',
    sourceEntity: 'PT Teknologi Maju',
    sourceCategory: 'Aset',
    targetEntity: 'PT Maju Bersama',
    targetCategory: 'Organisasi',
    type: 'Afiliasi Korporat',
    strength: 75,
    description: 'PT Maju Bersama memiliki 60% saham di PT Teknologi Maju',
    dateEstablished: '2021-11-03',
    lastVerified: '2024-02-01',
    status: 'Menunggu Verifikasi',
    evidence: ['Perjanjian pemegang saham'],
  },
];

const relationshipTypes = [
  { value: 'Pemilik', label: 'Pemilik', icon: Users },
  { value: 'Kepemilikan', label: 'Kepemilikan', icon: Building2 },
  { value: 'Keluarga', label: 'Keluarga', icon: Heart },
  { value: 'Aliran Keuangan', label: 'Aliran Keuangan', icon: Banknote },
  { value: 'Afiliasi Korporat', label: 'Afiliasi Korporat', icon: Briefcase },
];

const statusColors = {
  Dikonfirmasi: 'bg-green-600/20 text-green-400 border-green-500/50',
  'Dalam Investigasi': 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  'Menunggu Verifikasi': 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  Disengketakan: 'bg-red-600/20 text-red-400 border-red-500/50',
};

export function RelationshipManagement() {
  const [relationships, setRelationships] = useState(mockRelationships);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [editingRelationship, setEditingRelationship] = useState(null);
  const [newRelationship, setNewRelationship] = useState({
    sourceEntity: '',
    targetEntity: '',
    type: '',
    strength: [75],
    description: '',
    dateEstablished: null,
  });

  const filteredRelationships = relationships.filter(rel => {
    const matchesSearch =
      rel.sourceEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || rel.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || rel.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddRelationship = () => {
    const relationship = {
      id: `r${Date.now()}`,
      ...newRelationship,
      strength: newRelationship.strength[0],
      sourceCategory: 'Tidak Diketahui',
      targetCategory: 'Tidak Diketahui',
      dateEstablished: newRelationship.dateEstablished
        ? format(newRelationship.dateEstablished, 'yyyy-MM-dd')
        : null,
      lastVerified: format(new Date(), 'yyyy-MM-dd'),
      status: 'Menunggu Verifikasi',
      evidence: [],
    };
    setRelationships([...relationships, relationship]);
    setNewRelationship({
      sourceEntity: '',
      targetEntity: '',
      type: '',
      strength: [75],
      description: '',
      dateEstablished: null,
    });
    setShowAddDialog(false);
    toast.success('Hubungan berhasil ditambahkan!');
  };

  const handleViewDetail = relationship => {
    setSelectedRelationship(relationship);
    setShowDetailDialog(true);
  };

  const handleEdit = relationship => {
    setEditingRelationship({ ...relationship, strength: [relationship.strength] });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    setRelationships(prev =>
      prev.map(rel =>
        rel.id === editingRelationship.id
          ? { ...editingRelationship, strength: editingRelationship.strength[0] }
          : rel
      )
    );
    setShowEditDialog(false);
    setEditingRelationship(null);
    toast.success('Hubungan berhasil diperbarui!');
  };

  const handleDelete = relationshipId => {
    if (window.confirm('Apakah Anda yakin ingin menghapus hubungan ini?')) {
      setRelationships(prev => prev.filter(rel => rel.id !== relationshipId));
      toast.success('Hubungan berhasil dihapus!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manajemen Hubungan</h1>
          <p className="text-slate-400 mt-1">Lacak koneksi dan hubungan antar entitas</p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Hubungan
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Hubungan Baru</DialogTitle>
              <DialogDescription className="text-slate-400">
                Definisikan hubungan baru antara entitas dalam graf pengetahuan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Entitas Sumber</Label>
                  <Input
                    value={newRelationship.sourceEntity}
                    onChange={e =>
                      setNewRelationship(prev => ({ ...prev, sourceEntity: e.target.value }))
                    }
                    className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                    placeholder="Masukkan entitas sumber"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Entitas Target</Label>
                  <Input
                    value={newRelationship.targetEntity}
                    onChange={e =>
                      setNewRelationship(prev => ({ ...prev, targetEntity: e.target.value }))
                    }
                    className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                    placeholder="Masukkan entitas target"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Jenis Hubungan</Label>
                <Select
                  value={newRelationship.type}
                  onValueChange={value => setNewRelationship(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Pilih jenis hubungan" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    {relationshipTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Kekuatan Koneksi: {newRelationship.strength[0]}%</Label>
                <Slider
                  value={newRelationship.strength}
                  onValueChange={value =>
                    setNewRelationship(prev => ({ ...prev, strength: value }))
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Tanggal Terbentuk</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-slate-600 text-slate-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newRelationship.dateEstablished
                        ? format(newRelationship.dateEstablished, 'PPP')
                        : 'Pilih tanggal'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                    <Calendar
                      mode="single"
                      selected={newRelationship.dateEstablished}
                      onSelect={date =>
                        setNewRelationship(prev => ({ ...prev, dateEstablished: date }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea
                  value={newRelationship.description}
                  onChange={e =>
                    setNewRelationship(prev => ({ ...prev, description: e.target.value }))
                  }
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Deskripsikan hubungan..."
                  rows={3}
                />
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
              <Button onClick={handleAddRelationship} className="bg-blue-600 hover:bg-blue-500">
                Tambah Hubungan
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Eye className="w-4 h-4 mr-2" />
              Lihat Detail
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detail Hubungan</DialogTitle>
              <DialogDescription className="text-slate-400">
                Informasi lengkap tentang hubungan yang dipilih
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Entitas Sumber</Label>
                  <Input
                    value={selectedRelationship?.sourceEntity}
                    className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                    placeholder="Masukkan entitas sumber"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>Entitas Target</Label>
                  <Input
                    value={selectedRelationship?.targetEntity}
                    className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                    placeholder="Masukkan entitas target"
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Jenis Hubungan</Label>
                <Select
                  value={selectedRelationship?.type}
                  onValueChange={value => setNewRelationship(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Pilih jenis hubungan" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    {relationshipTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Kekuatan Koneksi: {selectedRelationship?.strength}%</Label>
                <Slider
                  value={[selectedRelationship?.strength]}
                  onValueChange={value =>
                    setNewRelationship(prev => ({ ...prev, strength: value }))
                  }
                  max={100}
                  step={5}
                  className="w-full"
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label>Tanggal Terbentuk</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-slate-600 text-slate-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedRelationship?.dateEstablished
                        ? format(selectedRelationship?.dateEstablished, 'PPP')
                        : 'Pilih tanggal'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                    <Calendar
                      mode="single"
                      selected={selectedRelationship?.dateEstablished}
                      onSelect={date =>
                        setNewRelationship(prev => ({ ...prev, dateEstablished: date }))
                      }
                      initialFocus
                      readOnly
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea
                  value={selectedRelationship?.description}
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Deskripsikan hubungan..."
                  rows={3}
                  readOnly
                />
              </div>
            </div>

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

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Edit className="w-4 h-4 mr-2" />
              Edit Hubungan
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Hubungan</DialogTitle>
              <DialogDescription className="text-slate-400">
                Ubah informasi hubungan yang dipilih
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Entitas Sumber</Label>
                  <Input
                    value={editingRelationship?.sourceEntity}
                    onChange={e =>
                      setEditingRelationship(prev => ({ ...prev, sourceEntity: e.target.value }))
                    }
                    className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                    placeholder="Masukkan entitas sumber"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Entitas Target</Label>
                  <Input
                    value={editingRelationship?.targetEntity}
                    onChange={e =>
                      setEditingRelationship(prev => ({ ...prev, targetEntity: e.target.value }))
                    }
                    className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                    placeholder="Masukkan entitas target"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Jenis Hubungan</Label>
                <Select
                  value={editingRelationship?.type}
                  onValueChange={value =>
                    setEditingRelationship(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue placeholder="Pilih jenis hubungan" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-600 border-slate-500 text-white">
                    {relationshipTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Kekuatan Koneksi: {editingRelationship?.strength[0]}%</Label>
                <Slider
                  value={editingRelationship?.strength}
                  onValueChange={value =>
                    setEditingRelationship(prev => ({ ...prev, strength: value }))
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Tanggal Terbentuk</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-slate-600 text-slate-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editingRelationship?.dateEstablished
                        ? format(editingRelationship?.dateEstablished, 'PPP')
                        : 'Pilih tanggal'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                    <Calendar
                      mode="single"
                      selected={editingRelationship?.dateEstablished}
                      onSelect={date =>
                        setEditingRelationship(prev => ({ ...prev, dateEstablished: date }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea
                  value={editingRelationship?.description}
                  onChange={e =>
                    setEditingRelationship(prev => ({ ...prev, description: e.target.value }))
                  }
                  className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
                  placeholder="Deskripsikan hubungan..."
                  rows={3}
                />
              </div>
            </div>

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

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari hubungan..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-600 border-slate-500 text-white placeholder:text-slate-300"
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-60 bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Filter berdasarkan jenis" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600 border-slate-500 text-white">
                <SelectItem value="all">Semua Jenis</SelectItem>
                {relationshipTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Filter berdasarkan status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600 border-slate-500 text-white">
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Dikonfirmasi">Dikonfirmasi</SelectItem>
                <SelectItem value="Dalam Investigasi">Dalam Investigasi</SelectItem>
                <SelectItem value="Menunggu Verifikasi">Menunggu Verifikasi</SelectItem>
                <SelectItem value="Disengketakan">Disengketakan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Relationships Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Hubungan ({filteredRelationships.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Koneksi</TableHead>
                <TableHead className="text-slate-300">Jenis</TableHead>
                <TableHead className="text-slate-300">Kekuatan</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Tanggal</TableHead>
                <TableHead className="text-slate-300">Bukti</TableHead>
                <TableHead className="text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRelationships.map(relationship => (
                <TableRow key={relationship.id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell>
                    <div className="flex items-center gap-2 max-w-md">
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 text-xs">
                        {relationship.sourceCategory}
                      </Badge>
                      <span className="text-white text-sm truncate">
                        {relationship.sourceEntity}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-white text-sm truncate">
                        {relationship.targetEntity}
                      </span>
                      <Badge variant="secondary" className="bg-green-600/20 text-green-400 text-xs">
                        {relationship.targetCategory}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      {relationship.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${relationship.strength}%` }}
                        />
                      </div>
                      <span className="text-white text-sm">{relationship.strength}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[relationship.status]}>
                      {relationship.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm">
                    {relationship.dateEstablished}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      {relationship.evidence.length} item
                    </Badge>
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
                      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                        <DropdownMenuItem
                          className="text-slate-300 focus:bg-slate-700"
                          onClick={() => handleViewDetail(relationship)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-slate-300 focus:bg-slate-700"
                          onClick={() => handleEdit(relationship)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Hubungan
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 focus:bg-red-600/20"
                          onClick={() => handleDelete(relationship.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hapus Hubungan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
