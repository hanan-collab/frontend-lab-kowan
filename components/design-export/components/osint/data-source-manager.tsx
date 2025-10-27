import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Input } from '../../../ui/input';
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
import { Switch } from '../../../ui/switch';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Settings,
  Globe,
  MessageSquare,
  ShoppingBag,
  FileText,
  Monitor,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';

const sourceTypes = {
  'Media Sosial': { icon: MessageSquare, color: 'bg-blue-600/20 text-blue-400 border-blue-500/50' },
  'Portal Berita': { icon: FileText, color: 'bg-green-600/20 text-green-400 border-green-500/50' },
  Marketplace: {
    icon: ShoppingBag,
    color: 'bg-purple-600/20 text-purple-400 border-purple-500/50',
  },
  Website: { icon: Globe, color: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50' },
  Forum: { icon: Monitor, color: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/50' },
};

const mockDataSources = [
  {
    id: '1',
    name: 'Twitter/X API',
    type: 'Media Sosial',
    url: 'https://api.twitter.com/2/',
    status: 'Aktif',
    lastUpdate: '2024-02-18 14:30',
    dataCount: 1254,
    config: { apiKey: 'xxx...xxx', rateLimitPerHour: 500 },
  },
  {
    id: '2',
    name: 'Facebook Graph API',
    type: 'Media Sosial',
    url: 'https://graph.facebook.com/v18.0/',
    status: 'Aktif',
    lastUpdate: '2024-02-18 12:15',
    dataCount: 876,
    config: { apiKey: 'xxx...xxx', rateLimitPerHour: 200 },
  },
  {
    id: '3',
    name: 'Instagram Basic Display',
    type: 'Media Sosial',
    url: 'https://graph.instagram.com/',
    status: 'Nonaktif',
    lastUpdate: '2024-02-17 09:20',
    dataCount: 432,
    config: { apiKey: 'xxx...xxx', rateLimitPerHour: 100 },
  },
  {
    id: '4',
    name: 'LinkedIn API',
    type: 'Media Sosial',
    url: 'https://api.linkedin.com/v2/',
    status: 'Aktif',
    lastUpdate: '2024-02-18 11:45',
    dataCount: 298,
    config: { apiKey: 'xxx...xxx', rateLimitPerHour: 150 },
  },
  {
    id: '5',
    name: 'Tokopedia Search',
    type: 'Marketplace',
    url: 'https://www.tokopedia.com/search',
    status: 'Aktif',
    lastUpdate: '2024-02-18 08:10',
    dataCount: 156,
    config: { crawlDelay: 2000, maxPages: 50 },
  },
  {
    id: '6',
    name: 'Detik.com RSS',
    type: 'Portal Berita',
    url: 'https://rss.detik.com/index.php/detikcom',
    status: 'Aktif',
    lastUpdate: '2024-02-18 13:25',
    dataCount: 89,
    config: { updateInterval: 30, maxArticles: 100 },
  },
];

const statusColors = {
  Aktif: 'bg-green-600/20 text-green-400 border-green-500/50',
  Nonaktif: 'bg-red-600/20 text-red-400 border-red-500/50',
  Error: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
};

export function DataSourceManager() {
  const [dataSources, setDataSources] = useState(mockDataSources);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    type: '',
    url: '',
    apiKey: '',
    description: '',
  });

  const filteredSources = dataSources.filter(source => {
    const matchesSearch =
      source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || source.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || source.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddSource = () => {
    if (!newSource.name || !newSource.type || !newSource.url) {
      toast.error('Harap lengkapi semua field yang wajib diisi');
      return;
    }

    const source = {
      id: Date.now().toString(),
      ...newSource,
      status: 'Aktif',
      lastUpdate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      dataCount: 0,
      config: {},
    };

    setDataSources([...dataSources, source]);
    setNewSource({ name: '', type: '', url: '', apiKey: '', description: '' });
    setShowAddDialog(false);
    toast.success('Sumber data berhasil ditambahkan');
  };

  const handleToggleStatus = sourceId => {
    setDataSources(prev =>
      prev.map(source =>
        source.id === sourceId
          ? { ...source, status: source.status === 'Aktif' ? 'Nonaktif' : 'Aktif' }
          : source
      )
    );
    toast.success('Status sumber data berhasil diperbarui');
  };

  const handleDeleteSource = sourceId => {
    setDataSources(prev => prev.filter(source => source.id !== sourceId));
    toast.success('Sumber data berhasil dihapus');
  };

  const activeSources = dataSources.filter(s => s.status === 'Aktif').length;
  const totalDataToday = dataSources.reduce((sum, source) => sum + source.dataCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Data Source Manager</h1>
          <p className="text-slate-400 mt-1">Kelola sumber data untuk pengumpulan OSINT</p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Add New Source
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Tambah Sumber Data Baru
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Konfigurasikan sumber data baru untuk pengumpulan OSINT
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Nama Sumber *</Label>
                  <Input
                    value={newSource.name}
                    onChange={e => setNewSource(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Twitter API, Facebook Graph, dll"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Jenis *</Label>
                  <Select
                    value={newSource.type}
                    onValueChange={value => setNewSource(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Pilih jenis sumber" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {Object.keys(sourceTypes).map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">URL/Endpoint *</Label>
                <Input
                  value={newSource.url}
                  onChange={e => setNewSource(prev => ({ ...prev, url: e.target.value }))}
                  className="bg-slate-700 border-slate-600"
                  placeholder="https://api.example.com/v1/"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">API Key/Token</Label>
                <Input
                  type="password"
                  value={newSource.apiKey}
                  onChange={e => setNewSource(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="bg-slate-700 border-slate-600"
                  placeholder="Masukkan API key jika diperlukan"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Deskripsi</Label>
                <Input
                  value={newSource.description}
                  onChange={e => setNewSource(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-700 border-slate-600"
                  placeholder="Deskripsi singkat tentang sumber data ini"
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
              <Button onClick={handleAddSource} className="bg-blue-600 hover:bg-blue-500">
                Tambah Sumber
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Sumber</p>
                <p className="text-2xl font-bold text-white">{dataSources.length}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Sumber Aktif</p>
                <p className="text-2xl font-bold text-white">{activeSources}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Data Hari Ini</p>
                <p className="text-2xl font-bold text-white">{totalDataToday.toLocaleString()}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari sumber data..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Filter Jenis" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Semua Jenis</SelectItem>
                {Object.keys(sourceTypes).map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
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
                <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">
            Daftar Sumber Data ({filteredSources.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Nama Sumber</TableHead>
                <TableHead className="text-slate-300">Jenis</TableHead>
                <TableHead className="text-slate-300">URL/Endpoint</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Data Terkumpul</TableHead>
                <TableHead className="text-slate-300">Update Terakhir</TableHead>
                <TableHead className="text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSources.map(source => {
                const TypeIcon = sourceTypes[source.type]?.icon || Globe;

                return (
                  <TableRow key={source.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{source.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={sourceTypes[source.type]?.color}>{source.type}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-300 max-w-xs truncate">{source.url}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={statusColors[source.status]}>
                          {source.status === 'Aktif' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {source.status === 'Nonaktif' && <XCircle className="w-3 h-3 mr-1" />}
                          {source.status}
                        </Badge>
                        <Switch
                          checked={source.status === 'Aktif'}
                          onCheckedChange={() => handleToggleStatus(source.id)}
                          size="sm"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-white">
                      {source.dataCount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm">{source.lastUpdate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteSource(source.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
