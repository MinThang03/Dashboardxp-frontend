'use client';

import { useState, useEffect } from 'react';
import { thuaDatApi } from '@/lib/api';
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
  LandPlot,
  Search,
  Plus,
  Download,
  Calendar,
  CheckCircle2,
  Eye,
  Edit,
  X,
  MapPin,
} from 'lucide-react';
import { formatDate } from '@/lib/mock-data';

export default function ThuaDatPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    MaThua: '',
    SoThua: '',
    SoToBanDo: '',
    DienTich: 0,
    MaLoaiDat: '',
    ChuSoHuu: '',
    ToaDo: '',
    TrangThai: 'Đang sử dụng',
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
      const response = await thuaDatApi.getList();
      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : (response.data as any).data || [];
        setData(items);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await thuaDatApi.getStats();
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
      (item.MaThua || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.SoThua || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.ChuSoHuu || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchStatus = statusFilter === 'all' || item.TrangThai === statusFilter;
    
    return matchSearch && matchStatus;
  });

  // Handlers
  const handleView = (record: any) => {
    setSelectedRecord(record);
    setViewDialogOpen(true);
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setFormData({
      MaThua: record.MaThua,
      SoThua: record.SoThua,
      SoToBanDo: record.SoToBanDo,
      DienTich: record.DienTich,
      MaLoaiDat: record.MaLoaiDat,
      ChuSoHuu: record.ChuSoHuu,
      ToaDo: record.ToaDo,
      TrangThai: record.TrangThai,
      GhiChu: record.GhiChu,
    });
    setEditDialogOpen(true);
  };

  const handleAdd = () => {
    setFormData({
      MaThua: '',
      SoThua: '',
      SoToBanDo: '',
      DienTich: 0,
      MaLoaiDat: '',
      ChuSoHuu: '',
      ToaDo: '',
      TrangThai: 'Đang sử dụng',
      GhiChu: '',
    });
    setAddDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editDialogOpen && selectedRecord) {
        const response = await thuaDatApi.update(selectedRecord.MaThua, formData);
        if (response.success) {
          await fetchData();
          await fetchStats();
          setEditDialogOpen(false);
        }
      } else if (addDialogOpen) {
        const response = await thuaDatApi.create(formData);
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

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bản ghi này?')) {
      try {
        const response = await thuaDatApi.delete(id);
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
      case 'Đang sử dụng':
        return <Badge className="bg-green-500/10 text-green-700 border-0"><CheckCircle2 className="w-3 h-3 mr-1" />Đang sử dụng</Badge>;
      case 'Đã chuyển':
        return <Badge className="bg-gray-500/10 text-gray-700 border-0"><X className="w-3 h-3 mr-1" />Đã chuyển</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-status-success to-primary p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <LandPlot className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Quản lý Thửa đất</h1>
              </div>
              <p className="text-white/90">Theo dõi và quản lý các thửa đất trên địa bàn</p>
            </div>
            <Button className="bg-white text-green-600 hover:bg-white/90" onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm thửa đất
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <LandPlot className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.total || 0}</p>
          <p className="text-sm text-muted-foreground">Tổng thửa đất</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.dangSuDung || 0}</p>
          <p className="text-sm text-muted-foreground">Đang sử dụng</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-gray-500/10 rounded-xl">
              <X className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.daChuyen || 0}</p>
          <p className="text-sm text-muted-foreground">Đã chuyển</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <MapPin className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{(stats.totalDienTich || 0).toLocaleString()} m²</p>
          <p className="text-sm text-muted-foreground">Tổng diện tích</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo mã thửa, số thửa, chủ sở hữu..."
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
              <SelectItem value="Đang sử dụng">Đang sử dụng</SelectItem>
              <SelectItem value="Đã chuyển">Đã chuyển</SelectItem>
            </SelectContent>
          </Select>
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
                <th className="text-left p-4 font-semibold">Mã thửa</th>
                <th className="text-left p-4 font-semibold">Số thửa</th>
                <th className="text-left p-4 font-semibold">Số tờ bản đồ</th>
                <th className="text-left p-4 font-semibold">Diện tích (m²)</th>
                <th className="text-left p-4 font-semibold">Loại đất</th>
                <th className="text-left p-4 font-semibold">Chủ sở hữu</th>
                <th className="text-left p-4 font-semibold">Trạng thái</th>
                <th className="text-right p-4 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => (
                <tr key={record.MaThua} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-primary">{record.MaThua}</span>
                  </td>
                  <td className="p-4">{record.SoThua}</td>
                  <td className="p-4">{record.SoToBanDo}</td>
                  <td className="p-4 font-semibold">{record.DienTich.toLocaleString()}</td>
                  <td className="p-4">
                    <Badge variant="outline">{record.MaLoaiDat}</Badge>
                  </td>
                  <td className="p-4">{record.ChuSoHuu}</td>
                  <td className="p-4">{getStatusBadge(record.TrangThai)}</td>
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
            <LandPlot className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Không tìm thấy thửa đất phù hợp</p>
          </div>
        )}
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LandPlot className="w-5 h-5" />
              Chi tiết thửa đất
            </DialogTitle>
            <DialogDescription>
              Mã thửa: {selectedRecord?.MaThua}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Số thửa</Label>
                  <p className="font-medium">{selectedRecord.SoThua}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Số tờ bản đồ</Label>
                  <p className="font-medium">{selectedRecord.SoToBanDo}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Diện tích</Label>
                  <p className="font-medium">{selectedRecord.DienTich.toLocaleString()} m²</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Loại đất</Label>
                  <p className="font-medium">{selectedRecord.MaLoaiDat}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Chủ sở hữu</Label>
                  <p className="font-medium">{selectedRecord.ChuSoHuu}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Trạng thái</Label>
                  <div>{getStatusBadge(selectedRecord.TrangThai)}</div>
                </div>
                {selectedRecord.ToaDo && (
                  <div className="space-y-1 col-span-2">
                    <Label className="text-muted-foreground text-xs">Tọa độ</Label>
                    <p className="font-medium font-mono">{selectedRecord.ToaDo}</p>
                  </div>
                )}
                {selectedRecord.GhiChu && (
                  <div className="space-y-1 col-span-2">
                    <Label className="text-muted-foreground text-xs">Ghi chú</Label>
                    <p className="font-medium">{selectedRecord.GhiChu}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Cập nhật thửa đất
            </DialogTitle>
            <DialogDescription>
              Mã thửa: {formData.MaThua}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Số thửa *</Label>
                <Input
                  value={formData.SoThua}
                  onChange={(e) => setFormData({...formData, SoThua: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Số tờ bản đồ *</Label>
                <Input
                  value={formData.SoToBanDo}
                  onChange={(e) => setFormData({...formData, SoToBanDo: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Diện tích (m²) *</Label>
                <Input
                  type="number"
                  value={formData.DienTich}
                  onChange={(e) => setFormData({...formData, DienTich: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label>Loại đất</Label>
                <Input
                  value={formData.MaLoaiDat}
                  onChange={(e) => setFormData({...formData, MaLoaiDat: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Chủ sở hữu *</Label>
              <Input
                value={formData.ChuSoHuu}
                onChange={(e) => setFormData({...formData, ChuSoHuu: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Tọa độ</Label>
              <Input
                value={formData.ToaDo}
                onChange={(e) => setFormData({...formData, ToaDo: e.target.value})}
                placeholder="VD: 10.7621,106.6605"
              />
            </div>
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select value={formData.TrangThai} onValueChange={(v) => setFormData({...formData, TrangThai: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Đang sử dụng">Đang sử dụng</SelectItem>
                  <SelectItem value="Đã chuyển">Đã chuyển</SelectItem>
                </SelectContent>
              </Select>
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
              Thêm thửa đất mới
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mã thửa *</Label>
                <Input
                  value={formData.MaThua}
                  onChange={(e) => setFormData({...formData, MaThua: e.target.value})}
                  placeholder="VD: TD001"
                />
              </div>
              <div className="space-y-2">
                <Label>Số thửa *</Label>
                <Input
                  value={formData.SoThua}
                  onChange={(e) => setFormData({...formData, SoThua: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Số tờ bản đồ *</Label>
                <Input
                  value={formData.SoToBanDo}
                  onChange={(e) => setFormData({...formData, SoToBanDo: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Diện tích (m²) *</Label>
                <Input
                  type="number"
                  value={formData.DienTich}
                  onChange={(e) => setFormData({...formData, DienTich: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Loại đất</Label>
                <Input
                  value={formData.MaLoaiDat}
                  onChange={(e) => setFormData({...formData, MaLoaiDat: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select value={formData.TrangThai} onValueChange={(v) => setFormData({...formData, TrangThai: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đang sử dụng">Đang sử dụng</SelectItem>
                    <SelectItem value="Đã chuyển">Đã chuyển</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Chủ sở hữu *</Label>
              <Input
                value={formData.ChuSoHuu}
                onChange={(e) => setFormData({...formData, ChuSoHuu: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Tọa độ</Label>
              <Input
                value={formData.ToaDo}
                onChange={(e) => setFormData({...formData, ToaDo: e.target.value})}
                placeholder="VD: 10.7621,106.6605"
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
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button onClick={handleSave}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm mới
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </>
      )}
    </div>
  );
}
