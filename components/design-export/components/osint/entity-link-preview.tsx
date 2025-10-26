import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Network,
  Users,
  Building2,
  CreditCard,
  MapPin,
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Eye,
  User,
  Banknote,
  Globe,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

const mockEntities = [
  {
    id: '1',
    name: 'John Anderson',
    type: 'Person',
    description: 'CEO of XYZ Corporation',
    sources: ['LinkedIn', 'Twitter/X'],
    confidence: 0.92,
    lastUpdated: '2024-02-18 14:30',
    connections: 8,
    attributes: {
      email: 'john.anderson@xyz.com',
      phone: '+1-555-0123',
      company: 'XYZ Corporation',
      location: 'Jakarta, Indonesia',
    },
  },
  {
    id: '2',
    name: 'XYZ Corporation',
    type: 'Organization',
    description: 'Technology consulting company',
    sources: ['Company Registry', 'LinkedIn'],
    confidence: 0.87,
    lastUpdated: '2024-02-18 13:15',
    connections: 12,
    attributes: {
      registration: '1234567890',
      industry: 'Technology',
      founded: '2018',
      address: 'Jakarta Business District',
    },
  },
  {
    id: '3',
    name: 'Account-001-9876',
    type: 'Financial',
    description: 'Bank account linked to XYZ Corp',
    sources: ['Financial Records', 'OSINT'],
    confidence: 0.78,
    lastUpdated: '2024-02-18 12:00',
    connections: 5,
    attributes: {
      bank: 'Bank ABC',
      type: 'Corporate Account',
      status: 'Active',
      currency: 'IDR',
    },
  },
  {
    id: '4',
    name: 'Property-JKT-2024',
    type: 'Asset',
    description: 'Commercial property in Jakarta',
    sources: ['Land Registry', 'Public Records'],
    confidence: 0.94,
    lastUpdated: '2024-02-18 11:30',
    connections: 3,
    attributes: {
      type: 'Commercial Building',
      value: 'IDR 25,000,000,000',
      location: 'South Jakarta',
      owner: 'XYZ Corporation',
    },
  },
];

const mockConnections = [
  { from: '1', to: '2', type: 'employment', weight: 0.9 },
  { from: '2', to: '3', type: 'ownership', weight: 0.8 },
  { from: '2', to: '4', type: 'ownership', weight: 0.95 },
  { from: '1', to: '3', type: 'authorized_signatory', weight: 0.7 },
  { from: '1', to: '4', type: 'beneficial_owner', weight: 0.6 },
];

const entityTypeColors = {
  Person: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
  Organization: 'bg-green-600/20 text-green-400 border-green-500/50',
  Financial: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
  Asset: 'bg-purple-600/20 text-purple-400 border-purple-500/50',
  Location: 'bg-red-600/20 text-red-400 border-red-500/50',
};

const entityTypeIcons = {
  Person: User,
  Organization: Building2,
  Financial: CreditCard,
  Asset: Banknote,
  Location: MapPin,
};

const connectionTypes = {
  employment: 'Employment',
  ownership: 'Ownership',
  authorized_signatory: 'Authorized Signatory',
  beneficial_owner: 'Beneficial Owner',
  business_relationship: 'Business Relationship',
  family_relation: 'Family Relation',
};

