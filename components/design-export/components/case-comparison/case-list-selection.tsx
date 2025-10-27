import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Checkbox } from '../../../ui/checkbox';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Calendar,
  AlertCircle,
  GitCompare,
  Users,
  DollarSign,
  FileText,
} from 'lucide-react';

const mockCases = [
  {
    id: 'CASE-001',
    name: 'Kasus Korupsi Proyek Infrastruktur',
    dateCreated: '2024-01-15',
    status: 'Aktif',
    entities: 24,
    assets: 18,
    totalValue: 'Rp 45 M',
    keyPatterns: ['Proyek Fiktif', 'Mark-up Anggaran', 'Konspirasi'],
    dataSources: ['LHKPN', 'Bank Records', 'PPATK'],
  },
  {
    id: 'CASE-002',
    name: 'Pencucian Uang Melalui Properti',
    dateCreated: '2024-02-10',
    status: 'Aktif',
    entities: 18,
    assets: 32,
    totalValue: 'Rp 89 M',
    keyPatterns: ['Layering', 'Shell Companies', 'Property Transfer'],
    dataSources: ['BPN', 'Bank Records', 'Notaris'],
  },
  {
    id: 'CASE-003',
    name: 'Fraud Perbankan Korporat',
    dateCreated: '2024-01-28',
    status: 'Selesai',
    entities: 15,
    assets: 12,
    totalValue: 'Rp 23 M',
    keyPatterns: ['Invoice Fiktif', 'Penggelapan Dana', 'Kolusi Internal'],
    dataSources: ['Bank Internal', 'Email Forensics', 'Accounting Records'],
  },
  {
    id: 'CASE-004',
    name: 'Suap Tender Pengadaan Barang',
    dateCreated: '2024-03-05',
    status: 'Aktif',
    entities: 22,
    assets: 15,
    totalValue: 'Rp 34 M',
    keyPatterns: ['Kickback', 'Bid Rigging', 'Gratifikasi'],
    dataSources: ['LKPP', 'Bank Records', 'Whistleblower'],
  },
  {
    id: 'CASE-005',
    name: 'Manipulasi Laporan Keuangan',
    dateCreated: '2024-02-20',
    status: 'Aktif',
    entities: 12,
    assets: 8,
    totalValue: 'Rp 16 M',
    keyPatterns: ['Accounting Fraud', 'False Statement', 'Revenue Recognition'],
    dataSources: ['Financial Statements', 'Audit Reports', 'Email'],
  },
  {
    id: 'CASE-006',
    name: 'Kasus Korupsi Dana Hibah',
    dateCreated: '2023-11-12',
    status: 'Selesai',
    entities: 19,
    assets: 14,
    totalValue: 'Rp 28 M',
    keyPatterns: ['Misappropriation', 'Fictitious Beneficiary', 'Document Forgery'],
    dataSources: ['Government Records', 'Bank Statements', 'Field Investigation'],
  },
  {
    id: 'CASE-007',
    name: 'Pencucian Uang Cryptocurrency',
    dateCreated: '2024-03-18',
    status: 'Aktif',
    entities: 28,
    assets: 45,
    totalValue: 'Rp 125 M',
    keyPatterns: ['Crypto Mixing', 'P2P Trading', 'Offshore Wallets'],
    dataSources: ['Blockchain Analysis', 'Exchange Records', 'PPATK'],
  },
  {
    id: 'CASE-008',
    name: 'Gratifikasi Pejabat Publik',
    dateCreated: '2024-01-05',
    status: 'Selesai',
    entities: 11,
    assets: 9,
    totalValue: 'Rp 12 M',
    keyPatterns: ['Gift Exchange', 'Conflict of Interest', 'Undisclosed Assets'],
    dataSources: ['LHKPN', 'Bank Records', 'Surveillance'],
  },
];

const statusColors = {
  Aktif: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  Selesai: 'bg-green-600/20 text-green-400 border-green-500/50',
  Ditangguhkan: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
};

