import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Switch } from '../../../ui/switch';
import { Separator } from '../../../ui/separator';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  Settings,
  Globe,
  Clock,
  DollarSign,
  Shield,
  Database,
  Bell,
  Save,
  RotateCcw,
  Download,
  Upload,
  AlertTriangle,
  Eye,
  Ban,
  TrendingUp,
  Users,
  Lock,
  Activity,
} from 'lucide-react';
import { toast } from 'sonner';

export function SystemSettings() {
  const [settings, setSettings] = useState({
    general: {
      timezone: 'WIB',
      dateFormat: 'DD/MM/YYYY',
      language: 'id',
      currency: 'IDR',
    },
    security: {
      passwordPolicy: 'strong',
      sessionTimeout: '30',
      twoFactorRequired: true,
      ipWhitelist: true,
      auditLogging: true,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      systemAlerts: true,
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: '90',
      backupLocation: 'aws-s3',
    },
    api: {
      rateLimit: '1000',
      apiLogging: true,
      corsEnabled: false,
    },
    suspiciousActivity: {
      enabled: true,
      multipleFailedLogin: {
        enabled: true,
        threshold: 3,
        timeWindow: 5,
      },
      offHoursAccess: {
        enabled: true,
        workHoursStart: 7,
        workHoursEnd: 18,
      },
      massDelete: {
        enabled: true,
        threshold: 5,
        timeWindow: 10,
      },
      rapidDataExport: {
        enabled: true,
        threshold: 10,
        timeWindow: 60,
      },
      unusualIP: {
        enabled: true,
        autoBlock: false,
      },
      privilegeEscalation: {
        enabled: true,
        autoBlock: true,
      },
      sensitiveDataAccess: {
        enabled: true,
        logOnly: true,
      },
      notifications: {
        emailOnSuspicious: true,
        smsOnCritical: true,
        realTimeAlerts: true,
      },
    },
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSuspiciousSettingChange = (rule, key, value) => {
    setSettings(prev => ({
      ...prev,
      suspiciousActivity: {
        ...prev.suspiciousActivity,
        [rule]: {
          ...prev.suspiciousActivity[rule],
          [key]: value,
        },
      },
    }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    toast.success('Pengaturan berhasil disimpan', {
      description: 'Semua perubahan telah diterapkan ke sistem',
    });
  };

  const handleResetToDefaults = () => {
    // Simulate reset to defaults
    toast.success('Pengaturan berhasil dikembalikan ke default');
  };

  const handleExportConfig = () => {
    // Simulate configuration export
    toast.success('Konfigurasi berhasil diekspor');
  };

  const handleImportConfig = () => {
    // Simulate configuration import
    toast.success('Konfigurasi berhasil diimpor');
  };

  const handleTestAlert = () => {
    toast.warning('Tes Alert Aktivitas Mencurigakan', {
      description:
        'Ini adalah contoh notifikasi yang akan dikirim ketika aktivitas mencurigakan terdeteksi',
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-white">Pengaturan Sistem</h1>
          <p className="text-slate-400 mt-1">Kelola pengaturan sistem global dan preferensi</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleResetToDefaults}
            className="border-slate-600 text-slate-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Default
          </Button>
          <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-500">
            <Save className="w-4 h-4 mr-2" />
            Simpan Pengaturan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 bg-slate-800">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="suspicious">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Deteksi Ancaman
          </TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Pengaturan Umum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Zona Waktu</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={value => handleSettingChange('general', 'timezone', value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="WIB">WIB (GMT+7)</SelectItem>
                      <SelectItem value="WITA">WITA (GMT+8)</SelectItem>
                      <SelectItem value="WIT">WIT (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Format Tanggal</Label>
                  <Select
                    value={settings.general.dateFormat}
                    onValueChange={value => handleSettingChange('general', 'dateFormat', value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="DD/MM/YYYY">18/02/2024</SelectItem>
                      <SelectItem value="DD-MM-YYYY">18-02-2024</SelectItem>
                      <SelectItem value="YYYY-MM-DD">2024-02-18</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Bahasa</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={value => handleSettingChange('general', 'language', value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ms">Bahasa Malaysia</SelectItem>
                      <SelectItem value="th">ภาษาไทย</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Mata Uang</Label>
                  <Select
                    value={settings.general.currency}
                    onValueChange={value => handleSettingChange('general', 'currency', value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="IDR">IDR (Rp)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="SGD">SGD (S$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Pengaturan Keamanan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Kebijakan Password</Label>
                <Select
                  value={settings.security.passwordPolicy}
                  onValueChange={value => handleSettingChange('security', 'passwordPolicy', value)}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="basic">Dasar (8+ karakter)</SelectItem>
                    <SelectItem value="strong">
                      Kuat (12+ karakter, huruf besar-kecil, angka)
                    </SelectItem>
                    <SelectItem value="strict">Ketat (16+ karakter, karakter khusus)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Timeout Sesi (menit)</Label>
                <Input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={e => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Wajib Autentikasi Dua Faktor</Label>
                  <Switch
                    checked={settings.security.twoFactorRequired}
                    onCheckedChange={value =>
                      handleSettingChange('security', 'twoFactorRequired', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Whitelist Alamat IP</Label>
                  <Switch
                    checked={settings.security.ipWhitelist}
                    onCheckedChange={value => handleSettingChange('security', 'ipWhitelist', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Log Audit</Label>
                  <Switch
                    checked={settings.security.auditLogging}
                    onCheckedChange={value =>
                      handleSettingChange('security', 'auditLogging', value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suspicious Activity Detection Tab */}
        <TabsContent value="suspicious" className="space-y-6">
          {/* Main Toggle */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Deteksi Aktivitas Mencurigakan
                  </CardTitle>
                  <p className="text-slate-400 text-sm mt-1">
                    Sistem otomatis untuk mendeteksi dan memberikan peringatan aktivitas tidak
                    normal
                  </p>
                </div>
                <Switch
                  checked={settings.suspiciousActivity.enabled}
                  onCheckedChange={value =>
                    handleSettingChange('suspiciousActivity', 'enabled', value)
                  }
                />
              </div>
            </CardHeader>
          </Card>

          {/* Detection Rules */}
          {settings.suspiciousActivity.enabled && (
            <>
              {/* Multiple Failed Login */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-base flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Multiple Login Gagal
                      </CardTitle>
                      <p className="text-slate-400 text-sm">
                        Deteksi percobaan login berulang yang gagal
                      </p>
                    </div>
                    <Switch
                      checked={settings.suspiciousActivity.multipleFailedLogin.enabled}
                      onCheckedChange={value =>
                        handleSuspiciousSettingChange('multipleFailedLogin', 'enabled', value)
                      }
                    />
                  </div>
                </CardHeader>
                {settings.suspiciousActivity.multipleFailedLogin.enabled && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Batas Percobaan</Label>
                        <Input
                          type="number"
                          value={settings.suspiciousActivity.multipleFailedLogin.threshold}
                          onChange={e =>
                            handleSuspiciousSettingChange(
                              'multipleFailedLogin',
                              'threshold',
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Jendela Waktu (menit)</Label>
                        <Input
                          type="number"
                          value={settings.suspiciousActivity.multipleFailedLogin.timeWindow}
                          onChange={e =>
                            handleSuspiciousSettingChange(
                              'multipleFailedLogin',
                              'timeWindow',
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/50">
                      Severity: HIGH
                    </Badge>
                  </CardContent>
                )}
              </Card>

              {/* Off Hours Access */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-base flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Akses di Luar Jam Kerja
                      </CardTitle>
                      <p className="text-slate-400 text-sm">
                        Deteksi akses sistem di luar jam operasional
                      </p>
                    </div>
                    <Switch
                      checked={settings.suspiciousActivity.offHoursAccess.enabled}
                      onCheckedChange={value =>
                        handleSuspiciousSettingChange('offHoursAccess', 'enabled', value)
                      }
                    />
                  </div>
                </CardHeader>
                {settings.suspiciousActivity.offHoursAccess.enabled && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Jam Kerja Mulai</Label>
                        <Input
                          type="number"
                          min="0"
                          max="23"
                          value={settings.suspiciousActivity.offHoursAccess.workHoursStart}
                          onChange={e =>
                            handleSuspiciousSettingChange(
                              'offHoursAccess',
                              'workHoursStart',
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Jam Kerja Selesai</Label>
                        <Input
                          type="number"
                          min="0"
                          max="23"
                          value={settings.suspiciousActivity.offHoursAccess.workHoursEnd}
                          onChange={e =>
                            handleSuspiciousSettingChange(
                              'offHoursAccess',
                              'workHoursEnd',
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/50">
                      Severity: WARN
                    </Badge>
                  </CardContent>
                )}
              </Card>

              {/* Mass Delete */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-base flex items-center gap-2">
                        <Ban className="w-4 h-4" />
                        Penghapusan Massal
                      </CardTitle>
                      <p className="text-slate-400 text-sm">
                        Deteksi penghapusan data dalam jumlah besar
                      </p>
                    </div>
                    <Switch
                      checked={settings.suspiciousActivity.massDelete.enabled}
                      onCheckedChange={value =>
                        handleSuspiciousSettingChange('massDelete', 'enabled', value)
                      }
                    />
                  </div>
                </CardHeader>
                {settings.suspiciousActivity.massDelete.enabled && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Batas Penghapusan</Label>
                        <Input
                          type="number"
                          value={settings.suspiciousActivity.massDelete.threshold}
                          onChange={e =>
                            handleSuspiciousSettingChange(
                              'massDelete',
                              'threshold',
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Jendela Waktu (menit)</Label>
                        <Input
                          type="number"
                          value={settings.suspiciousActivity.massDelete.timeWindow}
                          onChange={e =>
                            handleSuspiciousSettingChange(
                              'massDelete',
                              'timeWindow',
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <Badge className="bg-red-600/20 text-red-400 border-red-500/50">
                      Severity: CRITICAL
                    </Badge>
                  </CardContent>
                )}
              </Card>

              {/* Rapid Data Export */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-base flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Data Berlebihan
                      </CardTitle>
                      <p className="text-slate-400 text-sm">
                        Deteksi export data dalam jumlah banyak
                      </p>
                    </div>
                    <Switch
                      checked={settings.suspiciousActivity.rapidDataExport.enabled}
                      onCheckedChange={value =>
                        handleSuspiciousSettingChange('rapidDataExport', 'enabled', value)
                      }
                    />
                  </div>
                </CardHeader>
                {settings.suspiciousActivity.rapidDataExport.enabled && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Batas Export</Label>
                        <Input
                          type="number"
                          value={settings.suspiciousActivity.rapidDataExport.threshold}
                          onChange={e =>
                            handleSuspiciousSettingChange(
                              'rapidDataExport',
                              'threshold',
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Jendela Waktu (menit)</Label>
                        <Input
                          type="number"
                          value={settings.suspiciousActivity.rapidDataExport.timeWindow}
                          onChange={e =>
                            handleSuspiciousSettingChange(
                              'rapidDataExport',
                              'timeWindow',
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <Badge className="bg-orange-600/20 text-orange-400 border-orange-500/50">
                      Severity: HIGH
                    </Badge>
                  </CardContent>
                )}
              </Card>

              {/* Additional Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <Label className="text-slate-300">IP Tidak Biasa</Label>
                      </div>
                      <Switch
                        checked={settings.suspiciousActivity.unusualIP.enabled}
                        onCheckedChange={value =>
                          handleSuspiciousSettingChange('unusualIP', 'enabled', value)
                        }
                      />
                    </div>
                    {settings.suspiciousActivity.unusualIP.enabled && (
                      <div className="flex items-center justify-between">
                        <Label className="text-slate-400 text-sm">Auto Block IP</Label>
                        <Switch
                          checked={settings.suspiciousActivity.unusualIP.autoBlock}
                          onCheckedChange={value =>
                            handleSuspiciousSettingChange('unusualIP', 'autoBlock', value)
                          }
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-400" />
                        <Label className="text-slate-300">Privilege Escalation</Label>
                      </div>
                      <Switch
                        checked={settings.suspiciousActivity.privilegeEscalation.enabled}
                        onCheckedChange={value =>
                          handleSuspiciousSettingChange('privilegeEscalation', 'enabled', value)
                        }
                      />
                    </div>
                    {settings.suspiciousActivity.privilegeEscalation.enabled && (
                      <div className="flex items-center justify-between">
                        <Label className="text-slate-400 text-sm">Auto Block</Label>
                        <Switch
                          checked={settings.suspiciousActivity.privilegeEscalation.autoBlock}
                          onCheckedChange={value =>
                            handleSuspiciousSettingChange('privilegeEscalation', 'autoBlock', value)
                          }
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Alert Settings */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-base flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Pengaturan Notifikasi Ancaman
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Email pada Aktivitas Mencurigakan</Label>
                    <Switch
                      checked={settings.suspiciousActivity.notifications.emailOnSuspicious}
                      onCheckedChange={value =>
                        handleSuspiciousSettingChange('notifications', 'emailOnSuspicious', value)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">SMS pada Ancaman Kritis</Label>
                    <Switch
                      checked={settings.suspiciousActivity.notifications.smsOnCritical}
                      onCheckedChange={value =>
                        handleSuspiciousSettingChange('notifications', 'smsOnCritical', value)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Alert Real-time</Label>
                    <Switch
                      checked={settings.suspiciousActivity.notifications.realTimeAlerts}
                      onCheckedChange={value =>
                        handleSuspiciousSettingChange('notifications', 'realTimeAlerts', value)
                      }
                    />
                  </div>

                  <Separator className="bg-slate-600 my-4" />

                  <Button
                    onClick={handleTestAlert}
                    variant="outline"
                    className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-600/20"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Tes Notifikasi Alert
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Pengaturan Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Notifikasi Email</Label>
                    <p className="text-xs text-slate-400">Terima notifikasi melalui email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={value =>
                      handleSettingChange('notifications', 'emailNotifications', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Notifikasi SMS</Label>
                    <p className="text-xs text-slate-400">Terima peringatan kritis via SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={value =>
                      handleSettingChange('notifications', 'smsNotifications', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Notifikasi Push</Label>
                    <p className="text-xs text-slate-400">Notifikasi push dalam aplikasi</p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={value =>
                      handleSettingChange('notifications', 'pushNotifications', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Peringatan Sistem</Label>
                    <p className="text-xs text-slate-400">
                      Peringatan pemeliharaan sistem dan error
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.systemAlerts}
                    onCheckedChange={value =>
                      handleSettingChange('notifications', 'systemAlerts', value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup & Pemulihan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Backup Otomatis</Label>
                <Switch
                  checked={settings.backup.autoBackup}
                  onCheckedChange={value => handleSettingChange('backup', 'autoBackup', value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Frekuensi Backup</Label>
                  <Select
                    value={settings.backup.backupFrequency}
                    onValueChange={value => handleSettingChange('backup', 'backupFrequency', value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="hourly">Setiap Jam</SelectItem>
                      <SelectItem value="daily">Harian</SelectItem>
                      <SelectItem value="weekly">Mingguan</SelectItem>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Periode Retensi (hari)</Label>
                  <Input
                    type="number"
                    value={settings.backup.retentionPeriod}
                    onChange={e => handleSettingChange('backup', 'retentionPeriod', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Lokasi Backup</Label>
                <Select
                  value={settings.backup.backupLocation}
                  onValueChange={value => handleSettingChange('backup', 'backupLocation', value)}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="local">Penyimpanan Lokal</SelectItem>
                    <SelectItem value="aws-s3">AWS S3</SelectItem>
                    <SelectItem value="azure">Azure Blob Storage</SelectItem>
                    <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Management */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Manajemen Konfigurasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Impor/Ekspor Konfigurasi</h3>
                  <p className="text-slate-400 text-sm">
                    Backup atau pulihkan pengaturan konfigurasi sistem
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleExportConfig}
                    className="border-slate-600 text-slate-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Ekspor
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleImportConfig}
                    className="border-slate-600 text-slate-300"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Impor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Status Tab */}
        <TabsContent value="status" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Status Sistem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Database className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-white font-medium">Database</p>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/50 mt-1">
                    Sehat
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-white font-medium">Keamanan</p>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/50 mt-1">
                    Aktif
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-yellow-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-white font-medium">Backup Terakhir</p>
                  <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/50 mt-1">
                    2 jam lalu
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-white font-medium">Status API</p>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50 mt-1">
                    Online
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Threat Detection Status */}
          {settings.suspiciousActivity.enabled && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Status Deteksi Ancaman
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-green-400" />
                      <span className="text-slate-300">Aturan Aktif</span>
                    </div>
                    <p className="text-2xl font-bold text-white">7/7</p>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">Deteksi Hari Ini</span>
                    </div>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
