'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  Eye,
  EyeOff,
  Download,
  FileText,
} from 'lucide-react';


// ==================== MOCK DATA ====================
interface User {
  maNguoiDung: number;
  tenDangNhap: string;
  matKhau?: string; // Hidden in frontend, only on creation
  hoVaTen: string;
  email?: string;
  soDienThoai?: string;
  anhDaiDien?: string; // Avatar URL
  maVaiTro: number;
  trangThai: 0 | 1 | 2; // 0 = inactive, 1 = active, 2 = temporary leave
  ngayTao: string;
  ngayCapNhat?: string;
}

const mockUsers: User[] = [
  {
    maNguoiDung: 1,
    tenDangNhap: 'admin_user',
    hoVaTen: 'Nguyễn Văn Admin',
    email: 'admin@ubnd.vn',
    soDienThoai: '0911234567',
    anhDaiDien: 'https://via.placeholder.com/40?text=Admin',
    maVaiTro: 1, // admin
    trangThai: 1, // active
    ngayTao: '2024-01-01 08:00:00',
    ngayCapNhat: '2024-01-15 10:30:00',
  },
  {
    maNguoiDung: 2,
    tenDangNhap: 'leader_user',
    hoVaTen: 'Trần Thị Lãnh Đạo',
    email: 'leader@ubnd.vn',
    soDienThoai: '0912345678',
    anhDaiDien: 'https://via.placeholder.com/40?text=Leader',
    maVaiTro: 2, // leader
    trangThai: 1, // active
    ngayTao: '2024-01-05 09:00:00',
    ngayCapNhat: '2024-01-10 14:20:00',
  },
  {
    maNguoiDung: 3,
    tenDangNhap: 'officer1',
    hoVaTen: 'Lê Văn Cán Bộ 1',
    email: 'officer1@ubnd.vn',
    soDienThoai: '0913456789',
    anhDaiDien: 'https://via.placeholder.com/40?text=Officer1',
    maVaiTro: 3, // officer
    trangThai: 1, // active
    ngayTao: '2024-01-10 07:30:00',
    ngayCapNhat: '2024-01-12 11:00:00',
  },
  {
    maNguoiDung: 4,
    tenDangNhap: 'officer2',
    hoVaTen: 'Phạm Thị Cán Bộ 2',
    email: 'officer2@ubnd.vn',
    soDienThoai: '0914567890',
    anhDaiDien: 'https://via.placeholder.com/40?text=Officer2',
    maVaiTro: 3, // officer
    trangThai: 0, // inactive
    ngayTao: '2024-01-12 08:15:00',
    ngayCapNhat: '2024-01-20 09:45:00',
  },
  {
    maNguoiDung: 5,
    tenDangNhap: 'citizen1',
    hoVaTen: 'Võ Công Dân 1',
    email: 'citizen1@ubnd.vn',
    soDienThoai: '0915678901',
    anhDaiDien: 'https://via.placeholder.com/40?text=Citizen',
    maVaiTro: 4, // citizen
    trangThai: 1, // active
    ngayTao: '2024-01-08 10:00:00',
    ngayCapNhat: '2024-01-18 16:30:00',
  },
  {
    maNguoiDung: 6,
    tenDangNhap: 'officer3',
    hoVaTen: 'Đặng Thị Cán Bộ 3',
    email: 'officer3@ubnd.vn',
    soDienThoai: '0916789012',
    anhDaiDien: 'https://via.placeholder.com/40?text=Officer3',
    maVaiTro: 3, // officer
    trangThai: 2, // temporary leave
    ngayTao: '2024-01-15 10:00:00',
    ngayCapNhat: '2024-01-25 15:30:00',
  },
];

const roleLabels: Record<number, string> = {
  1: 'Quản trị viên',
  2: 'Lãnh đạo',
  3: 'Cán bộ chuyên môn',
  4: 'Công dân',
};

