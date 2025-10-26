import image_2b3b9b1161dcc7a2ed21ebff0a8093c745e3d57b from 'figma:asset/2b3b9b1161dcc7a2ed21ebff0a8093c745e3d57b.png';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Calendar,
  Filter,
} from 'lucide-react';

// Mock data for staff performance
const staffPerformance = [
  {
    id: '1',
    name: 'Ahmad Wijaya',
    role: 'Senior Investigator',
    department: 'Tim Investigasi A',
    casesAssigned: 25,
    casesCompleted: 23,
    casesInProgress: 2,
    averageTimePerCase: 4.2,
    qualityScore: 95,
    efficiency: 92,
    monthlyTarget: 20,
    achievement: 115,
    lastActivity: '2024-01-15',
    skills: ['Analisis Keuangan', 'Investigasi Korporat', 'Pencarian Aset'],
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Sari Indrawati',
    role: 'Investigator',
    department: 'Tim Investigasi B',
    casesAssigned: 18,
    casesCompleted: 16,
    casesInProgress: 2,
    averageTimePerCase: 5.1,
    qualityScore: 88,
    efficiency: 89,
    monthlyTarget: 15,
    achievement: 107,
    lastActivity: '2024-01-14',
    skills: ['Investigasi Digital', 'Analisis Data', 'Penelusuran Jejak'],
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Budi Hartono',
    role: 'Junior Investigator',
    department: 'Tim Investigasi A',
    casesAssigned: 12,
    casesCompleted: 10,
    casesInProgress: 2,
    averageTimePerCase: 6.8,
    qualityScore: 82,
    efficiency: 83,
    monthlyTarget: 10,
    achievement: 100,
    lastActivity: '2024-01-13',
    skills: ['Penelitian Dasar', 'Dokumentasi', 'Wawancara'],
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Diana Kusuma',
    role: 'Senior Analyst',
    department: 'Tim Analisis',
    casesAssigned: 30,
    casesCompleted: 28,
    casesInProgress: 2,
    averageTimePerCase: 3.5,
    qualityScore: 93,
    efficiency: 96,
    monthlyTarget: 25,
    achievement: 112,
    lastActivity: '2024-01-15',
    skills: ['Analisis Grafik', 'Intelligence Analysis', 'Pattern Recognition'],
    rating: 4.8,
  },
  {
    id: '5',
    name: 'Eko Prasetyo',
    role: 'Investigator',
    department: 'Tim Investigasi B',
    casesAssigned: 20,
    casesCompleted: 17,
    casesInProgress: 3,
    averageTimePerCase: 5.8,
    qualityScore: 85,
    efficiency: 85,
    monthlyTarget: 18,
    achievement: 94,
    lastActivity: '2024-01-12',
    skills: ['Investigasi Lapangan', 'Surveillance', 'Analisis Lokasi'],
    rating: 4.4,
  },
];

// Mock data for performance trends
const performanceTrend = [
  { month: 'Jul', casesCompleted: 145, efficiency: 88, qualityScore: 85 },
  { month: 'Agu', casesCompleted: 162, efficiency: 90, qualityScore: 87 },
  { month: 'Sep', casesCompleted: 158, efficiency: 92, qualityScore: 89 },
  { month: 'Okt', casesCompleted: 175, efficiency: 89, qualityScore: 91 },
  { month: 'Nov', casesCompleted: 168, efficiency: 94, qualityScore: 88 },
  { month: 'Des', casesCompleted: 182, efficiency: 91, qualityScore: 92 },
  { month: 'Jan', casesCompleted: 194, efficiency: 93, qualityScore: 94 },
];

// Department performance data
const departmentData = [
  { name: 'Tim Investigasi A', value: 35, color: '#3b82f6' },
  { name: 'Tim Investigasi B', value: 28, color: '#10b981' },
  { name: 'Tim Analisis', value: 25, color: '#f59e0b' },
  { name: 'Tim Dukungan', value: 12, color: '#8b5cf6' },
];

const performanceColors = {
  excellent: 'bg-green-600/20 text-green-400 border-green-500/50',
  good: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  average: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  poor: 'bg-red-600/20 text-red-400 border-red-500/50',
};

const getPerformanceLevel = (score: number) => {
  if (score >= 90) return { level: 'excellent', label: 'Sangat Baik' };
  if (score >= 80) return { level: 'good', label: 'Baik' };
  if (score >= 70) return { level: 'average', label: 'Cukup' };
  return { level: 'poor', label: 'Perlu Perbaikan' };
};

