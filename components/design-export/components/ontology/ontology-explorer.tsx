import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import {
  Search,
  Plus,
  Filter,
  Users,
  Building2,
  ArrowRightLeft,
  MapPin,
  Calendar,
  User,
  Briefcase,
  DollarSign,
  Phone,
  Mail,
  Home,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Settings,
  Eye,
  EyeOff,
  Maximize2,
  Target,
  Network,
} from 'lucide-react';

// Enhanced mock data with more sophisticated relationships
const mockNodes = [
  {
    id: '1',
    name: 'John Smith',
    category: 'Suspect',
    attributes: {
      age: 45,
      address: '123 Main St, New York',
      phone: '+1-555-0123',
      email: 'j.smith@email.com',
      nationality: 'USA',
      occupation: 'Business Executive',
    },
    position: { x: 300, y: 200 },
    connections: ['2', '3', '4'],
    riskLevel: 'high',
    lastActivity: '2024-01-20',
  },
  {
    id: '2',
    name: 'ABC Holdings LLC',
    category: 'Organization',
    attributes: {
      type: 'Limited Liability Company',
      registered: '2019-03-15',
      address: '456 Business Ave, NY',
      revenue: '$5M annually',
      status: 'Active',
    },
    position: { x: 500, y: 150 },
    connections: ['1', '3', '5', '6'],
    riskLevel: 'medium',
    lastActivity: '2024-01-18',
  },
  {
    id: '3',
    name: 'Luxury Apartment Complex',
    category: 'Asset',
    attributes: {
      type: 'Real Estate',
      value: '$2,500,000',
      location: '789 Park Ave, Manhattan',
      purchased: '2020-06-10',
      status: 'Owned',
    },
    position: { x: 400, y: 350 },
    connections: ['1', '2'],
    riskLevel: 'low',
    lastActivity: '2024-01-15',
  },
  {
    id: '4',
    name: 'Bank Account #12345',
    category: 'Asset',
    attributes: {
      type: 'Bank Account',
      balance: '$450,000',
      bank: 'First National Bank',
      opened: '2018-02-20',
      status: 'Active',
    },
    position: { x: 150, y: 300 },
    connections: ['1', '5'],
    riskLevel: 'high',
    lastActivity: '2024-01-22',
  },
  {
    id: '5',
    name: 'Transaction T-001',
    category: 'Transaction',
    attributes: {
      amount: '$50,000',
      date: '2024-01-15',
      type: 'Wire Transfer',
      status: 'Completed',
      reference: 'TXN-001-2024',
    },
    position: { x: 600, y: 250 },
    connections: ['2', '4', '6'],
    riskLevel: 'high',
    lastActivity: '2024-01-15',
  },
  {
    id: '6',
    name: 'Maria Rodriguez',
    category: 'Suspect',
    attributes: {
      age: 38,
      address: '321 Oak Street, Brooklyn',
      phone: '+1-555-0456',
      email: 'm.rodriguez@email.com',
      nationality: 'Spain',
      occupation: 'Financial Consultant',
    },
    position: { x: 700, y: 100 },
    connections: ['2', '5'],
    riskLevel: 'medium',
    lastActivity: '2024-01-19',
  },
];

const mockRelationships = [
  {
    id: 'r1',
    source: '1',
    target: '2',
    type: 'Owner',
    strength: 90,
    description: 'John Smith is the beneficial owner of ABC Holdings LLC',
    verified: true,
    date: '2019-03-15',
  },
  {
    id: 'r2',
    source: '2',
    target: '3',
    type: 'Ownership',
    strength: 100,
    description: 'ABC Holdings LLC owns the luxury apartment complex',
    verified: true,
    date: '2020-06-10',
  },
  {
    id: 'r3',
    source: '1',
    target: '4',
    type: 'Financial',
    strength: 95,
    description: 'John Smith controls bank account #12345',
    verified: true,
    date: '2018-02-20',
  },
  {
    id: 'r4',
    source: '4',
    target: '5',
    type: 'Transaction',
    strength: 100,
    description: 'Wire transfer from bank account to transaction',
    verified: true,
    date: '2024-01-15',
  },
  {
    id: 'r5',
    source: '5',
    target: '2',
    type: 'Financial',
    strength: 85,
    description: 'Transaction linked to ABC Holdings LLC',
    verified: false,
    date: '2024-01-15',
  },
  {
    id: 'r6',
    source: '6',
    target: '2',
    type: 'Business',
    strength: 75,
    description: 'Maria Rodriguez provides consulting services',
    verified: true,
    date: '2023-08-20',
  },
  {
    id: 'r7',
    source: '6',
    target: '5',
    type: 'Financial',
    strength: 80,
    description: 'Maria Rodriguez facilitated the transaction',
    verified: false,
    date: '2024-01-15',
  },
];

