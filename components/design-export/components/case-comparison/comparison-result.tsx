import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../../ui/sheet';
import {
  ArrowLeft,
  Download,
  Save,
  GitCompare,
  Users,
  DollarSign,
  Database,
  TrendingUp,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CaseData {
  id: string;
  name: string;
  entities: number;
  assets: number;
  totalValue: string;
  keyPatterns: string[];
  dataSources: string[];
  commonEntities: string[];
}

const mockCasesData: Record<string, CaseData> = {
  'CASE-001': {
    id: 'CASE-001',
    name: 'Kasus Korupsi Proyek Infrastruktur',
    entities: 24,
    assets: 18,
    totalValue: 'Rp 45 M',
    keyPatterns: ['Proyek Fiktif', 'Mark-up Anggaran', 'Konspirasi'],
    dataSources: ['LHKPN', 'Bank Records', 'PPATK'],
    commonEntities: ['PT Sentosa Jaya', 'Budi Santoso', 'CV Mandiri Sejahtera'],
  },
  'CASE-002': {
    id: 'CASE-002',
    name: 'Pencucian Uang Melalui Properti',
    entities: 18,
    assets: 32,
    totalValue: 'Rp 89 M',
    keyPatterns: ['Layering', 'Shell Companies', 'Property Transfer'],
    dataSources: ['BPN', 'Bank Records', 'Notaris'],
    commonEntities: ['PT Sentosa Jaya', 'Andi Wijaya', 'CV Mega Property'],
  },
  'CASE-003': {
    id: 'CASE-003',
    name: 'Fraud Perbankan Korporat',
    entities: 15,
    assets: 12,
    totalValue: 'Rp 23 M',
    keyPatterns: ['Invoice Fiktif', 'Penggelapan Dana', 'Kolusi Internal'],
    dataSources: ['Bank Internal', 'Email Forensics', 'Accounting Records'],
    commonEntities: ['Budi Santoso', 'PT Global Finance', 'Sari Indah'],
  },
  'CASE-004': {
    id: 'CASE-004',
    name: 'Suap Tender Pengadaan Barang',
    entities: 22,
    assets: 15,
    totalValue: 'Rp 34 M',
    keyPatterns: ['Kickback', 'Bid Rigging', 'Gratifikasi'],
    dataSources: ['LKPP', 'Bank Records', 'Whistleblower'],
    commonEntities: ['CV Mandiri Sejahtera', 'Hendra Kusuma', 'PT Karya Abadi'],
  },
  'CASE-005': {
    id: 'CASE-005',
    name: 'Manipulasi Laporan Keuangan',
    entities: 12,
    assets: 8,
    totalValue: 'Rp 16 M',
    keyPatterns: ['Accounting Fraud', 'False Statement', 'Revenue Recognition'],
    dataSources: ['Financial Statements', 'Audit Reports', 'Email'],
    commonEntities: ['PT Global Finance', 'Diana Permata', 'Ahmad Yusuf'],
  },
  'CASE-006': {
    id: 'CASE-006',
    name: 'Kasus Korupsi Dana Hibah',
    entities: 19,
    assets: 14,
    totalValue: 'Rp 28 M',
    keyPatterns: ['Misappropriation', 'Fictitious Beneficiary', 'Document Forgery'],
    dataSources: ['Government Records', 'Bank Statements', 'Field Investigation'],
    commonEntities: ['Yayasan Peduli Rakyat', 'Andi Wijaya', 'CV Karya Mandiri'],
  },
  'CASE-007': {
    id: 'CASE-007',
    name: 'Pencucian Uang Cryptocurrency',
    entities: 28,
    assets: 45,
    totalValue: 'Rp 125 M',
    keyPatterns: ['Crypto Mixing', 'P2P Trading', 'Offshore Wallets'],
    dataSources: ['Blockchain Analysis', 'Exchange Records', 'PPATK'],
    commonEntities: ['PT Sentosa Jaya', 'Robert Chen', 'Crypto Exchange Asia'],
  },
  'CASE-008': {
    id: 'CASE-008',
    name: 'Gratifikasi Pejabat Publik',
    entities: 11,
    assets: 9,
    totalValue: 'Rp 12 M',
    keyPatterns: ['Gift Exchange', 'Conflict of Interest', 'Undisclosed Assets'],
    dataSources: ['LHKPN', 'Bank Records', 'Surveillance'],
    commonEntities: ['Hendra Kusuma', 'PT Karya Abadi', 'Toko Emas Murni'],
  },
};

interface EntityDetail {
  name: string;
  occurrences: number;
  cases: string[];
}

export function ComparisonResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCaseIds = location.state?.selectedCaseIds || [];
  const fromHistory = location.state?.fromHistory || false;

  const [selectedEntity, setSelectedEntity] = useState<EntityDetail | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const selectedCasesData = selectedCaseIds.map(id => mockCasesData[id]).filter(Boolean);

  // Save to history on mount (only if not coming from history)
  React.useEffect(() => {
    if (selectedCaseIds.length >= 2 && !fromHistory) {
      saveToHistory();
    }
  }, [selectedCaseIds, fromHistory]);

  const saveToHistory = () => {
    const historyItem = {
      id: `CMP-${Date.now()}`,
      name: `Komparasi ${selectedCaseIds.length} Kasus`,
      timestamp: new Date().toISOString(),
      caseIds: selectedCaseIds,
      caseCount: selectedCaseIds.length,
      commonEntitiesCount: calculateCommonEntities().length,
    };

    // Get existing history
    const savedHistory = localStorage.getItem('comparisonHistory');
    let history = [];
    if (savedHistory) {
      try {
        history = JSON.parse(savedHistory);
      } catch (error) {
        console.error('Error parsing history:', error);
      }
    }

    // Add new item to beginning of array
    history.unshift(historyItem);

    // Keep only last 50 comparisons
    history = history.slice(0, 50);

    // Save to localStorage
    localStorage.setItem('comparisonHistory', JSON.stringify(history));
  };

  const calculateCommonEntities = () => {
    const allEntities = selectedCasesData.flatMap(c => c.commonEntities);
    const entityOccurrences = allEntities.reduce((acc: Record<string, number>, entity) => {
      acc[entity] = (acc[entity] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(entityOccurrences)
      .filter(([_, count]) => count > 1)
      .map(([entity, count]) => ({
        name: entity,
        occurrences: count,
        cases: selectedCasesData.filter(c => c.commonEntities.includes(entity)).map(c => c.id),
      }))
      .sort((a, b) => b.occurrences - a.occurrences);
  };

  // Calculate common entities
  const commonEntities = calculateCommonEntities();

  // Prepare chart data
  const chartData = selectedCasesData.map(caseData => ({
    name: caseData.id,
    Entitas: caseData.entities,
    Aset: caseData.assets,
  }));

  // Find common patterns
  const allPatterns = selectedCasesData.flatMap(c => c.keyPatterns);
  const patternOccurrences = allPatterns.reduce((acc: Record<string, number>, pattern) => {
    acc[pattern] = (acc[pattern] || 0) + 1;
    return acc;
  }, {});

  const commonPatterns = Object.entries(patternOccurrences)
    .filter(([_, count]) => count > 1)
    .map(([pattern, count]) => ({ pattern, count: count as number }))
    .sort((a, b) => b.count - a.count);

  // Find common data sources
  const allSources = selectedCasesData.flatMap(c => c.dataSources);
  const sourceOccurrences = allSources.reduce((acc: Record<string, number>, source) => {
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  const commonSources = Object.entries(sourceOccurrences)
    .filter(([_, count]) => count > 1)
    .map(([source, count]) => ({ source, count: count as number }))
    .sort((a, b) => b.count - a.count);

  const handleEntityClick = (entity: EntityDetail) => {
    setSelectedEntity(entity);
    setIsDetailOpen(true);
  };

  const handleExport = () => {
    alert('Export functionality - akan menghasilkan PDF/CSV dengan hasil perbandingan');
  };

  const handleSaveReport = () => {
    alert('Save as Report - akan menyimpan hasil perbandingan ke pusat laporan');
  };

  if (selectedCaseIds.length < 2) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-slate-800 border-slate-700 max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white mb-2">Pilih Minimal 2 Kasus</h3>
            <p className="text-slate-400 mb-6">
              Anda perlu memilih setidaknya 2 kasus untuk melakukan perbandingan.
            </p>
            <Button
              onClick={() => navigate('/case-comparison')}
              className="bg-cyan-600 hover:bg-cyan-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Daftar Kasus
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/case-comparison')}
            className="text-slate-400 hover:text-white mb-2 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Kasus
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center">
              <GitCompare className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-white">Hasil Perbandingan Kasus</h1>
              <p className="text-slate-400 mt-1">
                Analisis {selectedCaseIds.length} kasus yang dipilih
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExport}
            className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Comparison
          </Button>
          <Button onClick={handleSaveReport} className="bg-green-600 hover:bg-green-500">
            <Save className="w-4 h-4 mr-2" />
            Save as Report
          </Button>
        </div>
      </div>

      {/* Summary Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-cyan-500/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-cyan-400" />
              <Badge className="bg-cyan-600/30 text-cyan-300 border-cyan-500/50">
                {commonEntities.length} Entitas
              </Badge>
            </div>
            <h3 className="text-white font-medium mb-1">Entitas Bersama</h3>
            <p className="text-sm text-slate-300">Ditemukan di beberapa kasus</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <Badge className="bg-purple-600/30 text-purple-300 border-purple-500/50">
                {commonPatterns.length} Pola
              </Badge>
            </div>
            <h3 className="text-white font-medium mb-1">Pola Dominan</h3>
            <p className="text-sm text-slate-300">Modus operandi serupa</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-8 h-8 text-green-400" />
              <Badge className="bg-green-600/30 text-green-300 border-green-500/50">
                {commonSources.length} Sumber
              </Badge>
            </div>
            <h3 className="text-white font-medium mb-1">Sumber Data Bersama</h3>
            <p className="text-sm text-slate-300">Database yang saling terkait</p>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Tabel Perbandingan Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Nama Kasus</TableHead>
                <TableHead className="text-slate-300">Jumlah Entitas</TableHead>
                <TableHead className="text-slate-300">Aset Terdeteksi</TableHead>
                <TableHead className="text-slate-300">Total Nilai</TableHead>
                <TableHead className="text-slate-300">Sumber Data Utama</TableHead>
                <TableHead className="text-slate-300">Pola Dominan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedCasesData.map(caseData => (
                <TableRow key={caseData.id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{caseData.name}</p>
                      <p className="text-xs text-slate-400">{caseData.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-white">{caseData.entities}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-white">{caseData.assets}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-white font-medium">{caseData.totalValue}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {caseData.dataSources.slice(0, 2).map((source, idx) => (
                        <Badge
                          key={idx}
                          className="bg-green-600/20 text-green-400 border-green-500/50 text-xs"
                        >
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {caseData.keyPatterns.slice(0, 2).map((pattern, idx) => (
                        <Badge
                          key={idx}
                          className="bg-purple-600/20 text-purple-400 border-purple-500/50 text-xs"
                        >
                          {pattern}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Perbandingan Visual</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Bar dataKey="Entitas" fill="#3b82f6" />
              <Bar dataKey="Aset" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Common Entities */}
      {commonEntities.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              Entitas yang Muncul di Beberapa Kasus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonEntities.map((entity, idx) => (
                <Card
                  key={idx}
                  className="bg-slate-700/50 border-slate-600 hover:border-cyan-500/50 cursor-pointer transition-colors"
                  onClick={() => handleEntityClick(entity)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{entity.name}</h4>
                      <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-500/50">
                        {entity.occurrences} kasus
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entity.cases.map((caseId, idx) => (
                        <Badge
                          key={idx}
                          className="bg-slate-600 text-slate-300 border-slate-500 text-xs"
                        >
                          {caseId}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Common Patterns & Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Patterns */}
        {commonPatterns.length > 0 && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Pola/Pattern yang Berkaitan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {commonPatterns.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                  >
                    <span className="text-white">{item.pattern}</span>
                    <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/50">
                      {item.count} kasus
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Common Data Sources */}
        {commonSources.length > 0 && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-green-400" />
                Sumber Data Bersama
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {commonSources.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                  >
                    <span className="text-white">{item.source}</span>
                    <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                      {item.count} kasus
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Entity Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="bg-slate-800 border-slate-700 text-white w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-white">Detail Entitas</SheetTitle>
            <SheetDescription className="text-slate-400">
              Informasi lengkap tentang entitas yang terlibat di beberapa kasus
            </SheetDescription>
          </SheetHeader>

          {selectedEntity && (
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-white font-medium mb-2">{selectedEntity.name}</h3>
                <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-500/50">
                  Muncul di {selectedEntity.occurrences} kasus
                </Badge>
              </div>

              <div>
                <h4 className="text-slate-300 text-sm font-medium mb-3">Kasus Terkait</h4>
                <div className="space-y-2">
                  {selectedEntity.cases.map((caseId, idx) => {
                    const caseData = mockCasesData[caseId];
                    return (
                      <div key={idx} className="p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-white font-medium text-sm">{caseData.name}</p>
                        <p className="text-xs text-slate-400 mt-1">{caseId}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-slate-300 text-sm font-medium mb-3">Data Pendukung</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors text-left">
                    <span className="text-white text-sm">Lihat Profile Lengkap</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors text-left">
                    <span className="text-white text-sm">Sumber OSINT Terkait</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors text-left">
                    <span className="text-white text-sm">Network Visualization</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
