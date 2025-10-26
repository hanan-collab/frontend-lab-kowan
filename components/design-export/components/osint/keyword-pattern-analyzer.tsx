import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Textarea } from '../ui/textarea';
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Globe,
  MessageSquare,
  Target,
  TrendingUp,
  Hash,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

const mockSearchResults = [
  {
    id: '1',
    keyword: 'pencucian uang',
    source: 'Twitter/X',
    date: '2024-02-18 14:30',
    content:
      'Investigasi terbaru menunjukkan adanya skema pencucian uang melalui mata uang kripto...',
    url: 'https://twitter.com/user/status/123456',
    sentiment: 'neutral',
    relevanceScore: 0.95,
  },
  {
    id: '2',
    keyword: 'korupsi dana',
    source: 'Facebook',
    date: '2024-02-18 13:15',
    content: 'Laporan mengenai dugaan korupsi dana bantuan sosial di beberapa daerah...',
    url: 'https://facebook.com/post/789012',
    sentiment: 'negative',
    relevanceScore: 0.87,
  },
  {
    id: '3',
    keyword: 'aset tersembunyi',
    source: 'LinkedIn',
    date: '2024-02-18 12:45',
    content: 'Diskusi mengenai metode pelacakan aset tersembunyi dalam kasus korupsi...',
    url: 'https://linkedin.com/posts/345678',
    sentiment: 'neutral',
    relevanceScore: 0.78,
  },
  {
    id: '4',
    keyword: 'transfer dana mencurigakan',
    source: 'Detik.com',
    date: '2024-02-18 11:20',
    content: 'Bank Indonesia melaporkan adanya peningkatan transfer dana mencurigakan...',
    url: 'https://detik.com/news/berita/456789',
    sentiment: 'negative',
    relevanceScore: 0.92,
  },
  {
    id: '5',
    keyword: 'offshore account',
    source: 'Kompas.com',
    date: '2024-02-18 10:30',
    content: 'Analisis mengenai penggunaan offshore account dalam skema penghindaran pajak...',
    url: 'https://kompas.com/read/567890',
    sentiment: 'neutral',
    relevanceScore: 0.84,
  },
];

const sentimentColors = {
  positive: 'bg-green-600/20 text-green-400 border-green-500/50',
  neutral: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  negative: 'bg-red-600/20 text-red-400 border-red-500/50',
};

const sourceIcons = {
  'Twitter/X': MessageSquare,
  Facebook: MessageSquare,
  LinkedIn: MessageSquare,
  Instagram: MessageSquare,
  'Detik.com': Globe,
  'Kompas.com': Globe,
  'CNN Indonesia': Globe,
  Tokopedia: Globe,
  Shopee: Globe,
};

