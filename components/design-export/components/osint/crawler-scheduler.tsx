import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import {
  Calendar,
  Clock,
  Play,
  Save,
  Settings,
  Repeat,
  Zap,
  AlertCircle,
  CheckCircle2,
  Pause,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';

const frequencyOptions = [
  { value: 'realtime', label: 'Real-time', description: 'Monitoring kontinyu' },
  { value: 'hourly', label: 'Setiap Jam', description: 'Eksekusi setiap jam' },
  { value: 'daily', label: 'Harian', description: 'Satu kali setiap hari' },
  { value: 'weekly', label: 'Mingguan', description: 'Satu kali setiap minggu' },
  { value: 'monthly', label: 'Bulanan', description: 'Satu kali setiap bulan' },
];

const mockSchedules = [
  {
    id: '1',
    name: 'Social Media Daily Sweep',
    frequency: 'daily',
    time: '09:00',
    sources: ['Twitter/X', 'Facebook', 'Instagram'],
    status: 'active',
    nextRun: '2024-02-19 09:00',
    lastRun: '2024-02-18 09:00',
  },
  {
    id: '2',
    name: 'News Portal Monitoring',
    frequency: 'hourly',
    time: '00',
    sources: ['Detik.com', 'Kompas.com', 'CNN Indonesia'],
    status: 'active',
    nextRun: '2024-02-18 16:00',
    lastRun: '2024-02-18 15:00',
  },
  {
    id: '3',
    name: 'Marketplace Weekly Check',
    frequency: 'weekly',
    time: '10:00',
    sources: ['Tokopedia', 'Shopee', 'Bukalapak'],
    status: 'paused',
    nextRun: '2024-02-25 10:00',
    lastRun: '2024-02-18 10:00',
  },
];

const statusColors = {
  active: 'bg-green-600/20 text-green-400 border-green-500/50',
  paused: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  stopped: 'bg-red-600/20 text-red-400 border-red-500/50',
};

export function CrawlerScheduler() {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [currentSchedule, setCurrentSchedule] = useState({
    name: '',
    frequency: 'daily',
    time: '09:00',
    sources: [],
    enabled: true,
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveSchedule = () => {
    if (!currentSchedule.name || !currentSchedule.frequency) {
      toast.error('Harap lengkapi nama dan frekuensi jadwal');
      return;
    }

    const schedule = {
      id: isEditing ? currentSchedule.id : Date.now().toString(),
      ...currentSchedule,
      status: currentSchedule.enabled ? 'active' : 'paused',
      nextRun: calculateNextRun(currentSchedule.frequency, currentSchedule.time),
      lastRun: '-',
    };

    if (isEditing) {
      setSchedules(prev => prev.map(s => (s.id === schedule.id ? schedule : s)));
      toast.success('Jadwal berhasil diperbarui');
    } else {
      setSchedules([...schedules, schedule]);
      toast.success('Jadwal berhasil dibuat');
    }

    setCurrentSchedule({
      name: '',
      frequency: 'daily',
      time: '09:00',
      sources: [],
      enabled: true,
      description: '',
    });
    setIsEditing(false);
  };

  const handleRunNow = () => {
    toast.success('Crawling dimulai sekarang untuk jadwal yang dipilih');
  };

  const calculateNextRun = (frequency, time) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]), 0, 0);
    return tomorrow.toISOString().replace('T', ' ').slice(0, 16);
  };

  const handleToggleSchedule = scheduleId => {
    setSchedules(prev =>
      prev.map(schedule =>
        schedule.id === scheduleId
          ? { ...schedule, status: schedule.status === 'active' ? 'paused' : 'active' }
          : schedule
      )
    );
    toast.success('Status jadwal berhasil diperbarui');
  };

  const availableSources = [
    'Twitter/X',
    'Facebook',
    'Instagram',
    'LinkedIn',
    'Detik.com',
    'Kompas.com',
    'Tokopedia',
    'Shopee',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Crawler Scheduler</h1>
          <p className="text-slate-400 mt-1">Atur jadwal otomatis untuk pengumpulan data OSINT</p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleRunNow}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Now
          </Button>
          <Button onClick={handleSaveSchedule} className="bg-blue-600 hover:bg-blue-500">
            <Save className="w-4 h-4 mr-2" />
            Save Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Configuration */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" />
              Konfigurasi Jadwal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-300">Nama Jadwal</Label>
              <Input
                value={currentSchedule.name}
                onChange={e => setCurrentSchedule(prev => ({ ...prev, name: e.target.value }))}
                className="bg-slate-700 border-slate-600"
                placeholder="Contoh: Social Media Daily Sweep"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Frekuensi Crawling</Label>
              <Select
                value={currentSchedule.frequency}
                onValueChange={value => setCurrentSchedule(prev => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Pilih frekuensi" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {frequencyOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        <span className="text-xs text-slate-400">{option.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Waktu Eksekusi</Label>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <Input
                  type="time"
                  value={currentSchedule.time}
                  onChange={e => setCurrentSchedule(prev => ({ ...prev, time: e.target.value }))}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <p className="text-xs text-slate-400">
                {currentSchedule.frequency === 'realtime' && 'Monitoring berkelanjutan'}
                {currentSchedule.frequency === 'hourly' &&
                  'Menit ke-' + currentSchedule.time.split(':')[1] + ' setiap jam'}
                {currentSchedule.frequency === 'daily' &&
                  'Setiap hari pukul ' + currentSchedule.time}
                {currentSchedule.frequency === 'weekly' &&
                  'Setiap minggu pukul ' + currentSchedule.time}
                {currentSchedule.frequency === 'monthly' &&
                  'Setiap bulan pukul ' + currentSchedule.time}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Sumber Data Target</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {availableSources.map(source => (
                  <label key={source} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={currentSchedule.sources.includes(source)}
                      onChange={e => {
                        if (e.target.checked) {
                          setCurrentSchedule(prev => ({
                            ...prev,
                            sources: [...prev.sources, source],
                          }));
                        } else {
                          setCurrentSchedule(prev => ({
                            ...prev,
                            sources: prev.sources.filter(s => s !== source),
                          }));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-slate-300">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Deskripsi</Label>
              <Textarea
                value={currentSchedule.description}
                onChange={e =>
                  setCurrentSchedule(prev => ({ ...prev, description: e.target.value }))
                }
                className="bg-slate-700 border-slate-600"
                placeholder="Deskripsi singkat tentang jadwal ini..."
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={currentSchedule.enabled}
                  onCheckedChange={checked =>
                    setCurrentSchedule(prev => ({ ...prev, enabled: checked }))
                  }
                />
                <Label className="text-slate-300">Aktifkan jadwal</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Schedules */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-400" />
              Jadwal Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedules.map(schedule => (
                <div
                  key={schedule.id}
                  className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{schedule.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={statusColors[schedule.status]}>
                          {schedule.status === 'active' && (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          )}
                          {schedule.status === 'paused' && <Pause className="w-3 h-3 mr-1" />}
                          {schedule.status === 'stopped' && (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {schedule.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-slate-300">
                          <Repeat className="w-3 h-3 mr-1" />
                          {frequencyOptions.find(f => f.value === schedule.frequency)?.label}
                        </Badge>
                      </div>
                    </div>
                    <Switch
                      checked={schedule.status === 'active'}
                      onCheckedChange={() => handleToggleSchedule(schedule.id)}
                      size="sm"
                    />
                  </div>

                  <div className="text-sm text-slate-400 space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>Waktu: {schedule.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>Berikutnya: {schedule.nextRun}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-3 h-3" />
                      <span>Terakhir: {schedule.lastRun}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-slate-500 mb-2">Target sumber:</p>
                    <div className="flex flex-wrap gap-1">
                      {schedule.sources.map(source => (
                        <Badge key={source} variant="outline" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-600">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-slate-600 text-slate-300"
                      onClick={() => {
                        setCurrentSchedule(schedule);
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-blue-600 text-blue-400"
                      onClick={handleRunNow}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Run Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{schedules.length}</p>
            <p className="text-sm text-slate-400">Total Jadwal</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {schedules.filter(s => s.status === 'active').length}
            </p>
            <p className="text-sm text-slate-400">Jadwal Aktif</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-yellow-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Pause className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {schedules.filter(s => s.status === 'paused').length}
            </p>
            <p className="text-sm text-slate-400">Dijeda</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">24</p>
            <p className="text-sm text-slate-400">Eksekusi Hari Ini</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
