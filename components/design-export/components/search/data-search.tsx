import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Label } from '../../../ui/label';
import {
  Search,
  User,
  CreditCard,
  Building2,
  Car,
  Upload,
  FileImage,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data untuk hasil pencarian
const mockSearchResults = {
  nama: [
    {
      id: '1',
      type: 'person',
      name: 'Budi Santoso',
      nik: '3201234567890123',
      status: 'verified',
      riskLevel: 'high',
      lastSeen: '2024-01-15',
      location: 'Jakarta Pusat',
      occupation: 'Direktur PT Maju Sejahtera',
      photo: null,
      details: {
        fullName: 'Budi Santoso',
        birthDate: '1978-05-12',
        birthPlace: 'Jakarta',
        address: 'Jl. Sudirman No.88, Jakarta Pusat',
        phone: '+62-811-2345-6789',
        email: 'budi.santoso@majusejahtera.co.id',
        maritalStatus: 'Menikah',
        spouse: 'Siti Santoso',
        education: 'S2 Ekonomi Universitas Indonesia',
        assets: ['Villa Puncak Resort (Rp 35M)', 'Apartemen SCBD (Rp 15M)', '3 Kendaraan Mewah'],
        investigations: ['Kasus Korupsi Pengadaan 2024', 'Pencucian Uang 2023'],
        associates: ['Siti Santoso (Istri)', 'PT Maju Sejahtera', 'Rahman Group'],
      },
    },
    {
      id: '2',
      type: 'person',
      name: 'Budi Setiawan',
      nik: '3301234567890124',
      status: 'under_investigation',
      riskLevel: 'medium',
      lastSeen: '2024-01-20',
      location: 'Bandung',
      occupation: 'Pengusaha',
      photo: null,
      details: {
        fullName: 'Budi Setiawan',
        birthDate: '1985-03-22',
        birthPlace: 'Bandung',
        address: 'Jl. Dago No.45, Bandung',
        phone: '+62-812-9876-5432',
        email: 'budi.setiawan@gmail.com',
        maritalStatus: 'Lajang',
        education: 'S1 Teknik ITB',
        assets: ['Rumah Dago (Rp 2M)', 'Toyota Camry 2022'],
        investigations: ['Investigasi Perpajakan 2024'],
        associates: ['CV Setiawan Jaya', 'Keluarga Setiawan'],
      },
    },
  ],
  nik: [
    {
      id: '1',
      type: 'person',
      name: 'Budi Santoso',
      nik: '3201234567890123',
      status: 'verified',
      riskLevel: 'high',
      lastSeen: '2024-01-15',
      location: 'Jakarta Pusat',
      occupation: 'Direktur PT Maju Sejahtera',
      photo: null,
      details: {
        fullName: 'Budi Santoso',
        birthDate: '1978-05-12',
        birthPlace: 'Jakarta',
        address: 'Jl. Sudirman No.88, Jakarta Pusat',
        phone: '+62-811-2345-6789',
        email: 'budi.santoso@majusejahtera.co.id',
        maritalStatus: 'Menikah',
        spouse: 'Siti Santoso',
        education: 'S2 Ekonomi Universitas Indonesia',
        assets: ['Villa Puncak Resort (Rp 35M)', 'Apartemen SCBD (Rp 15M)', '3 Kendaraan Mewah'],
        investigations: ['Kasus Korupsi Pengadaan 2024', 'Pencucian Uang 2023'],
        associates: ['Siti Santoso (Istri)', 'PT Maju Sejahtera', 'Rahman Group'],
      },
    },
  ],
  aset: [
    {
      id: '1',
      type: 'property',
      name: 'Villa Puncak Resort',
      identifier: 'Sertifikat No. 12345/2020',
      status: 'active',
      riskLevel: 'high',
      value: 'Rp 35 Miliar',
      location: 'Puncak, Bogor',
      owner: 'Budi Santoso',
      details: {
        propertyType: 'Villa Resort',
        landArea: '2.5 Hektar',
        buildingArea: '1.200 m²',
        certificateNumber: '12345/2020',
        address: 'Jl. Raya Puncak KM 85, Bogor',
        taxValue: 'Rp 25 Miliar',
        facilities: ['Kolam Renang', 'Tennis Court', 'Helipad', 'Private Garden'],
        legalStatus: 'Sertifikat Hak Milik',
        ownershipHistory: ['2020: Budi Santoso', '2018-2020: PT Paradise Holdings'],
        relatedInvestigations: ['Kasus Korupsi Pengadaan 2024'],
      },
    },
    {
      id: '2',
      type: 'vehicle',
      name: 'Mercedes-Benz S-Class',
      identifier: 'B 1234 ABC',
      status: 'active',
      riskLevel: 'medium',
      value: 'Rp 2.5 Miliar',
      location: 'Jakarta',
      owner: 'Budi Santoso',
      details: {
        vehicleType: 'Sedan Mewah',
        brand: 'Mercedes-Benz',
        model: 'S-Class S500',
        year: '2023',
        plateNumber: 'B 1234 ABC',
        engineNumber: 'MB123456789',
        chasisNumber: 'WDB123456789',
        color: 'Hitam Metalik',
        registrationDate: '2023-03-15',
        ownershipHistory: ['2023: Budi Santoso'],
        relatedInvestigations: ['Investigasi Aset Tidak Wajar 2024'],
      },
    },
    {
      id: '3',
      type: 'property',
      name: 'Apartemen The Residences SCBD',
      identifier: 'Sertifikat No. 67890/2021',
      status: 'active',
      riskLevel: 'medium',
      value: 'Rp 15 Miliar',
      location: 'Jakarta Selatan',
      owner: 'Siti Santoso',
      details: {
        propertyType: 'Apartemen Penthouse',
        floor: '45-46 (Duplex)',
        area: '350 m²',
        certificateNumber: '67890/2021',
        address: 'SCBD Lot 11A, Jakarta Selatan',
        taxValue: 'Rp 12 Miliar',
        facilities: ['Private Elevator', 'Sky Garden', 'City View', 'Private Parking'],
        legalStatus: 'Sertifikat Hak Milik Satuan Rumah Susun',
        ownershipHistory: ['2021: Siti Santoso', '2019-2021: Nominee Company'],
        relatedInvestigations: ['Kasus Korupsi Pengadaan 2024'],
      },
    },
  ],
};

export function DataSearch() {
  const [activeTab, setActiveTab] = useState('nama');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSearch = () => {
    if (!searchTerm.trim() && !uploadedImage) {
      toast.error('Masukkan kata kunci pencarian atau upload gambar');
      return;
    }

    // Validation based on active tab
    if (activeTab === 'nama' && searchTerm.trim() && searchTerm.trim().length < 3) {
      toast.error('Masukkan minimal 3 karakter untuk pencarian nama');
      return;
    }

    if (activeTab === 'nik' && searchTerm.trim() && searchTerm.length !== 16) {
      toast.error('NIK harus tepat 16 digit angka');
      return;
    }

    if (activeTab === 'aset' && searchTerm.trim() && searchTerm.trim().length < 4) {
      toast.error('Masukkan minimal 4 karakter untuk pencarian aset yang akurat');
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      if (uploadedImage) {
        // For image search, return some sample results
        setSearchResults(mockSearchResults.nama);
        toast.success('Pencarian berdasarkan gambar berhasil');
      } else {
        const results = mockSearchResults[activeTab] || [];
        const filteredResults = results.filter(
          item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nik?.includes(searchTerm) ||
            item.identifier?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);

        if (filteredResults.length > 0) {
          toast.success(`Ditemukan ${filteredResults.length} hasil pencarian`);
        } else {
          toast.info('Tidak ditemukan hasil yang sesuai');
        }
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleCardClick = item => {
    setSelectedDetail(item);
    setIsDetailOpen(true);
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      // File size validation (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file terlalu besar. Maksimal 5 MB');
        event.target.value = '';
        return;
      }

      // File type validation
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF');
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        setUploadedImage(e.target.result);
        toast.success(`Gambar berhasil diupload (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusBadge = status => {
    const statusConfig = {
      verified: { color: 'bg-green-500/20 text-green-400', label: 'Terverifikasi' },
      under_investigation: {
        color: 'bg-yellow-500/20 text-yellow-400',
        label: 'Dalam Investigasi',
      },
      active: { color: 'bg-blue-500/20 text-blue-400', label: 'Aktif' },
      inactive: { color: 'bg-gray-500/20 text-gray-400', label: 'Tidak Aktif' },
    };

    const config = statusConfig[status] || statusConfig.active;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getRiskBadge = riskLevel => {
    const riskConfig = {
      critical: { color: 'bg-red-500/20 text-red-400', label: 'Kritis' },
      high: { color: 'bg-orange-500/20 text-orange-400', label: 'Tinggi' },
      medium: { color: 'bg-yellow-500/20 text-yellow-400', label: 'Sedang' },
      low: { color: 'bg-green-500/20 text-green-400', label: 'Rendah' },
    };

    const config = riskConfig[riskLevel] || riskConfig.low;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const renderResultCard = item => {
    const isPersonType = item.type === 'person';
    const isPropertyType = item.type === 'property';
    const isVehicleType = item.type === 'vehicle';

    return (
      <Card
        key={item.id}
        className="bg-slate-800 border-slate-600 hover:border-slate-500 cursor-pointer transition-colors"
        onClick={() => handleCardClick(item)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
              {isPersonType && <User className="w-6 h-6 text-blue-400" />}
              {isPropertyType && <Building2 className="w-6 h-6 text-green-400" />}
              {isVehicleType && <Car className="w-6 h-6 text-purple-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white">{item.name}</h3>
                <div className="flex gap-2">
                  {getStatusBadge(item.status)}
                  {getRiskBadge(item.riskLevel)}
                </div>
              </div>

              <div className="space-y-1 text-sm text-slate-400">
                {isPersonType && (
                  <>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>NIK: {item.nik}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{item.occupation}</span>
                    </div>
                  </>
                )}

                {(isPropertyType || isVehicleType) && (
                  <>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>{item.identifier}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Nilai: {item.value}</span>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Pemilik: {item.owner || item.name}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderDetailModal = () => {
    if (!selectedDetail) return null;

    const isPersonType = selectedDetail.type === 'person';
    const isPropertyType = selectedDetail.type === 'property';
    const isVehicleType = selectedDetail.type === 'vehicle';

    return (
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto overflow-x-hidden bg-slate-800 border-slate-600 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                {isPersonType && <User className="w-6 h-6 text-blue-400" />}
                {isPropertyType && <Building2 className="w-6 h-6 text-green-400" />}
                {isVehicleType && <Car className="w-6 h-6 text-purple-400" />}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{selectedDetail.name}</h2>
                <div className="flex gap-2 mt-1">
                  {getStatusBadge(selectedDetail.status)}
                  {getRiskBadge(selectedDetail.riskLevel)}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Basic Information */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-cyan-400">Informasi Dasar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isPersonType && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nama Lengkap:</span>
                      <span className="text-white">{selectedDetail.details.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">NIK:</span>
                      <span className="text-white">{selectedDetail.nik}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tempat, Tanggal Lahir:</span>
                      <span className="text-white">
                        {selectedDetail.details.birthPlace}, {selectedDetail.details.birthDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status Pernikahan:</span>
                      <span className="text-white">{selectedDetail.details.maritalStatus}</span>
                    </div>
                    {selectedDetail.details.spouse && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pasangan:</span>
                        <span className="text-white">{selectedDetail.details.spouse}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pendidikan:</span>
                      <span className="text-white">{selectedDetail.details.education}</span>
                    </div>
                  </>
                )}

                {isPropertyType && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Jenis Properti:</span>
                      <span className="text-white">{selectedDetail.details.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">No. Sertifikat:</span>
                      <span className="text-white">{selectedDetail.details.certificateNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pemilik:</span>
                      <span className="text-white">{selectedDetail.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Luas Tanah:</span>
                      <span className="text-white">
                        {selectedDetail.details.landArea || selectedDetail.details.area}
                      </span>
                    </div>
                    {selectedDetail.details.buildingArea && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Luas Bangunan:</span>
                        <span className="text-white">{selectedDetail.details.buildingArea}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nilai Pajak:</span>
                      <span className="text-white">{selectedDetail.details.taxValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status Legal:</span>
                      <span className="text-white">{selectedDetail.details.legalStatus}</span>
                    </div>
                  </>
                )}

                {isVehicleType && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Jenis Kendaraan:</span>
                      <span className="text-white">{selectedDetail.details.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Merek/Model:</span>
                      <span className="text-white">
                        {selectedDetail.details.brand} {selectedDetail.details.model}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tahun:</span>
                      <span className="text-white">{selectedDetail.details.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nomor Polisi:</span>
                      <span className="text-white">{selectedDetail.details.plateNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">No. Mesin:</span>
                      <span className="text-white">{selectedDetail.details.engineNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">No. Rangka:</span>
                      <span className="text-white">{selectedDetail.details.chasisNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Warna:</span>
                      <span className="text-white">{selectedDetail.details.color}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Contact & Location */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-cyan-400">Kontak & Lokasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-slate-400 text-sm">Alamat:</div>
                    <div className="text-white break-words">{selectedDetail.details.address}</div>
                  </div>
                </div>

                {selectedDetail.details.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-slate-400 text-sm">Telepon:</div>
                      <div className="text-white break-words">{selectedDetail.details.phone}</div>
                    </div>
                  </div>
                )}

                {selectedDetail.details.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-slate-400 text-sm">Email:</div>
                      <div className="text-white break-words">{selectedDetail.details.email}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-slate-400 text-sm">Terakhir Dilihat:</div>
                    <div className="text-white">{selectedDetail.lastSeen}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assets/Ownership History - Only for Person and Vehicle types */}
            {(isPersonType || isVehicleType) && (
              <Card className="bg-slate-700 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-cyan-400">
                    {isPersonType ? 'Aset' : 'Riwayat Kepemilikan'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {isPersonType &&
                      selectedDetail.details.assets?.map((asset, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Building2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white break-words">{asset}</span>
                        </div>
                      ))}

                    {isVehicleType &&
                      selectedDetail.details.ownershipHistory?.map((history, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white break-words">{history}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Investigations */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-cyan-400">Investigasi Terkait</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(
                    selectedDetail.details.investigations ||
                    selectedDetail.details.relatedInvestigations
                  )?.map((investigation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white break-words">{investigation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="h-full bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white mb-2">Pencarian Data</h1>
          <p className="text-slate-400">
            Cari dan verifikasi data berdasarkan nama, NIK, gambar, atau aset
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={value => {
            setActiveTab(value);
            setSearchTerm(''); // Reset search term when switching tabs
            setSearchResults([]); // Reset results
          }}
          className="space-y-6"
        >
          <TabsList className="bg-slate-800 border-slate-600">
            <TabsTrigger value="nama" className="data-[state=active]:bg-slate-700">
              <User className="w-4 h-4 mr-2" />
              Pencarian Nama
            </TabsTrigger>
            <TabsTrigger value="nik" className="data-[state=active]:bg-slate-700">
              <CreditCard className="w-4 h-4 mr-2" />
              Pencarian NIK
            </TabsTrigger>
            <TabsTrigger value="image" className="data-[state=active]:bg-slate-700">
              <FileImage className="w-4 h-4 mr-2" />
              Pencarian Gambar
            </TabsTrigger>
            <TabsTrigger value="aset" className="data-[state=active]:bg-slate-700">
              <Building2 className="w-4 h-4 mr-2" />
              Pencarian Aset
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nama" className="space-y-6">
            {/* Warning Card for Name Search */}
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-yellow-400 font-medium mb-1">⚠️ Panduan Pencarian Nama:</p>
                    <ul className="text-yellow-300 space-y-1 text-xs">
                      <li>
                        • Masukkan <strong>minimal 3 karakter</strong> untuk menghindari overload
                        server
                      </li>
                      <li>
                        • Pencarian 1-2 huruf dapat menyebabkan sistem lambat dan hasil tidak akurat
                      </li>
                      <li>• Contoh yang baik: "Budi Santoso", "Santoso", "Ahmad"</li>
                      <li>• Contoh yang buruk: "B", "Bu", "A"</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Pencarian berdasarkan Nama</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Masukkan nama yang ingin dicari..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-1 bg-slate-700 border-slate-500 text-white"
                    onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching || (searchTerm.length > 0 && searchTerm.length < 3)}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {isSearching ? 'Mencari...' : 'Cari'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nik" className="space-y-6">
            {/* Warning Card for NIK Search */}
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-yellow-400 font-medium mb-1">
                      📋 Persyaratan Pencarian NIK:
                    </p>
                    <ul className="text-yellow-300 space-y-1 text-xs">
                      <li>
                        • NIK harus <strong>tepat 16 digit angka</strong> sesuai format standar
                        Indonesia
                      </li>
                      <li>• Sistem akan menolak pencarian jika kurang atau lebih dari 16 digit</li>
                      <li>• Contoh format yang benar: 3201234567890123</li>
                      <li>• Pastikan tidak ada spasi atau karakter non-angka</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Pencarian berdasarkan NIK</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Masukkan 16 digit NIK..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-slate-700 border-slate-500 text-white"
                    maxLength={16}
                    onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching || searchTerm.length !== 16}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {isSearching ? 'Mencari...' : 'Cari'}
                  </Button>
                </div>
                {searchTerm.length > 0 && searchTerm.length !== 16 && (
                  <div className="text-yellow-400 text-xs flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>NIK harus tepat 16 digit (saat ini: {searchTerm.length} digit)</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="image" className="space-y-6">
            {/* Warning Card for Image Search */}
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-yellow-400 font-medium mb-1">
                      📷 Persyaratan Upload Gambar:
                    </p>
                    <ul className="text-yellow-300 space-y-1 text-xs">
                      <li>
                        • Ukuran file maksimal <strong>5 MB</strong> untuk performa optimal
                      </li>
                      <li>• Format yang didukung: JPG, PNG, WebP, GIF</li>
                      <li>• Resolusi minimal 200x200 pixel untuk hasil akurat</li>
                      <li>• Pastikan gambar wajah terlihat jelas dan tidak buram</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Pencarian berdasarkan Gambar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="max-w-full h-48 object-contain mx-auto rounded-lg"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={removeUploadedImage}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white border-red-600"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex gap-4">
                        <Button
                          onClick={handleSearch}
                          disabled={isSearching}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Search className="w-4 h-4 mr-2" />
                          {isSearching ? 'Menganalisis...' : 'Cari dengan Gambar'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileImage className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400 mb-4">Upload gambar untuk pencarian</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-slate-600"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Gambar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aset" className="space-y-6">
            {/* Warning Card for Asset Search */}
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-yellow-400 font-medium mb-1">
                      🏠 Persyaratan Pencarian Aset:
                    </p>
                    <ul className="text-yellow-300 space-y-1 text-xs">
                      <li>
                        • Masukkan <strong>minimal 4 karakter</strong> untuk identitas aset yang
                        spesifik
                      </li>
                      <li>• Properti: gunakan nama jalan, nama kompleks, atau nomor sertifikat</li>
                      <li>• Kendaraan: gunakan nomor polisi lengkap (minimal 4 karakter)</li>
                      <li>
                        • Contoh yang baik: "Villa Puncak", "B 1234 CD", "No.Sertifikat 12345"
                      </li>
                      <li>• Hindari pencarian terlalu umum seperti "rumah", "mobil", "tanah"</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Pencarian berdasarkan Aset</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Masukkan nama bangunan, nomor polisi, atau identitas aset..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-1 bg-slate-700 border-slate-500 text-white"
                    onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching || (searchTerm.length > 0 && searchTerm.length < 4)}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {isSearching ? 'Mencari...' : 'Cari'}
                  </Button>
                </div>
                {searchTerm.length > 0 && searchTerm.length < 4 && (
                  <div className="text-yellow-400 text-xs flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>
                      Masukkan {4 - searchTerm.length} karakter lagi untuk pencarian aset yang
                      akurat
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-white">
                Hasil Pencarian ({searchResults.length} ditemukan)
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {searchResults.map(renderResultCard)}
              </div>
            </div>
          )}
        </Tabs>
      </div>

      {/* Detail Modal */}
      {renderDetailModal()}
    </div>
  );
}
