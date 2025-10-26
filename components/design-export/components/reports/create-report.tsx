import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  CalendarIcon,
  FileText,
  Download,
  Share2,
  Save,
  Plus,
  X,
  User,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const mockInvestigators = [
  { id: '1', name: 'Ahmad Wijaya', role: 'Senior Investigator' },
  { id: '2', name: 'Sari Indrawati', role: 'Analis Keuangan' },
  { id: '3', name: 'Budi Hartono', role: 'Akuntan Forensik' },
  { id: '4', name: 'Diana Kusuma', role: 'Analis Intelijen' },
];

const mockEntities = [
  { id: '1', name: 'Eko Prasetyo', category: 'Tersangka' },
  { id: '2', name: 'PT. Mega Investasi', category: 'Organisasi' },
  { id: '3', name: 'Apartemen Mewah Kemang', category: 'Aset' },
  { id: '4', name: 'Indra Gunawan', category: 'Korban' },
  { id: '5', name: 'Rekening Bank #BCA789', category: 'Aset' },
];

const mockRelationships = [
  { id: 'r1', source: 'Eko Prasetyo', target: 'PT. Mega Investasi', type: 'Pemilik' },
  { id: 'r2', source: 'PT. Mega Investasi', target: 'Apartemen Mewah Kemang', type: 'Kepemilikan' },
  { id: 'r3', source: 'Eko Prasetyo', target: 'Indra Gunawan', type: 'Keluarga' },
];

