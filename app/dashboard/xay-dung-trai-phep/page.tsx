'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Ban, AlertTriangle, Clock, CheckCircle2, Search, Plus, Download, Eye, Edit,
  MapPin, Calendar, User, Gavel, FileX, DollarSign
} from 'lucide-react';

// Mock data xây dựng trái phép
interface XayDungTraiPhep {
  MaVuViec: string;
  DiaChi: string;
  MaThua: string;
  SoTo: string;
  ChuCongTrinh: string;
  CCCD: string;
  SoDienThoai: string;
  LoaiViPham: string;
  MoTaViPham: string;
  DienTichViPham: number;
  NgayPhatHien: string;
  NguoiPhatHien: string;
  TrangThai: string;
  BienPhapXuLy: string;
  SoTien: number;
  SoQuyetDinhXP: string;
  NgayQD: string;
  ThoiHanThaoGo: string;
  DaCuongChe: boolean;
  NgayCuongChe: string;
  KetQuaXuLy: string;
  GhiChu: string;
}

const mockTraiPhep: XayDungTraiPhep[] = [
  {
    MaVuViec: 'XDTP001',
    DiaChi: '123 Đường ABC, Khu phố 1, phường XYZ',
    MaThua: '123',
    SoTo: '45',
    ChuCongTrinh: 'Nguyễn Văn An',
    CCCD: '001234567890',
    SoDienThoai: '0901234567',
    LoaiViPham: 'Xây dựng không phép',
    MoTaViPham: 'Xây dựng nhà 2 tầng không có giấy phép xây dựng',
    DienTichViPham: 80,
    NgayPhatHien: '2025-01-05',
    NguoiPhatHien: 'Đội quản lý TTXD',
    TrangThai: 'Đã xử lý',
    BienPhapXuLy: 'Phạt tiền, yêu cầu bổ sung giấy phép',
    SoTien: 50000000,
    SoQuyetDinhXP: 'QĐ-2025-001',
    NgayQD: '2025-01-10',
    ThoiHanThaoGo: '',
    DaCuongChe: false,
    NgayCuongChe: '',
    KetQuaXuLy: 'Đã nộp phạt, đang hoàn thiện giấy phép',
    GhiChu: ''
  },
  {
    MaVuViec: 'XDTP002',
    DiaChi: '456 Đường DEF, Thôn 2, xã GHI',
    MaThua: '456',
    SoTo: '67',
    ChuCongTrinh: 'Trần Văn Bình',
    CCCD: '001234567891',
    SoDienThoai: '0902345678',
    LoaiViPham: 'Xây dựng không phép',
    MoTaViPham: 'Xây dựng nhà xưởng trên đất nông nghiệp không chuyển mục đích',
    DienTichViPham: 500,
    NgayPhatHien: '2024-12-20',
    NguoiPhatHien: 'Tổ dân phố',
    TrangThai: 'Chờ cưỡng chế',
    BienPhapXuLy: 'Phạt tiền, cưỡng chế tháo dỡ',
    SoTien: 150000000,
    SoQuyetDinhXP: 'QĐ-2025-002',
    NgayQD: '2025-01-05',
    ThoiHanThaoGo: '2025-01-20',
    DaCuongChe: false,
    NgayCuongChe: '',
    KetQuaXuLy: '',
    GhiChu: 'Không hợp tác, chuyển cưỡng chế'
  },
  {
    MaVuViec: 'XDTP003',
    DiaChi: '789 Đường KLM, Khu phố 3, phường NOP',
    MaThua: '789',
    SoTo: '89',
    ChuCongTrinh: 'Công ty TNHH ABC',
    CCCD: '0108765432',
    SoDienThoai: '0903456789',
    LoaiViPham: 'Xây dựng sai phép',
    MoTaViPham: 'Xây vượt 2 tầng so với giấy phép (4 tầng thay vì 2 tầng)',
    DienTichViPham: 200,
    NgayPhatHien: '2025-01-08',
    NguoiPhatHien: 'Đội quản lý TTXD',
    TrangThai: 'Đang xử lý',
    BienPhapXuLy: 'Đình chỉ thi công, lập biên bản xử phạt',
    SoTien: 0,
    SoQuyetDinhXP: '',
    NgayQD: '',
    ThoiHanThaoGo: '',
    DaCuongChe: false,
    NgayCuongChe: '',
    KetQuaXuLy: '',
    GhiChu: 'Đang xem xét phương án xử lý'
  },
  {
    MaVuViec: 'XDTP004',
    DiaChi: '234 Đường QRS, Khu phố 4, phường TUV',
    MaThua: '234',
    SoTo: '12',
    ChuCongTrinh: 'Phạm Thị Dung',
    CCCD: '001234567892',
    SoDienThoai: '0904567890',
    LoaiViPham: 'Lấn chiếm đất công',
    MoTaViPham: 'Xây tường rào lấn chiếm vỉa hè, đất công cộng',
    DienTichViPham: 15,
    NgayPhatHien: '2025-01-10',
    NguoiPhatHien: 'Phản ánh người dân',
    TrangThai: 'Đang xử lý',
    BienPhapXuLy: 'Lập biên bản, yêu cầu tháo dỡ',
    SoTien: 0,
    SoQuyetDinhXP: '',
    NgayQD: '',
    ThoiHanThaoGo: '2025-01-25',
    DaCuongChe: false,
    NgayCuongChe: '',
    KetQuaXuLy: '',
    GhiChu: 'Chủ đầu tư cam kết tự tháo dỡ'
  },
  {
    MaVuViec: 'XDTP005',
    DiaChi: '567 Đường WXY, Thôn 3, xã ZAB',
    MaThua: '567',
    SoTo: '34',
    ChuCongTrinh: 'Hoàng Văn Em',
    CCCD: '001234567893',
    SoDienThoai: '0905678901',
    LoaiViPham: 'Xây dựng không phép',
    MoTaViPham: 'Xây dựng chuồng trại chăn nuôi không phép, gây ô nhiễm',
    DienTichViPham: 300,
    NgayPhatHien: '2024-11-15',
    NguoiPhatHien: 'Phản ánh người dân',
    TrangThai: 'Đã cưỡng chế',
    BienPhapXuLy: 'Phạt tiền, cưỡng chế tháo dỡ',
    SoTien: 100000000,
    SoQuyetDinhXP: 'QĐ-2024-015',
    NgayQD: '2024-11-25',
    ThoiHanThaoGo: '2024-12-10',
    DaCuongChe: true,
    NgayCuongChe: '2024-12-15',
    KetQuaXuLy: 'Đã tháo dỡ hoàn toàn, thu hồi đất',
    GhiChu: ''
  },
  {
    MaVuViec: 'XDTP006',
    DiaChi: '890 Đường CDE, Khu phố 5, phường FGH',
    MaThua: '890',
    SoTo: '56',
    ChuCongTrinh: 'Lê Thị Giang',
    CCCD: '001234567894',
    SoDienThoai: '0906789012',
    LoaiViPham: 'Xây dựng sai phép',
    MoTaViPham: 'Cơi nới ban công lấn ra vỉa hè không phép',
    DienTichViPham: 8,
    NgayPhatHien: '2025-01-12',
    NguoiPhatHien: 'Đội quản lý TTXD',
    TrangThai: 'Mới phát hiện',
    BienPhapXuLy: '',
    SoTien: 0,
    SoQuyetDinhXP: '',
    NgayQD: '',
    ThoiHanThaoGo: '',
    DaCuongChe: false,
    NgayCuongChe: '',
    KetQuaXuLy: '',
    GhiChu: 'Đang lập hồ sơ xử lý'
  }
];