export function EntityLinkPreview() {
  const [entities, setEntities] = useState(mockEntities);
  const [selectedEntity, setSelectedEntity] = useState(mockEntities[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('graph');

  const filteredEntities = entities.filter(entity => {
    const matchesSearch =
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || entity.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleEntitySelect = entity => {
    setSelectedEntity(entity);
    toast.info(`Entitas "${entity.name}" dipilih`);
  };

  const handleExportGraph = () => {
    toast.success('Graph jaringan entitas berhasil diekspor');
  };

  const getEntityConnections = entityId => {
    return mockConnections.filter(conn => conn.from === entityId || conn.to === entityId);
  };

  const getConnectedEntities = entityId => {
    const connections = getEntityConnections(entityId);
    const connectedIds = connections.map(conn => (conn.from === entityId ? conn.to : conn.from));
    return entities.filter(entity => connectedIds.includes(entity.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Entity Link Preview</h1>
          <p className="text-slate-400 mt-1">
            Visualisasi hubungan antar entitas hasil crawling OSINT
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleExportGraph}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Graph
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Share2 className="w-4 h-4 mr-2" />
            Share View
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Visualization Area */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800 border-slate-700 h-[600px]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Network className="w-5 h-5 text-blue-400" />
                  Network Graph
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full p-6">
              {/* Simplified Graph Representation */}
              <div className="relative w-full h-full bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-8 relative">
                    {/* Central node */}
                    <div className="col-span-2 flex justify-center">
                      <div
                        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors"
                        onClick={() => handleEntitySelect(entities[0])}
                      >
                        <User className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Connected nodes */}
                    {entities.slice(1, 4).map((entity, index) => {
                      const EntityIcon = entityTypeIcons[entity.type];
                      const positions = [
                        'translate-x-[-60px] translate-y-[-30px]',
                        'translate-x-[60px] translate-y-[-30px]',
                        'translate-y-[40px]',
                      ];

                      return (
                        <div key={entity.id} className={`absolute ${positions[index]}`}>
                          <div
                            className={`w-12 h-12 ${entity.type === 'Organization' ? 'bg-green-600' : entity.type === 'Financial' ? 'bg-yellow-600' : 'bg-purple-600'} rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
                            onClick={() => handleEntitySelect(entity)}
                          >
                            <EntityIcon className="w-6 h-6 text-white" />
                          </div>
                          {/* Connection lines */}
                          <svg className="absolute top-6 left-6 w-24 h-24 pointer-events-none">
                            <line
                              x1="0"
                              y1="0"
                              x2={index === 0 ? '60' : index === 1 ? '-60' : '0'}
                              y2={index === 2 ? '-40' : '30'}
                              stroke="#475569"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Graph Legend */}
                <div className="absolute bottom-4 left-4 bg-slate-800/80 rounded-lg p-3 border border-slate-600">
                  <h4 className="text-sm font-medium text-white mb-2">Legend</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-300">Person</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span className="text-slate-300">Organization</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                      <span className="text-slate-300">Financial</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span className="text-slate-300">Asset</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entity Details Panel */}
        <div className="space-y-6">
          {/* Entity Search */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-green-400" />
                Entity Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Cari entitas..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Person">Person</SelectItem>
                  <SelectItem value="Organization">Organization</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Asset">Asset</SelectItem>
                  <SelectItem value="Location">Location</SelectItem>
                </SelectContent>
              </Select>

              <div className="max-h-40 overflow-y-auto space-y-2">
                {filteredEntities.map(entity => {
                  const EntityIcon = entityTypeIcons[entity.type];
                  return (
                    <div
                      key={entity.id}
                      className={`p-2 rounded-lg border cursor-pointer transition-colors hover:bg-slate-700/50 ${
                        selectedEntity?.id === entity.id
                          ? 'bg-slate-700 border-blue-500'
                          : 'border-slate-600'
                      }`}
                      onClick={() => handleEntitySelect(entity)}
                    >
                      <div className="flex items-center gap-2">
                        <EntityIcon className="w-4 h-4 text-slate-400" />
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium truncate">{entity.name}</p>
                          <p className="text-xs text-slate-400 truncate">{entity.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Selected Entity Details */}
          {selectedEntity && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  Entity Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="connections">Connections</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                          {React.createElement(entityTypeIcons[selectedEntity.type], {
                            className: 'w-6 h-6 text-slate-400',
                          })}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{selectedEntity.name}</h3>
                          <Badge className={entityTypeColors[selectedEntity.type]}>
                            {selectedEntity.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-slate-300 text-sm">{selectedEntity.description}</p>

                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Confidence: {(selectedEntity.confidence * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{selectedEntity.lastUpdated}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-300">Attributes</h4>
                        <div className="space-y-1">
                          {Object.entries(selectedEntity.attributes).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-slate-400 capitalize">
                                {key.replace('_', ' ')}:
                              </span>
                              <span className="text-slate-300">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-300">Sources</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedEntity.sources.map(source => (
                            <Badge key={source} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="connections" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-slate-300">
                        Connected Entities ({getConnectedEntities(selectedEntity.id).length})
                      </h4>

                      {getConnectedEntities(selectedEntity.id).map(connectedEntity => {
                        const connection = mockConnections.find(
                          conn =>
                            (conn.from === selectedEntity.id && conn.to === connectedEntity.id) ||
                            (conn.to === selectedEntity.id && conn.from === connectedEntity.id)
                        );
                        const ConnectedIcon = entityTypeIcons[connectedEntity.type];

                        return (
                          <div
                            key={connectedEntity.id}
                            className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                          >
                            <div className="flex items-center gap-3">
                              <ConnectedIcon className="w-5 h-5 text-slate-400" />
                              <div className="flex-1">
                                <p className="text-white text-sm font-medium">
                                  {connectedEntity.name}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {connectedEntity.description}
                                </p>
                                {connection && (
                                  <Badge variant="outline" className="text-xs mt-1">
                                    {connectionTypes[connection.type]}
                                  </Badge>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-white"
                                onClick={() => handleEntitySelect(connectedEntity)}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Network className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{entities.length}</p>
            <p className="text-sm text-slate-400">Total Entities</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Share2 className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{mockConnections.length}</p>
            <p className="text-sm text-slate-400">Connections</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {[...new Set(entities.map(e => e.type))].length}
            </p>
            <p className="text-sm text-slate-400">Entity Types</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-yellow-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Globe className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {[...new Set(entities.flatMap(e => e.sources))].length}
            </p>
            <p className="text-sm text-slate-400">Data Sources</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