export function PerformanceKPI() {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredStaff = staffPerformance.filter(staff => {
    const departmentMatch = selectedDepartment === 'all' || staff.department === selectedDepartment;
    const roleMatch = selectedRole === 'all' || staff.role === selectedRole;
    return departmentMatch && roleMatch;
  });

  // Calculate aggregate KPIs
  const totalCasesCompleted = filteredStaff.reduce((sum, staff) => sum + staff.casesCompleted, 0);
  const totalCasesAssigned = filteredStaff.reduce((sum, staff) => sum + staff.casesAssigned, 0);
  const averageEfficiency = Math.round(
    filteredStaff.reduce((sum, staff) => sum + staff.efficiency, 0) / filteredStaff.length
  );
  const averageQuality = Math.round(
    filteredStaff.reduce((sum, staff) => sum + staff.qualityScore, 0) / filteredStaff.length
  );
  const totalTargetAchievement = Math.round(
    filteredStaff.reduce((sum, staff) => sum + staff.achievement, 0) / filteredStaff.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Kinerja & KPI</h1>
          <p className="text-slate-400 mt-1">Monitor kinerja staff dan indikator kunci performa</p>
        </div>

        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 bg-slate-600 border-slate-500 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-600 border-slate-500 text-white">
              <SelectItem value="thisWeek">Minggu Ini</SelectItem>
              <SelectItem value="thisMonth">Bulan Ini</SelectItem>
              <SelectItem value="thisQuarter">Kuartal Ini</SelectItem>
              <SelectItem value="thisYear">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-blue-600 hover:bg-blue-500">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-sm">Filter:</span>
            </div>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48 bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Semua Departemen" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600 border-slate-500 text-white">
                <SelectItem value="all">Semua Departemen</SelectItem>
                <SelectItem value="Tim Investigasi A">Tim Investigasi A</SelectItem>
                <SelectItem value="Tim Investigasi B">Tim Investigasi B</SelectItem>
                <SelectItem value="Tim Analisis">Tim Analisis</SelectItem>
                <SelectItem value="Tim Dukungan">Tim Dukungan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48 bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Semua Role" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600 border-slate-500 text-white">
                <SelectItem value="all">Semua Role</SelectItem>
                <SelectItem value="Senior Investigator">Senior Investigator</SelectItem>
                <SelectItem value="Investigator">Investigator</SelectItem>
                <SelectItem value="Junior Investigator">Junior Investigator</SelectItem>
                <SelectItem value="Senior Analyst">Senior Analyst</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Kasus Selesai</p>
                <p className="text-2xl font-bold text-white">{totalCasesCompleted}</p>
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% dari bulan lalu
                </p>
              </div>
              <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Efisiensi Rata-rata</p>
                <p className="text-2xl font-bold text-white">{averageEfficiency}%</p>
                <p className="text-xs text-blue-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% dari bulan lalu
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Skor Kualitas</p>
                <p className="text-2xl font-bold text-white">{averageQuality}%</p>
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3% dari bulan lalu
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pencapaian Target</p>
                <p className="text-2xl font-bold text-white">{totalTargetAchievement}%</p>
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% dari bulan lalu
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Staff Aktif</p>
                <p className="text-2xl font-bold text-white">{filteredStaff.length}</p>
                <p className="text-xs text-slate-400">Dari {staffPerformance.length} total</p>
              </div>
              <div className="w-8 h-8 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend Chart */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Tren Kinerja
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="casesCompleted"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Kasus Selesai"
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Efisiensi (%)"
                />
                <Line
                  type="monotone"
                  dataKey="qualityScore"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Skor Kualitas (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Distribusi Departemen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Staff Performance Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">
            Kinerja Individual Staff ({filteredStaff.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Staff</TableHead>
                  <TableHead className="text-slate-300">Departemen</TableHead>
                  <TableHead className="text-slate-300">Kasus</TableHead>
                  <TableHead className="text-slate-300">Efisiensi</TableHead>
                  <TableHead className="text-slate-300">Kualitas</TableHead>
                  <TableHead className="text-slate-300">Target</TableHead>
                  <TableHead className="text-slate-300">Rating</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map(staff => {
                  const completionRate = Math.round(
                    (staff.casesCompleted / staff.casesAssigned) * 100
                  );
                  const qualityLevel = getPerformanceLevel(staff.qualityScore);

                  return (
                    <TableRow key={staff.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {staff.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </div>
                            <div>
                              <p className="text-white font-medium">{staff.name}</p>
                              <p className="text-xs text-slate-400">{staff.role}</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{staff.department}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white text-sm">
                              {staff.casesCompleted}/{staff.casesAssigned}
                            </span>
                            <Badge
                              variant="secondary"
                              className="bg-slate-700 text-slate-300 text-xs"
                            >
                              {completionRate}%
                            </Badge>
                          </div>
                          <Progress value={completionRate} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-white">{staff.efficiency}%</span>
                          <div className="w-12 bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${staff.efficiency}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={performanceColors[qualityLevel.level]}>
                          {staff.qualityScore}% - {qualityLevel.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-white">{staff.achievement}%</span>
                          {staff.achievement >= 100 ? (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{staff.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                          Aktif
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5" />
            Top Performers Bulan Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {staffPerformance
              .sort((a, b) => b.qualityScore - a.qualityScore)
              .slice(0, 3)
              .map((staff, index) => {
                const staffPhotos = [
                  image_2b3b9b1161dcc7a2ed21ebff0a8093c745e3d57b,
                  'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHN1aXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg4NjkzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  'https://images.unsplash.com/photo-1758691737610-1f18e008f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjB3b3JrZXIlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTg4NjkzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                ];

                const rankingColors = [
                  { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500' }, // 1st
                  { bg: 'bg-gray-400', text: 'text-gray-400', border: 'border-gray-400' }, // 2nd
                  { bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-600' }, // 3rd
                ];

                const rankingIcons = ['👑', '🥈', '🥉'];
                const ranking = index + 1;

                return (
                  <div
                    key={staff.id}
                    className={`bg-slate-700 rounded-lg p-4 relative border-2 ${rankingColors[index].border} border-opacity-50`}
                  >
                    {/* Ranking Badge */}
                    <div
                      className={`absolute -top-3 -right-3 w-8 h-8 ${rankingColors[index].bg} rounded-full flex items-center justify-center shadow-lg z-10`}
                    >
                      <span className="text-white text-sm font-bold">#{ranking}</span>
                    </div>

                    {/* Ranking Icon */}
                    <div className="absolute -top-2 -left-2 text-2xl z-10">
                      {rankingIcons[index]}
                    </div>

                    <div className="flex items-center gap-3 mb-3 mt-2">
                      <div className="relative">
                        <ImageWithFallback
                          src={staffPhotos[index]}
                          alt={`Foto ${staff.name}`}
                          className="w-14 h-14 rounded-full object-cover border-2 border-slate-600 shadow-lg"
                        />

                        {/* Performance indicator */}
                        <div
                          className={`absolute -bottom-1 -right-1 w-6 h-6 ${rankingColors[index].bg} rounded-full flex items-center justify-center border-2 border-slate-700`}
                        >
                          {index === 0 && <Award className="w-3 h-3 text-white" />}
                          {index === 1 && <Star className="w-3 h-3 text-white" />}
                          {index === 2 && <Target className="w-3 h-3 text-white" />}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium">{staff.name}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${rankingColors[index].bg} bg-opacity-20 ${rankingColors[index].text}`}
                          >
                            Peringkat {ranking}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{staff.role}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Kualitas:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-600 rounded-full h-2">
                            <div
                              className={`h-2 ${rankingColors[index].bg} rounded-full transition-all duration-300`}
                              style={{ width: `${staff.qualityScore}%` }}
                            />
                          </div>
                          <span className="text-white font-medium text-sm">
                            {staff.qualityScore}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Efisiensi:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-600 rounded-full h-2">
                            <div
                              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${staff.efficiency}%` }}
                            />
                          </div>
                          <span className="text-white font-medium text-sm">
                            {staff.efficiency}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Pencapaian:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-600 rounded-full h-2">
                            <div
                              className="h-2 bg-green-500 rounded-full transition-all duration-300"
                              style={{ width: `${staff.achievement}%` }}
                            />
                          </div>
                          <span className="text-white font-medium text-sm">
                            {staff.achievement}%
                          </span>
                        </div>
                      </div>

                      {/* Overall Score */}
                      <div className="pt-2 border-t border-slate-600">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300 font-medium text-sm">Skor Total:</span>
                          <span className={`font-bold text-lg ${rankingColors[index].text}`}>
                            {Math.round(
                              (staff.qualityScore + staff.efficiency + staff.achievement) / 3
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