const rolePermissions: Record<number, string[]> = {
  1: [
    'Quản lý người dùng',
    'Cấu hình hệ thống',
    'Xem báo cáo',
    'Quản lý quyền',
    'Quản lý ngân sách',
    'Xem lịch sử',
  ],
  2: [
    'Duyệt hồ sơ',
    'Xem báo cáo bộ phận',
    'Quản lý kế hoạch',
    'Gửi thông báo',
  ],
  3: [
    'Xử lý hồ sơ',
    'Upload tài liệu',
    'Xem báo cáo cá nhân',
    'Gửi phản ánh',
  ],
  4: [
    'Nộp hồ sơ',
    'Tra cứu hồ sơ',
    'Đánh giá dịch vụ',
    'Gửi phản ánh',
  ],
};

// ==================== HELPER FUNCTIONS ====================
const getRoleBadgeClass = (role: number): string => {
  switch (role) {
    case 1: // admin
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 2: // leader
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 3: // officer
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 4: // citizen
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getStatusBadgeClass = (status: 0 | 1 | 2): string => {
  switch (status) {
    case 1:
      return 'bg-status-success/20 text-status-success border-status-success/30';
    case 0:
      return 'bg-status-warning/20 text-status-warning border-status-warning/30';
    case 2:
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getStatusLabel = (status: 0 | 1 | 2): string => {
  switch (status) {
    case 1:
      return 'Hoạt động';
    case 0:
      return 'Ngưng hoạt động';
    case 2:
      return 'Tạm nghỉ';
    default:
      return 'Không xác định';
  }
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// ==================== COMPONENT ====================
export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'settings'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Modal & Form States
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<User> | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isExportingReport, setIsExportingReport] = useState(false);
  const [reportType, setReportType] = useState<'all' | 'active' | 'inactive'>('all');
  const [reportFormat, setReportFormat] = useState<'csv' | 'excel' | 'pdf'>('excel');

  const filteredUsers = mockUsers.filter((u) => {
    // Search filter
    const matchesSearch =
      u.hoVaTen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      u.tenDangNhap.toLowerCase().includes(searchQuery.toLowerCase());

    // Role filter
    const matchesRole = selectedRole === 'all' || u.maVaiTro.toString() === selectedRole;

    // Status filter
    const matchesStatus = selectedStatus === 'all' || u.trangThai.toString() === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // ==================== HANDLERS ====================

  const handleViewClick = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditClickFromView = () => {
    if (selectedUser) {
      setEditFormData({ ...selectedUser });
      setErrors({});
      setIsViewModalOpen(false);
      setIsEditModalOpen(true);
    }
  };

  const handleEditClick = (user: User, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditFormData({ ...user });
    setErrors({});
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setEditFormData({
      tenDangNhap: '',
      hoVaTen: '',
      email: '',
      soDienThoai: '',
      maVaiTro: 4, // citizen
      trangThai: 1, // active
    });
    setErrors({});
    setIsAddModalOpen(true);
  };

  const validateForm = (data: Partial<User>): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.tenDangNhap?.trim()) {
      newErrors.tenDangNhap = 'Tên đăng nhập không được rỗng';
    }

    if (!data.hoVaTen?.trim()) {
      newErrors.hoVaTen = 'Họ và tên không được rỗng';
    }

    if (!data.email?.trim()) {
      newErrors.email = 'Email không được rỗng';
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEdit = () => {
    if (!editFormData) return;

    if (!validateForm(editFormData)) return;

    console.log('Save edit user:', editFormData);
    setIsEditModalOpen(false);
    setEditFormData(null);
    setSelectedUser(null);
  };

  const handleSaveAdd = () => {
    if (!editFormData) return;

    if (!validateForm(editFormData)) return;

    console.log('Create new user:', editFormData);
    setIsAddModalOpen(false);
    setEditFormData(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditFormData(null);
    setErrors({});
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditFormData(null);
    setErrors({});
  };

  const handleDeleteClick = (user: User, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      console.log('Xóa người dùng:', userToDelete.maNguoiDung, userToDelete.hoVaTen);
      // TODO: Gửi API xóa người dùng
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleExportReport = async (type: 'all' | 'active' | 'inactive', format: 'csv' | 'excel' | 'pdf') => {
    try {
      setIsExportingReport(true);

      // Filter data based on report type
      let dataToExport = filteredUsers;
      if (type === 'active') {
        dataToExport = filteredUsers.filter((u) => u.trangThai === 1);
      } else if (type === 'inactive') {
        dataToExport = filteredUsers.filter((u) => u.trangThai !== 1);
      }

      // Prepare report data
      const reportData = dataToExport.map((user) => ({
        'Mã Người Dùng': user.maNguoiDung,
        'Tên Đăng Nhập': user.tenDangNhap,
        'Họ và Tên': user.hoVaTen,
        'Email': user.email || 'N/A',
        'Số Điện Thoại': user.soDienThoai || 'N/A',
        'Vai Trò': roleLabels[user.maVaiTro] || 'N/A',
        'Trạng Thái': getStatusLabel(user.trangThai),
        'Ngày Tạo': user.ngayTao,
        'Ngày Cập Nhật': user.ngayCapNhat || 'N/A',
      }));

      const date = new Date().toISOString().split('T')[0];
      const typeLabel = type === 'all' ? 'all' : type === 'active' ? 'active' : 'inactive';

      if (format === 'csv') {
        // Create CSV content
        const headers = Object.keys(reportData[0] || {});
        const csvContent = [
          headers.join(','),
          ...reportData.map((row) =>
            headers
              .map((header) => {
                const value = row[header as keyof typeof row];
                return typeof value === 'string' && value.includes(',')
                  ? `"${value.replace(/"/g, '""')}"`
                  : value;
              })
              .join(',')
          ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `bao-cao-nguoi-dung-${typeLabel}-${date}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (format === 'excel') {
        // Create simple HTML table for Excel (Excel can read HTML)
        const headers = Object.keys(reportData[0] || {});
        let htmlContent = '<table border="1"><tr>';
        headers.forEach((header) => {
          htmlContent += `<th>${header}</th>`;
        });
        htmlContent += '</tr>';

        reportData.forEach((row) => {
          htmlContent += '<tr>';
          headers.forEach((header) => {
            htmlContent += `<td>${row[header as keyof typeof row]}</td>`;
          });
          htmlContent += '</tr>';
        });
        htmlContent += '</table>';

        const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `bao-cao-nguoi-dung-${typeLabel}-${date}.xls`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (format === 'pdf') {
        // For PDF, we'll create a simple text format that can be printed to PDF
        const headers = Object.keys(reportData[0] || {});
        let textContent = 'BÁO CÁO NGƯỜI DÙNG HỆ THỐNG\n';
        textContent += `Loại: ${type === 'all' ? 'Tất cả' : type === 'active' ? 'Hoạt động' : 'Không hoạt động'}\n`;
        textContent += `Ngày xuất: ${new Date().toLocaleString('vi-VN')}\n\n`;
        textContent += headers.join('\t') + '\n';
        textContent += '='.repeat(100) + '\n';

        reportData.forEach((row) => {
          textContent += headers.map((header) => row[header as keyof typeof row]).join('\t') + '\n';
        });

        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `bao-cao-nguoi-dung-${typeLabel}-${date}.txt`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      console.log(`Xuất báo cáo thành công (${format.toUpperCase()})`);
    } catch (error) {
      console.error('Lỗi khi xuất báo cáo:', error);
    } finally {
      setIsExportingReport(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header - banner tổng quan dùng xanh nhạt */}
      <div className="rounded-lg bg-[var(--banner)] px-4 py-3">
        <h1 className="text-3xl font-bold text-foreground">
          Quản lý người dùng
        </h1>
        <p className="text-muted-foreground mt-1">
          Tạo, chỉnh sửa, và quản lý thông tin người dùng hệ thống
        </p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          {
            label: 'Tổng người dùng',
            value: mockUsers.length,
            icon: Users,
            color: 'text-primary',
          },
          {
            label: 'Hoạt động',
            value: mockUsers.filter((u) => u.trangThai === 1).length,
            icon: Shield,
            color: 'text-status-success',
          },
          {
            label: 'Ngưng hoạt động',
            value: mockUsers.filter((u) => u.trangThai === 0).length,
            icon: AlertTriangle,
            color: 'text-status-warning',
          },
          {
            label: 'Tạm nghỉ',
            value: mockUsers.filter((u) => u.trangThai === 2).length,
            icon: Key,
            color: 'text-blue-400',
          },
          {
            label: 'Tổng quản trị',
            value: mockUsers.filter((u) => u.maVaiTro === 1).length,
            icon: Database,
            color: 'text-blue-400',
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="bg-card border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color} opacity-20`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* ==================== USERS TAB ==================== */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Search & Add Button Row */}
          <div className="flex gap-3 items-center">
            {/* Search Bar - kéo rộng tối đa */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên, email hoặc username..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-10 bg-input border-border text-sm"
              />
            </div>
            
            {/* Add Button - sát mép phải */}
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-10"
              onClick={handleAddClick}
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm người dùng
            </Button>

            {/* Export Report Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10"
                  disabled={isExportingReport}
                >
                  {isExportingReport ? (
                    <>
                      <span className="inline-block mr-2 animate-spin">⏳</span>
                      Đang xuất...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Xuất báo cáo
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* Loại báo cáo */}
                <DropdownMenuLabel>Loại báo cáo</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setReportType('all')} className={reportType === 'all' ? 'bg-primary/20' : ''}>
                  Tất cả người dùng
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportType('active')} className={reportType === 'active' ? 'bg-primary/20' : ''}>
                  Người dùng hoạt động
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportType('inactive')} className={reportType === 'inactive' ? 'bg-primary/20' : ''}>
                  Người dùng không hoạt động
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Định dạng xuất */}
                <DropdownMenuLabel>Định dạng xuất</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setReportFormat('csv')} className={reportFormat === 'csv' ? 'bg-primary/20' : ''}>
                  CSV - Định dạng văn bản
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportFormat('excel')} className={reportFormat === 'excel' ? 'bg-primary/20' : ''}>
                  Excel (.xls) - Phân tích
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportFormat('pdf')} className={reportFormat === 'pdf' ? 'bg-primary/20' : ''}>
                  Text (.txt) - In báo cáo
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Nút Tải về */}
                <DropdownMenuItem
                  onClick={() => handleExportReport(reportType, reportFormat)}
                  className="bg-status-success/10 text-status-success hover:bg-status-success/20 font-semibold cursor-pointer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải về báo cáo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Filters Row */}
          <div className="flex gap-3 items-center flex-wrap">
            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-foreground">Vai trò:</label>
              <Select value={selectedRole} onValueChange={(value) => {
                setSelectedRole(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-40 h-9 text-sm bg-input border-border">
                  <SelectValue placeholder="Tất cả vai trò" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Tất cả vai trò</SelectItem>
                  {Object.entries(roleLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-foreground">Trạng thái:</label>
              <Select value={selectedStatus} onValueChange={(value) => {
                setSelectedStatus(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-40 h-9 text-sm bg-input border-border">
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="1">Hoạt động</SelectItem>
                  <SelectItem value="0">Ngưng hoạt động</SelectItem>
                  <SelectItem value="2">Tạm nghỉ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Items Per Page */}
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-xs font-medium text-foreground">Hiển thị:</label>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-20 h-9 text-sm bg-input border-border">
                  <SelectValue placeholder="5" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground">/trang</span>
            </div>
          </div>

          {/* User List */}
          <div className="space-y-2">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
              <Card
                key={user.maNguoiDung}
                className="bg-card border-border p-4 hover:border-primary/50 transition cursor-pointer"
                onClick={() => handleViewClick(user)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-foreground">{user.hoVaTen}</h4>
                      <Badge className={getRoleBadgeClass(user.maVaiTro)}>
                        {roleLabels[user.maVaiTro]}
                      </Badge>
                      <Badge className={getStatusBadgeClass(user.trangThai)}>
                        {getStatusLabel(user.trangThai)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user.tenDangNhap} • {user.email || 'N/A'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mã: {user.maNguoiDung} • Ngày tạo: {user.ngayTao}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border bg-transparent"
                      onClick={(e) => handleEditClick(user, e)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-status-danger bg-transparent hover:bg-status-danger/10"
                      onClick={(e) => handleDeleteClick(user, e)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Users className="w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground font-medium">Không tìm thấy người dùng</p>
                <p className="text-xs text-muted-foreground mt-1">Thử thay đổi tiêu chí tìm kiếm hoặc lọc</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between py-4 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Trang <span className="font-semibold">{currentPage}</span> / <span className="font-semibold">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border bg-transparent"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      className={page === currentPage ? 'bg-primary text-primary-foreground' : 'border-border bg-transparent'}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border bg-transparent"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Sau
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="space-y-4">
          {Object.entries(rolePermissions).map(([roleId, permissions]) => {
            return (
              <Card key={roleId} className="bg-card border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {roleLabels[Number(roleId) as 1 | 2 | 3 | 4]}
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
                  value: 'Smart Commune Dashboard',
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

      {/* ==================== VIEW MODAL ==================== */}
      <Dialog open={isViewModalOpen} onOpenChange={handleCloseViewModal}>
        <DialogContent className="max-w-3xl bg-card border-border flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-foreground">Thông tin người dùng</DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Xem đầy đủ thông tin chi tiết người dùng
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="px-4">
              <div className="space-y-6 pb-2">
                {/* Avatar & Basic Info */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border overflow-hidden flex items-center justify-center">
                      {selectedUser.anhDaiDien ? (
                        <img
                          src={selectedUser.anhDaiDien}
                          alt={selectedUser.hoVaTen}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-4xl font-bold text-muted-foreground">
                          {selectedUser.hoVaTen.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-base">{selectedUser.hoVaTen}</p>
                    <p className="text-xs text-muted-foreground">@{selectedUser.tenDangNhap}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className={`${getStatusBadgeClass(selectedUser.trangThai)}`}>
                        {getStatusLabel(selectedUser.trangThai)}
                      </Badge>
                      <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground">
                        {roleLabels[selectedUser.maVaiTro]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Left & Right Columns */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground text-xs font-medium">Tên tài khoản</Label>
                      <Input
                        value={selectedUser.tenDangNhap}
                        disabled
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Họ và tên</Label>
                      <Input
                        value={selectedUser.hoVaTen}
                        disabled
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Vai trò</Label>
                      <Input
                        value={roleLabels[selectedUser.maVaiTro]}
                        disabled
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Ngày tạo</Label>
                      <Input
                        value={selectedUser.ngayTao}
                        disabled
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground text-xs font-medium">Email</Label>
                      <Input
                        value={selectedUser.email || 'N/A'}
                        disabled
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Số điện thoại</Label>
                      <Input
                        value={selectedUser.soDienThoai || 'N/A'}
                        disabled
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Trạng thái</Label>
                      <Input
                        value={getStatusLabel(selectedUser.trangThai)}
                        disabled
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Ngày cập nhật</Label>
                      <Input
                        value={selectedUser.ngayCapNhat || 'Chưa cập nhật'}
                        disabled
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex-shrink-0 pt-3 border-t border-border mt-3">
            <Button
              variant="outline"
              size="sm"
              className="border-border bg-transparent"
              onClick={handleCloseViewModal}
            >
              Đóng
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleEditClickFromView}
            >
              Chỉnh sửa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== EDIT MODAL ==================== */}
      <Dialog open={isEditModalOpen} onOpenChange={handleCloseEditModal}>
        <DialogContent className="max-w-3xl bg-card border-border flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-foreground">Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Cập nhật thông tin chi tiết người dùng
            </DialogDescription>
          </DialogHeader>

          {editFormData && (
            <div className="px-4">
              <div className="space-y-6 pb-2">
                {/* Avatar & Basic Preview */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border overflow-hidden flex items-center justify-center">
                      {editFormData.anhDaiDien ? (
                        <img
                          src={editFormData.anhDaiDien}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-3xl font-bold text-muted-foreground">
                          {editFormData.hoVaTen?.charAt(0) || '?'}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div>
                      <Label className="text-foreground text-xs font-medium">Tải lên ảnh</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditFormData({
                                ...editFormData,
                                anhDaiDien: reader.result as string,
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Hoặc nhập URL bên dưới</p>
                    </div>
                    <div className="mt-3">
                      <Label className="text-foreground text-xs font-medium">URL ảnh đại diện</Label>
                      <Input
                        value={editFormData.anhDaiDien || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            anhDaiDien: e.target.value,
                          })
                        }
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Left & Right Columns */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground text-xs font-medium">Tên đăng nhập *</Label>
                      <Input
                        value={editFormData.tenDangNhap || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            tenDangNhap: e.target.value,
                          })
                        }
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="username"
                      />
                      {errors.tenDangNhap && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.tenDangNhap}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Họ và tên *</Label>
                      <Input
                        value={editFormData.hoVaTen || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            hoVaTen: e.target.value,
                          })
                        }
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="Nguyễn Văn A"
                      />
                      {errors.hoVaTen && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.hoVaTen}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Vai trò *</Label>
                      <Select
                        value={editFormData.maVaiTro?.toString() || ''}
                        onValueChange={(value) =>
                          setEditFormData({
                            ...editFormData,
                            maVaiTro: Number(value) as 1 | 2 | 3 | 4,
                          })
                        }
                      >
                        <SelectTrigger className="mt-1 h-8 text-sm bg-input border-border text-foreground">
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {Object.entries(roleLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.maVaiTro && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.maVaiTro}</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground text-xs font-medium">Email *</Label>
                      <Input
                        value={editFormData.email || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            email: e.target.value,
                          })
                        }
                        type="email"
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="user@ubnd.vn"
                      />
                      {errors.email && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Số điện thoại</Label>
                      <Input
                        value={editFormData.soDienThoai || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            soDienThoai: e.target.value,
                          })
                        }
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="0912345678"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Trạng thái *</Label>
                      <Select
                        value={editFormData.trangThai?.toString() || ''}
                        onValueChange={(value) =>
                          setEditFormData({
                            ...editFormData,
                            trangThai: Number(value) as 0 | 1 | 2,
                          })
                        }
                      >
                        <SelectTrigger className="mt-1 h-8 text-sm bg-input border-border text-foreground">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="1">Hoạt động</SelectItem>
                          <SelectItem value="0">Ngưng hoạt động</SelectItem>
                          <SelectItem value="2">Tạm nghỉ</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.trangThai && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.trangThai}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex-shrink-0 pt-3 border-t border-border mt-3">
            <Button
              variant="outline"
              size="sm"
              className="border-border bg-transparent"
              onClick={handleCloseEditModal}
            >
              Hủy
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSaveEdit}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== ADD MODAL ==================== */}
      <Dialog open={isAddModalOpen} onOpenChange={handleCloseAddModal}>
        <DialogContent className="max-w-4xl bg-card border-border flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-foreground">Thêm người dùng mới</DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Điền đầy đủ thông tin để tạo người dùng mới
            </DialogDescription>
          </DialogHeader>

          {editFormData && (
            <div className="px-4">
              <div className="space-y-6 pb-2">
                {/* Avatar & Basic Preview */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border overflow-hidden flex items-center justify-center">
                      {editFormData.anhDaiDien ? (
                        <img
                          src={editFormData.anhDaiDien}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-3xl font-bold text-muted-foreground">
                          +
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div>
                      <Label className="text-foreground text-xs font-medium">Tải lên ảnh</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditFormData({
                                ...editFormData,
                                anhDaiDien: reader.result as string,
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Hoặc nhập URL bên dưới</p>
                    </div>
                    <div className="mt-3">
                      <Label className="text-foreground text-xs font-medium">URL ảnh đại diện</Label>
                      <Input
                        value={editFormData.anhDaiDien || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            anhDaiDien: e.target.value,
                          })
                        }
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Left & Right Columns */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground text-xs font-medium">Tên đăng nhập *</Label>
                      <Input
                        value={editFormData.tenDangNhap || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            tenDangNhap: e.target.value,
                          })
                        }
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="username"
                      />
                      {errors.tenDangNhap && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.tenDangNhap}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Mật khẩu *</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={editFormData.matKhau || ''}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              matKhau: e.target.value,
                            })
                          }
                          className="mt-1 h-8 text-sm bg-input border-border text-foreground pr-8"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.matKhau && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.matKhau}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Họ và tên *</Label>
                      <Input
                        value={editFormData.hoVaTen || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            hoVaTen: e.target.value,
                          })
                        }
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="Nguyễn Văn A"
                      />
                      {errors.hoVaTen && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.hoVaTen}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Vai trò *</Label>
                      <Select
                        value={editFormData.maVaiTro?.toString() || ''}
                        onValueChange={(value) =>
                          setEditFormData({
                            ...editFormData,
                            maVaiTro: Number(value) as 1 | 2 | 3 | 4,
                          })
                        }
                      >
                        <SelectTrigger className="mt-1 h-8 text-sm bg-input border-border text-foreground">
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {Object.entries(roleLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.maVaiTro && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.maVaiTro}</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground text-xs font-medium">Email *</Label>
                      <Input
                        value={editFormData.email || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            email: e.target.value,
                          })
                        }
                        type="email"
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="user@ubnd.vn"
                      />
                      {errors.email && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Nhập lại mật khẩu *</Label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={editFormData.matKhau || ''}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              matKhau: e.target.value,
                            })
                          }
                          className="mt-1 h-8 text-sm bg-input border-border text-foreground pr-8"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Số điện thoại</Label>
                      <Input
                        value={editFormData.soDienThoai || ''}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            soDienThoai: e.target.value,
                          })
                        }
                        className="mt-1 h-8 text-sm bg-input border-border text-foreground"
                        placeholder="0912345678"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-xs font-medium">Trạng thái *</Label>
                      <Select
                        value={editFormData.trangThai?.toString() || ''}
                        onValueChange={(value) =>
                          setEditFormData({
                            ...editFormData,
                            trangThai: Number(value) as 0 | 1 | 2,
                          })
                        }
                      >
                        <SelectTrigger className="mt-1 h-8 text-sm bg-input border-border text-foreground">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="1">Hoạt động</SelectItem>
                          <SelectItem value="0">Ngưng hoạt động</SelectItem>
                          <SelectItem value="2">Tạm nghỉ</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.trangThai && (
                        <p className="text-xs text-status-danger mt-0.5">{errors.trangThai}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex-shrink-0 pt-3 border-t border-border mt-3">
            <Button
              variant="outline"
              size="sm"
              className="border-border bg-transparent"
              onClick={handleCloseAddModal}
            >
              Hủy
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSaveAdd}
            >
              Tạo mới
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== DELETE CONFIRMATION DIALOG ==================== */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Xác nhận xóa người dùng</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Bạn có chắc chắn muốn xóa người dùng <span className="font-semibold text-foreground">{userToDelete?.hoVaTen}</span> ({userToDelete?.tenDangNhap})? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center gap-2 p-3 bg-status-danger/10 border border-status-danger/30 rounded-md">
            <AlertTriangle className="w-4 h-4 text-status-danger flex-shrink-0" />
            <p className="text-sm text-foreground">Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn</p>
          </div>
          <DialogFooter className="gap-2">
            <AlertDialogCancel className="bg-transparent border-border text-foreground hover:bg-secondary">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-status-danger text-white hover:bg-status-danger/90"
            >
              Xóa
            </AlertDialogAction>
          </DialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
