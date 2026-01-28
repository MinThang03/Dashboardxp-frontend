'use client';

import React from "react"

import { useAuth, type UserRole } from '@/lib/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Search,
  Bell,
  MessageSquare,
  BarChart3,
  Home,
  Briefcase,
  MapPin,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Shield,
  GraduationCap,
  Zap,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AIAssistant } from '@/components/ai-assistant';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: UserRole[];
  submenu?: MenuItem[];
}

const navigationItems: MenuItem[] = [
  {
    label: 'Bảng điều khiển',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['admin', 'leader', 'officer', 'citizen'],
  },
  // Leader menu
  {
    label: 'KPI & Giám sát',
    href: '/dashboard/kpi',
    icon: <TrendingUp className="w-5 h-5" />,
    roles: ['leader'],
  },
  {
    label: 'Ngân sách',
    href: '/dashboard/budget',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['leader'],
  },
  {
    label: 'Cảnh báo & Điểm nóng',
    href: '/dashboard/alerts',
    icon: <AlertCircle className="w-5 h-5" />,
    roles: ['leader'],
  },
  {
    label: 'Phê duyệt & Ký số',
    href: '/dashboard/approvals',
    icon: <CheckCircle2 className="w-5 h-5" />,
    roles: ['leader'],
  },
  // Officer menu
  {
    label: 'Hồ sơ một cửa',
    href: '/dashboard/cases',
    icon: <Briefcase className="w-5 h-5" />,
    roles: ['officer'],
  },
  {
    label: 'Tư pháp - Hộ tịch',
    href: '/dashboard/departments/justice',
    icon: <FileText className="w-5 h-5" />,
    roles: ['officer'],
  },
  {
    label: 'Địa chính - Xây dựng',
    href: '/dashboard/departments/land',
    icon: <MapPin className="w-5 h-5" />,
    roles: ['officer'],
  },
  {
    label: 'An ninh - Quốc phòng',
    href: '/dashboard/departments/security',
    icon: <Shield className="w-5 h-5" />,
    roles: ['officer'],
  },
  {
    label: 'Lao động - An sinh',
    href: '/dashboard/departments/labor',
    icon: <GraduationCap className="w-5 h-5" />,
    roles: ['officer'],
  },
  {
    label: 'Tài chính - Kế toán',
    href: '/dashboard/departments/finance',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['officer'],
  },
  {
    label: 'Y tế - Giáo dục',
    href: '/dashboard/departments/health',
    icon: <Zap className="w-5 h-5" />,
    roles: ['officer'],
  },
  {
    label: 'Môi trường',
    href: '/dashboard/departments/environment',
    icon: <Home className="w-5 h-5" />,
    roles: ['officer'],
  },
  {
    label: 'Văn hóa - Du lịch',
    href: '/dashboard/departments/culture',
    icon: <HelpCircle className="w-5 h-5" />,
    roles: ['officer'],
  },
  // Citizen menu
  {
    label: 'Nộp hồ sơ',
    href: '/dashboard/submit',
    icon: <FileText className="w-5 h-5" />,
    roles: ['citizen'],
  },
  {
    label: 'Tra cứu hồ sơ',
    href: '/dashboard/track',
    icon: <CheckCircle2 className="w-5 h-5" />,
    roles: ['citizen'],
  },
  {
    label: 'Phản ánh',
    href: '/dashboard/feedback',
    icon: <MessageSquare className="w-5 h-5" />,
    roles: ['citizen'],
  },
  // Admin menu
  {
    label: 'Quản lý người dùng',
    href: '/dashboard/admin/users',
    icon: <Users className="w-5 h-5" />,
    roles: ['admin'],
  },
  {
    label: 'Quyền & Vai trò',
    href: '/dashboard/admin/roles',
    icon: <Shield className="w-5 h-5" />,
    roles: ['admin'],
  },
  {
    label: 'Cài đặt hệ thống',
    href: '/dashboard/admin/settings',
    icon: <Settings className="w-5 h-5" />,
    roles: ['admin'],
  },
  // Common menu
  {
    label: 'Báo cáo & Phân tích',
    href: '/dashboard/reports',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['admin', 'leader'],
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    return null;
  }

  const filteredMenuItems = navigationItems.filter((item) =>
    item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <AIAssistant />
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-40 flex flex-col',
          sidebarOpen ? 'w-64' : 'w-20',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between shrink-0">
          {sidebarOpen && (
            <div className="font-bold text-lg text-sidebar-primary flex items-center gap-2">
              <Home className="w-6 h-6" />
              <span>Smart Commune</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8 p-0 shrink-0"
          >
            {sidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <button
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  {item.icon}
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-sidebar-border space-y-2 shrink-0">
          {sidebarOpen && (
            <div className="text-xs text-sidebar-foreground px-2 mb-2">
              <div className="font-semibold truncate">{user.name}</div>
              <div className="text-sidebar-foreground/60 capitalize truncate">
                {user.role === 'admin'
                  ? 'Quản trị viên'
                  : user.role === 'leader'
                    ? 'Lãnh đạo'
                    : user.role === 'officer'
                      ? 'Cán bộ'
                      : 'Công dân'}
              </div>
            </div>
          )}
          <Button
            variant="destructive"
            size="sm"
            className="w-full justify-center"
            onClick={handleLogout}
            title={!sidebarOpen ? 'Đăng xuất' : undefined}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Đăng xuất</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className={cn(
          'flex flex-col flex-1 transition-all duration-300',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        )}
      >
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex-1 flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* Search */}
            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input text-foreground border-border"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-status-danger rounded-full" />
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <div className="text-2xl">{user.avatar}</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