const loaiViPhamOptions = ['Xây dựng không phép', 'Xây dựng sai phép', 'Lấn chiếm đất công', 'Xây trên đất không được phép', 'Khác'];
const trangThaiOptions = ['Mới phát hiện', 'Đang xử lý', 'Đã xử lý', 'Chờ cưỡng chế', 'Đã cưỡng chế'];
const bienPhapOptions = ['Nhắc nhở', 'Phạt tiền', 'Yêu cầu tháo dỡ', 'Đình chỉ thi công', 'Phạt tiền, yêu cầu tháo dỡ', 'Phạt tiền, cưỡng chế tháo dỡ'];

export default function XayDungTraiPhepPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTrangThai, setFilterTrangThai] = useState<string>('all');
  const [filterLoai, setFilterLoai] = useState<string>('all');
  const [selectedVu, setSelectedVu] = useState<XayDungTraiPhep | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredData = mockTraiPhep.filter((item) => {
    const matchesSearch =
      item.MaVuViec.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ChuCongTrinh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.DiaChi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrangThai = filterTrangThai === 'all' || item.TrangThai === filterTrangThai;
    const matchesLoai = filterLoai === 'all' || item.LoaiViPham === filterLoai;
    return matchesSearch && matchesTrangThai && matchesLoai;
  });

  const stats = {
    total: mockTraiPhep.length,
    moiPhatHien: mockTraiPhep.filter(r => r.TrangThai === 'Mới phát hiện').length,
    dangXuLy: mockTraiPhep.filter(r => r.TrangThai === 'Đang xử lý').length,
    daXuLy: mockTraiPhep.filter(r => r.TrangThai === 'Đã xử lý').length,
    cuongChe: mockTraiPhep.filter(r => r.TrangThai === 'Chờ cưỡng chế' || r.TrangThai === 'Đã cưỡng chế').length,
    tongTienPhat: mockTraiPhep.reduce((sum, r) => sum + r.SoTien, 0)
  };

  const getTrangThaiBadge = (trangThai: string) => {
    switch (trangThai) {
      case 'Đã xử lý': return <Badge className="bg-status-success hover:bg-status-success"><CheckCircle2 className="h-3 w-3 mr-1" />{trangThai}</Badge>;
      case 'Đang xử lý': return <Badge className="bg-primary hover:bg-primary"><Clock className="h-3 w-3 mr-1" />{trangThai}</Badge>;
      case 'Mới phát hiện': return <Badge className="bg-status-danger hover:bg-status-danger"><AlertTriangle className="h-3 w-3 mr-1" />{trangThai}</Badge>;
      case 'Chờ cưỡng chế': return <Badge className="bg-status-warning hover:bg-status-warning"><Gavel className="h-3 w-3 mr-1" />{trangThai}</Badge>;
      case 'Đã cưỡng chế': return <Badge className="bg-secondary hover:bg-secondary text-white"><Ban className="h-3 w-3 mr-1" />{trangThai}</Badge>;
      default: return <Badge variant="secondary">{trangThai}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-status-danger via-primary to-status-danger rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ban className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Quản lý Xây dựng Trái phép</h1>
              <p className="text-status-danger/20">Phát hiện, xử lý công trình xây dựng trái phép</p>
            </div>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-status-danger hover:bg-white/90">
                <Plus className="mr-2 h-4 w-4" />
                Ghi nhận vi phạm
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ghi nhận vi phạm xây dựng trái phép</DialogTitle>
                <DialogDescription>Nhập thông tin vụ việc vi phạm</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2 col-span-2">
                  <Label>Địa chỉ vi phạm *</Label>
                  <Input placeholder="Nhập địa chỉ" />
                </div>
                <div className="space-y-2">
                  <Label>Mã thửa</Label>
                  <Input placeholder="Nhập mã thửa" />
                </div>
                <div className="space-y-2">
                  <Label>Số tờ</Label>
                  <Input placeholder="Nhập số tờ" />
                </div>
                <div className="space-y-2">
                  <Label>Loại vi phạm *</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Chọn loại vi phạm" /></SelectTrigger>
                    <SelectContent>
                      {loaiViPhamOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Diện tích vi phạm (m²)</Label>
                  <Input type="number" placeholder="Nhập diện tích" />
                </div>
                <div className="col-span-2 border-t pt-4 mt-2">
                  <h4 className="font-semibold mb-3">Chủ công trình</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Họ tên *</Label>
                      <Input placeholder="Nhập tên" />
                    </div>
                    <div className="space-y-2">
                      <Label>CCCD</Label>
                      <Input placeholder="Nhập CCCD" />
                    </div>
                    <div className="space-y-2">
                      <Label>Điện thoại</Label>
                      <Input placeholder="Nhập SĐT" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ngày phát hiện *</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Người/đơn vị phát hiện</Label>
                  <Input placeholder="Nhập thông tin" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Mô tả vi phạm *</Label>
                  <Textarea placeholder="Mô tả chi tiết hành vi vi phạm" rows={3} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Ghi chú</Label>
                  <Textarea placeholder="Nhập ghi chú" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Hủy</Button>
                <Button onClick={() => setIsAddOpen(false)}>Ghi nhận</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-status-danger">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng vụ việc</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileX className="h-5 w-5 text-status-danger" />
              <span className="text-2xl font-bold">{stats.total}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mới phát hiện</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-status-warning" />
              <span className="text-2xl font-bold">{stats.moiPhatHien}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Đang xử lý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{stats.dangXuLy}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Đã xử lý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-status-success" />
              <span className="text-2xl font-bold">{stats.daXuLy}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cưỡng chế</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-secondary" />
              <span className="text-2xl font-bold">{stats.cuongChe}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-teal-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng tiền phạt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-teal-500" />
              <span className="text-lg font-bold">{(stats.tongTienPhat / 1000000).toFixed(0)}tr</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo mã, chủ công trình, địa chỉ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterLoai} onValueChange={setFilterLoai}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Loại vi phạm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                {loaiViPhamOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterTrangThai} onValueChange={setFilterTrangThai}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                {trangThaiOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách vi phạm xây dựng trái phép</CardTitle>
          <CardDescription>Tìm thấy {filteredData.length} vụ việc</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã vụ</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Chủ công trình</TableHead>
                <TableHead>Loại vi phạm</TableHead>
                <TableHead>Ngày PH</TableHead>
                <TableHead>Tiền phạt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.MaVuViec}>
                  <TableCell className="font-medium text-red-600">{item.MaVuViec}</TableCell>
                  <TableCell>
                    <div className="max-w-[150px] truncate text-sm" title={item.DiaChi}>
                      <MapPin className="inline h-3 w-3 mr-1" />
                      {item.DiaChi}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <User className="h-3 w-3" />
                      {item.ChuCongTrinh}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-status-danger border-status-danger/30">
                      {item.LoaiViPham}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {item.NgayPhatHien}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.SoTien > 0 ? (
                      <span className="font-medium text-red-600">{formatCurrency(item.SoTien)}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getTrangThaiBadge(item.TrangThai)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      {/* View Dialog */}
                      <Dialog open={isViewOpen && selectedVu?.MaVuViec === item.MaVuViec} onOpenChange={(open) => { setIsViewOpen(open); if (!open) setSelectedVu(null); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => { setSelectedVu(item); setIsViewOpen(true); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Chi tiết vụ vi phạm</DialogTitle>
                            <DialogDescription>Mã vụ: {item.MaVuViec}</DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-1 col-span-2">
                              <p className="text-sm text-muted-foreground">Địa chỉ vi phạm</p>
                              <p className="font-medium">{item.DiaChi}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Mã thửa / Số tờ</p>
                              <p className="font-medium">{item.MaThua} / {item.SoTo}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Diện tích vi phạm</p>
                              <p className="font-medium">{item.DienTichViPham} m²</p>
                            </div>
                            <div className="col-span-2 border-t pt-4 mt-2">
                              <h4 className="font-semibold mb-3">Chủ công trình</h4>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Họ tên</p>
                                  <p className="font-medium">{item.ChuCongTrinh}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">CCCD</p>
                                  <p className="font-medium">{item.CCCD}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Điện thoại</p>
                                  <p className="font-medium">{item.SoDienThoai}</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-2 border-t pt-4 mt-2">
                              <h4 className="font-semibold mb-3 text-red-600">Thông tin vi phạm</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Loại vi phạm</p>
                                  <Badge variant="outline" className="text-red-600">{item.LoaiViPham}</Badge>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Ngày phát hiện</p>
                                  <p className="font-medium">{item.NgayPhatHien}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Người/đơn vị phát hiện</p>
                                  <p className="font-medium">{item.NguoiPhatHien}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Trạng thái</p>
                                  {getTrangThaiBadge(item.TrangThai)}
                                </div>
                                <div className="space-y-1 col-span-2">
                                  <p className="text-sm text-muted-foreground">Mô tả vi phạm</p>
                                  <p className="font-medium">{item.MoTaViPham}</p>
                                </div>
                              </div>
                            </div>
                            {(item.BienPhapXuLy || item.SoQuyetDinhXP) && (
                              <div className="col-span-2 border-t pt-4 mt-2">
                                <h4 className="font-semibold mb-3">Biện pháp xử lý</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1 col-span-2">
                                    <p className="text-sm text-muted-foreground">Biện pháp</p>
                                    <p className="font-medium">{item.BienPhapXuLy}</p>
                                  </div>
                                  {item.SoTien > 0 && (
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-foreground">Số tiền phạt</p>
                                      <p className="font-medium text-red-600">{formatCurrency(item.SoTien)}</p>
                                    </div>
                                  )}
                                  {item.SoQuyetDinhXP && (
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-foreground">Số QĐ xử phạt</p>
                                      <p className="font-medium">{item.SoQuyetDinhXP} ({item.NgayQD})</p>
                                    </div>
                                  )}
                                  {item.ThoiHanThaoGo && (
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-foreground">Thời hạn tháo gỡ</p>
                                      <p className="font-medium">{item.ThoiHanThaoGo}</p>
                                    </div>
                                  )}
                                  {item.DaCuongChe && (
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-foreground">Ngày cưỡng chế</p>
                                      <p className="font-medium">{item.NgayCuongChe}</p>
                                    </div>
                                  )}
                                  {item.KetQuaXuLy && (
                                    <div className="space-y-1 col-span-2">
                                      <p className="text-sm text-muted-foreground">Kết quả xử lý</p>
                                      <p className="font-medium">{item.KetQuaXuLy}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            {item.GhiChu && (
                              <div className="space-y-1 col-span-2">
                                <p className="text-sm text-muted-foreground">Ghi chú</p>
                                <p className="font-medium">{item.GhiChu}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Edit Dialog */}
                      <Dialog open={isEditOpen && selectedVu?.MaVuViec === item.MaVuViec} onOpenChange={(open) => { setIsEditOpen(open); if (!open) setSelectedVu(null); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => { setSelectedVu(item); setIsEditOpen(true); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Cập nhật vụ vi phạm</DialogTitle>
                            <DialogDescription>Mã vụ: {item.MaVuViec}</DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                              <Label>Trạng thái</Label>
                              <Select defaultValue={item.TrangThai}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {trangThaiOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Biện pháp xử lý</Label>
                              <Select defaultValue={item.BienPhapXuLy}>
                                <SelectTrigger><SelectValue placeholder="Chọn biện pháp" /></SelectTrigger>
                                <SelectContent>
                                  {bienPhapOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Số tiền phạt (VNĐ)</Label>
                              <Input type="number" defaultValue={item.SoTien} />
                            </div>
                            <div className="space-y-2">
                              <Label>Số QĐ xử phạt</Label>
                              <Input defaultValue={item.SoQuyetDinhXP} />
                            </div>
                            <div className="space-y-2">
                              <Label>Ngày quyết định</Label>
                              <Input type="date" defaultValue={item.NgayQD} />
                            </div>
                            <div className="space-y-2">
                              <Label>Thời hạn tháo gỡ</Label>
                              <Input type="date" defaultValue={item.ThoiHanThaoGo} />
                            </div>
                            <div className="space-y-2">
                              <Label>Ngày cưỡng chế</Label>
                              <Input type="date" defaultValue={item.NgayCuongChe} />
                            </div>
                            <div className="space-y-2 col-span-2">
                              <Label>Kết quả xử lý</Label>
                              <Textarea defaultValue={item.KetQuaXuLy} />
                            </div>
                            <div className="space-y-2 col-span-2">
                              <Label>Ghi chú</Label>
                              <Textarea defaultValue={item.GhiChu} />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Hủy</Button>
                            <Button onClick={() => setIsEditOpen(false)}>Cập nhật</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
