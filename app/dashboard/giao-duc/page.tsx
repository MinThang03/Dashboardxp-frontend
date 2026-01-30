'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { GraduationCap, Building2, Users, TrendingUp } from 'lucide-react';

export default function GiaoDucPage() {
  return (
    <ModulePageTemplate
      title="Quản lý Giáo dục"
      description="Quản lý trường mầm non, tiểu học trên địa bàn"
      gradientColors="from-indigo-600 via-purple-500 to-pink-500"
      icon={GraduationCap}
      stats={[
        { label: 'Trường học', value: 8, color: 'text-indigo-600', icon: Building2 },
        { label: 'Giáo viên', value: 125, color: 'text-blue-600', icon: Users },
        { label: 'Học sinh', value: 2845, color: 'text-green-600', icon: Users },
        { label: 'Tỷ lệ đến lớp', value: '98.5%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã trường', 'Tên trường', 'Cấp học', 'SL học sinh', 'SL giáo viên']}
      sampleData={[
        { id: 'TH001', title: 'TH Nguyễn Trãi', name: 'Tiểu học', status: '450 HS', date: '18 GV' },
        { id: 'MN001', title: 'MN Hoa Mai', name: 'Mầm non', status: '180 HS', date: '12 GV' },
        { id: 'TH002', title: 'TH Lê Quý Đôn', name: 'Tiểu học', status: '520 HS', date: '22 GV' },
      ]}
    />
  );
}