export function CaseListSelection() {
  const navigate = useNavigate();
  const [cases, setCases] = useState(mockCases);
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch =
      caseItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSelectCase = (caseId: string) => {
    setSelectedCases(prev => {
      if (prev.includes(caseId)) {
        return prev.filter(id => id !== caseId);
      } else {
        return [...prev, caseId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedCases.length === filteredCases.length) {
      setSelectedCases([]);
    } else {
      setSelectedCases(filteredCases.map(c => c.id));
    }
  };

  const handleCompare = () => {
    if (selectedCases.length >= 2) {
      navigate('/case-comparison/result', { state: { selectedCaseIds: selectedCases } });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center">
              <GitCompare className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-white">Case Comparison</h1>
              <p className="text-slate-400 mt-1">
                Bandingkan dan analisis kesamaan antar kasus investigasi
              </p>
            </div>
          </div>
        </div>

        <Link to="/case-comparison/history">
          <Button
            variant="outline"
            className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
          >
            <FileText className="w-4 h-4 mr-2" />
            Lihat Riwayat
          </Button>
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Kasus</p>
                <p className="text-2xl font-bold text-white mt-1">{cases.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Kasus Aktif</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {cases.filter(c => c.status === 'Aktif').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Entitas</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {cases.reduce((sum, c) => sum + c.entities, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Dipilih</p>
                <p className="text-2xl font-bold text-white mt-1">{selectedCases.length}</p>
              </div>
              <div className="w-10 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                <GitCompare className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="bg-cyan-600/10 border-cyan-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-cyan-300 text-sm">
                Pilih minimal <span className="font-medium">2 kasus</span> untuk memulai
                perbandingan. Fitur ini membantu mengidentifikasi pola, entitas bersama, dan
                hubungan antar kasus yang berbeda.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary */}
      {selectedCases.length > 0 && (
        <Card className="bg-slate-800 border-cyan-500/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                  <GitCompare className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{selectedCases.length} Kasus Dipilih</p>
                  <p className="text-sm text-slate-400">Siap untuk dibandingkan</p>
                </div>
              </div>
              <Button
                className="bg-cyan-600 hover:bg-cyan-500"
                onClick={handleCompare}
                disabled={selectedCases.length < 2}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari kasus berdasarkan nama atau ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
                <SelectItem value="Ditangguhkan">Ditangguhkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Daftar Kasus ({filteredCases.length})</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              {selectedCases.length === filteredCases.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300 w-12"></TableHead>
                <TableHead className="text-slate-300">Nama Kasus</TableHead>
                <TableHead className="text-slate-300">Tanggal Dibuat</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Jumlah Entitas</TableHead>
                <TableHead className="text-slate-300">Total Nilai Aset</TableHead>
                <TableHead className="text-slate-300">Pola Utama</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map(caseItem => (
                <TableRow
                  key={caseItem.id}
                  className={`border-slate-700 cursor-pointer ${selectedCases.includes(caseItem.id) ? 'bg-cyan-600/10' : 'hover:bg-slate-700/50'}`}
                  onClick={() => handleSelectCase(caseItem.id)}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedCases.includes(caseItem.id)}
                      onCheckedChange={() => handleSelectCase(caseItem.id)}
                      className="border-slate-500"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{caseItem.name}</p>
                      <p className="text-xs text-slate-400">{caseItem.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">
                        {new Date(caseItem.dateCreated).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[caseItem.status]}>{caseItem.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-white">{caseItem.entities}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-white">{caseItem.totalValue}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {caseItem.keyPatterns.slice(0, 2).map((pattern, idx) => (
                        <Badge
                          key={idx}
                          className="bg-purple-600/20 text-purple-400 border-purple-500/50 text-xs"
                        >
                          {pattern}
                        </Badge>
                      ))}
                      {caseItem.keyPatterns.length > 2 && (
                        <Badge className="bg-slate-700 text-slate-400 border-slate-600 text-xs">
                          +{caseItem.keyPatterns.length - 2}
                        </Badge>
                      )}
                    </div>
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
