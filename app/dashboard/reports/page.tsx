'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const reportData = [
  { month: 'T1', completed: 240, pending: 60, overdue: 30 },
  { month: 'T2', completed: 280, pending: 50, overdue: 25 },
  { month: 'T3', completed: 320, pending: 40, overdue: 20 },
  { month: 'T4', completed: 310, pending: 45, overdue: 22 },
  { month: 'T5', completed: 350, pending: 35, overdue: 18 },
  { month: 'T6', completed: 380, pending: 30, overdue: 15 },
];

const departmentData = [
  { name: 'Tư pháp', value: 450, color: '#5544aa' },
  { name: 'Địa chính', value: 580, color: '#a4b9d4' },
  { name: 'An ninh', value: 320, color: '#ff6b6b' },
  { name: 'Lao động', value: 280, color: '#4ecdc4' },
  { name: 'Tài chính', value: 240, color: '#95e1d3' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Báo cáo & Phân tích
        </h1>
        <p className="text-muted-foreground mt-1">
          Báo cáo tổng hợp, BI dashboards và xuất dữ liệu
        </p>
      </div>

      {/* Report Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Báo cáo tháng', period: 'Tháng này' },
          { title: 'Báo cáo quý', period: 'Quý này' },
          { title: 'Báo cáo năm', period: 'Năm này' },
        ].map((report, i) => (
          <Card key={i} className="bg-card border-border p-6 cursor-pointer hover:border-primary/50 transition">
            <h3 className="font-semibold text-foreground mb-2">{report.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{report.period}</p>
            <Button variant="outline" className="w-full border-border bg-transparent" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Xuất PDF
            </Button>
          </Card>
        ))}
      </div>

      {/* Case Processing Chart */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Tổng quan xử lý hồ sơ
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
            <XAxis dataKey="month" stroke="#9ca3af" />
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
            <Bar dataKey="completed" fill="#4ade80" name="Hoàn thành" />
            <Bar dataKey="pending" fill="#f97316" name="Chờ xử lý" />
            <Bar dataKey="overdue" fill="#ef4444" name="Trễ hạn" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Department Distribution */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Phân bố hồ sơ theo bộ phận
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name} (${entry.value})`}
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

      {/* Export Options */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Tùy chọn xuất báo cáo
        </h3>
        <div className="space-y-3">
          {[
            { format: 'PDF', description: 'Báo cáo định dạng PDF' },
            { format: 'Excel', description: 'Bảng tính Excel chi tiết' },
            { format: 'CSV', description: 'Dữ liệu CSV để phân tích' },
          ].map((option, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border"
            >
              <div>
                <p className="font-medium text-foreground">{option.format}</p>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Date Range Picker */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Báo cáo tùy chỉnh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Từ ngày
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Đến ngày
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Tạo báo cáo
          </Button>
          <Button variant="outline" className="flex-1 border-border bg-transparent">
            Hủy
          </Button>
        </div>
      </Card>
    </div>
  );
}
