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
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  Search,
  Plus,
  Eye,
  Filter,
  Home,
  ArrowLeft,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react';
import { mockBaoCaoTaiChinh } from '@/lib/mock-data';

export default function BaoCaoTaiChinhPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Tính toán thống kê
  const stats = {
    baoCaoThang: mockBaoCaoTaiChinh.filter(bc => bc.LoaiBaoCao === 'Báo cáo tháng').length,
    baoCaoQuy: mockBaoCaoTaiChinh.filter(bc => bc.LoaiBaoCao === 'Báo cáo quý').length,
    daDuyet: mockBaoCaoTaiChinh.filter(bc => bc.TrangThai === 'Đã duyệt').length,
    choDuyet: mockBaoCaoTaiChinh.filter(bc => bc.TrangThai === 'Chờ duyệt').length,
  };

  // Lọc dữ liệu
  const filteredData = mockBaoCaoTaiChinh.filter(bc =>
    bc.TenBaoCao.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bc.KyBaoCao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (report: any) => {
    setSelectedReport(report);
    setIsViewOpen(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['Mã BC', 'Tên báo cáo', 'Kỳ BC', 'Tổng thu', 'Tổng chi', 'Tồn quỹ', 'Trạng thái'],
      ...filteredData.map(bc => [
        bc.MaBaoCao,
        bc.TenBaoCao,
        bc.KyBaoCao,
        bc.TongThu,
        bc.TongChi,
        bc.TonQuy,
        bc.TrangThai
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bao-cao-tai-chinh-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleFilter = () => {
    setIsFilterOpen(true);
  };

  const handleDownload = (item: any) => {
    const content = `Báo cáo: ${item.TenBaoCao}\nMã: ${item.MaBaoCao}\nKỳ: ${item.KyBaoCao}\nTổng thu: ${item.TongThu}\nTổng chi: ${item.TongChi}\nTồn quỹ: ${item.TonQuy}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `BCTC-${item.MaBaoCao}.txt`;
    link.click();
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + ' tỷ';
    }
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(0) + ' triệu';
    }
    return amount.toLocaleString('vi-VN') + 'đ';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Đã duyệt':
        return <Badge className="bg-green-500/10 text-green-700 border-0"><CheckCircle2 className="w-3 h-3 mr-1" />{status}</Badge>;
      case 'Chờ duyệt':
        return <Badge className="bg-amber-500/10 text-amber-700 border-0"><Clock className="w-3 h-3 mr-1" />{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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
          <span className="text-foreground font-medium">Báo cáo Tài chính</span>
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
                  <FileText className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Lập và Xuất Báo cáo Tài chính</h1>
              </div>
              <p className="text-white/90">Tạo và xuất báo cáo tài chính định kỳ</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-indigo-600 hover:bg-white/90" onClick={handleAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Tạo báo cáo
              </Button>
              <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Xuất Excel
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
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.baoCaoThang}</p>
          <p className="text-sm text-muted-foreground">Báo cáo tháng</p>
        </Card>
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.baoCaoQuy}</p>
          <p className="text-sm text-muted-foreground">Báo cáo quý/năm</p>
        </Card>
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.daDuyet}</p>
          <p className="text-sm text-muted-foreground">Đã phê duyệt</p>
        </Card>
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.choDuyet}</p>
          <p className="text-sm text-muted-foreground">Chờ duyệt</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm báo cáo..."
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
          <h3 className="text-lg font-semibold">Danh sách báo cáo tài chính</h3>
          <Badge className="bg-primary/10 text-primary border-0">
            Tổng: {filteredData.length}
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Mã BC</th>
                <th className="text-left p-4 font-semibold">Tên báo cáo</th>
                <th className="text-left p-4 font-semibold">Loại</th>
                <th className="text-left p-4 font-semibold">Kỳ báo cáo</th>
                <th className="text-left p-4 font-semibold">Ngày lập</th>
                <th className="text-left p-4 font-semibold">Trạng thái</th>
                <th className="text-right p-4 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((bc) => (
                <tr key={bc.MaBaoCao} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-primary">BCTC-{String(bc.MaBaoCao).padStart(3, '0')}</span>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{bc.TenBaoCao}</p>
                    <p className="text-xs text-muted-foreground">{bc.NguoiLap}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{bc.LoaiBaoCao}</Badge>
                  </td>
                  <td className="p-4">{bc.KyBaoCao}</td>
                  <td className="p-4 text-sm text-muted-foreground">{bc.NgayLap}</td>
                  <td className="p-4">{getStatusBadge(bc.TrangThai)}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleView(bc)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDownload(bc)}>
                        <Download className="w-4 h-4" />
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết báo cáo tài chính</DialogTitle>
            <DialogDescription>
              {selectedReport?.TenBaoCao}
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Loại báo cáo</p>
                  <p className="font-medium">{selectedReport.LoaiBaoCao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kỳ báo cáo</p>
                  <p className="font-medium">{selectedReport.KyBaoCao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ngày lập</p>
                  <p className="font-medium">{selectedReport.NgayLap}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Người lập</p>
                  <p className="font-medium">{selectedReport.NguoiLap}</p>
                </div>
              </div>

              {selectedReport.SoLieuTaiChinh && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Số liệu tài chính</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedReport.SoLieuTaiChinh.TongThu && (
                      <Card className="p-4 bg-status-success/10 border-status-success/20">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-status-success" />
                          <p className="text-sm text-status-success">Tổng thu</p>
                        </div>
                        <p className="text-xl font-bold text-status-success mt-1">
                          {formatCurrency(selectedReport.SoLieuTaiChinh.TongThu)}
                        </p>
                      </Card>
                    )}
                    {selectedReport.SoLieuTaiChinh.TongChi && (
                      <Card className="p-4 bg-status-danger/10 border-status-danger/20">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-status-danger" />
                          <p className="text-sm text-status-danger">Tổng chi</p>
                        </div>
                        <p className="text-xl font-bold text-status-danger mt-1">
                          {formatCurrency(selectedReport.SoLieuTaiChinh.TongChi)}
                        </p>
                      </Card>
                    )}
                    {selectedReport.SoLieuTaiChinh.TonQuy && (
                      <Card className="p-4 bg-primary/10 border-primary/20">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <p className="text-sm text-primary">Tồn quỹ</p>
                        </div>
                        <p className="text-xl font-bold text-primary mt-1">
                          {formatCurrency(selectedReport.SoLieuTaiChinh.TonQuy)}
                        </p>
                      </Card>
                    )}
                  </div>

                  {/* Chi tiết */}
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {Object.entries(selectedReport.SoLieuTaiChinh)
                      .filter(([key]) => !['TongThu', 'TongChi', 'TonQuy'].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-medium">
                            {typeof value === 'number' 
                              ? (key.includes('TyLe') ? value + '%' : formatCurrency(value))
                              : String(value)
                            }
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {selectedReport.GhiChu && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Ghi chú</p>
                  <p className="text-sm">{selectedReport.GhiChu}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