export function KeywordPatternAnalyzer() {
  const [searchResults, setSearchResults] = useState(mockSearchResults);
  const [searchParams, setSearchParams] = useState({
    keywords: '',
    source: 'all',
    dateFrom: '',
    dateTo: '',
    sentiment: 'all',
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchParams.keywords.trim()) {
      toast.error('Masukkan kata kunci pencarian');
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      toast.success(
        `Ditemukan ${searchResults.length} hasil untuk kata kunci "${searchParams.keywords}"`
      );
    }, 2000);
  };

  const handleExport = () => {
    toast.success('Data hasil pencarian berhasil diekspor');
  };

  const filteredResults = searchResults.filter(result => {
    const matchesSource = searchParams.source === 'all' || result.source === searchParams.source;
    const matchesSentiment =
      searchParams.sentiment === 'all' || result.sentiment === searchParams.sentiment;
    return matchesSource && matchesSentiment;
  });

  const totalMatches = filteredResults.length;
  const avgRelevance =
    filteredResults.reduce((sum, r) => sum + r.relevanceScore, 0) / filteredResults.length;
  const sentimentDistribution = {
    positive: filteredResults.filter(r => r.sentiment === 'positive').length,
    neutral: filteredResults.filter(r => r.sentiment === 'neutral').length,
    negative: filteredResults.filter(r => r.sentiment === 'negative').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Keyword & Pattern Analyzer</h1>
          <p className="text-slate-400 mt-1">Analisis kata kunci dan pola dalam data OSINT</p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleExport}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-blue-600 hover:bg-blue-500"
          >
            {isSearching ? (
              <>
                <Search className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search Configuration */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            Konfigurasi Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Kata Kunci / Target Pencarian</Label>
              <Textarea
                value={searchParams.keywords}
                onChange={e => setSearchParams(prev => ({ ...prev, keywords: e.target.value }))}
                className="bg-slate-700 border-slate-600"
                placeholder="Masukkan kata kunci, pisahkan dengan koma jika lebih dari satu..."
                rows={3}
              />
              <p className="text-xs text-slate-400">
                Contoh: pencucian uang, korupsi, aset tersembunyi, offshore account
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Sumber Data</Label>
                <Select
                  value={searchParams.source}
                  onValueChange={value => setSearchParams(prev => ({ ...prev, source: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Semua Sumber</SelectItem>
                    <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Detik.com">Detik.com</SelectItem>
                    <SelectItem value="Kompas.com">Kompas.com</SelectItem>
                    <SelectItem value="CNN Indonesia">CNN Indonesia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label className="text-slate-300">Dari Tanggal</Label>
                  <Input
                    type="date"
                    value={searchParams.dateFrom}
                    onChange={e => setSearchParams(prev => ({ ...prev, dateFrom: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Sampai Tanggal</Label>
                  <Input
                    type="date"
                    value={searchParams.dateTo}
                    onChange={e => setSearchParams(prev => ({ ...prev, dateTo: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Filter Sentimen</Label>
              <Select
                value={searchParams.sentiment}
                onValueChange={value => setSearchParams(prev => ({ ...prev, sentiment: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 w-48">
                  <SelectValue placeholder="Pilih sentimen" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Semua Sentimen</SelectItem>
                  <SelectItem value="positive">Positif</SelectItem>
                  <SelectItem value="neutral">Netral</SelectItem>
                  <SelectItem value="negative">Negatif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Hash className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{totalMatches}</p>
            <p className="text-sm text-slate-400">Total Hasil</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{(avgRelevance * 100).toFixed(0)}%</p>
            <p className="text-sm text-slate-400">Rata-rata Relevansi</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-red-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-white">{sentimentDistribution.negative}</p>
            <p className="text-sm text-slate-400">Sentimen Negatif</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Globe className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {[...new Set(filteredResults.map(r => r.source))].length}
            </p>
            <p className="text-sm text-slate-400">Sumber Berbeda</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Results */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-green-400" />
              Hasil Pencarian ({filteredResults.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">
                Filter: {searchParams.source !== 'all' ? searchParams.source : 'Semua'} |
                {searchParams.sentiment !== 'all' ? searchParams.sentiment : 'Semua Sentimen'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Kata Kunci</TableHead>
                <TableHead className="text-slate-300">Sumber</TableHead>
                <TableHead className="text-slate-300">Tanggal</TableHead>
                <TableHead className="text-slate-300">Cuplikan Konten</TableHead>
                <TableHead className="text-slate-300">Sentimen</TableHead>
                <TableHead className="text-slate-300">Relevansi</TableHead>
                <TableHead className="text-slate-300">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map(result => {
                const SourceIcon = sourceIcons[result.source] || Globe;

                return (
                  <TableRow key={result.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell>
                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">
                        {result.keyword}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <SourceIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-white">{result.source}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm">{result.date}</TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-slate-300 text-sm truncate">{result.content}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={sentimentColors[result.sentiment]}>
                        {result.sentiment === 'positive' && (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        )}
                        {result.sentiment === 'negative' && (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {result.sentiment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${result.relevanceScore * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-white">
                          {(result.relevanceScore * 100).toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                          onClick={() => window.open(result.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pattern Analysis Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Analisis Pola Kata Kunci
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">pencucian uang</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-sm text-white">45</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">korupsi dana</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }} />
                  </div>
                  <span className="text-sm text-white">32</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">aset tersembunyi</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <span className="text-sm text-white">28</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">transfer mencurigakan</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                  <span className="text-sm text-white">19</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Distribusi Temporal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Hari ini</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }} />
                  </div>
                  <span className="text-sm text-white">{filteredResults.length}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Kemarin</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                  <span className="text-sm text-white">42</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Minggu ini</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-sm text-white">298</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Bulan ini</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <span className="text-sm text-white">1,247</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