const categoryColors = {
  Suspect: '#ef4444',
  Victim: '#10b981',
  Asset: '#3b82f6',
  Organization: '#f59e0b',
  Transaction: '#8b5cf6',
  Location: '#06b6d4',
};

const categoryIcons = {
  Suspect: User,
  Victim: User,
  Asset: Building2,
  Organization: Briefcase,
  Transaction: DollarSign,
  Location: MapPin,
};

const riskLevelColors = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
};

export function OntologyExplorer() {
  const [nodes, setNodes] = useState(mockNodes);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [relationshipFilter, setRelationshipFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [dragNode, setDragNode] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [showRelationshipLabels, setShowRelationshipLabels] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef(null);

  // Handle canvas resize with throttling
  useEffect(() => {
    let timeoutId;
    const updateCanvasSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          setCanvasSize({ width: rect.width, height: rect.height });
        }
      }, 100);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      clearTimeout(timeoutId);
    };
  }, []);

  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || node.category === categoryFilter;
      const matchesRisk = riskFilter === 'all' || node.riskLevel === riskFilter;
      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [nodes, searchTerm, categoryFilter, riskFilter]);

  const filteredRelationships = useMemo(() => {
    return mockRelationships.filter(rel => {
      const sourceVisible = filteredNodes.some(n => n.id === rel.source);
      const targetVisible = filteredNodes.some(n => n.id === rel.target);
      const matchesType = relationshipFilter === 'all' || rel.type === relationshipFilter;
      return sourceVisible && targetVisible && matchesType;
    });
  }, [filteredNodes, relationshipFilter]);

  const handleNodeClick = node => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const handleMouseDown = (e, node) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragNode(node);
  };

  const handleMouseMove = useCallback(
    e => {
      if (isDragging && dragNode && canvasRef.current) {
        e.preventDefault();
        const rect = canvasRef.current.getBoundingClientRect();
        const newX = Math.max(
          40,
          Math.min((e.clientX - rect.left - panOffset.x) / zoomLevel, rect.width / zoomLevel - 40)
        );
        const newY = Math.max(
          40,
          Math.min((e.clientY - rect.top - panOffset.y) / zoomLevel, rect.height / zoomLevel - 40)
        );

        setNodes(prev =>
          prev.map(n => (n.id === dragNode.id ? { ...n, position: { x: newX, y: newY } } : n))
        );
      }
    },
    [isDragging, dragNode?.id, zoomLevel, panOffset.x, panOffset.y]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragNode(null);
  }, []);

  const handleZoom = delta => {
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setNodes(mockNodes);
  };

  const handleFocusNode = node => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      setPanOffset({
        x: centerX - node.position.x * zoomLevel,
        y: centerY - node.position.y * zoomLevel,
      });
      setSelectedNode(node);
    }
  };

  const getRelationshipPath = useCallback((sourcePos, targetPos) => {
    const dx = targetPos.x - sourcePos.x;
    const dy = targetPos.y - sourcePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      return `M${sourcePos.x},${sourcePos.y} L${targetPos.x},${targetPos.y}`;
    }

    const controlX = sourcePos.x + dx * 0.5 + dy * 0.1;
    const controlY = sourcePos.y + dy * 0.5 - dx * 0.1;

    return `M${sourcePos.x},${sourcePos.y} Q${controlX},${controlY} ${targetPos.x},${targetPos.y}`;
  }, []);

  const renderNode = useCallback(
    (node, index) => {
      const Icon = categoryIcons[node.category] || User;
      const color = categoryColors[node.category] || '#6b7280';
      const riskColor = riskLevelColors[node.riskLevel];

      const transformedX = node.position.x * zoomLevel + panOffset.x;
      const transformedY = node.position.y * zoomLevel + panOffset.y;

      const isSelected = selectedNode?.id === node.id;
      const isHovered = hoveredNode?.id === node.id;
      const isConnected =
        selectedNode?.connections?.includes(node.id) || selectedNode?.id === node.id;

      return (
        <div
          key={node.id}
          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            isSelected ? 'z-30' : isConnected ? 'z-20' : 'z-10'
          }`}
          style={{
            left: transformedX,
            top: transformedY,
            filter: selectedNode && !isConnected ? 'opacity(0.3)' : 'none',
          }}
          onClick={() => handleNodeClick(node)}
          onMouseDown={e => handleMouseDown(e, node)}
          onMouseEnter={() => setHoveredNode(node)}
          onMouseLeave={() => setHoveredNode(null)}
          title={`${node.name} - ${node.category} - Risk: ${node.riskLevel.toUpperCase()}`}
        >
          <div
            className={`
          relative w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-200
          ${isSelected ? 'ring-4 ring-blue-500/50 scale-110 shadow-2xl shadow-blue-500/25' : ''}
          ${isHovered ? 'scale-105' : ''}
          ${isConnected ? 'brightness-110' : ''}
        `}
            style={{
              backgroundColor: color + '20',
              borderColor: color,
              boxShadow: isSelected
                ? `0 0 20px ${color}40`
                : isHovered
                  ? `0 0 15px ${color}30`
                  : 'none',
            }}
          >
            <Icon className="w-5 h-5 lg:w-7 lg:h-7" style={{ color }} />

            {/* Risk level indicator */}
            <div
              className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 rounded-full border-2 border-slate-900"
              style={{ backgroundColor: riskColor }}
            />

            {/* Activity pulse for recent activity */}
            {new Date(node.lastActivity) > new Date('2024-01-18') && (
              <div
                className="absolute inset-0 rounded-full animate-ping border-2"
                style={{ borderColor: color + '60' }}
              />
            )}
          </div>

          <div className="text-center mt-2 max-w-20 lg:max-w-24">
            <p className="text-xs text-white font-medium truncate">{node.name}</p>
            <p className="text-xs text-slate-400 hidden md:block">{node.category}</p>
          </div>
        </div>
      );
    },
    [
      zoomLevel,
      panOffset.x,
      panOffset.y,
      selectedNode?.id,
      selectedNode?.connections,
      hoveredNode?.id,
      handleNodeClick,
      handleMouseDown,
    ]
  );

  const renderConnections = useMemo(() => {
    return filteredRelationships.map(rel => {
      const sourceNode = nodes.find(n => n.id === rel.source);
      const targetNode = nodes.find(n => n.id === rel.target);

      if (!sourceNode || !targetNode) return null;

      const sourcePos = {
        x: sourceNode.position.x * zoomLevel + panOffset.x,
        y: sourceNode.position.y * zoomLevel + panOffset.y,
      };
      const targetPos = {
        x: targetNode.position.x * zoomLevel + panOffset.x,
        y: targetNode.position.y * zoomLevel + panOffset.y,
      };

      const path = getRelationshipPath(sourcePos, targetPos);
      const isHighlighted =
        selectedNode && (selectedNode.id === rel.source || selectedNode.id === rel.target);

      // Calculate midpoint for label
      const midX = (sourcePos.x + targetPos.x) / 2;
      const midY = (sourcePos.y + targetPos.y) / 2;

      return (
        <g key={rel.id}>
          <defs>
            <marker
              id={`arrowhead-${rel.id}`}
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={isHighlighted ? '#3b82f6' : '#64748b'}
                opacity={isHighlighted ? '0.9' : '0.6'}
              />
            </marker>
          </defs>

          <path
            d={path}
            stroke={isHighlighted ? '#3b82f6' : '#64748b'}
            strokeWidth={isHighlighted ? '3' : '2'}
            fill="none"
            strokeDasharray={rel.verified ? 'none' : '5,5'}
            opacity={isHighlighted ? '0.9' : '0.6'}
            markerEnd={`url(#arrowhead-${rel.id})`}
            className="transition-all duration-200"
            style={{
              filter: isHighlighted ? `drop-shadow(0 0 8px #3b82f6)` : 'none',
            }}
          />

          {/* Relationship label */}
          {showRelationshipLabels && zoomLevel > 0.8 && (
            <text
              x={midX}
              y={midY - 5}
              textAnchor="middle"
              className="text-xs fill-slate-300 pointer-events-none"
              style={{ fontSize: `${Math.max(8, 10 * zoomLevel)}px` }}
            >
              {rel.type}
            </text>
          )}
        </g>
      );
    });
  }, [
    filteredRelationships,
    nodes,
    zoomLevel,
    panOffset.x,
    panOffset.y,
    selectedNode?.id,
    showRelationshipLabels,
    getRelationshipPath,
  ]);

  return (
    <div
      className={`flex flex-col gap-4 md:gap-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950' : 'h-[calc(100vh-8rem)]'}`}
    >
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Enhanced Filters Section */}
        <Card className="w-full lg:w-80 bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm lg:text-base">
              <Network className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
              Graph Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 lg:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Search Entity</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search nodes..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.keys(categoryColors).map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Risk Level</Label>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Relationships</Label>
                <Select value={relationshipFilter} onValueChange={setRelationshipFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Relationships</SelectItem>
                    <SelectItem value="Owner">Ownership</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Transaction">Transaction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            {/* Graph Controls */}
            <div className="space-y-3">
              <Label className="text-slate-300 text-sm">View Controls</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom(0.2)}
                  className="text-xs border-slate-600 hover:bg-slate-700"
                >
                  <ZoomIn className="w-3 h-3 mr-1" />
                  Zoom In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom(-0.2)}
                  className="text-xs border-slate-600 hover:bg-slate-700"
                >
                  <ZoomOut className="w-3 h-3 mr-1" />
                  Zoom Out
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="text-xs border-slate-600 hover:bg-slate-700"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-slate-300 text-sm">Show Labels</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRelationshipLabels(!showRelationshipLabels)}
                  className="p-1 h-auto"
                >
                  {showRelationshipLabels ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Legend</Label>
              <div className="space-y-2">
                {Object.entries(categoryColors).map(([category, color]) => {
                  const Icon = categoryIcons[category];
                  return (
                    <div key={category} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: color + '40', border: `1px solid ${color}` }}
                      >
                        <Icon className="w-2 h-2" style={{ color }} />
                      </div>
                      <span className="text-xs text-slate-300">{category}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Node Details Panel */}
        <Card className="w-full lg:w-80 bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm lg:text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              Node Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 lg:space-y-4">
            {selectedNode ? (
              <div className="space-y-3 lg:space-y-4">
                <div className="text-center">
                  <Avatar
                    className="w-16 h-16 mx-auto mb-3"
                    style={{ backgroundColor: categoryColors[selectedNode.category] + '20' }}
                  >
                    <AvatarFallback style={{ color: categoryColors[selectedNode.category] }}>
                      {selectedNode.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-white font-medium">{selectedNode.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      style={{
                        backgroundColor: categoryColors[selectedNode.category] + '20',
                        color: categoryColors[selectedNode.category],
                      }}
                    >
                      {selectedNode.category}
                    </Badge>
                    <Badge
                      variant="secondary"
                      style={{
                        backgroundColor: riskLevelColors[selectedNode.riskLevel] + '20',
                        color: riskLevelColors[selectedNode.riskLevel],
                      }}
                    >
                      {selectedNode.riskLevel} risk
                    </Badge>
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-slate-300 font-medium text-sm">Attributes</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFocusNode(selectedNode)}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Focus
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {Object.entries(selectedNode.attributes).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start gap-2">
                        <span className="text-slate-400 text-xs capitalize flex-shrink-0">
                          {key}:
                        </span>
                        <span className="text-white text-xs text-right break-words">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-3">
                  <h4 className="text-slate-300 font-medium text-sm">
                    Connected Nodes ({selectedNode.connections.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedNode.connections.map(connId => {
                      const connectedNode = nodes.find(n => n.id === connId);
                      if (!connectedNode) return null;

                      const relationship = filteredRelationships.find(
                        r =>
                          (r.source === selectedNode.id && r.target === connId) ||
                          (r.target === selectedNode.id && r.source === connId)
                      );

                      return (
                        <div
                          key={connId}
                          className="flex items-center gap-2 p-2 rounded bg-slate-700 hover:bg-slate-600 cursor-pointer transition-colors"
                          onClick={() => setSelectedNode(connectedNode)}
                        >
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: categoryColors[connectedNode.category] }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs truncate">{connectedNode.name}</p>
                            <p className="text-slate-400 text-xs">
                              {relationship?.type || 'Connected'}
                            </p>
                          </div>
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: riskLevelColors[connectedNode.riskLevel] }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-8">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Select a node to view details</p>
                <p className="text-xs mt-1">Click on any node in the graph</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Graph Canvas */}
      <Card className="flex-1 bg-slate-800 border-slate-700 min-h-0">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-white text-sm lg:text-base flex items-center gap-2">
            Knowledge Graph
            <Badge variant="secondary" className="text-xs">
              {filteredNodes.length} nodes, {filteredRelationships.length} relationships
            </Badge>
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-xs border-slate-600 hover:bg-slate-700"
            >
              <Maximize2 className="w-3 h-3 mr-1" />
              {isFullscreen ? 'Exit' : 'Fullscreen'}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 text-xs px-3">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Node
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Add New Node</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Create a new entity in the knowledge graph
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Node Name</Label>
                    <Input
                      className="bg-slate-700 border-slate-600"
                      placeholder="Enter node name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {Object.keys(categoryColors).map(category => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Risk Level</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-500">Add Node</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent
          className="p-0 flex-1 relative overflow-hidden"
          style={{ height: 'calc(100% - 4rem)' }}
        >
          <div
            ref={canvasRef}
            className="w-full h-full bg-slate-900 relative cursor-move select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
              backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`,
              backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
            }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {renderConnections}
            </svg>
            {filteredNodes.map(renderNode)}

            {/* Zoom indicator */}
            <div className="absolute bottom-4 right-4 bg-slate-800 border border-slate-700 rounded px-2 py-1">
              <span className="text-xs text-slate-300">{Math.round(zoomLevel * 100)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
