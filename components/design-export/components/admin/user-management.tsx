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
import { Avatar, AvatarFallback } from '../../../ui/avatar';
import { Switch } from '../../../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Textarea } from '../../../ui/textarea';
import { Separator } from '../../../ui/separator';
import {
  Plus,
  Search,
  Filter,
  Shield,
  Eye,
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  MoreHorizontal,
  UserCheck,
  UserX,
  Building2,
  Users,
  Settings,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Crown,
  Star,
  Briefcase,
  MapPin,
  Lock,
  Activity,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { toast } from 'sonner';

// Struktur Organisasi BPA
const organizationStructure = {
  Pusat: {
    label: 'Pusat (Kejaksaan Agung)',
    level: 'pusat',
    color: 'bg-purple-600/20 text-purple-400 border-purple-500/50',
    units: ['Kejaksaan Agung'],
  },
  'BPA-Sekretariat': {
    label: 'BPA - Sekretariat BPA',
    level: 'bpa-sekretariat',
    color: 'bg-red-600/20 text-red-400 border-red-500/50',
    units: ['Sekretariat BPA'],
  },
  'BPA-Pusat-Manajemen': {
    label: 'BPA - Pusat Manajemen, Penelusuran, dan Perampasan Aset',
    level: 'bpa-pusat',
    color: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
    units: ['Bidang Manajemen Pengelolaan Aset', 'Bidang Penelusuran dan Perampasan Aset'],
  },
  'BPA-Pusat-Penyelesaian': {
    label: 'BPA - Pusat Penyelesaian Aset',
    level: 'bpa-pusat',
    color: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/50',
    units: ['Bidang Penyelesaian Aset Tindak Pidana', 'Bidang Penyelesaian Aset Lainnya'],
  },
  Kejati: {
    label: 'Kejaksaan Tinggi (Kejati)',
    level: 'kejati',
    color: 'bg-green-600/20 text-green-400 border-green-500/50',
    units: [
      'Kejati DKI Jakarta',
      'Kejati Jawa Barat',
      'Kejati Jawa Tengah',
      'Kejati Jawa Timur',
      'Kejati Sumatra Utara',
      'Kejati Sumatra Selatan',
      'Kejati Kalimantan Timur',
      'Kejati Sulawesi Selatan',
    ],
  },
  Kejari: {
    label: 'Kejaksaan Negeri (Kejari)',
    level: 'kejari',
    color: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
    units: [
      'Kejari Jakarta Pusat',
      'Kejari Jakarta Selatan',
      'Kejari Bandung',
      'Kejari Surabaya',
      'Kejari Medan',
      'Kejari Palembang',
    ],
  },
  Cabang: {
    label: 'Cabang Kejaksaan Negeri',
    level: 'cabang',
    color: 'bg-orange-600/20 text-orange-400 border-orange-500/50',
    units: ['Cabjari Menteng', 'Cabjari Tanah Abang', 'Cabjari Cimahi', 'Cabjari Bekasi'],
  },
};

// Role Definition dengan Hak Akses
const roleDefinitions = [
  {
    id: 'pimpinan',
    name: 'Pimpinan',
    level: 'pusat',
    description: 'Jaksa Agung, Wakil Jaksa Agung',
    permissions: ['read', 'write', 'delete', 'admin', 'approve_policy', 'national_monitoring'],
    color: 'bg-purple-600/20 text-purple-400 border-purple-500/50',
    applicableUnits: ['Pusat'],
  },
  {
    id: 'admin-pusat-bpa',
    name: 'Admin Pusat BPA',
    level: 'bpa-sekretariat',
    description: 'Kepala Badan, Sekretaris BPA',
    permissions: ['read', 'write', 'delete', 'admin', 'user_management', 'system_config'],
    color: 'bg-red-600/20 text-red-400 border-red-500/50',
    applicableUnits: ['BPA-Sekretariat'],
  },
  {
    id: 'manager-unit-pusat',
    name: 'Manager Unit Pusat',
    level: 'bpa-pusat',
    description: 'Kepala Pusat di BPA',
    permissions: ['read', 'write', 'validate', 'approve_data'],
    color: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
    applicableUnits: ['BPA-Pusat-Manajemen', 'BPA-Pusat-Penyelesaian'],
  },
  {
    id: 'admin-unit-pusat',
    name: 'Admin Unit Pusat',
    level: 'bpa-pusat',
    description: 'Kepala Bagian/Bidang di BPA',
    permissions: ['read', 'write', 'update_data', 'monitoring_reports'],
    color: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/50',
    applicableUnits: ['BPA-Pusat-Manajemen', 'BPA-Pusat-Penyelesaian'],
  },
  {
    id: 'koordinator-teknis',
    name: 'Koordinator Teknis',
    level: 'bpa-pusat',
    description: 'Sub Bagian/Sub Bidang di BPA',
    permissions: ['read', 'write', 'data_entry'],
    color: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50',
    applicableUnits: ['BPA-Pusat-Manajemen', 'BPA-Pusat-Penyelesaian'],
  },
  {
    id: 'admin-kejati',
    name: 'Admin Kejati',
    level: 'kejati',
    description: 'Asisten Pemulihan Aset Kejati',
    permissions: ['read', 'write', 'user_management_province', 'data_management_province'],
    color: 'bg-green-600/20 text-green-400 border-green-500/50',
    applicableUnits: ['Kejati'],
  },
  {
    id: 'operator-kejati',
    name: 'Operator Kejati',
    level: 'kejati',
    description: 'Sub Bidang Kejati',
    permissions: ['read', 'write', 'data_input_province', 'data_verification_province'],
    color: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50',
    applicableUnits: ['Kejati'],
  },
  {
    id: 'admin-kejari',
    name: 'Admin Kejari',
    level: 'kejari',
    description: 'Kepala Seksi Pemulihan Aset dan Pengelolaan Barang Bukti',
    permissions: ['read', 'write', 'user_management_district', 'data_management_district'],
    color: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
    applicableUnits: ['Kejari'],
  },
  {
    id: 'operator-cabang',
    name: 'Operator Cabang',
    level: 'cabang',
    description: 'Subseksi Tindak Pidana Umum, Tindak Pidana Khusus dan Pemulihan Aset',
    permissions: ['read', 'write', 'data_input', 'reporting'],
    color: 'bg-orange-600/20 text-orange-400 border-orange-500/50',
    applicableUnits: ['Cabang'],
  },
];

// Mock Data
const mockRoles = roleDefinitions;

const mockUsers = [
  {
    id: '1',
    fullName: 'Dr. Ahmad Wijaya, S.H., M.H.',
    email: 'ahmad.wijaya@kejaksaan.go.id',
    nip: '196801011990031001',
    phone: '+62-21-555-0123',
    roleId: 'admin-pusat-bpa',
    unitKerja: 'BPA-Sekretariat',
    subUnit: 'Sekretariat BPA',
    status: 'Aktif',
    lastLogin: '2024-02-18 14:30',
    dateCreated: '2023-06-15',
    location: 'Jakarta Pusat',
  },
  {
    id: '2',
    fullName: 'Sari Indrawati, S.H.',
    email: 'sari.indrawati@kejaksaan.go.id',
    nip: '197505121998032001',
    phone: '+62-21-555-0456',
    roleId: 'manager-unit-pusat',
    unitKerja: 'BPA-Pusat-Manajemen',
    subUnit: 'Bidang Penelusuran dan Perampasan Aset',
    status: 'Aktif',
    lastLogin: '2024-02-18 09:15',
    dateCreated: '2023-08-22',
    location: 'Jakarta Pusat',
  },
  {
    id: '3',
    fullName: 'Budi Hartono, S.H., M.H.',
    email: 'budi.hartono@kejaksaan.go.id',
    nip: '198203151999031002',
    phone: '+62-21-555-0789',
    roleId: 'admin-kejati',
    unitKerja: 'Kejati',
    subUnit: 'Kejati DKI Jakarta',
    status: 'Aktif',
    lastLogin: '2024-02-17 16:45',
    dateCreated: '2023-09-10',
    location: 'Jakarta',
  },
  {
    id: '4',
    fullName: 'Diana Kusuma, S.H.',
    email: 'diana.kusuma@kejaksaan.go.id',
    nip: '199012051999032001',
    phone: '+62-21-555-0321',
    roleId: 'operator-kejati',
    unitKerja: 'Kejati',
    subUnit: 'Kejati DKI Jakarta',
    status: 'Aktif',
    lastLogin: '2024-01-15 11:20',
    dateCreated: '2023-11-05',
    location: 'Jakarta',
  },
  {
    id: '5',
    fullName: 'Eko Prasetyo, S.H.',
    email: 'eko.prasetyo@kejaksaan.go.id',
    nip: '199506101998031001',
    phone: '+62-21-555-0654',
    roleId: 'admin-kejari',
    unitKerja: 'Kejari',
    subUnit: 'Kejari Jakarta Pusat',
    status: 'Aktif',
    lastLogin: '2024-02-18 08:30',
    dateCreated: '2024-01-12',
    location: 'Jakarta Pusat',
  },
];

const statusColors = {
  Aktif: 'bg-green-600/20 text-green-400 border-green-500/50',
  'Tidak Aktif': 'bg-red-600/20 text-red-400 border-red-500/50',
  Pending: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
};

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [roles, setRoles] = useState(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [unitFilter, setUnitFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    nip: '',
    phone: '',
    roleId: '',
    unitKerja: '',
    subUnit: '',
    location: '',
  });

  const [newRole, setNewRole] = useState({
    name: '',
    level: '',
    description: '',
    permissions: [],
    applicableUnits: [],
  });

  // Helper functions
  const getRoleInfo = roleId => {
    return roles.find(role => role.id === roleId) || {};
  };

  const getUnitInfo = unitKerja => {
    return organizationStructure[unitKerja] || {};
  };

  const filteredUsers = users.filter(user => {
    const role = getRoleInfo(user.roleId);
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nip.includes(searchTerm) ||
      user.subUnit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.roleId === roleFilter;
    const matchesUnit = unitFilter === 'all' || user.unitKerja === unitFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesUnit && matchesStatus;
  });

  const handleAddUser = () => {
    if (
      !newUser.fullName ||
      !newUser.email ||
      !newUser.nip ||
      !newUser.roleId ||
      !newUser.unitKerja
    ) {
      toast.error('Harap lengkapi semua field yang wajib diisi');
      return;
    }

    const user = {
      id: Date.now().toString(),
      ...newUser,
      status: 'Aktif',
      lastLogin: 'Belum Pernah',
      dateCreated: new Date().toISOString().split('T')[0],
    };

    setUsers([...users, user]);
    setNewUser({
      fullName: '',
      email: '',
      nip: '',
      phone: '',
      roleId: '',
      unitKerja: '',
      subUnit: '',
      location: '',
    });
    setShowAddUserDialog(false);
    toast.success('Pengguna berhasil dibuat');
  };

  const handleAddRole = () => {
    if (!newRole.name || !newRole.level || !newRole.description) {
      toast.error('Harap lengkapi semua field yang wajib diisi');
      return;
    }

    const role = {
      id: Date.now().toString(),
      ...newRole,
      color: 'bg-gray-600/20 text-gray-400 border-gray-500/50',
    };

    setRoles([...roles, role]);
    setNewRole({
      name: '',
      level: '',
      description: '',
      permissions: [],
      applicableUnits: [],
    });
    setShowAddRoleDialog(false);
    toast.success('Role berhasil dibuat');
  };

  const handleToggleStatus = userId => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'Aktif' ? 'Tidak Aktif' : 'Aktif' }
          : user
      )
    );
    toast.success('Status pengguna berhasil diperbarui');
  };

  const handleDeleteUser = userId => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast.success('Pengguna berhasil dihapus');
  };

  const handleViewUser = user => {
    setSelectedUser(user);
    setShowDetailDialog(true);
  };

  const handleEditUser = user => {
    setEditingUser(user);
    setShowEditDialog(true);
  };

  const handleResetPassword = user => {
    toast.success(`Password untuk ${user.fullName} berhasil direset. Email telah dikirim.`);
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;

    setUsers(prev => prev.map(u => (u.id === editingUser.id ? editingUser : u)));
    setShowEditDialog(false);
    setEditingUser(null);
    toast.success('Perubahan berhasil disimpan!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manajemen Pengguna & Role Access</h1>
          <p className="text-slate-400 mt-1">
            Kelola pengguna sistem dan hak akses berbasis hierarki organisasi BPA
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{users.length}</p>
            <p className="text-sm text-slate-400">Total Pengguna</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {users.filter(u => u.status === 'Aktif').length}
            </p>
            <p className="text-sm text-slate-400">Pengguna Aktif</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Crown className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {users.filter(u => ['admin-pusat-bpa', 'pimpinan'].includes(u.roleId)).length}
            </p>
            <p className="text-sm text-slate-400">Admin Pusat</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-yellow-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {users.filter(u => u.unitKerja.includes('Kejati')).length}
            </p>
            <p className="text-sm text-slate-400">Kejati</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-orange-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {
                users.filter(u => u.unitKerja.includes('Kejari') || u.unitKerja.includes('Cabang'))
                  .length
              }
            </p>
            <p className="text-sm text-slate-400">Kejari & Cabang</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-slate-700">
          <TabsTrigger value="users" className="data-[state=active]:bg-blue-600">
            <Users className="w-4 h-4 mr-2" />
            Manajemen Pengguna
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-blue-600">
            <Shield className="w-4 h-4 mr-2" />
            Master Data Role & Jabatan
          </TabsTrigger>
        </TabsList>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Add User Button */}
          <div className="flex justify-end">
            <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    Tambah Pengguna Baru
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Buat akun pengguna baru sesuai dengan struktur organisasi BPA
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Informasi Personal */}
                  <div className="space-y-4">
                    <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                      Informasi Personal
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Nama Lengkap *
                        </Label>
                        <Input
                          value={newUser.fullName}
                          onChange={e =>
                            setNewUser(prev => ({ ...prev, fullName: e.target.value }))
                          }
                          className="bg-slate-700 border-slate-600"
                          placeholder="Dr. Ahmad Wijaya, S.H., M.H."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email *
                        </Label>
                        <Input
                          type="email"
                          value={newUser.email}
                          onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                          placeholder="nama@kejaksaan.go.id"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          NIP *
                        </Label>
                        <Input
                          value={newUser.nip}
                          onChange={e => setNewUser(prev => ({ ...prev, nip: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                          placeholder="196801011990031001"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Telepon
                        </Label>
                        <Input
                          value={newUser.phone}
                          onChange={e => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                          placeholder="+62-21-555-0123"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informasi Organisasi */}
                  <div className="space-y-4">
                    <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                      Informasi Organisasi
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Unit Kerja *
                        </Label>
                        <Select
                          value={newUser.unitKerja}
                          onValueChange={value => {
                            setNewUser(prev => ({ ...prev, unitKerja: value, subUnit: '' }));
                          }}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Pilih unit kerja" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {Object.entries(organizationStructure).map(([key, unit]) => (
                              <SelectItem key={key} value={key}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Sub Unit
                        </Label>
                        <Select
                          value={newUser.subUnit}
                          onValueChange={value => setNewUser(prev => ({ ...prev, subUnit: value }))}
                          disabled={!newUser.unitKerja}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Pilih sub unit" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {newUser.unitKerja &&
                              organizationStructure[newUser.unitKerja]?.units.map(unit => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Role *
                        </Label>
                        <Select
                          value={newUser.roleId}
                          onValueChange={value => setNewUser(prev => ({ ...prev, roleId: value }))}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Pilih role" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {roles
                              .filter(
                                role =>
                                  !newUser.unitKerja ||
                                  role.applicableUnits.includes(newUser.unitKerja)
                              )
                              .map(role => (
                                <SelectItem key={role.id} value={role.id}>
                                  <div className="flex items-center gap-2">
                                    <Badge className={role.color} size="sm">
                                      {role.name}
                                    </Badge>
                                    <span>{role.description}</span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Lokasi
                        </Label>
                        <Input
                          value={newUser.location}
                          onChange={e =>
                            setNewUser(prev => ({ ...prev, location: e.target.value }))
                          }
                          className="bg-slate-700 border-slate-600"
                          placeholder="Jakarta Pusat"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview User */}
                  {newUser.fullName && newUser.roleId && (
                    <div className="space-y-4">
                      <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                        Preview Pengguna
                      </h4>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-blue-600 text-white">
                              {newUser.fullName
                                .split(' ')
                                .slice(0, 2)
                                .map(n => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-white font-medium">{newUser.fullName}</p>
                            <p className="text-sm text-slate-400">{newUser.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                              {newUser.roleId && (
                                <Badge className={getRoleInfo(newUser.roleId).color}>
                                  {getRoleInfo(newUser.roleId).name}
                                </Badge>
                              )}
                              {newUser.unitKerja && (
                                <Badge className={getUnitInfo(newUser.unitKerja).color}>
                                  {getUnitInfo(newUser.unitKerja).label}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddUserDialog(false)}
                    className="border-slate-600 text-slate-300"
                  >
                    Batal
                  </Button>
                  <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-500">
                    Buat Pengguna
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Cari pengguna..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Filter Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Semua Role</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={unitFilter} onValueChange={setUnitFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Filter Unit Kerja" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Semua Unit</SelectItem>
                    {Object.entries(organizationStructure).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Daftar Pengguna ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Pengguna</TableHead>
                    <TableHead className="text-slate-300">Kontak & NIP</TableHead>
                    <TableHead className="text-slate-300">Role & Unit Kerja</TableHead>
                    <TableHead className="text-slate-300">Lokasi</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Login Terakhir</TableHead>
                    <TableHead className="text-slate-300">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => {
                    const role = getRoleInfo(user.roleId);
                    const unit = getUnitInfo(user.unitKerja);

                    return (
                      <TableRow key={user.id} className="border-slate-700 hover:bg-slate-700/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-blue-600 text-white">
                                {user.fullName
                                  .split(' ')
                                  .slice(0, 2)
                                  .map(n => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-white font-medium">{user.fullName}</p>
                              <p className="text-xs text-slate-400">Bergabung {user.dateCreated}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="text-slate-300">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span className="text-slate-300">NIP: {user.nip}</span>
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span className="text-slate-300">{user.phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <Badge className={role.color}>{role.name}</Badge>
                            <div>
                              <Badge className={unit.color} variant="outline">
                                {unit.label}
                              </Badge>
                              {user.subUnit && (
                                <p className="text-xs text-slate-400 mt-1">{user.subUnit}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {user.location || '-'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={statusColors[user.status]}>{user.status}</Badge>
                            <Switch
                              checked={user.status === 'Aktif'}
                              onCheckedChange={() => handleToggleStatus(user.id)}
                              size="sm"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300 text-sm">{user.lastLogin}</TableCell>
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
                                onClick={() => handleViewUser(user)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Lihat Profil
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-slate-300 focus:bg-slate-700"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Pengguna
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-slate-300 focus:bg-slate-700"
                                onClick={() => handleResetPassword(user)}
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-400 focus:bg-red-600/20"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Hapus Pengguna
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Management Tab */}
        <TabsContent value="roles" className="space-y-6">
          {/* Add Role Button */}
          <div className="flex justify-end">
            <Dialog open={showAddRoleDialog} onOpenChange={setShowAddRoleDialog}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Role
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Tambah Role Baru
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Buat role baru dengan hak akses yang sesuai
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama Role *</Label>
                      <Input
                        value={newRole.name}
                        onChange={e => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-slate-700 border-slate-600"
                        placeholder="Contoh: Admin Regional"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Level Hierarki *</Label>
                      <Select
                        value={newRole.level}
                        onValueChange={value => setNewRole(prev => ({ ...prev, level: value }))}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Pilih level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="pusat">Pusat</SelectItem>
                          <SelectItem value="bpa-sekretariat">BPA Sekretariat</SelectItem>
                          <SelectItem value="bpa-pusat">BPA Pusat</SelectItem>
                          <SelectItem value="kejati">Kejati</SelectItem>
                          <SelectItem value="kejari">Kejari</SelectItem>
                          <SelectItem value="cabang">Cabang</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Deskripsi *</Label>
                    <Textarea
                      value={newRole.description}
                      onChange={e => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-slate-700 border-slate-600"
                      placeholder="Jelaskan tanggung jawab dan ruang lingkup role ini..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddRoleDialog(false)}
                    className="border-slate-600 text-slate-300"
                  >
                    Batal
                  </Button>
                  <Button onClick={handleAddRole} className="bg-green-600 hover:bg-green-500">
                    Buat Role
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Roles Table */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                Master Data Role & Jabatan ({roles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Role Name</TableHead>
                    <TableHead className="text-slate-300">Level Hierarki</TableHead>
                    <TableHead className="text-slate-300">Unit Kerja</TableHead>
                    <TableHead className="text-slate-300">Deskripsi</TableHead>
                    <TableHead className="text-slate-300">Hak Akses</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map(role => (
                    <TableRow key={role.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <Badge className={role.color}>{role.name}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-slate-300">
                          {role.level.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {role.applicableUnits.map(unit => (
                            <Badge key={unit} variant="outline" className="text-xs mr-1">
                              {organizationStructure[unit]?.label || unit}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm max-w-xs">
                        <p className="truncate">{role.description}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {role.permissions.slice(0, 3).map(permission => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission.replace('_', ' ')}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 3} lainnya
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                          Aktif
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
                          <DropdownMenuContent
                            align="end"
                            className="bg-slate-800 border-slate-700"
                          >
                            <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                              <Eye className="w-4 h-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                              <Settings className="w-4 h-4 mr-2" />
                              Kelola Hak Akses
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

          {/* RBAC Summary */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {roles.filter(r => r.level === 'pusat').length}
                </p>
                <p className="text-sm text-slate-400">Role Tingkat Pusat</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {roles.filter(r => r.level.includes('bpa')).length}
                </p>
                <p className="text-sm text-slate-400">Role BPA</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {roles.filter(r => ['kejati', 'kejari', 'cabang'].includes(r.level)).length}
                </p>
                <p className="text-sm text-slate-400">Role Daerah</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Detail Pengguna
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Informasi lengkap tentang pengguna
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informasi Personal */}
            <div className="space-y-4">
              <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                Informasi Personal
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nama Lengkap *
                  </Label>
                  <Input
                    value={selectedUser?.fullName}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Dr. Ahmad Wijaya, S.H., M.H."
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </Label>
                  <Input
                    type="email"
                    value={selectedUser?.email}
                    className="bg-slate-700 border-slate-600"
                    placeholder="nama@kejaksaan.go.id"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    NIP *
                  </Label>
                  <Input
                    value={selectedUser?.nip}
                    className="bg-slate-700 border-slate-600"
                    placeholder="196801011990031001"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telepon
                  </Label>
                  <Input
                    value={selectedUser?.phone}
                    className="bg-slate-700 border-slate-600"
                    placeholder="+62-21-555-0123"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Informasi Organisasi */}
            <div className="space-y-4">
              <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                Informasi Organisasi
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Unit Kerja *
                  </Label>
                  <Select
                    value={selectedUser?.unitKerja}
                    onValueChange={value => {
                      setNewUser(prev => ({ ...prev, unitKerja: value, subUnit: '' }));
                    }}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Pilih unit kerja" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {Object.entries(organizationStructure).map(([key, unit]) => (
                        <SelectItem key={key} value={key}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Sub Unit
                  </Label>
                  <Select
                    value={selectedUser?.subUnit}
                    onValueChange={value => setNewUser(prev => ({ ...prev, subUnit: value }))}
                    disabled={!selectedUser?.unitKerja}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Pilih sub unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {selectedUser?.unitKerja &&
                        organizationStructure[selectedUser?.unitKerja]?.units.map(unit => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Role *
                  </Label>
                  <Select
                    value={selectedUser?.roleId}
                    onValueChange={value => setNewUser(prev => ({ ...prev, roleId: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {roles
                        .filter(
                          role =>
                            !selectedUser?.unitKerja ||
                            role.applicableUnits.includes(selectedUser?.unitKerja)
                        )
                        .map(role => (
                          <SelectItem key={role.id} value={role.id}>
                            <div className="flex items-center gap-2">
                              <Badge className={role.color} size="sm">
                                {role.name}
                              </Badge>
                              <span>{role.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Lokasi
                  </Label>
                  <Input
                    value={selectedUser?.location}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Jakarta Pusat"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Preview User */}
            {selectedUser?.fullName && selectedUser?.roleId && (
              <div className="space-y-4">
                <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                  Preview Pengguna
                </h4>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {selectedUser?.fullName
                          .split(' ')
                          .slice(0, 2)
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-white font-medium">{selectedUser?.fullName}</p>
                      <p className="text-sm text-slate-400">{selectedUser?.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {selectedUser?.roleId && (
                          <Badge className={getRoleInfo(selectedUser?.roleId).color}>
                            {getRoleInfo(selectedUser?.roleId).name}
                          </Badge>
                        )}
                        {selectedUser?.unitKerja && (
                          <Badge className={getUnitInfo(selectedUser?.unitKerja).color}>
                            {getUnitInfo(selectedUser?.unitKerja).label}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Edit Pengguna
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Ubah informasi pengguna
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informasi Personal */}
            <div className="space-y-4">
              <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                Informasi Personal
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nama Lengkap *
                  </Label>
                  <Input
                    value={editingUser?.fullName}
                    onChange={e => setEditingUser(prev => ({ ...prev, fullName: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Dr. Ahmad Wijaya, S.H., M.H."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </Label>
                  <Input
                    type="email"
                    value={editingUser?.email}
                    onChange={e => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="nama@kejaksaan.go.id"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    NIP *
                  </Label>
                  <Input
                    value={editingUser?.nip}
                    onChange={e => setEditingUser(prev => ({ ...prev, nip: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="196801011990031001"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telepon
                  </Label>
                  <Input
                    value={editingUser?.phone}
                    onChange={e => setEditingUser(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="+62-21-555-0123"
                  />
                </div>
              </div>
            </div>

            {/* Informasi Organisasi */}
            <div className="space-y-4">
              <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                Informasi Organisasi
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Unit Kerja *
                  </Label>
                  <Select
                    value={editingUser?.unitKerja}
                    onValueChange={value => {
                      setEditingUser(prev => ({ ...prev, unitKerja: value, subUnit: '' }));
                    }}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Pilih unit kerja" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {Object.entries(organizationStructure).map(([key, unit]) => (
                        <SelectItem key={key} value={key}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Sub Unit
                  </Label>
                  <Select
                    value={editingUser?.subUnit}
                    onValueChange={value => setEditingUser(prev => ({ ...prev, subUnit: value }))}
                    disabled={!editingUser?.unitKerja}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Pilih sub unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {editingUser?.unitKerja &&
                        organizationStructure[editingUser?.unitKerja]?.units.map(unit => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Role *
                  </Label>
                  <Select
                    value={editingUser?.roleId}
                    onValueChange={value => setEditingUser(prev => ({ ...prev, roleId: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {roles
                        .filter(
                          role =>
                            !editingUser?.unitKerja ||
                            role.applicableUnits.includes(editingUser?.unitKerja)
                        )
                        .map(role => (
                          <SelectItem key={role.id} value={role.id}>
                            <div className="flex items-center gap-2">
                              <Badge className={role.color} size="sm">
                                {role.name}
                              </Badge>
                              <span>{role.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Lokasi
                  </Label>
                  <Input
                    value={editingUser?.location}
                    onChange={e => setEditingUser(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Jakarta Pusat"
                  />
                </div>
              </div>
            </div>

            {/* Preview User */}
            {editingUser?.fullName && editingUser?.roleId && (
              <div className="space-y-4">
                <h4 className="text-sm text-cyan-400 border-b border-slate-600 pb-2">
                  Preview Pengguna
                </h4>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {editingUser?.fullName
                          .split(' ')
                          .slice(0, 2)
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-white font-medium">{editingUser?.fullName}</p>
                      <p className="text-sm text-slate-400">{editingUser?.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {editingUser?.roleId && (
                          <Badge className={getRoleInfo(editingUser?.roleId).color}>
                            {getRoleInfo(editingUser?.roleId).name}
                          </Badge>
                        )}
                        {editingUser?.unitKerja && (
                          <Badge className={getUnitInfo(editingUser?.unitKerja).color}>
                            {getUnitInfo(editingUser?.unitKerja).label}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
  );
}
