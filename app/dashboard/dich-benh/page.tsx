'use client';

import { useState, useEffect } from 'react';
import { dichBenhApi } from '@/lib/api';
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
  AlertTriangle,
  Search,
  Plus,
  Download,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Edit,
  X,
  MapPin,
  Activity,
  Thermometer,
  Shield,
  TrendingUp,
  HeartPulse,
} from 'lucide-react';
import { formatDate, formatDateTime } from '@/lib/mock-data';

// Mock data cho dịch bệnh
const mockDichBenh = [
  {
    MaCaBenh: 1,
    MaCa: 'DB-2024-0001',
    TenBenh: 'Sốt xuất huyết Dengue',
    LoaiBenh: 'Truyền nhiễm',
    MaDonViBenh: 'A90',
    MaBenhNhan: 'BN001',
    TenBenhNhan: 'Nguyễn Văn Anh',
    GioiTinh: 'Nam',
    NamSinh: 1990,
    DiaChi: 'Số 45, Phường 1',
    SoDienThoai: '0901234567',
    NgayKhoiPhat: '2024-01-10',
    NgayPhatHien: '2024-01-12',
    NgayBaoCao: '2024-01-12',
    TrieuChung: 'Sốt cao 39-40°C, đau đầu, đau cơ khớp, phát ban',
    MucDoBenh: 'Nặng',
    TrangThaiDieuTri: 'Đang điều trị',
    NoiDieuTri: 'Bệnh viện Quận',
    NguoiTiepXuc: 5,
    KhuVucPhatHien: 'Phường 1',
    ToaDo: '10.7621,106.6605',
    BienPhapXuLy: 'Cách ly, phun thuốc diệt muỗi bán kính 200m',
    NguoiBaoCao: 'BS. Trần Văn Bình',
    GhiChu: 'Ổ dịch mới, cần theo dõi sát',
  },
  {
    MaCaBenh: 2,
    MaCa: 'DB-2024-0002',
    TenBenh: 'Cúm A (H1N1)',
    LoaiBenh: 'Truyền nhiễm',
    MaDonViBenh: 'J10',
    MaBenhNhan: 'BN002',
    TenBenhNhan: 'Trần Thị Bích',
    GioiTinh: 'Nữ',
    NamSinh: 1985,
    DiaChi: 'Số 78, Phường 2',
    SoDienThoai: '0912345678',
    NgayKhoiPhat: '2024-01-08',
    NgayPhatHien: '2024-01-09',
    NgayBaoCao: '2024-01-09',
    TrieuChung: 'Sốt cao, ho, đau họng, mệt mỏi, đau cơ',
    MucDoBenh: 'Trung bình',
    TrangThaiDieuTri: 'Đã khỏi',
    NoiDieuTri: 'Điều trị tại nhà',
    NguoiTiepXuc: 3,
    KhuVucPhatHien: 'Phường 2',
    ToaDo: '10.7650,106.6620',
    BienPhapXuLy: 'Cách ly tại nhà 7 ngày, theo dõi người tiếp xúc',
    NguoiBaoCao: 'Y sĩ Lê Thị Cúc',
    GhiChu: '',
  },
  {
    MaCaBenh: 3,
    MaCa: 'DB-2024-0003',
    TenBenh: 'Tay chân miệng',
    LoaiBenh: 'Truyền nhiễm',
    MaDonViBenh: 'B08.4',
    MaBenhNhan: 'BN003',
    TenBenhNhan: 'Phạm Minh Châu',
    GioiTinh: 'Nữ',
    NamSinh: 2021,
    DiaChi: 'Số 23, Phường 3',
    SoDienThoai: '0923456789',
    NgayKhoiPhat: '2024-01-14',
    NgayPhatHien: '2024-01-15',
    NgayBaoCao: '2024-01-15',
    TrieuChung: 'Sốt nhẹ, bóng nước ở tay, chân, miệng',
    MucDoBenh: 'Nhẹ',
    TrangThaiDieuTri: 'Đang điều trị',
    NoiDieuTri: 'Trạm Y tế phường',
    NguoiTiepXuc: 15,
    KhuVucPhatHien: 'Phường 3 - Trường mầm non ABC',
    ToaDo: '10.7680,106.6640',
    BienPhapXuLy: 'Thông báo trường mầm non, khử khuẩn lớp học',
    NguoiBaoCao: 'BS. Nguyễn Văn Dũng',
    GhiChu: 'Có thể lây lan trong trường',
  },
  {
    MaCaBenh: 4,
    MaCa: 'DB-2024-0004',
    TenBenh: 'Thủy đậu',
    LoaiBenh: 'Truyền nhiễm',
    MaDonViBenh: 'B01',
    MaBenhNhan: 'BN004',
    TenBenhNhan: 'Lê Văn Em',
    GioiTinh: 'Nam',
    NamSinh: 2015,
    DiaChi: 'Số 56, Phường 1',
    SoDienThoai: '0934567890',
    NgayKhoiPhat: '2024-01-16',
    NgayPhatHien: '2024-01-17',
    NgayBaoCao: '2024-01-17',
    TrieuChung: 'Sốt nhẹ, phát ban dạng mụn nước khắp người',
    MucDoBenh: 'Nhẹ',
    TrangThaiDieuTri: 'Đang điều trị',
    NoiDieuTri: 'Điều trị tại nhà',
    NguoiTiepXuc: 8,
    KhuVucPhatHien: 'Phường 1 - Trường TH Hoa Sen',
    ToaDo: '10.7625,106.6610',
    BienPhapXuLy: 'Cách ly tại nhà, thông báo trường học',
    NguoiBaoCao: 'Y sĩ Trần Thị Giang',
    GhiChu: '',
  },
  {
    MaCaBenh: 5,
    MaCa: 'DB-2024-0005',
    TenBenh: 'COVID-19',
    LoaiBenh: 'Truyền nhiễm',
    MaDonViBenh: 'U07.1',
    MaBenhNhan: 'BN005',
    TenBenhNhan: 'Hoàng Thị Hoa',
    GioiTinh: 'Nữ',
    NamSinh: 1975,
    DiaChi: 'Số 89, Phường 2',
    SoDienThoai: '0945678901',
    NgayKhoiPhat: '2024-01-05',
    NgayPhatHien: '2024-01-06',
    NgayBaoCao: '2024-01-06',
    TrieuChung: 'Ho, sốt, khó thở, mất vị giác',
    MucDoBenh: 'Trung bình',
    TrangThaiDieuTri: 'Đã khỏi',
    NoiDieuTri: 'Bệnh viện dã chiến',
    NguoiTiepXuc: 12,
    KhuVucPhatHien: 'Phường 2',
    ToaDo: '10.7660,106.6630',
    BienPhapXuLy: 'Cách ly tập trung, xét nghiệm F1',
    NguoiBaoCao: 'BS. Võ Văn Khánh',
    GhiChu: 'Đã tiêm 3 mũi vaccine',
  },
];

