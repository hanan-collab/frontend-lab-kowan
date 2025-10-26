import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  Activity,
  Shield,
  User,
  Database,
  FileText,
  Trash2,
  Edit,
  Eye,
  Plus,
  Settings,
  AlertTriangle,
  Bell,
  XCircle,
  Clock,
  MapPin,
  Monitor,
  TrendingUp,
  Ban,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

// Suspicious activity detection rules
const suspiciousActivityRules = {
  MULTIPLE_FAILED_LOGIN: {
    name: 'Multiple Login Gagal',
    threshold: 3,
    timeWindow: 300000, // 5 minutes
    severity: 'HIGH',
  },
  OFF_HOURS_ACCESS: {
    name: 'Akses di Luar Jam Kerja',
    workHoursStart: 7,
    workHoursEnd: 18,
    severity: 'WARN',
  },
  MASS_DELETE: {
    name: 'Penghapusan Massal',
    threshold: 5,
    timeWindow: 600000, // 10 minutes
    severity: 'CRITICAL',
  },
  RAPID_DATA_EXPORT: {
    name: 'Export Data Berlebihan',
    threshold: 10,
    timeWindow: 3600000, // 1 hour
    severity: 'HIGH',
  },
  UNUSUAL_IP: {
    name: 'Akses dari IP Tidak Biasa',
    severity: 'WARN',
  },
  PRIVILEGE_ESCALATION: {
    name: 'Percobaan Akses Tidak Sah',
    severity: 'CRITICAL',
  },
  SENSITIVE_DATA_ACCESS: {
    name: 'Akses Data Sensitif',
    severity: 'WARN',
  },
};

