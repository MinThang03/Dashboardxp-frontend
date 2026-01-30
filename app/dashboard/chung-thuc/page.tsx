'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Search,
  Plus,
  Download,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  Eye,
  Edit,
} from 'lucide-react';

interface Certification {
  id: string;
  type: string;
  citizenName: string;
  submitDate: string;
  status: 'pending' | 'verified' | 'completed';
  verifier: string;
  documentType: string;
}

const mockCertifications: Certification[] = [
  {
    id: 'CT001',
    type: 'Chứng thực chữ ký',
    citizenName: 'Nguyễn Văn A',
    submitDate: '2024-01-15',
    status: 'completed',
    verifier: 'Trần Thị B',
    documentType: 'Hợp đồng mua bán',
  },
  {
    id: 'CT002',
    type: 'Chứng thực bản sao',
    citizenName: 'Lê Văn C',
    submitDate: '2024-01-16',
    status: 'verified',
    verifier: 'Phạm Văn D',
    documentType: 'Bằng cấp',
  },
  {
    id: 'CT003',
    type: 'Xác nhận giấy tờ',
    citizenName: 'Hoàng Thị E',
    submitDate: '2024-01-17',
    status: 'pending',
    verifier: 'Trần Thị B',
    documentType: 'Giấy xác nhận độc thân',
  },
];

export default function ChungThucPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    total: mockCertifications.length,
    pending: mockCertifications.filter((c) => c.status === 'pending').length,
    verified: mockCertifications.filter((c) => c.status === 'verified').length,
    completed: mockCertifications.filter((c) => c.status === 'completed').length,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Shield className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Chứng thực, Xác nhận</h1>
              </div>
              <p className="text-white/90">Chứng thực chữ ký, bản sao và xác nhận giấy tờ</p>
            </div>
            <Button className="bg-white text-purple-600 hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              Tạo yêu cầu mới
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <FileCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Tổng yêu cầu</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-yellow-500/10 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.pending}</p>
          <p className="text-sm text-muted-foreground">Chờ xử lý</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.verified}</p>
          <p className="text-sm text-muted-foreground">Đã xác minh</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.completed}</p>
          <p className="text-sm text-muted-foreground">Hoàn thành</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm..."
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
                <th className="text-left p-4 font-semibold">Mã yêu cầu</th>
                <th className="text-left p-4 font-semibold">Loại</th>
                <th className="text-left p-4 font-semibold">Công dân</th>
                <th className="text-left p-4 font-semibold">Loại giấy tờ</th>
                <th className="text-left p-4 font-semibold">Ngày nộp</th>
                <th className="text-left p-4 font-semibold">Trạng thái</th>
                <th className="text-right p-4 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockCertifications.map((cert) => (
                <tr key={cert.id} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-primary">{cert.id}</span>
                  </td>
                  <td className="p-4">
                    <Badge className="bg-purple-500/10 text-purple-700 border-0">
                      {cert.type}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {cert.citizenName}
                    </div>
                  </td>
                  <td className="p-4 text-sm">{cert.documentType}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {cert.submitDate}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge
                      className={
                        cert.status === 'completed'
                          ? 'bg-green-500/10 text-green-700 border-0'
                          : cert.status === 'verified'
                          ? 'bg-blue-500/10 text-blue-700 border-0'
                          : 'bg-yellow-500/10 text-yellow-700 border-0'
                      }
                    >
                      {cert.status === 'completed'
                        ? 'Hoàn thành'
                        : cert.status === 'verified'
                        ? 'Đã xác minh'
                        : 'Chờ xử lý'}
                    </Badge>
                  </td>
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
