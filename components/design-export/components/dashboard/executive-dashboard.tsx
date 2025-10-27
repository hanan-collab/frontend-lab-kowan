import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { format } from 'date-fns';
import indonesiaMap from 'figma:asset/eec0798aa79e64301592237144b719325528103f.png';

const metricsData = [
  {
    title: 'Total Aset',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Building2,
    color: 'text-blue-400',
  },
  {
    title: 'Total Tersangka',
    value: '1,523',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'text-red-400',
  },
  {
    title: 'Total Transaksi',
    value: '45,721',
    change: '+23.1%',
    trend: 'up',
    icon: ArrowUpRight,
    color: 'text-green-400',
  },
  {
    title: 'Total Hubungan',
    value: '8,934',
    change: '-3.2%',
    trend: 'down',
    icon: ArrowDownRight,
    color: 'text-yellow-400',
  },
];

const financialFlowData = [
  { month: 'Jan', inflow: 1200000, outflow: 800000 },
  { month: 'Feb', inflow: 1500000, outflow: 1100000 },
  { month: 'Mar', inflow: 1800000, outflow: 1300000 },
  { month: 'Apr', inflow: 2200000, outflow: 1600000 },
  { month: 'Mei', inflow: 1900000, outflow: 1400000 },
  { month: 'Jun', inflow: 2500000, outflow: 1800000 },
];

const caseGrowthData = [
  { month: 'Jan', cases: 45 },
  { month: 'Feb', cases: 52 },
  { month: 'Mar', cases: 48 },
  { month: 'Apr', cases: 61 },
  { month: 'Mei', cases: 55 },
  { month: 'Jun', cases: 67 },
];

const assetTypeData = [
  { name: 'Properti', value: 45, color: '#3b82f6' },
  { name: 'Kendaraan', value: 30, color: '#10b981' },
  { name: 'Rekening Bank', value: 15, color: '#f59e0b' },
  { name: 'Bisnis', value: 10, color: '#ef4444' },
];

// Mock data untuk transaksi mencurigakan
const suspiciousTransactionsData = [
  { period: 'Sen', count: 23, transfers: 15, crypto: 5, property: 3 },
  { period: 'Sel', count: 31, transfers: 20, crypto: 7, property: 4 },
  { period: 'Rab', count: 28, transfers: 18, crypto: 6, property: 4 },
  { period: 'Kam', count: 42, transfers: 28, crypto: 9, property: 5 },
  { period: 'Jum', count: 38, transfers: 24, crypto: 10, property: 4 },
  { period: 'Sab', count: 19, transfers: 12, crypto: 4, property: 3 },
  { period: 'Ming', count: 15, transfers: 10, crypto: 3, property: 2 },
];

const locationData = [
  {
    city: 'Jakarta',
    projects: 28,
    lat: -6.2088,
    lng: 106.8456,
    details: {
      aktif: 15,
      selesai: 8,
      pending: 3,
      ditunda: 2,
      status: 'Investigasi Aktif',
      totalNilai: 'Rp 125.3 M',
      investigasiTypes: ['Korupsi APBD', 'Pencucian Uang', 'Suap Tender'],
      teamCount: 45,
      evidenceCount: 234,
    },
  },
  {
    city: 'Surabaya',
    projects: 19,
    lat: -7.2575,
    lng: 112.7521,
    details: {
      aktif: 11,
      selesai: 6,
      pending: 1,
      ditunda: 1,
      status: 'Monitoring Lanjut',
      totalNilai: 'Rp 87.2 M',
      investigasiTypes: ['Fraud Perusahaan', 'Narkoba', 'Korupsi Daerah'],
      teamCount: 32,
      evidenceCount: 187,
    },
  },
  {
    city: 'Bandung',
    projects: 15,
    lat: -6.9175,
    lng: 107.6191,
    details: {
      aktif: 9,
      selesai: 4,
      pending: 2,
      ditunda: 0,
      status: 'Eksekusi Putusan',
      totalNilai: 'Rp 64.1 M',
      investigasiTypes: ['Penggelapan Dana', 'Pencucian Uang'],
      teamCount: 24,
      evidenceCount: 156,
    },
  },
  {
    city: 'Medan',
    projects: 12,
    lat: 3.5952,
    lng: 98.6722,
    details: {
      aktif: 7,
      selesai: 3,
      pending: 2,
      ditunda: 0,
      status: 'Investigasi Awal',
      totalNilai: 'Rp 45.7 M',
      investigasiTypes: ['Illegal Logging', 'Korupsi Kehutanan'],
      teamCount: 18,
      evidenceCount: 98,
    },
  },
  {
    city: 'Makassar',
    projects: 9,
    lat: -5.1477,
    lng: 119.4327,
    details: {
      aktif: 5,
      selesai: 3,
      pending: 1,
      ditunda: 0,
      status: 'Monitoring',
      totalNilai: 'Rp 32.4 M',
      investigasiTypes: ['Kejahatan Maritim', 'Penyelundupan'],
      teamCount: 15,
      evidenceCount: 74,
    },
  },
];

