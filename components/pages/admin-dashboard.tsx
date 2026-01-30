'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  Shield,
  Users,
  Settings,
  Key,
  Database,
  AlertTriangle,
} from 'lucide-react';

// Mock data
const mockUsers = [
  {
    id: 1,
    name: 'Nguyễn Văn Admin',
    email: 'admin@ubnd.vn',
    role: 'admin',
    department: 'Hệ thống',
    status: 'active',
    lastLogin: '2024-01-17 10:30',
  },
  {
    id: 2,
    name: 'Trần Thị Lãnh Đạo',
    email: 'leader@ubnd.vn',
    role: 'leader',
    department: 'Chủ tịch UBND',
    status: 'active',
    lastLogin: '2024-01-17 09:15',
  },
  {
    id: 3,
    name: 'Lê Văn Cán Bộ 1',
    email: 'officer1@ubnd.vn',
    role: 'officer',
    department: 'Địa chính - Xây dựng',
    status: 'active',
    lastLogin: '2024-01-17 08:45',
  },
  {
    id: 4,
    name: 'Phạm Thị Cán Bộ 2',
    email: 'officer2@ubnd.vn',
    role: 'officer',
    department: 'Tư pháp - Hộ tịch',
    status: 'inactive',
    lastLogin: '2024-01-15 14:20',
  },
  {
    id: 5,
    name: 'Võ Công Dân 1',
    email: 'citizen1@ubnd.vn',
    role: 'citizen',
    department: '-',
    status: 'active',
    lastLogin: '2024-01-17 07:30',
  },
];

const rolePermissions: Record<string, string[]> = {
  admin: [
    'Quản lý người dùng',
    'Cấu hình hệ thống',
    'Xem báo cáo',
    'Quản lý quyền',
    'Quản lý ngân sách',
    'Xem lịch sử',
  ],
  leader: [
    'Xem bảng điều khiển',
    'Phê duyệt hồ sơ',
    'Xem báo cáo',
    'Gửi thông báo',
    'Quản lý cảnh báo',
  ],
  officer: [
    'Xử lý hồ sơ',
    'Upload tài liệu',
    'Xem báo cáo cá nhân',
    'Gửi phản ánh',
  ],
  citizen: [
    'Nộp hồ sơ',
    'Tra cứu hồ sơ',
    'Đánh giá dịch vụ',
    'Gửi phản ánh',
  ],
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'settings'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null);

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header - banner tổng quan dùng xanh nhạt */}
      <div className="rounded-lg bg-[var(--banner)] px-4 py-3">
        <h1 className="text-3xl font-bold text-foreground">
          Quản trị hệ thống
        </h1>
        <p className="text-muted-foreground mt-1">
          Quản lý người dùng, quyền hạn, và cài đặt hệ thống
        </p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng người dùng', value: mockUsers.length, icon: Users, color: 'text-primary' },
          { label: 'Hoạt động', value: mockUsers.filter((u) => u.status === 'active').length, icon: Shield, color: 'text-status-success' },
          { label: 'Không hoạt động', value: mockUsers.filter((u) => u.status === 'inactive').length, icon: AlertTriangle, color: 'text-status-warning' },
          { label: 'Ngày hôm nay', value: 24, icon: Database, color: 'text-blue-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="bg-card border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color} opacity-20`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-border">
        {[
          { id: 'users', label: 'Quản lý người dùng', icon: Users },
          { id: 'roles', label: 'Vai trò & Quyền', icon: Shield },
          { id: 'settings', label: 'Cài đặt hệ thống', icon: Settings },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 font-medium text-sm transition-colors flex items-center gap-2 ${
                isActive
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm người dùng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Thêm người dùng
            </Button>
          </div>

          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <Card
                key={user.id}
                className="bg-card border-border p-4 hover:border-primary/50 transition cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-foreground">
                        {user.name}
                      </h4>
                      <Badge
                        className={
                          user.role === 'admin'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : user.role === 'leader'
                              ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                              : user.role === 'officer'
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                        }
                      >
                        {user.role === 'admin'
                          ? 'Quản trị'
                          : user.role === 'leader'
                            ? 'Lãnh đạo'
                            : user.role === 'officer'
                              ? 'Cán bộ'
                              : 'Công dân'}
                      </Badge>
                      <Badge
                        className={
                          user.status === 'active'
                            ? 'bg-status-success/20 text-status-success border-status-success/30'
                            : 'bg-status-warning/20 text-status-warning border-status-warning/30'
                        }
                      >
                        {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user.email} • {user.department}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Truy cập cuối: {user.lastLogin}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-border bg-transparent">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-status-danger bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="space-y-4">
          {Object.entries(rolePermissions).map(([role, permissions]) => {
            const roleLabels: Record<string, string> = {
              admin: 'Quản trị viên',
              leader: 'Lãnh đạo',
              officer: 'Cán bộ chuyên môn',
              citizen: 'Công dân',
            };

            return (
              <Card key={role} className="bg-card border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {roleLabels[role]}
                  </h3>
                  <Button variant="outline" size="sm" className="border-border bg-transparent">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {permissions.map((perm, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-lg bg-secondary/20 border border-border"
                    >
                      <Key className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{perm}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-4">
          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Cấu hình hệ thống
            </h3>

            <div className="space-y-4">
              {[
                {
                  label: 'Tên hệ thống',
                  value: 'Smart Dashboard Dashboard',
                  type: 'text',
                },
                {
                  label: 'Thời gian hết hạn hồ sơ (ngày)',
                  value: '15',
                  type: 'number',
                },
                {
                  label: 'Cảnh báo trễ hạn (ngày)',
                  value: '3',
                  type: 'number',
                },
                {
                  label: 'Email quản trị',
                  value: 'admin@ubnd.vn',
                  type: 'email',
                },
              ].map((setting, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {setting.label}
                  </label>
                  <Input
                    type={setting.type}
                    defaultValue={setting.value}
                    className="bg-input border-border text-foreground"
                  />
                </div>
              ))}

              <div className="pt-4 flex gap-2">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Lưu cài đặt
                </Button>
                <Button variant="outline" className="border-border bg-transparent">
                  Đặt lại
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Sao lưu & Khôi phục
            </h3>

            <div className="space-y-3">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Sao lưu dữ liệu
              </Button>
              <Button
                variant="outline"
                className="w-full border-border bg-transparent"
              >
                Khôi phục từ sao lưu
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
