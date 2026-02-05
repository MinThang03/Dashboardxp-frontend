'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FileText,
  Search,
  Plus,
  Download,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  X,
  AlertTriangle,
  Filter,
  Inbox,
  ArrowRight,
  Printer,
} from 'lucide-react';
import { mockHoSoNghiepVu, formatDateTime } from '@/lib/mock-data';

// Extended mock data for TTHC
const mockHoSoTTHC = [
  {
    MaHoSo: 'TTHC-2024-0001',
    TenThuTuc: 'Đăng ký khai sinh',
    MaCongDan: 1,
    TenCongDan: 'Nguyễn Văn An',
    CCCD: '001234567890',
    SoDienThoai: '0901234567',
    Email: 'nguyenvanan@gmail.com',
    DiaChiLienHe: 'Số 123, Phường 1',
    LoaiThuTuc: 'Hộ tịch',
    LinhVuc: 'Tư pháp',
    MaTrangThai: 'DANG_XU_LY',
    TrangThai: 'Đang xử lý',
    NgayTiepNhan: '2024-01-15 08:30:00',
    HanXuLy: '2024-01-18 17:00:00',
    NgayHenTra: '2024-01-18 17:00:00',
    NgayHoanThanh: null,
    CanBoTiepNhan: 'Trần Văn Bình',
    CanBoXuLy: 'Nguyễn Thị Dung',
    KetQuaXuLy: '',
    PhiLePhi: 0,
    GhiChu: '',
    SoBienNhan: 'BN-2024-0001',
  },
  {
    MaHoSo: 'TTHC-2024-0002',
    TenThuTuc: 'Cấp bản sao trích lục hộ tịch',
    MaCongDan: 2,
    TenCongDan: 'Trần Thị Bình',
    CCCD: '001234567891',
    SoDienThoai: '0912345678',
    Email: 'tranthibinh@gmail.com',
    DiaChiLienHe: 'Số 45, Phường 2',
    LoaiThuTuc: 'Hộ tịch',
    LinhVuc: 'Tư pháp',
    MaTrangThai: 'CHO_DUYET',
    TrangThai: 'Chờ duyệt',
    NgayTiepNhan: '2024-01-16 09:15:00',
    HanXuLy: '2024-01-19 17:00:00',
    NgayHenTra: '2024-01-19 17:00:00',
    NgayHoanThanh: null,
    CanBoTiepNhan: 'Trần Văn Bình',
    CanBoXuLy: 'Trần Văn Bình',
    KetQuaXuLy: '',
    PhiLePhi: 5000,
    GhiChu: 'Cần bổ sung giấy tờ',
    SoBienNhan: 'BN-2024-0002',
  },
  {
    MaHoSo: 'TTHC-2024-0003',
    TenThuTuc: 'Xác nhận tình trạng hôn nhân',
    MaCongDan: 3,
    TenCongDan: 'Lê Văn Cường',
    CCCD: '001234567892',
    SoDienThoai: '0923456789',
    Email: 'levancuong@gmail.com',
    DiaChiLienHe: 'Số 67, Phường 3',
    LoaiThuTuc: 'Hộ tịch',
    LinhVuc: 'Tư pháp',
    MaTrangThai: 'HOAN_THANH',
    TrangThai: 'Hoàn thành',
    NgayTiepNhan: '2024-01-10 10:00:00',
    HanXuLy: '2024-01-13 17:00:00',
    NgayHenTra: '2024-01-13 17:00:00',
    NgayHoanThanh: '2024-01-12 14:00:00',
    CanBoTiepNhan: 'Nguyễn Thị Dung',
    CanBoXuLy: 'Nguyễn Thị Dung',
    KetQuaXuLy: 'Đã cấp giấy xác nhận',
    PhiLePhi: 10000,
    GhiChu: '',
    SoBienNhan: 'BN-2024-0003',
  },
  {
    MaHoSo: 'TTHC-2024-0004',
    TenThuTuc: 'Đăng ký kết hôn',
    MaCongDan: 4,
    TenCongDan: 'Phạm Văn Đức',
    CCCD: '001234567893',
    SoDienThoai: '0934567890',
    Email: 'phamvanduc@gmail.com',
    DiaChiLienHe: 'Số 89, Phường 1',
    LoaiThuTuc: 'Hộ tịch',
    LinhVuc: 'Tư pháp',
    MaTrangThai: 'QUA_HAN',
    TrangThai: 'Quá hạn',
    NgayTiepNhan: '2024-01-05 08:30:00',
    HanXuLy: '2024-01-08 17:00:00',
    NgayHenTra: '2024-01-08 17:00:00',
    NgayHoanThanh: null,
    CanBoTiepNhan: 'Trần Văn Bình',
    CanBoXuLy: 'Nguyễn Thị Dung',
    KetQuaXuLy: '',
    PhiLePhi: 0,
    GhiChu: 'Chưa hoàn thiện hồ sơ',
    SoBienNhan: 'BN-2024-0004',
  },
  {
    MaHoSo: 'TTHC-2024-0005',
    TenThuTuc: 'Chứng thực bản sao từ bản chính',
    MaCongDan: 5,
    TenCongDan: 'Hoàng Thị Em',
    CCCD: '001234567894',
    SoDienThoai: '0945678901',
    Email: 'hoangthiem@gmail.com',
    DiaChiLienHe: 'Số 12, Phường 2',
    LoaiThuTuc: 'Chứng thực',
    LinhVuc: 'Tư pháp',
    MaTrangThai: 'MOI_TAO',
    TrangThai: 'Mới tiếp nhận',
    NgayTiepNhan: '2024-01-20 14:00:00',
    HanXuLy: '2024-01-20 17:00:00',
    NgayHenTra: '2024-01-20 17:00:00',
    NgayHoanThanh: null,
    CanBoTiepNhan: 'Trần Văn Bình',
    CanBoXuLy: '',
    KetQuaXuLy: '',
    PhiLePhi: 2000,
    GhiChu: '',
    SoBienNhan: 'BN-2024-0005',
  },
];