export function ExecutiveDashboard() {
  const [dateRange, setDateRange] = useState<Date>();
  const [caseType, setCaseType] = useState('all');
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [suspiciousPeriod, setSuspiciousPeriod] = useState('7days');
  const [suspiciousType, setSuspiciousType] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Dasbor Eksekutif</h1>
          <p className="text-slate-400 mt-1">Ikhtisar operasi investigasi dan pelacakan aset</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:text-white w-full sm:w-auto"
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">
                  {dateRange ? format(dateRange, 'MMM dd, yyyy') : 'Pilih Rentang Tanggal'}
                </span>
                <span className="sm:hidden">
                  {dateRange ? format(dateRange, 'MMM dd') : 'Rentang Tanggal'}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
              <Calendar
                mode="single"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
                className="bg-slate-800 text-white"
              />
            </PopoverContent>
          </Popover>

          <Select value={caseType} onValueChange={setCaseType}>
            <SelectTrigger className="w-full sm:w-48 border-slate-600 text-slate-300">
              <SelectValue placeholder="Pilih jenis kasus" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-slate-300">
                Semua Kasus
              </SelectItem>
              <SelectItem value="money-laundering" className="text-slate-300">
                Pencucian Uang
              </SelectItem>
              <SelectItem value="fraud" className="text-slate-300">
                Penipuan
              </SelectItem>
              <SelectItem value="corruption" className="text-slate-300">
                Korupsi
              </SelectItem>
              <SelectItem value="organized-crime" className="text-slate-300">
                Kejahatan Terorganisir
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{metric.title}</p>
                  <p className="text-2xl font-bold text-white mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                    )}
                    <span
                      className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {metric.change}
                    </span>
                    <span className="text-slate-400 text-sm ml-1">vs bulan lalu</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-slate-700 ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Geographic Map - Full Width */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Lokasi Project</CardTitle>
          <CardDescription className="text-slate-400">
            Distribusi geografis project investigasi aktif
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-700 rounded-lg p-2 h-64 lg:h-80 relative overflow-hidden">
            {/* Peta Indonesia SVG */}
            <div className="relative w-full h-full">
              {/* Background map image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded"
                style={{
                  backgroundImage: `url(${indonesiaMap})`,
                  filter: 'brightness(0.7) contrast(1.2)',
                }}
              />

              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-slate-900/40 rounded" />

              {/* Interactive markers overlay */}
              <svg viewBox="0 0 1000 400" className="absolute inset-0 w-full h-full">
                {/* Asset markers */}
                {locationData.map((location, index) => {
                  // Koordinat marker disesuaikan dengan gambar peta yang baru
                  const svgCoords = {
                    Jakarta: { x: 380, y: 280 },
                    Surabaya: { x: 520, y: 290 },
                    Bandung: { x: 360, y: 285 },
                    Medan: { x: 120, y: 140 },
                    Makassar: { x: 630, y: 270 },
                  };

                  const coords = svgCoords[location.city] || { x: 500, y: 200 };
                  const size = Math.max(8, Math.min(20, location.projects + 5));
                  const isHovered = hoveredLocation?.city === location.city;
                  const isSelected = selectedLocation?.city === location.city;

                  return (
                    <g key={index}>
                      {/* Marker glow effect */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={size + (isHovered ? 10 : 6)}
                        fill={isSelected ? '#10b981' : '#3b82f6'}
                        fillOpacity={isHovered ? '0.6' : '0.4'}
                        className={isHovered ? 'animate-pulse' : ''}
                      />
                      {/* Main marker */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isHovered ? size + 3 : size}
                        fill={isSelected ? '#10b981' : isHovered ? '#60a5fa' : '#3b82f6'}
                        stroke={isSelected ? '#34d399' : '#ffffff'}
                        strokeWidth="3"
                        className="cursor-pointer transition-all duration-200 drop-shadow-lg"
                        onMouseEnter={() => setHoveredLocation(location)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        onClick={() =>
                          setSelectedLocation(
                            selectedLocation?.city === location.city ? null : location
                          )
                        }
                      />
                      {/* Project count label */}
                      <text
                        x={coords.x}
                        y={coords.y + 4}
                        textAnchor="middle"
                        className="fill-white text-xs font-bold pointer-events-none drop-shadow-md"
                        fontSize={isHovered ? '12' : '11'}
                        style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }}
                      >
                        {location.projects}
                      </text>
                    </g>
                  );
                })}

                {/* Legend */}
                <g transform="translate(20, 20)">
                  <rect
                    width="180"
                    height="90"
                    fill="#1f2937"
                    stroke="#374151"
                    strokeWidth="1"
                    rx="6"
                    fillOpacity="0.95"
                  />
                  <text x="10" y="18" className="fill-white text-xs font-medium" fontSize="12">
                    Legenda Project
                  </text>

                  <circle cx="18" cy="35" r="6" fill="#3b82f6" />
                  <text x="30" y="39" className="fill-slate-200 text-xs" fontSize="10">
                    Tinggi (20+)
                  </text>

                  <circle cx="18" cy="52" r="8" fill="#10b981" />
                  <text x="32" y="56" className="fill-slate-200 text-xs" fontSize="10">
                    Sedang (10-19)
                  </text>

                  <circle cx="18" cy="69" r="10" fill="#f59e0b" />
                  <text x="34" y="73" className="fill-slate-200 text-xs" fontSize="10">
                    Rendah (&lt;10)
                  </text>

                  <text x="95" y="35" className="fill-slate-300 text-xs" fontSize="9">
                    Ukuran = Jumlah Project
                  </text>
                  <text x="95" y="48" className="fill-slate-300 text-xs" fontSize="9">
                    Hover untuk detail
                  </text>
                </g>
              </svg>

              {/* Hover/Select Info Panel */}
              {hoveredLocation || selectedLocation ? (
                <div className="absolute top-2 right-2 bg-slate-800 border border-slate-600 rounded-lg p-4 max-w-xs shadow-xl z-10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium text-lg">
                        {(selectedLocation || hoveredLocation).city}
                      </h4>
                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">
                        {(selectedLocation || hoveredLocation).projects} Project
                      </Badge>
                    </div>

                    {selectedLocation && (
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="bg-slate-700/50 p-2 rounded">
                            <div className="text-slate-400 text-xs">Aktif</div>
                            <div className="text-green-400 font-medium">
                              {selectedLocation.details.aktif}
                            </div>
                          </div>
                          <div className="bg-slate-700/50 p-2 rounded">
                            <div className="text-slate-400 text-xs">Selesai</div>
                            <div className="text-blue-400 font-medium">
                              {selectedLocation.details.selesai}
                            </div>
                          </div>
                          <div className="bg-slate-700/50 p-2 rounded">
                            <div className="text-slate-400 text-xs">Pending</div>
                            <div className="text-yellow-400 font-medium">
                              {selectedLocation.details.pending}
                            </div>
                          </div>
                          <div className="bg-slate-700/50 p-2 rounded">
                            <div className="text-slate-400 text-xs">Ditunda</div>
                            <div className="text-red-400 font-medium">
                              {selectedLocation.details.ditunda}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Status:</span>
                          <span className="text-cyan-400 font-medium">
                            {selectedLocation.details.status}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Total Nilai:</span>
                          <span className="text-green-400 font-medium">
                            {selectedLocation.details.totalNilai}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Tim Investigator:</span>
                          <span className="text-cyan-400 font-medium">
                            {selectedLocation.details.teamCount}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-300">Bukti Terkumpul:</span>
                          <span className="text-purple-400 font-medium">
                            {selectedLocation.details.evidenceCount}
                          </span>
                        </div>

                        <div className="text-slate-300 mb-1">Jenis Investigasi:</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedLocation.details.investigasiTypes.map((type, i) => (
                            <span
                              key={i}
                              className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-2 right-2 bg-slate-800 border border-slate-600 rounded-lg p-3 max-w-48 opacity-90">
                  <h4 className="text-white font-medium text-sm mb-2">Statistik Project</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total Lokasi:</span>
                      <span className="text-white font-medium">{locationData.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total Project:</span>
                      <span className="text-white font-medium">
                        {locationData.reduce((sum, loc) => sum + loc.projects, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Terbanyak:</span>
                      <span className="text-white font-medium">
                        {
                          locationData.reduce((max, loc) =>
                            loc.projects > max.projects ? loc : max
                          ).city
                        }
                      </span>
                    </div>
                    <div className="text-slate-400 text-xs mt-2">Klik marker untuk detail</div>
                  </div>
                </div>
              )}

              {/* City labels */}
              <div className="absolute inset-0 pointer-events-none">
                {locationData.map((location, index) => {
                  const labelPositions = {
                    Jakarta: { x: '38%', y: '75%' },
                    Surabaya: { x: '52%', y: '78%' },
                    Bandung: { x: '36%', y: '77%' },
                    Medan: { x: '12%', y: '38%' },
                    Makassar: { x: '63%', y: '72%' },
                  };

                  const pos = labelPositions[location.city] || { x: '50%', y: '50%' };

                  return (
                    <div
                      key={index}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: pos.x, top: pos.y }}
                    >
                      <div className="bg-black bg-opacity-80 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border border-slate-600 shadow-lg">
                        <div className="font-semibold">{location.city}</div>
                        <div className="text-blue-300 text-xs">{location.projects} project</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Three Charts in a Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Flow Chart */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Analisis Aliran Keuangan</CardTitle>
            <CardDescription className="text-slate-400">
              Pelacakan aliran masuk vs keluar bulanan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] lg:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(value, name) => [
                      `Rp ${new Intl.NumberFormat('id-ID').format(value)}`,
                      name,
                    ]}
                    labelFormatter={label => `Bulan: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="inflow"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    name="Aliran Masuk"
                  />
                  <Area
                    type="monotone"
                    dataKey="outflow"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.3}
                    name="Aliran Keluar"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Case Growth Trend */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Tren Pertumbuhan Kasus</CardTitle>
            <CardDescription className="text-slate-400">
              Kasus baru yang dibuka per bulan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] lg:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={caseGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(value, name) => [`${value} kasus`, name]}
                    labelFormatter={label => `Bulan: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Kasus Baru"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset Type Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Distribusi Aset</CardTitle>
            <CardDescription className="text-slate-400">Berdasarkan jenis aset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] lg:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {assetTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {assetTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suspicious Transactions Chart - Full Width */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <CardTitle className="text-white">Transaksi Mencurigakan</CardTitle>
                <CardDescription className="text-slate-400">
                  Aktivitas transaksi yang terdeteksi sebagai mencurigakan
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={suspiciousPeriod} onValueChange={setSuspiciousPeriod}>
                  <SelectTrigger className="w-full sm:w-40 border-slate-600 text-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="7days" className="text-slate-300">
                      7 Hari Terakhir
                    </SelectItem>
                    <SelectItem value="30days" className="text-slate-300">
                      30 Hari Terakhir
                    </SelectItem>
                    <SelectItem value="custom" className="text-slate-300">
                      Custom Range
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={suspiciousType} onValueChange={setSuspiciousType}>
                  <SelectTrigger className="w-full sm:w-40 border-slate-600 text-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-slate-300">
                      Semua Jenis
                    </SelectItem>
                    <SelectItem value="transfers" className="text-slate-300">
                      Transfer Bank
                    </SelectItem>
                    <SelectItem value="crypto" className="text-slate-300">
                      Kripto
                    </SelectItem>
                    <SelectItem value="property" className="text-slate-300">
                      Properti
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={suspiciousTransactionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="period" stroke="#9ca3af" fontSize={12} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  formatter={(value, name) => {
                    const nameMap = {
                      count: 'Total',
                      transfers: 'Transfer Bank',
                      crypto: 'Kripto',
                      property: 'Properti',
                    };
                    return [`${value} transaksi`, nameMap[name] || name];
                  }}
                  labelFormatter={label => `Periode: ${label}`}
                />
                {suspiciousType === 'all' && (
                  <>
                    <Bar
                      dataKey="transfers"
                      stackId="a"
                      fill="#3b82f6"
                      name="transfers"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="crypto"
                      stackId="a"
                      fill="#8b5cf6"
                      name="crypto"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="property"
                      stackId="a"
                      fill="#10b981"
                      name="property"
                      radius={[4, 4, 0, 0]}
                    />
                  </>
                )}
                {suspiciousType === 'transfers' && (
                  <Bar dataKey="transfers" fill="#3b82f6" name="transfers" radius={[4, 4, 0, 0]} />
                )}
                {suspiciousType === 'crypto' && (
                  <Bar dataKey="crypto" fill="#8b5cf6" name="crypto" radius={[4, 4, 0, 0]} />
                )}
                {suspiciousType === 'property' && (
                  <Bar dataKey="property" fill="#10b981" name="property" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-slate-300 text-sm">Transfer Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-purple-500" />
                <span className="text-slate-300 text-sm">Kripto</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500" />
                <span className="text-slate-300 text-sm">Properti</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Panel */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Ringkasan</CardTitle>
            <CardDescription className="text-slate-400">
              Periode {suspiciousPeriod === '7days' ? '7 hari' : '30 hari'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Total Transactions */}
            <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Total Transaksi</span>
                <Badge className="bg-red-600/20 text-red-400 border-red-500/50">Mencurigakan</Badge>
              </div>
              <div className="text-3xl font-bold text-white">
                {suspiciousTransactionsData.reduce((sum, item) => {
                  if (suspiciousType === 'all') return sum + item.count;
                  return sum + item[suspiciousType];
                }, 0)}
              </div>
            </div>

            {/* Percentage Change */}
            <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Perubahan</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 text-sm font-medium">+18.3%</span>
                </div>
              </div>
              <p className="text-slate-300 text-xs">vs periode sebelumnya</p>
            </div>

            {/* Breakdown by Type */}
            <div className="space-y-3">
              <h4 className="text-white font-medium text-sm">Detail Jenis</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-slate-300 text-sm">Transfer Bank</span>
                  </div>
                  <span className="text-white font-medium text-sm">
                    {suspiciousTransactionsData.reduce((sum, item) => sum + item.transfers, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-slate-300 text-sm">Kripto</span>
                  </div>
                  <span className="text-white font-medium text-sm">
                    {suspiciousTransactionsData.reduce((sum, item) => sum + item.crypto, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-slate-300 text-sm">Properti</span>
                  </div>
                  <span className="text-white font-medium text-sm">
                    {suspiciousTransactionsData.reduce((sum, item) => sum + item.property, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button className="w-full bg-red-600 hover:bg-red-500 text-white">
              Lihat Detail Lengkap
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