export function CreateReport() {
  const [reportData, setReportData] = useState({
    title: '',
    investigator: '',
    caseReference: '',
    dateRange: {
      from: null,
      to: null,
    },
    summary: '',
    selectedEntities: [],
    selectedRelationships: [],
    attachments: [],
  });

  const [showEntitySelector, setShowEntitySelector] = useState(false);
  const [showRelationshipSelector, setShowRelationshipSelector] = useState(false);

  const handleEntityAdd = entity => {
    if (!reportData.selectedEntities.find(e => e.id === entity.id)) {
      setReportData(prev => ({
        ...prev,
        selectedEntities: [...prev.selectedEntities, entity],
      }));
    }
    setShowEntitySelector(false);
  };

  const handleEntityRemove = entityId => {
    setReportData(prev => ({
      ...prev,
      selectedEntities: prev.selectedEntities.filter(e => e.id !== entityId),
    }));
  };

  const handleRelationshipAdd = relationship => {
    if (!reportData.selectedRelationships.find(r => r.id === relationship.id)) {
      setReportData(prev => ({
        ...prev,
        selectedRelationships: [...prev.selectedRelationships, relationship],
      }));
    }
    setShowRelationshipSelector(false);
  };

  const handleRelationshipRemove = relationshipId => {
    setReportData(prev => ({
      ...prev,
      selectedRelationships: prev.selectedRelationships.filter(r => r.id !== relationshipId),
    }));
  };

  const handleSaveReport = () => {
    // Simulate saving report
    toast.success('Laporan berhasil disimpan');
  };

  const handleExportPDF = () => {
    // Simulate PDF export
    toast.success('Laporan berhasil diekspor ke PDF');
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    toast.success('Data laporan berhasil diekspor ke Excel');
  };

  const handleGraphSnapshot = () => {
    // Simulate graph snapshot
    toast.success('Snapshot grafik berhasil diambil');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Buat Laporan Investigasi</h1>
          <p className="text-slate-400 mt-1">Buat analisis kasus dan temuan yang komprehensif</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSaveReport}
            className="border-slate-600 text-slate-300"
          >
            <Save className="w-4 h-4 mr-2" />
            Simpan Draft
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500">
            <FileText className="w-4 h-4 mr-2" />
            Buat Laporan
          </Button>
        </div>
      </div>

      {/* Report Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Informasi Laporan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Judul Laporan</Label>
                <Input
                  value={reportData.title}
                  onChange={e => setReportData(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Masukkan judul laporan"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Investigator</Label>
                  <Select
                    value={reportData.investigator}
                    onValueChange={value =>
                      setReportData(prev => ({ ...prev, investigator: value }))
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Pilih investigator" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {mockInvestigators.map(investigator => (
                        <SelectItem key={investigator.id} value={investigator.id}>
                          {investigator.name} - {investigator.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Nomor Referensi Kasus</Label>
                  <Input
                    value={reportData.caseReference}
                    onChange={e =>
                      setReportData(prev => ({ ...prev, caseReference: e.target.value }))
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="KASUS-2024-001"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Periode Investigasi</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 justify-start border-slate-600 text-slate-300"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reportData.dateRange.from
                          ? format(reportData.dateRange.from, 'PPP')
                          : 'Tanggal mulai'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                      <Calendar
                        mode="single"
                        selected={reportData.dateRange.from}
                        onSelect={date =>
                          setReportData(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, from: date },
                          }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 justify-start border-slate-600 text-slate-300"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reportData.dateRange.to
                          ? format(reportData.dateRange.to, 'PPP')
                          : 'Tanggal selesai'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                      <Calendar
                        mode="single"
                        selected={reportData.dateRange.to}
                        onSelect={date =>
                          setReportData(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, to: date },
                          }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Ringkasan Eksekutif</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={reportData.summary}
                onChange={e => setReportData(prev => ({ ...prev, summary: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white min-h-32"
                placeholder="Berikan ringkasan komprehensif dari temuan investigasi, bukti utama, dan kesimpulan..."
              />
            </CardContent>
          </Card>

          {/* Key Entities */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Entitas Kunci</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEntitySelector(true)}
                className="border-slate-600 text-slate-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Entitas
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {reportData.selectedEntities.map(entity => (
                  <div
                    key={entity.id}
                    className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        {entity.category === 'Organisasi' ? (
                          <Building2 className="w-4 h-4 text-blue-400" />
                        ) : (
                          <User className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{entity.name}</p>
                        <p className="text-xs text-slate-400">{entity.category}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEntityRemove(entity.id)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {reportData.selectedEntities.length === 0 && (
                  <p className="text-slate-400 text-center py-4">Tidak ada entitas yang dipilih</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Key Relationships */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Hubungan Kunci</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRelationshipSelector(true)}
                className="border-slate-600 text-slate-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Hubungan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {reportData.selectedRelationships.map(relationship => (
                  <div
                    key={relationship.id}
                    className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-white text-sm">{relationship.source}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                      <span className="text-white text-sm">{relationship.target}</span>
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 ml-2">
                        {relationship.type}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRelationshipRemove(relationship.id)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {reportData.selectedRelationships.length === 0 && (
                  <p className="text-slate-400 text-center py-4">Tidak ada hubungan yang dipilih</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <div className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Opsi Ekspor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={handleExportPDF}
              >
                <Download className="w-4 h-4 mr-2" />
                Ekspor ke PDF
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={handleExportExcel}
              >
                <Download className="w-4 h-4 mr-2" />
                Ekspor ke Excel
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={handleGraphSnapshot}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Snapshot Grafik
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Statistik Laporan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Entitas:</span>
                <span className="text-white">{reportData.selectedEntities.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hubungan:</span>
                <span className="text-white">{reportData.selectedRelationships.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lampiran:</span>
                <span className="text-white">{reportData.attachments.length}</span>
              </div>
              <Separator className="bg-slate-700" />
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-400">
                  Draft
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Entity Selection Modal */}
      {showEntitySelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Pilih Entitas</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEntitySelector(false)}
                className="text-slate-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 max-h-80 overflow-y-auto">
              {mockEntities.map(entity => (
                <div
                  key={entity.id}
                  className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 cursor-pointer"
                  onClick={() => handleEntityAdd(entity)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      {entity.category === 'Organisasi' ? (
                        <Building2 className="w-4 h-4 text-blue-400" />
                      ) : (
                        <User className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{entity.name}</p>
                      <p className="text-xs text-slate-400">{entity.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Relationship Selection Modal */}
      {showRelationshipSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Pilih Hubungan</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRelationshipSelector(false)}
                className="text-slate-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 max-h-80 overflow-y-auto">
              {mockRelationships.map(relationship => (
                <div
                  key={relationship.id}
                  className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 cursor-pointer"
                  onClick={() => handleRelationshipAdd(relationship)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">{relationship.source}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="text-white text-sm">{relationship.target}</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 mt-1">
                    {relationship.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