interface HoSoTTHC {
  MaHoSo: string;
  TenThuTuc: string;
  MaCongDan: number;
  TenCongDan: string;
  CCCD: string;
  SoDienThoai: string;
  Email: string;
  DiaChiLienHe: string;
  LoaiThuTuc: string;
  LinhVuc: string;
  MaTrangThai: string;
  TrangThai: string;
  NgayTiepNhan: string;
  HanXuLy: string;
  NgayHenTra: string;
  NgayHoanThanh: string | null;
  CanBoTiepNhan: string;
  CanBoXuLy: string;
  KetQuaXuLy: string;
  PhiLePhi: number;
  GhiChu: string;
  SoBienNhan: string;
}

export default function HoSoTTHCPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedHoSo, setSelectedHoSo] = useState<HoSoTTHC | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    MaHoSo: '',
    TenThuTuc: '',
    TenCongDan: '',
    CCCD: '',
    SoDienThoai: '',
    Email: '',
    DiaChiLienHe: '',
    LoaiThuTuc: '',
    LinhVuc: 'Tư pháp',
    MaTrangThai: 'MOI_TAO',
    HanXuLy: '',
    CanBoXuLy: '',
    PhiLePhi: 0,
    GhiChu: '',
  });

  // Filter data
  const filteredData = mockHoSoTTHC.filter((item) => {
    const matchSearch = 
      item.MaHoSo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.TenThuTuc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.TenCongDan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.CCCD.includes(searchQuery);
    
    const matchStatus = statusFilter === 'all' || item.MaTrangThai === statusFilter;
    const matchCategory = categoryFilter === 'all' || item.LoaiThuTuc === categoryFilter;
    
    return matchSearch && matchStatus && matchCategory;
  });

  // Stats
  const stats = {
    total: mockHoSoTTHC.length,
    pending: mockHoSoTTHC.filter((h) => h.MaTrangThai === 'MOI_TAO' || h.MaTrangThai === 'CHO_DUYET').length,
    processing: mockHoSoTTHC.filter((h) => h.MaTrangThai === 'DANG_XU_LY').length,
    completed: mockHoSoTTHC.filter((h) => h.MaTrangThai === 'HOAN_THANH').length,
    overdue: mockHoSoTTHC.filter((h) => h.MaTrangThai === 'QUA_HAN').length,
  };

  // Handlers
  const handleView = (hoSo: HoSoTTHC) => {
    setSelectedHoSo(hoSo);
    setViewDialogOpen(true);
  };

  const handleEdit = (hoSo: HoSoTTHC) => {
    setSelectedHoSo(hoSo);
    setFormData({
      MaHoSo: hoSo.MaHoSo,
      TenThuTuc: hoSo.TenThuTuc,
      TenCongDan: hoSo.TenCongDan,
      CCCD: hoSo.CCCD,
      SoDienThoai: hoSo.SoDienThoai,
      Email: hoSo.Email,
      DiaChiLienHe: hoSo.DiaChiLienHe,
      LoaiThuTuc: hoSo.LoaiThuTuc,
      LinhVuc: hoSo.LinhVuc,
      MaTrangThai: hoSo.MaTrangThai,
      HanXuLy: hoSo.HanXuLy.split(' ')[0],
      CanBoXuLy: hoSo.CanBoXuLy,
      PhiLePhi: hoSo.PhiLePhi,
      GhiChu: hoSo.GhiChu,
    });
    setEditDialogOpen(true);
  };

  const handleAdd = () => {
    const newMaHoSo = `TTHC-${new Date().getFullYear()}-${String(mockHoSoTTHC.length + 1).padStart(4, '0')}`;
    setFormData({
      MaHoSo: newMaHoSo,
      TenThuTuc: '',
      TenCongDan: '',
      CCCD: '',
      SoDienThoai: '',
      Email: '',
      DiaChiLienHe: '',
      LoaiThuTuc: '',
      LinhVuc: 'Tư pháp',
      MaTrangThai: 'MOI_TAO',
      HanXuLy: '',
      CanBoXuLy: '',
      PhiLePhi: 0,
      GhiChu: '',
    });
    setAddDialogOpen(true);
  };

  const handleSave = () => {
    console.log('Saving:', formData);
    setEditDialogOpen(false);
    setAddDialogOpen(false);
  };

  // Helper functions
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HOAN_THANH':
        return <Badge className="bg-green-500/10 text-green-700 border-0"><CheckCircle2 className="w-3 h-3 mr-1" />Hoàn thành</Badge>;
      case 'DANG_XU_LY':
        return <Badge className="bg-blue-500/10 text-blue-700 border-0"><Clock className="w-3 h-3 mr-1" />Đang xử lý</Badge>;
      case 'CHO_DUYET':
        return <Badge className="bg-yellow-500/10 text-yellow-700 border-0"><Clock className="w-3 h-3 mr-1" />Chờ duyệt</Badge>;
      case 'QUA_HAN':
        return <Badge className="bg-red-500/10 text-red-700 border-0"><AlertCircle className="w-3 h-3 mr-1" />Quá hạn</Badge>;
      case 'TU_CHOI':
        return <Badge className="bg-red-500/10 text-red-700 border-0"><X className="w-3 h-3 mr-1" />Từ chối</Badge>;
      default:
        return <Badge className="bg-gray-500/10 text-gray-700 border-0"><Inbox className="w-3 h-3 mr-1" />Mới tiếp nhận</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-primary to-secondary p-6 sm:p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold">Hồ sơ Thủ tục Hành chính</h1>
              </div>
              <p className="text-sm sm:text-base text-white/90">Tiếp nhận và xử lý hồ sơ thủ tục hành chính theo quy trình một cửa</p>
            </div>
            <Button className="w-full sm:w-auto bg-white text-primary hover:bg-white/90" onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Tiếp nhận hồ sơ</span>
              <span className="sm:hidden">Tiếp nhận</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
        <Card className="p-4 sm:p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 sm:p-3 bg-primary/10 rounded-xl">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold">{stats.total}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Tổng hồ sơ</p>
        </Card>

        <Card className="p-4 sm:p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 sm:p-3 bg-status-warning/10 rounded-xl">
              <Inbox className="w-5 h-5 sm:w-6 sm:h-6 text-status-warning" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold">{stats.pending}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Chờ xử lý</p>
        </Card>

        <Card className="p-4 sm:p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 sm:p-3 bg-secondary/10 rounded-xl">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold">{stats.processing}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Đang xử lý</p>
        </Card>

        <Card className="p-4 sm:p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 sm:p-3 bg-status-success/10 rounded-xl">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-status-success" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold">{stats.completed}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Hoàn thành</p>
        </Card>

        <Card className="p-4 sm:p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 sm:p-3 bg-status-danger/10 rounded-xl">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-status-danger" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold">{stats.overdue}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Quá hạn</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <div className="flex-1 min-w-full sm:min-w-[250px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo mã, tên thủ tục, công dân, CCCD..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 h-10 sm:h-11 bg-slate-50 text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] h-10 sm:h-11">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="MOI_TAO">Mới tiếp nhận</SelectItem>
              <SelectItem value="DANG_XU_LY">Đang xử lý</SelectItem>
              <SelectItem value="CHO_DUYET">Chờ duyệt</SelectItem>
              <SelectItem value="HOAN_THANH">Hoàn thành</SelectItem>
              <SelectItem value="QUA_HAN">Quá hạn</SelectItem>
              <SelectItem value="TU_CHOI">Từ chối</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px] h-10 sm:h-11">
              <SelectValue placeholder="Loại thủ tục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="Hộ tịch">Hộ tịch</SelectItem>
              <SelectItem value="Chứng thực">Chứng thực</SelectItem>
              <SelectItem value="Đất đai">Đất đai</SelectItem>
              <SelectItem value="Xây dựng">Xây dựng</SelectItem>
              <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto h-10 sm:h-11" onClick={() => {
            const csvContent = [
              ['Mã HS', 'Tên nghiệp vụ', 'Công dân', 'Ngày nhận', 'Hạn XL', 'Trạng thái'],
              ...dsHoSo.map(hs => [
                hs.MaHoSo,
                hs.TenNghiepVu,
                hs.TenCongDan,
                hs.NgayNhan,
                hs.HanXuLy,
                hs.TrangThai
              ])
            ].map(row => row.join(',')).join('\n');

            const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `ho-so-tthc-${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
          }}>
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Xuất Excel</span>
            <span className="sm:hidden">Xuất</span>
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm">Mã hồ sơ</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm hidden lg:table-cell">Số biên nhận</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm">Tên thủ tục</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm hidden md:table-cell">Công dân</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm hidden xl:table-cell">CCCD</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm hidden lg:table-cell">Loại</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm hidden md:table-cell">Ngày tiếp nhận</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm hidden lg:table-cell">Hạn trả</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm hidden xl:table-cell">Phí/Lệ phí</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm">Trạng thái</th>
                <th className="text-right p-3 sm:p-4 font-semibold text-xs sm:text-sm">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((hoSo) => (
                <tr key={hoSo.MaHoSo} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-3 sm:p-4 text-xs sm:text-sm">
                    <span className="font-semibold text-primary">{hoSo.MaHoSo}</span>
                  </td>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm hidden lg:table-cell">
                    <span>{hoSo.SoBienNhan}</span>
                  </td>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm">
                    <div className="max-w-[150px] sm:max-w-[200px] truncate" title={hoSo.TenThuTuc}>
                      {hoSo.TenThuTuc}
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      {hoSo.TenCongDan}
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm font-mono hidden xl:table-cell">{hoSo.CCCD}</td>
                  <td className="p-3 sm:p-4 hidden lg:table-cell">
                    <Badge variant="outline" className="text-xs">{hoSo.LoaiThuTuc}</Badge>
                  </td>
                  <td className="p-3 sm:p-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {formatDateTime(hoSo.NgayTiepNhan)}
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {formatDateTime(hoSo.NgayHenTra)}
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm hidden xl:table-cell">
                    {hoSo.PhiLePhi > 0 ? formatCurrency(hoSo.PhiLePhi) : 'Miễn phí'}
                  </td>
                  <td className="p-3 sm:p-4">
                    {getStatusBadge(hoSo.MaTrangThai)}
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                        onClick={() => handleView(hoSo)}
                        title="Xem chi tiết"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                        onClick={() => handleEdit(hoSo)}
                        title="Cập nhật"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        title="In biên nhận"
                        onClick={() => {
                          window.print();
                        }}
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Không tìm thấy hồ sơ phù hợp</p>
          </div>
        )}
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Chi tiết hồ sơ TTHC
            </DialogTitle>
            <DialogDescription>
              Mã hồ sơ: {selectedHoSo?.MaHoSo} | Số biên nhận: {selectedHoSo?.SoBienNhan}
            </DialogDescription>
          </DialogHeader>
          {selectedHoSo && (
            <div className="grid gap-4 py-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Thông tin thủ tục
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Tên thủ tục</Label>
                    <p className="font-medium">{selectedHoSo.TenThuTuc}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Loại thủ tục</Label>
                    <p className="font-medium">{selectedHoSo.LoaiThuTuc}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Lĩnh vực</Label>
                    <p className="font-medium">{selectedHoSo.LinhVuc}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Trạng thái</Label>
                    <div>{getStatusBadge(selectedHoSo.MaTrangThai)}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Thông tin công dân
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Họ và tên</Label>
                    <p className="font-medium">{selectedHoSo.TenCongDan}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">CCCD</Label>
                    <p className="font-medium font-mono">{selectedHoSo.CCCD}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Số điện thoại</Label>
                    <p className="font-medium">{selectedHoSo.SoDienThoai}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Email</Label>
                    <p className="font-medium">{selectedHoSo.Email}</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <Label className="text-muted-foreground text-xs">Địa chỉ</Label>
                    <p className="font-medium">{selectedHoSo.DiaChiLienHe}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Thời gian xử lý
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Ngày tiếp nhận</Label>
                    <p className="font-medium">{formatDateTime(selectedHoSo.NgayTiepNhan)}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Hạn xử lý</Label>
                    <p className="font-medium">{formatDateTime(selectedHoSo.HanXuLy)}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Ngày hẹn trả</Label>
                    <p className="font-medium">{formatDateTime(selectedHoSo.NgayHenTra)}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Ngày hoàn thành</Label>
                    <p className="font-medium">
                      {selectedHoSo.NgayHoanThanh ? formatDateTime(selectedHoSo.NgayHoanThanh) : 'Chưa hoàn thành'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Cán bộ xử lý
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Cán bộ tiếp nhận</Label>
                    <p className="font-medium">{selectedHoSo.CanBoTiepNhan}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Cán bộ xử lý</Label>
                    <p className="font-medium">{selectedHoSo.CanBoXuLy || 'Chưa phân công'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Phí/Lệ phí</Label>
                  <p className="font-medium text-lg">
                    {selectedHoSo.PhiLePhi > 0 ? formatCurrency(selectedHoSo.PhiLePhi) : 'Miễn phí'}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Kết quả xử lý</Label>
                  <p className="font-medium">{selectedHoSo.KetQuaXuLy || 'Chưa có'}</p>
                </div>
              </div>

              {selectedHoSo.GhiChu && (
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Ghi chú</Label>
                  <p className="font-medium bg-yellow-50 p-3 rounded-lg">{selectedHoSo.GhiChu}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Đóng
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" />
              In biên nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Cập nhật hồ sơ TTHC
            </DialogTitle>
            <DialogDescription>
              Mã hồ sơ: {formData.MaHoSo}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên thủ tục *</Label>
                <Input
                  value={formData.TenThuTuc}
                  onChange={(e) => setFormData({...formData, TenThuTuc: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Loại thủ tục *</Label>
                <Select value={formData.LoaiThuTuc} onValueChange={(v) => setFormData({...formData, LoaiThuTuc: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hộ tịch">Hộ tịch</SelectItem>
                    <SelectItem value="Chứng thực">Chứng thực</SelectItem>
                    <SelectItem value="Đất đai">Đất đai</SelectItem>
                    <SelectItem value="Xây dựng">Xây dựng</SelectItem>
                    <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên công dân *</Label>
                <Input
                  value={formData.TenCongDan}
                  onChange={(e) => setFormData({...formData, TenCongDan: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>CCCD *</Label>
                <Input
                  value={formData.CCCD}
                  onChange={(e) => setFormData({...formData, CCCD: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input
                  value={formData.SoDienThoai}
                  onChange={(e) => setFormData({...formData, SoDienThoai: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={formData.Email}
                  onChange={(e) => setFormData({...formData, Email: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Địa chỉ liên hệ</Label>
              <Input
                value={formData.DiaChiLienHe}
                onChange={(e) => setFormData({...formData, DiaChiLienHe: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hạn xử lý</Label>
                <Input
                  type="datetime-local"
                  value={formData.HanXuLy}
                  onChange={(e) => setFormData({...formData, HanXuLy: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Cán bộ xử lý</Label>
                <Input
                  value={formData.CanBoXuLy}
                  onChange={(e) => setFormData({...formData, CanBoXuLy: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select value={formData.MaTrangThai} onValueChange={(v) => setFormData({...formData, MaTrangThai: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MOI_TAO">Mới tiếp nhận</SelectItem>
                    <SelectItem value="DANG_XU_LY">Đang xử lý</SelectItem>
                    <SelectItem value="CHO_DUYET">Chờ duyệt</SelectItem>
                    <SelectItem value="HOAN_THANH">Hoàn thành</SelectItem>
                    <SelectItem value="TU_CHOI">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Phí/Lệ phí (VNĐ)</Label>
                <Input
                  type="number"
                  value={formData.PhiLePhi}
                  onChange={(e) => setFormData({...formData, PhiLePhi: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Ghi chú</Label>
              <Textarea
                value={formData.GhiChu}
                onChange={(e) => setFormData({...formData, GhiChu: e.target.value})}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button onClick={handleSave}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Tiếp nhận hồ sơ TTHC mới
            </DialogTitle>
            <DialogDescription>
              Mã hồ sơ: {formData.MaHoSo}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên thủ tục *</Label>
                <Select value={formData.TenThuTuc} onValueChange={(v) => setFormData({...formData, TenThuTuc: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thủ tục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đăng ký khai sinh">Đăng ký khai sinh</SelectItem>
                    <SelectItem value="Đăng ký kết hôn">Đăng ký kết hôn</SelectItem>
                    <SelectItem value="Đăng ký khai tử">Đăng ký khai tử</SelectItem>
                    <SelectItem value="Cấp bản sao trích lục hộ tịch">Cấp bản sao trích lục hộ tịch</SelectItem>
                    <SelectItem value="Xác nhận tình trạng hôn nhân">Xác nhận tình trạng hôn nhân</SelectItem>
                    <SelectItem value="Chứng thực bản sao từ bản chính">Chứng thực bản sao từ bản chính</SelectItem>
                    <SelectItem value="Chứng thực chữ ký">Chứng thực chữ ký</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Loại thủ tục *</Label>
                <Select value={formData.LoaiThuTuc} onValueChange={(v) => setFormData({...formData, LoaiThuTuc: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hộ tịch">Hộ tịch</SelectItem>
                    <SelectItem value="Chứng thực">Chứng thực</SelectItem>
                    <SelectItem value="Đất đai">Đất đai</SelectItem>
                    <SelectItem value="Xây dựng">Xây dựng</SelectItem>
                    <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên công dân *</Label>
                <Input
                  value={formData.TenCongDan}
                  onChange={(e) => setFormData({...formData, TenCongDan: e.target.value})}
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div className="space-y-2">
                <Label>CCCD *</Label>
                <Input
                  value={formData.CCCD}
                  onChange={(e) => setFormData({...formData, CCCD: e.target.value})}
                  placeholder="Nhập số CCCD"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input
                  value={formData.SoDienThoai}
                  onChange={(e) => setFormData({...formData, SoDienThoai: e.target.value})}
                  placeholder="0xxx xxx xxx"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={formData.Email}
                  onChange={(e) => setFormData({...formData, Email: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Địa chỉ liên hệ</Label>
              <Input
                value={formData.DiaChiLienHe}
                onChange={(e) => setFormData({...formData, DiaChiLienHe: e.target.value})}
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hạn xử lý</Label>
                <Input
                  type="datetime-local"
                  value={formData.HanXuLy}
                  onChange={(e) => setFormData({...formData, HanXuLy: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Phí/Lệ phí (VNĐ)</Label>
                <Input
                  type="number"
                  value={formData.PhiLePhi}
                  onChange={(e) => setFormData({...formData, PhiLePhi: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Ghi chú</Label>
              <Textarea
                value={formData.GhiChu}
                onChange={(e) => setFormData({...formData, GhiChu: e.target.value})}
                placeholder="Nhập ghi chú nếu có..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button onClick={handleSave}>
              <Plus className="w-4 h-4 mr-2" />
              Tiếp nhận hồ sơ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
