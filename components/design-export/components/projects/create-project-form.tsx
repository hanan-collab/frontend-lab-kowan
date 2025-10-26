import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  CalendarIcon,
  Users,
  Target,
  Clock,
  AlertTriangle,
  FileText,
  Building2,
  UserCircle,
} from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { toast } from 'sonner';

interface CreateProjectFormProps {
  onClose: () => void;
}

// Mock data untuk berkas perkara dari sistem sebelumnya
const mockCaseFiles = [
  {
    id: 'BP-2024-001',
    title: 'Berkas Perkara Korupsi Pengadaan Alat Kesehatan',
    caseNumber: 'REG-001/PID.SUS/2024/PN.JKT.PST',
    defendant: 'Budi Santoso',
    category: 'Korupsi',
  },
  {
    id: 'BP-2024-002',
    title: 'Berkas Perkara Pencucian Uang Real Estate',
    caseNumber: 'REG-002/PID.SUS/2024/PN.JKT.SEL',
    defendant: 'PT Sentosa Jaya Properti',
    category: 'Pencucian Uang',
  },
  {
    id: 'BP-2024-003',
    title: 'Berkas Perkara Gratifikasi Pejabat Negara',
    caseNumber: 'REG-003/PID.SUS/2024/PN.BDG',
    defendant: 'Hendra Kusuma, S.H.',
    category: 'Gratifikasi',
  },
  {
    id: 'BP-2024-004',
    title: 'Berkas Perkara Penipuan Investasi Bodong',
    caseNumber: 'REG-004/PID.SUS/2024/PN.SBY',
    defendant: 'Robert Chen & 5 lainnya',
    category: 'Penipuan',
  },
  {
    id: 'BP-2023-089',
    title: 'Berkas Perkara Korupsi Dana Hibah Daerah',
    caseNumber: 'REG-089/PID.SUS/2023/PN.MDN',
    defendant: 'Andi Wijaya, M.M.',
    category: 'Korupsi',
  },
  {
    id: 'BP-2024-005',
    title: 'Berkas Perkara Suap Perizinan Tambang',
    caseNumber: 'REG-005/PID.SUS/2024/PN.SMD',
    defendant: 'CV Karya Mandiri Sejahtera',
    category: 'Suap',
  },
  {
    id: 'BP-2024-006',
    title: 'Berkas Perkara Penggelapan Pajak Korporasi',
    caseNumber: 'REG-006/PID.SUS/2024/PN.JKT.UTR',
    defendant: 'PT Global Finance Indonesia',
    category: 'Penggelapan Pajak',
  },
];

