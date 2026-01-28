'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  FileText,
  BarChart3,
  MapPin,
  Users,
  Download,
  Filter,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

// Mock data
const kpiData = [
  { name: 'T1', completedOnTime: 85, overdue: 15 },
  { name: 'T2', completedOnTime: 82, overdue: 18 },
  { name: 'T3', completedOnTime: 88, overdue: 12 },
  { name: 'T4', completedOnTime: 90, overdue: 10 },
  { name: 'T5', completedOnTime: 87, overdue: 13 },
  { name: 'T6', completedOnTime: 92, overdue: 8 },
];

const budgetData = [
  { name: 'Tư pháp', allocated: 1000, spent: 850 },
  { name: 'Địa chính', allocated: 1500, spent: 1200 },
  { name: 'An ninh', allocated: 2000, spent: 1800 },
  { name: 'Lao động', allocated: 800, spent: 600 },
  { name: 'Tài chính', allocated: 1200, spent: 1100 },
];

const departmentData = [
  { name: 'Tư pháp', value: 240, color: '#5544aa' },
  { name: 'Địa chính', value: 320, color: '#a4b9d4' },
  { name: 'An ninh', value: 180, color: '#ff6b6b' },
  { name: 'Lao động', value: 140, color: '#4ecdc4' },
  { name: 'Khác', value: 120, color: '#95e1d3' },
];

const alertsData = [
  {
    id: 1,
    title: 'Hồ sơ sắp quá hạn',
    count: 3,
    severity: 'warning',
    icon: Clock,
  },
  {
    id: 2,
    title: 'Vượt ngân sách',
    count: 2,
    severity: 'danger',
    icon: AlertCircle,
  },
  {
    id: 3,
    title: 'Phản ánh mới',
    count: 5,
    severity: 'info',
    icon: FileText,
  },
  {
    id: 4,
    title: 'Yêu cầu phê duyệt',
    count: 8,
    severity: 'info',
    icon: CheckCircle2,
  },
];

const heatmapSpots = [
  { id: 1, name: 'Tranh chấp đất đai Khu A', severity: 'high', lat: 40.7, lng: -74.0 },
  { id: 2, name: 'ANTT Khu B', severity: 'medium', lat: 40.75, lng: -73.95 },
  { id: 3, name: 'Ô nhiễm môi trường Khu C', severity: 'low', lat: 40.72, lng: -74.05 },
];

export function LeaderDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Bảng điều khiển Lãnh đạo
          </h1>
          <p className="text-muted-foreground mt-1">
            Tổng quan KPI, ngân sách, và cảnh báo thời gian thực
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Thời gian
          </Button>
          <Button className="gap-2 bg-primary">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* On-Time Rate */}
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20 p-6 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-medium">
                Tỷ lệ đúng hạn
              </p>
              <p className="text-4xl font-bold text-foreground mt-2">88%</p>
              <div className="flex items-center gap-1 mt-2 text-status-success text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+5% so với tháng trước</span>
              </div>
            </div>
            <div className="p-3 bg-status-success/20 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-status-success" />
            </div>
          </div>
        </Card>

        {/* Total Cases */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20 p-6 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-medium">
                Tổng hồ sơ xử lý
              </p>
              <p className="text-4xl font-bold text-foreground mt-2">1,247</p>
              <div className="flex items-center gap-1 mt-2 text-muted-foreground text-sm">
                <span>+45 hôm nay</span>
              </div>
            </div>
            <div className="p-3 bg-primary/20 rounded-full">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        {/* Overdue Cases */}
        <Card className="bg-gradient-to-br from-red-500/10 to-rose-500/5 border-red-500/20 p-6 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-medium">
                Hồ sơ trễ hạn
              </p>
              <p className="text-4xl font-bold text-status-danger mt-2">32</p>
              <div className="flex items-center gap-1 mt-2 text-status-warning text-sm font-medium">
                <TrendingDown className="w-4 h-4" />
                <span>3 hồ sơ chiều nay</span>
              </div>
            </div>
            <div className="p-3 bg-status-danger/20 rounded-full">
              <AlertCircle className="w-6 h-6 text-status-danger" />
            </div>
          </div>
        </Card>

        {/* Avg Satisfaction */}
        <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-yellow-500/20 p-6 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-medium">
                Hài lòng trung bình
              </p>
              <p className="text-4xl font-bold text-foreground mt-2">4.6/5.0</p>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < 4 ? 'text-yellow-500' : 'text-muted-foreground'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-full">
              <Users className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {alertsData.map((alert) => {
          const Icon = alert.icon;
          const bgColor =
            alert.severity === 'warning'
              ? 'bg-status-warning/10 border-status-warning/30'
              : alert.severity === 'danger'
                ? 'bg-status-danger/10 border-status-danger/30'
                : 'bg-status-info/10 border-status-info/30';

          return (
            <Card
              key={alert.id}
              className={`border ${bgColor} p-4 cursor-pointer hover:opacity-80 transition`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {alert.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {alert.count}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Completion Trend */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Xu hướng hồ sơ đúng hạn vs trễ hạn
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpiData}>
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
              <Bar
                dataKey="completedOnTime"
                fill="#4ade80"
                name="Đúng hạn"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="overdue"
                fill="#f87171"
                name="Trễ hạn"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Budget Monitoring */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Giám sát ngân sách theo bộ phận
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
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
              <Bar
                dataKey="allocated"
                fill="#8b5cf6"
                name="Dự toán"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="spent"
                fill="#60a5fa"
                name="Đã chi"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Cases by Department */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Hồ sơ theo lĩnh vực
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid #2a2a3e',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f3f4f6' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Hotspot Map */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Bản đồ GIS - Điểm nóng
          </h3>
          <div className="space-y-3">
            {heatmapSpots.map((spot) => (
              <div
                key={spot.id}
                className="flex items-start justify-between p-3 rounded-lg bg-secondary/20 border border-border"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {spot.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tọa độ: {spot.lat}, {spot.lng}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    spot.severity === 'high'
                      ? 'bg-status-danger text-white'
                      : spot.severity === 'medium'
                        ? 'bg-status-warning text-black'
                        : 'bg-status-info text-white'
                  }
                >
                  {spot.severity === 'high'
                    ? 'Nghiêm trọng'
                    : spot.severity === 'medium'
                      ? 'Trung bình'
                      : 'Thấp'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Hành động nhanh
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Phê duyệt hồ sơ chờ
          </Button>
          <Button variant="outline" className="border-border bg-transparent">
            Xem báo cáo chi tiết
          </Button>
          <Button variant="outline" className="border-border bg-transparent">
            Xuất PDF
          </Button>
          <Button variant="outline" className="border-border bg-transparent">
            Gửi thông báo
          </Button>
        </div>
      </Card>
    </div>
  );
}
