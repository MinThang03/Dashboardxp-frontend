'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Search,
  Plus,
  Download,
  User,
  Calendar,
  FileText,
  AlertTriangle,
  Eye,
  Edit,
  Map,
} from 'lucide-react';

interface LandRecord {
  id: string;
  plotNumber: string;
  ownerName: string;
  area: number;
  landUse: string;
  status: 'issued' | 'pending' | 'disputed' | 'in-process';
  lastUpdate: string;
  ward: string;
}

const mockLandRecords: LandRecord[] = [
  {
    id: 'DC001',
    plotNumber: 'Thửa 123/45',
    ownerName: 'Nguyễn Văn A',
    area: 120.5,
    landUse: 'Đất ở',
    status: 'issued',
    lastUpdate: '2024-01-15',
    ward: 'Phường 1',
  },
  {
    id: 'DC002',
    plotNumber: 'Thửa 156/78',
    ownerName: 'Trần Thị B',
    area: 85.3,
    landUse: 'Đất nông nghiệp',
    status: 'pending',
    lastUpdate: '2024-01-16',
    ward: 'Phường 2',
  },
  {
    id: 'DC003',
    plotNumber: 'Thửa 234/12',
    ownerName: 'Lê Văn C',
    area: 200.0,
    landUse: 'Đất thương mại',
    status: 'disputed',
    lastUpdate: '2024-01-17',
    ward: 'Phường 3',
  },
  {
    id: 'DC004',
    plotNumber: 'Thửa 345/67',
    ownerName: 'Phạm Thị D',
    area: 150.8,
    landUse: 'Đất ở',
    status: 'in-process',
    lastUpdate: '2024-01-18',
    ward: 'Phường 1',
  },
];

const statusConfig = {
  issued: { label: 'Đã cấp sổ', color: 'bg-green-500/10 text-green-700', icon: '✓' },
  pending: { label: 'Chờ cấp sổ', color: 'bg-yellow-500/10 text-yellow-700', icon: '⏳' },
  disputed: { label: 'Tranh chấp', color: 'bg-red-500/10 text-red-700', icon: '⚠️' },
  'in-process': { label: 'Đang xử lý', color: 'bg-blue-500/10 text-blue-700', icon: '🔄' },
};

const landUseColors: Record<string, string> = {
  'Đất ở': 'bg-blue-100 text-blue-800',
  'Đất nông nghiệp': 'bg-green-100 text-green-800',
  'Đất thương mại': 'bg-purple-100 text-purple-800',
  'Đất công cộng': 'bg-gray-100 text-gray-800',
};

export default function DiaChinhPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredRecords = mockLandRecords.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.plotNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockLandRecords.length,
    issued: mockLandRecords.filter((r) => r.status === 'issued').length,
    pending: mockLandRecords.filter((r) => r.status === 'pending').length,
    disputed: mockLandRecords.filter((r) => r.status === 'disputed').length,
  };

  const totalArea = mockLandRecords.reduce((sum, r) => sum + r.area, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-cyan-500 to-blue-500 p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Quản lý Địa chính</h1>
              </div>
              <p className="text-white/90">Hồ sơ địa, sổ đỏ, biến động đất đai</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-teal-600 hover:bg-white/90">
                <Map className="w-4 h-4 mr-2" />
                Xem bản đồ
              </Button>
              <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0">
                <Plus className="w-4 h-4 mr-2" />
                Thêm hồ sơ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-teal-500/10 rounded-xl">
              <FileText className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Tổng hồ sơ</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.issued}</p>
          <p className="text-sm text-muted-foreground">Đã cấp sổ</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-yellow-500/10 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.pending}</p>
          <p className="text-sm text-muted-foreground">Chờ cấp sổ</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.disputed}</p>
          <p className="text-sm text-muted-foreground">Tranh chấp</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{totalArea.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground">Tổng diện tích (m²)</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm theo mã, số thửa, chủ sở hữu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-slate-50"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-11 px-4 border border-input rounded-lg bg-slate-50"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="issued">Đã cấp sổ</option>
            <option value="pending">Chờ cấp sổ</option>
            <option value="disputed">Tranh chấp</option>
            <option value="in-process">Đang xử lý</option>
          </select>
          <Button variant="outline" className="h-11">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Mã hồ sơ</th>
                <th className="text-left p-4 font-semibold">Số thửa</th>
                <th className="text-left p-4 font-semibold">Chủ sở hữu</th>
                <th className="text-left p-4 font-semibold">Diện tích (m²)</th>
                <th className="text-left p-4 font-semibold">Loại đất</th>
                <th className="text-left p-4 font-semibold">Phường/Xã</th>
                <th className="text-left p-4 font-semibold">Trạng thái</th>
                <th className="text-left p-4 font-semibold">Cập nhật</th>
                <th className="text-right p-4 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => {
                const statusInfo = statusConfig[record.status];
                return (
                  <tr key={record.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <span className="font-semibold text-primary">{record.id}</span>
                    </td>
                    <td className="p-4 font-medium">{record.plotNumber}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {record.ownerName}
                      </div>
                    </td>
                    <td className="p-4 font-semibold">{record.area}</td>
                    <td className="p-4">
                      <Badge className={`${landUseColors[record.landUse]} border-0`}>
                        {record.landUse}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">{record.ward}</td>
                    <td className="p-4">
                      <Badge className={`${statusInfo.color} border-0`}>
                        {statusInfo.icon} {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {record.lastUpdate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Map className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Disputed Areas Alert */}
      {stats.disputed > 0 && (
        <Card className="p-6 border-0 shadow-lg border-l-4 border-l-red-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-red-900">Cảnh báo tranh chấp đất đai</h4>
              <p className="text-sm text-muted-foreground">
                Hiện có {stats.disputed} khu vực đang trong tình trạng tranh chấp. Cần xem xét và giải quyết sớm.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