const mockAuditLogs = [
  {
    id: 'AL001',
    timestamp: '2024-02-18 14:30:15',
    user: 'Ahmad Wijaya',
    userId: '1',
    action: 'CREATE',
    resource: 'Entitas',
    resourceId: 'ENT-001',
    details: 'Membuat entitas tersangka baru: "Budi Santoso"',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'INFO',
    category: 'Manajemen Data',
    suspicious: false,
  },
  {
    id: 'AL002',
    timestamp: '2024-02-18 03:25:42',
    user: 'Sari Indrawati',
    userId: '2',
    action: 'LOGIN',
    resource: 'Autentikasi',
    resourceId: null,
    details: 'Pengguna berhasil login dengan 2FA',
    ipAddress: '203.128.45.67',
    userAgent: 'Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    severity: 'WARN',
    category: 'Autentikasi',
    suspicious: true,
    suspiciousReasons: ['OFF_HOURS_ACCESS', 'UNUSUAL_IP'],
  },
  {
    id: 'AL003',
    timestamp: '2024-02-18 14:20:30',
    user: 'Budi Hartono',
    userId: '3',
    action: 'UPDATE',
    resource: 'Aset',
    resourceId: 'AST-005',
    details: 'Mengubah status aset dari "Pending" ke "Disita"',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    severity: 'WARN',
    category: 'Manajemen Aset',
    suspicious: false,
  },
  {
    id: 'AL004',
    timestamp: '2024-02-18 14:15:18',
    user: 'Diana Kusuma',
    userId: '4',
    action: 'DELETE',
    resource: 'Hubungan',
    resourceId: 'REL-012',
    details: 'Menghapus hubungan antara Eko Prasetyo dan PT. Mega Corp',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'HIGH',
    category: 'Manajemen Data',
    suspicious: false,
  },
  {
    id: 'AL005',
    timestamp: '2024-02-18 14:10:55',
    user: 'Unknown User',
    userId: '99',
    action: 'ACCESS_DENIED',
    resource: 'Admin Panel',
    resourceId: null,
    details: 'Percobaan akses ke halaman admin tanpa otorisasi',
    ipAddress: '45.76.189.234',
    userAgent: 'Python-requests/2.28.0',
    severity: 'CRITICAL',
    category: 'Keamanan',
    suspicious: true,
    suspiciousReasons: ['PRIVILEGE_ESCALATION', 'UNUSUAL_IP'],
  },
  {
    id: 'AL006',
    timestamp: '2024-02-18 14:08:22',
    user: 'Eko Prasetyo',
    userId: '5',
    action: 'EXPORT',
    resource: 'Laporan',
    resourceId: 'RPT-001',
    details: 'Mengekspor laporan investigasi sebagai PDF',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    severity: 'INFO',
    category: 'Laporan',
    suspicious: false,
  },
  {
    id: 'AL007',
    timestamp: '2024-02-18 14:05:11',
    user: 'Admin System',
    userId: '1',
    action: 'DELETE',
    resource: 'Entitas',
    resourceId: 'ENT-045',
    details: 'Menghapus entitas: "Test Entity 1"',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'WARN',
    category: 'Manajemen Data',
    suspicious: false,
  },
  {
    id: 'AL008',
    timestamp: '2024-02-18 14:04:55',
    user: 'Admin System',
    userId: '1',
    action: 'DELETE',
    resource: 'Entitas',
    resourceId: 'ENT-044',
    details: 'Menghapus entitas: "Test Entity 2"',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'WARN',
    category: 'Manajemen Data',
    suspicious: false,
  },
  {
    id: 'AL009',
    timestamp: '2024-02-18 14:04:30',
    user: 'Admin System',
    userId: '1',
    action: 'DELETE',
    resource: 'Entitas',
    resourceId: 'ENT-043',
    details: 'Menghapus entitas: "Test Entity 3"',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'HIGH',
    category: 'Manajemen Data',
    suspicious: true,
    suspiciousReasons: ['MASS_DELETE'],
  },
  {
    id: 'AL010',
    timestamp: '2024-02-18 13:58:15',
    user: 'Anonymous',
    userId: null,
    action: 'LOGIN_FAILED',
    resource: 'Autentikasi',
    resourceId: null,
    details: 'Gagal login - password salah',
    ipAddress: '185.220.101.45',
    userAgent: 'curl/7.68.0',
    severity: 'HIGH',
    category: 'Autentikasi',
    suspicious: true,
    suspiciousReasons: ['MULTIPLE_FAILED_LOGIN'],
  },
  {
    id: 'AL011',
    timestamp: '2024-02-18 13:57:55',
    user: 'Anonymous',
    userId: null,
    action: 'LOGIN_FAILED',
    resource: 'Autentikasi',
    resourceId: null,
    details: 'Gagal login - username tidak ditemukan',
    ipAddress: '185.220.101.45',
    userAgent: 'curl/7.68.0',
    severity: 'HIGH',
    category: 'Autentikasi',
    suspicious: true,
    suspiciousReasons: ['MULTIPLE_FAILED_LOGIN'],
  },
  {
    id: 'AL012',
    timestamp: '2024-02-18 13:57:30',
    user: 'Anonymous',
    userId: null,
    action: 'LOGIN_FAILED',
    resource: 'Autentikasi',
    resourceId: null,
    details: 'Gagal login - password salah',
    ipAddress: '185.220.101.45',
    userAgent: 'curl/7.68.0',
    severity: 'CRITICAL',
    category: 'Autentikasi',
    suspicious: true,
    suspiciousReasons: ['MULTIPLE_FAILED_LOGIN'],
  },
  {
    id: 'AL013',
    timestamp: '2024-02-18 13:50:00',
    user: 'Fahmi Rahman',
    userId: '6',
    action: 'VIEW',
    resource: 'Laporan Keuangan',
    resourceId: 'FIN-001',
    details: 'Mengakses laporan keuangan rahasia kasus korupsi',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'WARN',
    category: 'Akses Data',
    suspicious: true,
    suspiciousReasons: ['SENSITIVE_DATA_ACCESS'],
  },
  {
    id: 'AL014',
    timestamp: '2024-02-18 13:45:20',
    user: 'Gita Permata',
    userId: '7',
    action: 'EXPORT',
    resource: 'Database',
    resourceId: 'DB-FULL',
    details: 'Mengekspor seluruh database aset',
    ipAddress: '192.168.1.106',
    userAgent: 'Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    severity: 'HIGH',
    category: 'Export Data',
    suspicious: true,
    suspiciousReasons: ['RAPID_DATA_EXPORT', 'SENSITIVE_DATA_ACCESS'],
  },
];