interface CaBenh {
  MaCaBenh: number;
  MaCa: string;
  TenBenh: string;
  LoaiBenh: string;
  MaDonViBenh: string;
  MaBenhNhan: string;
  TenBenhNhan: string;
  GioiTinh: string;
  NamSinh: number;
  DiaChi: string;
  SoDienThoai: string;
  NgayKhoiPhat: string;
  NgayPhatHien: string;
  NgayBaoCao: string;
  TrieuChung: string;
  MucDoBenh: string;
  TrangThaiDieuTri: string;
  NoiDieuTri: string;
  NguoiTiepXuc: number;
  KhuVucPhatHien: string;
  ToaDo: string;
  BienPhapXuLy: string;
  NguoiBaoCao: string;
  GhiChu: string;
}

export default function DichBenhPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CaBenh | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    MaCa: '',
    TenBenh: '',
    LoaiBenh: 'Truyền nhiễm',
    MaDonViBenh: '',
    TenBenhNhan: '',
    GioiTinh: 'Nam',
    NamSinh: 2000,
    DiaChi: '',
    SoDienThoai: '',
    NgayKhoiPhat: '',
    NgayPhatHien: '',
    TrieuChung: '',
    MucDoBenh: 'Nhẹ',
    TrangThaiDieuTri: 'Đang điều trị',
    NoiDieuTri: '',
    NguoiTiepXuc: 0,
    KhuVucPhatHien: '',
    BienPhapXuLy: '',
    NguoiBaoCao: '',
    GhiChu: '',
  });

  // Fetch data
  useEffect(() => {
    fetchData();
    fetchStats();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await dichBenhApi.getList();
      if (response.success && response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await dichBenhApi.getStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Filter data
  const filteredData = data.filter((item) => {
    const matchSearch = 
      (item.TenDich || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.KhuVuc || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchStatus = statusFilter === 'all' || item.TrangThai === statusFilter;
    const matchSeverity = severityFilter === 'all' || item.MucDo === severityFilter;
    
    return matchSearch && matchStatus && matchSeverity;
  });

  // Handlers
  const handleView = (record: CaBenh) => {
    setSelectedRecord(record);
    setViewDialogOpen(true);
  };

  const handleEdit = (record: CaBenh) => {
    setSelectedRecord(record);
    setFormData({
      MaCa: record.MaCa,
      TenBenh: record.TenBenh,
      LoaiBenh: record.LoaiBenh,
      MaDonViBenh: record.MaDonViBenh,
      TenBenhNhan: record.TenBenhNhan,
      GioiTinh: record.GioiTinh,
      NamSinh: record.NamSinh,
      DiaChi: record.DiaChi,
      SoDienThoai: record.SoDienThoai,
      NgayKhoiPhat: record.NgayKhoiPhat,
      NgayPhatHien: record.NgayPhatHien,
      TrieuChung: record.TrieuChung,
      MucDoBenh: record.MucDoBenh,
      TrangThaiDieuTri: record.TrangThaiDieuTri,
      NoiDieuTri: record.NoiDieuTri,
      NguoiTiepXuc: record.NguoiTiepXuc,
      KhuVucPhatHien: record.KhuVucPhatHien,
      BienPhapXuLy: record.BienPhapXuLy,
      NguoiBaoCao: record.NguoiBaoCao,
      GhiChu: record.GhiChu,
    });
    setEditDialogOpen(true);
  };

  const handleAdd = () => {
    const newMaCa = `DB-${new Date().getFullYear()}-${String(mockDichBenh.length + 1).padStart(4, '0')}`;
    setFormData({
      MaCa: newMaCa,
      TenBenh: '',
      LoaiBenh: 'Truyền nhiễm',
      MaDonViBenh: '',
      TenBenhNhan: '',
      GioiTinh: 'Nam',
      NamSinh: 2000,
      DiaChi: '',
      SoDienThoai: '',
      NgayKhoiPhat: '',
      NgayPhatHien: '',
      TrieuChung: '',
      MucDoBenh: 'Nhẹ',
      TrangThaiDieuTri: 'Đang điều trị',
      NoiDieuTri: '',
      NguoiTiepXuc: 0,
      KhuVucPhatHien: '',
      BienPhapXuLy: '',
      NguoiBaoCao: '',
      GhiChu: '',
    });
    setAddDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editDialogOpen && selectedRecord) {
        const response = await dichBenhApi.update(selectedRecord.MaDich, formData);
        if (response.success) {
          await fetchData();
          await fetchStats();
          setEditDialogOpen(false);
        }
      } else if (addDialogOpen) {
        const response = await dichBenhApi.create(formData);
        if (response.success) {
          await fetchData();
          await fetchStats();
          setAddDialogOpen(false);
        }
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa bản ghi này?')) {
      try {
        const response = await dichBenhApi.delete(id);
        if (response.success) {
          await fetchData();
          await fetchStats();
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Đang theo dõi':
        return <Badge className="bg-yellow-500/10 text-yellow-700 border-0"><Clock className="w-3 h-3 mr-1" />Đang theo dõi</Badge>;
      case 'Hoàn thành':
        return <Badge className="bg-green-500/10 text-green-700 border-0"><CheckCircle2 className="w-3 h-3 mr-1" />Hoàn thành</Badge>;
      default:
        return <Badge className="bg-gray-500/10 text-gray-700 border-0">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Nặng':
        return <Badge className="bg-red-500/10 text-red-700 border-0"><AlertTriangle className="w-3 h-3 mr-1" />Nặng</Badge>;
      case 'Trung bình':
        return <Badge className="bg-orange-500/10 text-orange-700 border-0"><Activity className="w-3 h-3 mr-1" />Trung bình</Badge>;
      case 'Nhẹ':
        return <Badge className="bg-blue-500/10 text-blue-700 border-0"><HeartPulse className="w-3 h-3 mr-1" />Nhẹ</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-status-danger to-primary p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Theo dõi Dịch bệnh</h1>
              </div>
              <p className="text-white/90">Giám sát và cảnh báo dịch bệnh trên địa bàn</p>
            </div>
            <Button className="bg-white text-orange-600 hover:bg-white/90" onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Báo cáo ca bệnh
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.total || 0}</p>
          <p className="text-sm text-muted-foreground">Tổng ca bệnh</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-yellow-500/10 rounded-xl">
              <Thermometer className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.dangTheoDoi || 0}</p>
          <p className="text-sm text-muted-foreground">Đang theo dõi</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.hoanThanh || 0}</p>
          <p className="text-sm text-muted-foreground">Hoàn thành</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalCaNhiem || 0}</p>
          <p className="text-sm text-muted-foreground">Tổng ca nhiễm</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalCaKhoi || 0}</p>
          <p className="text-sm text-muted-foreground">Tổng ca khỏi</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo mã, tên bệnh nhân, loại bệnh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-slate-50"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] h-11">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="Đang điều trị">Đang điều trị</SelectItem>
              <SelectItem value="Đã khỏi">Đã khỏi</SelectItem>
            </SelectContent>
          </Select>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[160px] h-11">
              <SelectValue placeholder="Mức độ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả mức độ</SelectItem>
              <SelectItem value="Nặng">Nặng</SelectItem>
              <SelectItem value="Trung bình">Trung bình</SelectItem>
              <SelectItem value="Nhẹ">Nhẹ</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="h-11">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Mã dịch</th>
                <th className="text-left p-4 font-semibold">Tên dịch</th>
                <th className="text-left p-4 font-semibold">Khu vực</th>
                <th className="text-left p-4 font-semibold">Ngày bắt đầu</th>
                <th className="text-left p-4 font-semibold">Ngày kết thúc</th>
                <th className="text-left p-4 font-semibold">Mức độ</th>
                <th className="text-left p-4 font-semibold">Trạng thái</th>
                <th className="text-left p-4 font-semibold">Số ca nhiễm</th>
                <th className="text-right p-4 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => (
                <tr key={record.MaDich} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-primary">{record.MaDich}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{record.TenDich}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{record.KhuVuc}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {formatDate(record.NgayBatDau)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {record.NgayKetThuc ? formatDate(record.NgayKetThuc) : 'Đang diễn ra'}
                    </div>
                  </td>
                  <td className="p-4">{getSeverityBadge(record.MucDo)}</td>
                  <td className="p-4">{getStatusBadge(record.TrangThai)}</td>
                  <td className="p-4">
                    <Badge variant="outline" className="font-semibold">
                      {record.SoCaNhiem}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleView(record)}
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(record)}
                        title="Cập nhật"
                      >
                        <Edit className="w-4 h-4" />
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
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Không tìm thấy ca bệnh phù hợp</p>
          </div>
        )}
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Chi tiết dịch bệnh
            </DialogTitle>
            <DialogDescription>
              Mã dịch: {selectedRecord?.MaDich}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="grid gap-4 py-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  Thông tin bệnh
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Tên bệnh</Label>
                    <p className="font-medium text-red-600">{selectedRecord.TenBenh}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Mã ICD</Label>
                    <p className="font-mono font-medium">{selectedRecord.MaDonViBenh}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Mức độ</Label>
                    <div>{getSeverityBadge(selectedRecord.MucDoBenh)}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Trạng thái</Label>
                    <div>{getStatusBadge(selectedRecord.TrangThaiDieuTri)}</div>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <Label className="text-muted-foreground text-xs">Triệu chứng</Label>
                    <p className="font-medium">{selectedRecord.TrieuChung}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Thông tin bệnh nhân
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Họ và tên</Label>
                    <p className="font-medium">{selectedRecord.TenBenhNhan}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Giới tính / Năm sinh</Label>
                    <p className="font-medium">{selectedRecord.GioiTinh}, {selectedRecord.NamSinh}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Điện thoại</Label>
                    <p className="font-medium">{selectedRecord.SoDienThoai}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Địa chỉ</Label>
                    <p className="font-medium">{selectedRecord.DiaChi}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Ngày khởi phát</Label>
                  <p className="font-medium">{formatDate(selectedRecord.NgayKhoiPhat)}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Ngày phát hiện</Label>
                  <p className="font-medium">{formatDate(selectedRecord.NgayPhatHien)}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Ngày báo cáo</Label>
                  <p className="font-medium">{formatDate(selectedRecord.NgayBaoCao)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Khu vực phát hiện</Label>
                  <p className="font-medium">{selectedRecord.KhuVucPhatHien}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Nơi điều trị</Label>
                  <p className="font-medium">{selectedRecord.NoiDieuTri}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Số người tiếp xúc (F1)</Label>
                  <p className="font-semibold text-lg text-orange-600">{selectedRecord.NguoiTiepXuc} người</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Người báo cáo</Label>
                  <p className="font-medium">{selectedRecord.NguoiBaoCao}</p>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">Biện pháp xử lý</Label>
                <p className="font-medium bg-yellow-50 p-3 rounded-lg">{selectedRecord.BienPhapXuLy}</p>
              </div>

              {selectedRecord.GhiChu && (
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Ghi chú</Label>
                  <p className="font-medium bg-blue-50 p-3 rounded-lg">{selectedRecord.GhiChu}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Đóng
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
              Cập nhật ca bệnh
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mức độ bệnh</Label>
                <Select value={formData.MucDoBenh} onValueChange={(v) => setFormData({...formData, MucDoBenh: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nhẹ">Nhẹ</SelectItem>
                    <SelectItem value="Trung bình">Trung bình</SelectItem>
                    <SelectItem value="Nặng">Nặng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Trạng thái điều trị</Label>
                <Select value={formData.TrangThaiDieuTri} onValueChange={(v) => setFormData({...formData, TrangThaiDieuTri: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đang điều trị">Đang điều trị</SelectItem>
                    <SelectItem value="Đã khỏi">Đã khỏi</SelectItem>
                    <SelectItem value="Tử vong">Tử vong</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nơi điều trị</Label>
                <Input
                  value={formData.NoiDieuTri}
                  onChange={(e) => setFormData({...formData, NoiDieuTri: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Số người tiếp xúc</Label>
                <Input
                  type="number"
                  value={formData.NguoiTiepXuc}
                  onChange={(e) => setFormData({...formData, NguoiTiepXuc: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Triệu chứng</Label>
              <Textarea
                value={formData.TrieuChung}
                onChange={(e) => setFormData({...formData, TrieuChung: e.target.value})}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Biện pháp xử lý</Label>
              <Textarea
                value={formData.BienPhapXuLy}
                onChange={(e) => setFormData({...formData, BienPhapXuLy: e.target.value})}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Ghi chú</Label>
              <Textarea
                value={formData.GhiChu}
                onChange={(e) => setFormData({...formData, GhiChu: e.target.value})}
                rows={2}
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
              Báo cáo ca bệnh mới
            </DialogTitle>
            <DialogDescription>
              Mã ca: {formData.MaCa}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên bệnh *</Label>
                <Select value={formData.TenBenh} onValueChange={(v) => setFormData({...formData, TenBenh: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bệnh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sốt xuất huyết Dengue">Sốt xuất huyết Dengue</SelectItem>
                    <SelectItem value="Cúm A (H1N1)">Cúm A (H1N1)</SelectItem>
                    <SelectItem value="Tay chân miệng">Tay chân miệng</SelectItem>
                    <SelectItem value="Thủy đậu">Thủy đậu</SelectItem>
                    <SelectItem value="COVID-19">COVID-19</SelectItem>
                    <SelectItem value="Sởi">Sởi</SelectItem>
                    <SelectItem value="Tiêu chảy cấp">Tiêu chảy cấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Mã ICD</Label>
                <Input
                  value={formData.MaDonViBenh}
                  onChange={(e) => setFormData({...formData, MaDonViBenh: e.target.value})}
                  placeholder="VD: A90, J10..."
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Tên bệnh nhân *</Label>
                <Input
                  value={formData.TenBenhNhan}
                  onChange={(e) => setFormData({...formData, TenBenhNhan: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Giới tính</Label>
                <Select value={formData.GioiTinh} onValueChange={(v) => setFormData({...formData, GioiTinh: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nam">Nam</SelectItem>
                    <SelectItem value="Nữ">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Năm sinh</Label>
                <Input
                  type="number"
                  value={formData.NamSinh}
                  onChange={(e) => setFormData({...formData, NamSinh: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Điện thoại</Label>
                <Input
                  value={formData.SoDienThoai}
                  onChange={(e) => setFormData({...formData, SoDienThoai: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Địa chỉ</Label>
                <Input
                  value={formData.DiaChi}
                  onChange={(e) => setFormData({...formData, DiaChi: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ngày khởi phát</Label>
                <Input
                  type="date"
                  value={formData.NgayKhoiPhat}
                  onChange={(e) => setFormData({...formData, NgayKhoiPhat: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Ngày phát hiện</Label>
                <Input
                  type="date"
                  value={formData.NgayPhatHien}
                  onChange={(e) => setFormData({...formData, NgayPhatHien: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Triệu chứng *</Label>
              <Textarea
                value={formData.TrieuChung}
                onChange={(e) => setFormData({...formData, TrieuChung: e.target.value})}
                rows={2}
                placeholder="Mô tả các triệu chứng..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mức độ</Label>
                <Select value={formData.MucDoBenh} onValueChange={(v) => setFormData({...formData, MucDoBenh: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nhẹ">Nhẹ</SelectItem>
                    <SelectItem value="Trung bình">Trung bình</SelectItem>
                    <SelectItem value="Nặng">Nặng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Khu vực phát hiện</Label>
                <Input
                  value={formData.KhuVucPhatHien}
                  onChange={(e) => setFormData({...formData, KhuVucPhatHien: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button onClick={handleSave}>
              <Plus className="w-4 h-4 mr-2" />
              Báo cáo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </>
      )}
    </div>
  );
}
