'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  Download,
  Eye,
  Filter,
  Home,
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  User,
  Star,
} from 'lucide-react';
import { mockPhanAnhKienNghi } from '@/lib/mock-data';

export default function PhanAnhPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Tính toán thống kê
  const stats = {
    total: mockPhanAnhKienNghi.length,
    choXuLy: mockPhanAnhKienNghi.filter(pa => pa.TrangThai === 'Mới' || pa.TrangThai === 'Đang xử lý').length,
    daXuLy: mockPhanAnhKienNghi.filter(pa => pa.TrangThai === 'Đã xử lý').length,
    khanCap: mockPhanAnhKienNghi.filter(pa => pa.MucDoUuTien === 'Khẩn cấp').length,
  };

  // Lọc dữ liệu
  const filteredData = mockPhanAnhKienNghi.filter(pa =>
    pa.TieuDe.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pa.TenNguoiPhanAnh.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pa.NoiDung.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (item: any) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['Mã PA', 'Tiêu đề', 'Người gửi', 'Ngày gửi', 'Mức độ', 'Trạng thái'],
      ...filteredData.map(item => [
        item.MaPhanAnh,
        item.TieuDe,
        item.NguoiGui,
        item.NgayGui,
        item.MucDo,
        item.TrangThai
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `phan-anh-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleFilter = () => {
    setIsFilterOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Đã xử lý':
        return <Badge className="bg-green-500/10 text-green-700 border-0"><CheckCircle2 className="w-3 h-3 mr-1" />{status}</Badge>;
      case 'Đang xử lý':
        return <Badge className="bg-blue-500/10 text-blue-700 border-0"><Clock className="w-3 h-3 mr-1" />{status}</Badge>;
      case 'Mới':
        return <Badge className="bg-amber-500/10 text-amber-700 border-0"><AlertCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      default:
        return <Badge className="bg-gray-500/10 text-gray-700 border-0">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Khẩn cấp':
        return <Badge className="bg-red-500 text-white">{priority}</Badge>;
      case 'Cao':
        return <Badge className="bg-orange-500 text-white">{priority}</Badge>;
      case 'Thường':
        return <Badge variant="outline">{priority}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
            Bàn làm việc
          </button>
          <span>/</span>
          <span className="text-foreground font-medium">Phản ánh - Kiến nghị</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Button>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-primary to-secondary p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Phản ánh - Kiến nghị</h1>
              </div>
              <p className="text-white/90">Tiếp nhận và xử lý phản ánh từ nhân dân</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-orange-600 hover:bg-white/90" onClick={handleAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Tiếp nhận
              </Button>
              <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-100 rounded-xl">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Tổng phản ánh</p>
        </Card>
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.choXuLy}</p>
          <p className="text-sm text-muted-foreground">Chờ/Đang xử lý</p>
        </Card>
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.daXuLy}</p>
          <p className="text-sm text-muted-foreground">Đã xử lý</p>
        </Card>
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.khanCap}</p>
          <p className="text-sm text-muted-foreground">Khẩn cấp</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm phản ánh..."
              className="pl-10 h-11 bg-slate-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-11" onClick={handleFilter}>
            <Filter className="w-4 h-4 mr-2" />
            Lọc
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="p-6 border-0 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Danh sách phản ánh</h3>
          <Badge className="bg-primary/10 text-primary border-0">
            Tổng: {filteredData.length}
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Mã</th>
                <th className="text-left p-4 font-semibold">Nội dung</th>
                <th className="text-left p-4 font-semibold">Người gửi</th>
                <th className="text-left p-4 font-semibold">Lĩnh vực</th>
                <th className="text-left p-4 font-semibold">Độ ưu tiên</th>
                <th className="text-left p-4 font-semibold">Trạng thái</th>
                <th className="text-right p-4 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((pa) => (
                <tr key={pa.MaPhanAnh} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-primary">PA-{String(pa.MaPhanAnh).padStart(3, '0')}</span>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="font-medium truncate">{pa.TieuDe}</p>
                    <p className="text-xs text-muted-foreground truncate">{pa.NoiDung.substring(0, 50)}...</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{pa.TenNguoiPhanAnh}</p>
                    <p className="text-xs text-muted-foreground">{pa.SoDienThoai}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{pa.TenLinhVuc}</Badge>
                  </td>
                  <td className="p-4">{getPriorityBadge(pa.MucDoUuTien)}</td>
                  <td className="p-4">{getStatusBadge(pa.TrangThai)}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleView(pa)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết phản ánh</DialogTitle>
            <DialogDescription>
              PA-{String(selectedItem?.MaPhanAnh).padStart(3, '0')}
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedItem.TieuDe}</h3>
                <div className="flex gap-2 mt-2">
                  {getPriorityBadge(selectedItem.MucDoUuTien)}
                  {getStatusBadge(selectedItem.TrangThai)}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm">{selectedItem.NoiDung}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Người gửi</p>
                    <p className="font-medium">{selectedItem.TenNguoiPhanAnh}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Số điện thoại</p>
                    <p className="font-medium">{selectedItem.SoDienThoai}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Địa chỉ</p>
                    <p className="font-medium">{selectedItem.DiaChi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày gửi</p>
                    <p className="font-medium">{selectedItem.NgayTao}</p>
                  </div>
                </div>
              </div>

              {selectedItem.TenCanBoXuLy && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Cán bộ xử lý</p>
                  <p className="font-medium">{selectedItem.TenCanBoXuLy}</p>
                </div>
              )}

              {selectedItem.KetQuaXuLy && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Kết quả xử lý</p>
                  <p className="p-3 bg-green-50 rounded-lg text-green-800">{selectedItem.KetQuaXuLy}</p>
                </div>
              )}

              {selectedItem.DiemDanhGia && (
                <div className="flex items-center gap-2 pt-4 border-t">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{selectedItem.DiemDanhGia}/5 điểm hài lòng</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
