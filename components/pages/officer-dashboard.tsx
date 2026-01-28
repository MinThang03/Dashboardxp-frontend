'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  Search,
  Plus,
  ChevronDown,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const mockCases = [
  {
    id: 'HS001',
    title: 'Cấp giấy chứng thực',
    citizen: 'Nguyễn Văn A',
    dateSubmitted: '2024-01-15',
    deadline: '2024-01-25',
    status: 'in-progress',
    priority: 'high',
    department: 'Tư pháp - Hộ tịch',
    progress: 60,
  },
  {
    id: 'HS002',
    title: 'Đăng ký biến động dân số',
    citizen: 'Trần Thị B',
    dateSubmitted: '2024-01-16',
    deadline: '2024-01-26',
    status: 'pending',
    priority: 'normal',
    department: 'Tư pháp - Hộ tịch',
    progress: 30,
  },
  {
    id: 'HS003',
    title: 'Cấp phép xây dựng',
    citizen: 'Lê Văn C',
    dateSubmitted: '2024-01-10',
    deadline: '2024-01-20',
    status: 'overdue',
    priority: 'critical',
    department: 'Địa chính - Xây dựng',
    progress: 40,
  },
  {
    id: 'HS004',
    title: 'Bổ sung thửa đất',
    citizen: 'Phạm Thị D',
    dateSubmitted: '2024-01-14',
    deadline: '2024-01-28',
    status: 'completed',
    priority: 'normal',
    department: 'Địa chính - Xây dựng',
    progress: 100,
  },
  {
    id: 'HS005',
    title: 'Cấp bảo hiểm xã hội',
    citizen: 'Võ Văn E',
    dateSubmitted: '2024-01-13',
    deadline: '2024-01-27',
    status: 'in-progress',
    priority: 'high',
    department: 'Lao động - An sinh',
    progress: 75,
  },
];

const performanceData = [
  { name: 'Tuần 1', completed: 12, onTime: 10 },
  { name: 'Tuần 2', completed: 15, onTime: 13 },
  { name: 'Tuần 3', completed: 18, onTime: 16 },
  { name: 'Tuần 4', completed: 20, onTime: 18 },
];

const statusColors: Record<string, string> = {
  'pending': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
  'overdue': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const priorityColors: Record<string, string> = {
  'critical': 'bg-red-500',
  'high': 'bg-orange-500',
  'normal': 'bg-blue-500',
  'low': 'bg-green-500',
};

const statusVietnames: Record<string, string> = {
  'pending': 'Chờ xử lý',
  'in-progress': 'Đang xử lý',
  'completed': 'Hoàn thành',
  'overdue': 'Trễ hạn',
};

export function OfficerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<typeof mockCases[0] | null>(null);

  const filteredCases = mockCases.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockCases.length,
    completed: mockCases.filter((c) => c.status === 'completed').length,
    onTime: mockCases.filter((c) => c.status === 'completed' && c.progress === 100).length,
    overdue: mockCases.filter((c) => c.status === 'overdue').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Hồ sơ một cửa
        </h1>
        <p className="text-muted-foreground mt-1">
          Quản lý và xử lý hồ sơ hành chính
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Tổng hồ sơ',
            value: stats.total,
            icon: <Upload className="w-5 h-5" />,
            color: 'text-primary',
            bgColor: 'bg-gradient-to-br from-blue-500/10 to-blue-500/5',
          },
          {
            label: 'Hoàn thành',
            value: stats.completed,
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: 'text-status-success',
            bgColor: 'bg-gradient-to-br from-green-500/10 to-green-500/5',
          },
          {
            label: 'Đúng hạn',
            value: stats.onTime,
            icon: <Clock className="w-5 h-5" />,
            color: 'text-blue-400',
            bgColor: 'bg-gradient-to-br from-cyan-500/10 to-cyan-500/5',
          },
          {
            label: 'Trễ hạn',
            value: stats.overdue,
            icon: <AlertCircle className="w-5 h-5" />,
            color: 'text-status-danger',
            bgColor: 'bg-gradient-to-br from-red-500/10 to-red-500/5',
          },
        ].map((stat, i) => (
          <Card key={i} className={`${stat.bgColor} border-border p-6 hover:shadow-lg transition-all`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-full bg-opacity-20`}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Hiệu suất tuần này
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #2a2a3e',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#8b5cf6"
              name="Hoàn thành"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="onTime"
              stroke="#4ade80"
              name="Đúng hạn"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Cases Table */}
      <Card className="bg-card border-border p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Danh sách hồ sơ ({filteredCases.length})
            </h3>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Hồ sơ mới
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm hồ sơ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <select
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="in-progress">Đang xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="overdue">Trễ hạn</option>
            </select>
          </div>

          {/* Cases List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredCases.map((caseItem) => (
              <div
                key={caseItem.id}
                onClick={() => setSelectedCase(caseItem)}
                className="p-4 rounded-lg bg-secondary/20 border border-border hover:border-primary/50 cursor-pointer transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {caseItem.id}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {caseItem.department}
                      </span>
                      <Badge
                        className={`text-xs border ${
                          priorityColors[caseItem.priority]
                        } text-white`}
                      >
                        {caseItem.priority === 'critical'
                          ? 'Khẩn cấp'
                          : caseItem.priority === 'high'
                            ? 'Cao'
                            : caseItem.priority === 'normal'
                              ? 'Bình thường'
                              : 'Thấp'}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-foreground">
                      {caseItem.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Người nộp: {caseItem.citizen} • Nộp: {caseItem.dateSubmitted}
                    </p>
                  </div>

                  <div className="text-right">
                    <Badge className={statusColors[caseItem.status]}>
                      {statusVietnames[caseItem.status]}
                    </Badge>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Hạn: {caseItem.deadline}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 bg-muted/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${caseItem.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Case Detail Modal */}
      {selectedCase && (
        <Card className="bg-card border-border p-6 fixed bottom-6 right-6 w-96 shadow-lg z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Chi tiết hồ sơ</h3>
            <button
              onClick={() => setSelectedCase(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Mã hồ sơ</p>
              <p className="font-mono text-foreground">{selectedCase.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Tiêu đề</p>
              <p className="font-medium text-foreground">{selectedCase.title}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Người nộp</p>
              <p className="text-foreground">{selectedCase.citizen}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Trạng thái</p>
              <Badge className={statusColors[selectedCase.status]}>
                {statusVietnames[selectedCase.status]}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Tiến độ</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-muted/20 rounded-full h-2">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${selectedCase.progress}%` }}
                  />
                </div>
                <span className="text-foreground font-medium">
                  {selectedCase.progress}%
                </span>
              </div>
            </div>
            <div className="pt-3 flex gap-2">
              <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                <Eye className="w-4 h-4 mr-1" />
                Chi tiết
              </Button>
              <Button size="sm" variant="outline" className="flex-1 border-border bg-transparent">
                <Upload className="w-4 h-4 mr-1" />
                Tài liệu
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