export function CreateProjectForm({ onClose }: CreateProjectFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'person', // Always person since we only do individual investigations
    sourceType: 'internal', // 'internal' or 'external'
    relatedCaseId: '', // ID berkas perkara jika internal
    externalRequestor: '', // Nama pemohon eksternal
    externalInstitution: '', // Institusi pemohon eksternal
    targetName: '',
    targetDetails: '',
    priority: '',
    deadline: null as Date | null,
    assignedTo: [] as string[],
    objectives: [] as string[],
    estimatedDuration: '',
    budget: '',
    methodology: '',
    legalBasis: '',
    riskLevel: '',
    confidentialityLevel: '',
  });

  const [newObjective, setNewObjective] = useState('');

  // Mock data for team members
  const teamMembers = [
    'Investigator Senior - Ahmad Pratama',
    'Financial Analyst - Sari Wijaya',
    'Legal Expert - Budi Santoso',
    'Data Analyst - Maya Kusuma',
    'Cyber Investigator - Rizki Hakim',
    'Property Investigator - Dewi Lestari',
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setFormData(prev => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()],
      }));
      setNewObjective('');
    }
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  const toggleTeamMember = (member: string) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(member)
        ? prev.assignedTo.filter(m => m !== member)
        : [...prev.assignedTo, member],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.targetName || !formData.priority) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    // Validation untuk internal source - harus pilih perkara
    if (formData.sourceType === 'internal' && !formData.relatedCaseId) {
      toast.error('Mohon pilih berkas perkara untuk investigasi internal');
      return;
    }

    // Validation untuk external source - harus isi pemohon
    if (formData.sourceType === 'external' && !formData.externalRequestor) {
      toast.error('Mohon isi nama pemohon eksternal');
      return;
    }

    // Create project logic here
    console.log('Creating project:', formData);

    toast.success('Proyek berhasil dibuat');
    onClose();
  };

  // Get selected case file details
  const selectedCase = formData.relatedCaseId
    ? mockCaseFiles.find(c => c.id === formData.relatedCaseId)
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="basic" className="text-xs md:text-sm">
            Info Dasar
          </TabsTrigger>
          <TabsTrigger value="target" className="text-xs md:text-sm">
            Target
          </TabsTrigger>
          <TabsTrigger value="team" className="text-xs md:text-sm">
            Tim
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs md:text-sm">
            Lanjutan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-3 mt-3">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 space-y-3">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Nama Proyek *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama proyek investigasi individu"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Jenis Investigasi</Label>
                  <div className="p-3 bg-slate-700 border border-slate-600 rounded-md">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span className="text-white">Investigasi Individu</span>
                      <Badge className="ml-auto bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Default
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Semua proyek dalam sistem ini fokus pada investigasi individu/target person
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Sumber Permintaan *</Label>
                  <RadioGroup
                    value={formData.sourceType}
                    onValueChange={value => handleInputChange('sourceType', value)}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-3 p-3 bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-700/80 cursor-pointer">
                      <RadioGroupItem value="internal" id="internal" className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor="internal"
                          className="flex items-center gap-2 text-white cursor-pointer"
                        >
                          <Building2 className="h-4 w-4 text-green-400" />
                          Internal BPA
                        </Label>
                        <p className="text-xs text-slate-400 mt-1">
                          Investigasi berdasarkan berkas perkara yang sudah ada di sistem
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-700/80 cursor-pointer">
                      <RadioGroupItem value="external" id="external" className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor="external"
                          className="flex items-center gap-2 text-white cursor-pointer"
                        >
                          <UserCircle className="h-4 w-4 text-blue-400" />
                          Permintaan Eksternal
                        </Label>
                        <p className="text-xs text-slate-400 mt-1">
                          Investigasi atas permintaan pihak eksternal (instansi/lembaga lain)
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.sourceType === 'internal' && (
                  <div className="space-y-2">
                    <Label htmlFor="relatedCase" className="text-white">
                      Pilih Berkas Perkara *
                    </Label>
                    <Select
                      value={formData.relatedCaseId}
                      onValueChange={value => handleInputChange('relatedCaseId', value)}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Pilih berkas perkara yang terkait" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {mockCaseFiles.map(caseFile => (
                          <SelectItem key={caseFile.id} value={caseFile.id}>
                            <div className="flex flex-col py-1">
                              <span className="font-medium">{caseFile.title}</span>
                              <span className="text-xs text-slate-400">
                                {caseFile.caseNumber} • {caseFile.defendant}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedCase && (
                      <div className="p-3 bg-blue-600/10 border border-blue-500/30 rounded-md">
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-blue-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-white font-medium">{selectedCase.title}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {selectedCase.caseNumber} • Terdakwa: {selectedCase.defendant}
                            </p>
                            <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                              {selectedCase.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {formData.sourceType === 'external' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-600/10 border border-blue-500/30 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-blue-400 mt-0.5" />
                        <p className="text-xs text-blue-400">
                          Permintaan dari pihak eksternal. Pastikan sudah ada surat resmi dan
                          dokumen pendukung.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="externalRequestor" className="text-white">
                        Nama Pemohon *
                      </Label>
                      <Input
                        id="externalRequestor"
                        placeholder="Nama lengkap pemohon eksternal"
                        value={formData.externalRequestor}
                        onChange={e => handleInputChange('externalRequestor', e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="externalInstitution" className="text-white">
                        Institusi/Lembaga
                      </Label>
                      <Input
                        id="externalInstitution"
                        placeholder="Nama institusi/lembaga pemohon"
                        value={formData.externalInstitution}
                        onChange={e => handleInputChange('externalInstitution', e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Deskripsi Proyek
                </Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan tujuan dan ruang lingkup investigasi"
                  value={formData.description}
                  onChange={e => handleInputChange('description', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-white">
                    Prioritas *
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={value => handleInputChange('priority', value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Rendah
                        </Badge>
                      </SelectItem>
                      <SelectItem value="medium">
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          Sedang
                        </Badge>
                      </SelectItem>
                      <SelectItem value="high">
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                          Tinggi
                        </Badge>
                      </SelectItem>
                      <SelectItem value="critical">
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          Kritis
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="riskLevel" className="text-white">
                    Tingkat Risiko
                  </Label>
                  <Select
                    value={formData.riskLevel}
                    onValueChange={value => handleInputChange('riskLevel', value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Pilih tingkat risiko" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="target" className="space-y-3 mt-3">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetName" className="text-white">
                    Nama Target *
                  </Label>
                  <Input
                    id="targetName"
                    placeholder="Nama individu yang akan diinvestigasi"
                    value={formData.targetName}
                    onChange={e => handleInputChange('targetName', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confidentialityLevel" className="text-white">
                    Tingkat Kerahasiaan
                  </Label>
                  <Select
                    value={formData.confidentialityLevel}
                    onValueChange={value => handleInputChange('confidentialityLevel', value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Pilih tingkat kerahasiaan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Publik</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="confidential">Rahasia</SelectItem>
                      <SelectItem value="secret">Sangat Rahasia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDetails" className="text-white">
                  Detail Target
                </Label>
                <Textarea
                  id="targetDetails"
                  placeholder="Informasi lengkap tentang individu target investigasi"
                  value={formData.targetDetails}
                  onChange={e => handleInputChange('targetDetails', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
              </div>

              <Separator className="bg-slate-600" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  <Label className="text-white">Objektif Investigasi</Label>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Tambahkan objektif baru"
                    value={newObjective}
                    onChange={e => setNewObjective(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                  />
                  <Button type="button" onClick={addObjective} variant="outline" size="sm">
                    Tambah
                  </Button>
                </div>

                {formData.objectives.length > 0 && (
                  <div className="space-y-2">
                    {formData.objectives.map((objective, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-700 p-2 rounded border border-slate-600"
                      >
                        <span className="text-white text-sm">{objective}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeObjective(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Hapus
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-3 mt-3">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Deadline Proyek</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left bg-slate-700 border-slate-600 text-white"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.deadline
                          ? formData.deadline.toLocaleDateString('id-ID')
                          : 'Pilih tanggal'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.deadline}
                        onSelect={date => handleInputChange('deadline', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDuration" className="text-white">
                    Estimasi Durasi
                  </Label>
                  <Input
                    id="estimatedDuration"
                    placeholder="contoh: 3 bulan"
                    value={formData.estimatedDuration}
                    onChange={e => handleInputChange('estimatedDuration', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <Separator className="bg-slate-600" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <Label className="text-white">Assign Tim Investigasi</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {teamMembers.map(member => (
                    <div
                      key={member}
                      className="flex items-center space-x-2 p-2 rounded border border-slate-600 bg-slate-700"
                    >
                      <Checkbox
                        id={member}
                        checked={formData.assignedTo.includes(member)}
                        onCheckedChange={() => toggleTeamMember(member)}
                      />
                      <Label htmlFor={member} className="text-white text-sm cursor-pointer">
                        {member}
                      </Label>
                    </div>
                  ))}
                </div>

                {formData.assignedTo.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Tim terpilih:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.assignedTo.map(member => (
                        <Badge
                          key={member}
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-400"
                        >
                          {member.split(' - ')[1] || member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-3 mt-3">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-white">
                    Anggaran Estimasi
                  </Label>
                  <Input
                    id="budget"
                    placeholder="contoh: Rp 50.000.000"
                    value={formData.budget}
                    onChange={e => handleInputChange('budget', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalBasis" className="text-white">
                    Dasar Hukum
                  </Label>
                  <Input
                    id="legalBasis"
                    placeholder="contoh: UU No. 8/2010 TPPU"
                    value={formData.legalBasis}
                    onChange={e => handleInputChange('legalBasis', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="methodology" className="text-white">
                  Metodologi Investigasi
                </Label>
                <Textarea
                  id="methodology"
                  placeholder="Jelaskan pendekatan dan metodologi yang akan digunakan"
                  value={formData.methodology}
                  onChange={e => handleInputChange('methodology', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={4}
                />
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-medium">Perhatian</h4>
                    <p className="text-amber-300 text-sm mt-1">
                      Pastikan semua informasi yang dimasukkan akurat dan sesuai dengan prosedur
                      investigasi BPA. Proyek ini akan mempengaruhi alokasi sumber daya dan
                      pelaporan kinerja organisasi.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-0 -mx-6 -mb-4 px-6 py-4 bg-slate-800 border-t border-slate-700 flex justify-end gap-3 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
        >
          Batal
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          <FileText className="h-4 w-4 mr-2" />
          Buat Proyek
        </Button>
      </div>
    </form>
  );
}