const severityColors = {
  INFO: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  WARN: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  HIGH: 'bg-orange-600/20 text-orange-400 border-orange-500/50',
  CRITICAL: 'bg-red-600/20 text-red-400 border-red-500/50',
};

const actionIcons = {
  CREATE: Plus,
  UPDATE: Edit,
  DELETE: Trash2,
  VIEW: Eye,
  EXPORT: Download,
  LOGIN: User,
  LOGOUT: User,
  LOGIN_FAILED: XCircle,
  ACCESS_DENIED: Ban,
};

export function AuditLog() {
  const [logs, setLogs] = useState(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [showSuspiciousOnly, setShowSuspiciousOnly] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [suspiciousCount, setSuspiciousCount] = useState(0);

  useEffect(() => {
    // Count suspicious activities
    const count = logs.filter(log => log.suspicious).length;
    setSuspiciousCount(count);
  }, [logs]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);

    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesSuspicious = !showSuspiciousOnly || log.suspicious;

    return (
      matchesSearch && matchesSeverity && matchesCategory && matchesAction && matchesSuspicious
    );
  });

  const handleViewDetail = log => {
    setSelectedLog(log);
    setShowDetailDialog(true);
  };

  const handleBlockIP = ipAddress => {
    toast.success(`IP Address ${ipAddress} telah diblokir`, {
      description: 'Akses dari IP ini tidak akan diizinkan',
    });
  };

  const handleInvestigate = log => {
    toast.success('Investigasi dimulai', {
      description: `Log aktivitas ${log.id} ditandai untuk investigasi lebih lanjut`,
    });
  };

  const getSuspiciousReasonLabel = reason => {
    return suspiciousActivityRules[reason]?.name || reason;
  };

  const getActionIcon = action => {
    const Icon = actionIcons[action] || Activity;
    return Icon;
  };

  return (
    <div className="space-y-6">
      {/* Header with Suspicious Activity Alert */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-white">Log Audit Sistem</h1>
          <p className="text-slate-400 mt-1">Pantau dan analisis semua aktivitas sistem</p>
        </div>

        <div className="flex items-center gap-3">
          {suspiciousCount > 0 && (
            <Card className="bg-red-600/10 border-red-500/50">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-red-400">
                      {suspiciousCount} Aktivitas Mencurigakan
                    </p>
                    <p className="text-xs text-red-300">Memerlukan perhatian</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button className="bg-blue-600 hover:bg-blue-500">
            <Download className="w-4 h-4 mr-2" />
            Ekspor Log
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Log Audit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Pencarian</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Cari pengguna, aksi, atau IP..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Tingkat Severity</Label>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Severity</SelectItem>
                  <SelectItem value="INFO">Info</SelectItem>
                  <SelectItem value="WARN">Warning</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Kategori</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Autentikasi">Autentikasi</SelectItem>
                  <SelectItem value="Manajemen Data">Manajemen Data</SelectItem>
                  <SelectItem value="Manajemen Aset">Manajemen Aset</SelectItem>
                  <SelectItem value="Laporan">Laporan</SelectItem>
                  <SelectItem value="Keamanan">Keamanan</SelectItem>
                  <SelectItem value="Akses Data">Akses Data</SelectItem>
                  <SelectItem value="Export Data">Export Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Tipe Aksi</Label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Aksi</SelectItem>
                  <SelectItem value="CREATE">Create</SelectItem>
                  <SelectItem value="UPDATE">Update</SelectItem>
                  <SelectItem value="DELETE">Delete</SelectItem>
                  <SelectItem value="VIEW">View</SelectItem>
                  <SelectItem value="EXPORT">Export</SelectItem>
                  <SelectItem value="LOGIN">Login</SelectItem>
                  <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
                  <SelectItem value="ACCESS_DENIED">Access Denied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="suspiciousOnly"
                checked={showSuspiciousOnly}
                onChange={e => setShowSuspiciousOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-red-500 focus:ring-red-500"
              />
              <Label htmlFor="suspiciousOnly" className="text-slate-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Tampilkan hanya aktivitas mencurigakan
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Log Aktivitas ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Waktu</TableHead>
                  <TableHead className="text-slate-300">Pengguna</TableHead>
                  <TableHead className="text-slate-300">Aksi</TableHead>
                  <TableHead className="text-slate-300">Resource</TableHead>
                  <TableHead className="text-slate-300">Detail</TableHead>
                  <TableHead className="text-slate-300">IP Address</TableHead>
                  <TableHead className="text-slate-300">Severity</TableHead>
                  <TableHead className="text-slate-300">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map(log => {
                  const ActionIcon = getActionIcon(log.action);
                  return (
                    <TableRow
                      key={log.id}
                      className={`border-slate-700 ${
                        log.suspicious
                          ? 'bg-red-600/5 hover:bg-red-600/10'
                          : 'hover:bg-slate-700/50'
                      }`}
                    >
                      <TableCell>
                        {log.suspicious ? (
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                          </div>
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        )}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">{log.timestamp}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-600 text-white text-xs">
                              {log.user
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white text-sm">{log.user}</p>
                            {log.userId && (
                              <p className="text-xs text-slate-400">ID: {log.userId}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-600/20 text-blue-400 border-blue-500/50"
                        >
                          <ActionIcon className="w-3 h-3 mr-1" />
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        <div>
                          <p className="text-sm">{log.resource}</p>
                          {log.resourceId && (
                            <p className="text-xs text-slate-500">{log.resourceId}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm max-w-xs truncate">
                        {log.details}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-slate-300 text-sm">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {log.ipAddress}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={severityColors[log.severity]}>{log.severity}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(log)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Tidak ada log yang sesuai dengan filter</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedLog?.suspicious && <AlertTriangle className="w-5 h-5 text-red-400" />}
              Detail Log Audit - {selectedLog?.id}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Informasi lengkap tentang aktivitas ini
            </DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              {/* Suspicious Alert */}
              {selectedLog.suspicious && (
                <Card className="bg-red-600/10 border-red-500/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-red-400 mb-2">
                          Aktivitas Mencurigakan Terdeteksi
                        </h4>
                        <div className="space-y-1">
                          {selectedLog.suspiciousReasons.map((reason, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              <span className="text-sm text-red-300">
                                {getSuspiciousReasonLabel(reason)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Log Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-400">Waktu</Label>
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {selectedLog.timestamp}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-400">Severity</Label>
                  <Badge className={severityColors[selectedLog.severity]}>
                    {selectedLog.severity}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-400">Pengguna</Label>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">
                        {selectedLog.user
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm">{selectedLog.user}</p>
                      {selectedLog.userId && (
                        <p className="text-xs text-slate-400">ID: {selectedLog.userId}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-400">Kategori</Label>
                  <p className="text-white">{selectedLog.category}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-400">Aksi</Label>
                  <Badge
                    variant="outline"
                    className="bg-blue-600/20 text-blue-400 border-blue-500/50"
                  >
                    {selectedLog.action}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-400">Resource</Label>
                  <div>
                    <p className="text-white">{selectedLog.resource}</p>
                    {selectedLog.resourceId && (
                      <p className="text-xs text-slate-400">{selectedLog.resourceId}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-400">Detail Aktivitas</Label>
                <p className="text-white bg-slate-700/50 p-3 rounded-lg">{selectedLog.details}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-400">IP Address</Label>
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {selectedLog.ipAddress}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-400">User Agent</Label>
                  <div className="flex items-center gap-2 text-white">
                    <Monitor className="w-4 h-4 text-slate-400" />
                    <p className="text-sm truncate">{selectedLog.userAgent}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedLog.suspicious && (
                <div className="flex gap-2 pt-4 border-t border-slate-700">
                  <Button
                    variant="outline"
                    onClick={() => handleBlockIP(selectedLog.ipAddress)}
                    className="border-red-600 text-red-400 hover:bg-red-600/20"
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Blokir IP
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleInvestigate(selectedLog)}
                    className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/20"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Investigasi
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-400 hover:bg-blue-600/20"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Buat Alert
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
