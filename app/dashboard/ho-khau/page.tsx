'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Search,
  Plus,
  Download,
  User,
  Calendar,
  Users,
  MapPin,
  Eye,
  Edit,
} from 'lucide-react';

interface HoKhau {
  id: string;
  soHoKhau: string;
  chuHo: string;
  diaChi: string;
  soThanhVien: number;
  loai: 'thuong-tru' | 'tam-tru' | 'tam-vang';
  ngayDangKy: string;
  trangThai: 'active' | 'pending' | 'inactive';
}

const mockData: HoKhau[] = [
  {
    id: 'HK001',
    soHoKhau: 'HK-2024-001',
    chuHo: 'Nguyễn Văn A',
    diaChi: 'Số 10, Đường ABC, Phường 1',
    soThanhVien: 4,
    loai: 'thuong-tru',
    ngayDangKy: '2024-01-10',
    trangThai: 'active',
  },
  {
    id: 'HK002',
    soHoKhau: 'TT-2024-015',
    chuHo: 'Trần Thị B',
    diaChi: 'Số 25, Đường XYZ, Phường 2',
    soThanhVien: 2,
    loai: 'tam-tru',
    ngayDangKy: '2024-01-15',
    trangThai: 'active',
  },
];

const loaiLabels = {
  'thuong-tru': { label: 'Thường trú', color: 'bg-green-500/10 text-green-700' },
  'tam-tru': { label: 'Tạm trú', color: 'bg-blue-500/10 text-blue-700' },
  'tam-vang': { label: 'Tạm vắng', color: 'bg-amber-500/10 text-amber-700' },
};

export default function HoKhauPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    total: 245,
    thuongTru: 198,
    tamTru: 35,
    tamVang: 12,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-accent to-primary p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Home className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Quản lý Hộ khẩu - Cư trú</h1>
              </div>
              <p className="text-white/90">Đăng ký thường trú, tạm trú, tạm vắng</p>
            </div>
            <Button className="bg-white text-indigo-600 hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              Đăng ký mới
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Tổng hộ khẩu</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <Home className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.thuongTru}</p>
          <p className="text-sm text-muted-foreground">Thường trú</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.tamTru}</p>
          <p className="text-sm text-muted-foreground">Tạm trú</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.tamVang}</p>
          <p className="text-sm text-muted-foreground">Tạm vắng</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm theo số hộ khẩu, chủ hộ, địa chỉ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-slate-50"
            />
          </div>
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
                <th className="text-left p-4 font-semibold">Số hộ khẩu</th>
                <th className="text-left p-4 font-semibold">Chủ hộ</th>
                <th className="text-left p-4 font-semibold">Địa chỉ</th>
                <th className="text-left p-4 font-semibold">Số thành viên</th>
                <th className="text-left p-4 font-semibold">Loại</th>
                <th className="text-left p-4 font-semibold">Ngày đăng ký</th>
                <th className="text-right p-4 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-primary">{item.soHoKhau}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {item.chuHo}
                    </div>
                  </td>
                  <td className="p-4 text-sm">{item.diaChi}</td>
                  <td className="p-4">
                    <Badge className="bg-indigo-500/10 text-indigo-700 border-0">
                      <Users className="w-3 h-3 mr-1" />
                      {item.soThanhVien} người
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={`${loaiLabels[item.loai].color} border-0`}>
                      {loaiLabels[item.loai].label}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{item.ngayDangKy}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
