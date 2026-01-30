'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Search,
  Plus,
  Filter,
  Download,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';

interface Registration {
  id: string;
  type: 'birth' | 'death' | 'marriage' | 'divorce';
  citizenName: string;
  submitDate: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  assignee: string;
  notes: string;
}

const mockRegistrations: Registration[] = [
  {
    id: 'HT001',
    type: 'birth',
    citizenName: 'Nguyễn Văn A',
    submitDate: '2024-01-15',
    status: 'completed',
    assignee: 'Trần Thị B',
    notes: 'Đăng ký khai sinh cho con thứ nhất',
  },
  {
    id: 'HT002',
    type: 'marriage',
    citizenName: 'Lê Văn C',
    submitDate: '2024-01-16',
    status: 'processing',
    assignee: 'Phạm Văn D',
    notes: 'Đăng ký kết hôn',
  },
  {
    id: 'HT003',
    type: 'death',
    citizenName: 'Hoàng Thị E',
    submitDate: '2024-01-17',
    status: 'pending',
    assignee: 'Trần Thị B',
    notes: 'Khai tử',
  },
];

const typeConfig = {
  birth: { label: 'Khai sinh', color: 'bg-green-500 text-white', icon: '👶' },
  death: { label: 'Khai tử', color: 'bg-gray-500 text-white', icon: '🕊️' },
  marriage: { label: 'Kết hôn', color: 'bg-pink-500 text-white', icon: '💑' },
  divorce: { label: 'Ly hôn', color: 'bg-orange-500 text-white', icon: '💔' },
};

const statusConfig = {
  pending: { label: 'Chờ xử lý', color: 'bg-yellow-500/10 text-yellow-700', icon: AlertCircle },
  processing: { label: 'Đang xử lý', color: 'bg-blue-500/10 text-blue-700', icon: Clock },
  completed: { label: 'Hoàn thành', color: 'bg-green-500/10 text-green-700', icon: CheckCircle2 },
  rejected: { label: 'Từ chối', color: 'bg-red-500/10 text-red-700', icon: AlertCircle },
};

export default function HoTichPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredRegistrations = mockRegistrations.filter((reg) => {
    const matchesSearch =
      reg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.citizenName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || reg.type === filterType;
    const matchesStatus = filterStatus === 'all' || reg.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: mockRegistrations.length,
    pending: mockRegistrations.filter((r) => r.status === 'pending').length,
    processing: mockRegistrations.filter((r) => r.status === 'processing').length,
    completed: mockRegistrations.filter((r) => r.status === 'completed').length,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Quản lý Hộ tịch</h1>
              </div>
              <p className="text-white/90">Đăng ký khai sinh, khai tử, kết hôn, ly hôn</p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              Tạo hồ sơ mới
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <Badge className="bg-blue-500/10 text-blue-700 border-0">Tổng</Badge>
          </div>
          <p className="text-3xl font-bold">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Tổng hồ sơ</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-yellow-500/10 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <Badge className="bg-yellow-500/10 text-yellow-700 border-0">Chờ</Badge>
          </div>
          <p className="text-3xl font-bold">{stats.pending}</p>
          <p className="text-sm text-muted-foreground">Chờ xử lý</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <Badge className="bg-blue-500/10 text-blue-700 border-0">Đang xử lý</Badge>
          </div>
          <p className="text-3xl font-bold">{stats.processing}</p>
          <p className="text-sm text-muted-foreground">Đang xử lý</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <Badge className="bg-green-500/10 text-green-700 border-0">Hoàn thành</Badge>
          </div>
          <p className="text-3xl font-bold">{stats.completed}</p>
          <p className="text-sm text-muted-foreground">Hoàn thành</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm theo mã hồ sơ hoặc tên công dân..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-slate-50"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-11 px-4 border border-input rounded-lg bg-slate-50"
          >
            <option value="all">Tất cả loại</option>
            <option value="birth">Khai sinh</option>
            <option value="death">Khai tử</option>
            <option value="marriage">Kết hôn</option>
            <option value="divorce">Ly hôn</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-11 px-4 border border-input rounded-lg bg-slate-50"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="completed">Hoàn thành</option>
            <option value="rejected">Từ chối</option>
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
                <th className="text-left p-4 font-semibold">Loại</th>
                <th className="text-left p-4 font-semibold">Công dân</th>
                <th className="text-left p-4 font-semibold">Ngày nộp</th>
                <th className="text-left p-4 font-semibold">Trạng thái</th>
                <th className="text-left p-4 font-semibold">Người xử lý</th>
                <th className="text-right p-4 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((reg) => {
                const typeInfo = typeConfig[reg.type];
                const statusInfo = statusConfig[reg.status];
                const StatusIcon = statusInfo.icon;

                return (
                  <tr key={reg.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <span className="font-semibold text-primary">{reg.id}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={typeInfo.color}>
                        {typeInfo.icon} {typeInfo.label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{reg.citizenName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {reg.submitDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">{reg.assignee}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
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
    </div>
  );
}
