'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Home, Users, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function NhaOCongTrinhPage() {
  return (
    <ModulePageTemplate
      title="Nhà ở & Công trình"
      description="Quản lý nhà ở, công trình công cộng"
      gradientColors="from-indigo-600 via-purple-500 to-pink-500"
      icon={Home}
      stats={[
        { label: 'Nhà ở', value: 1245, color: 'text-blue-600', icon: Home },
        { label: 'Công trình công cộng', value: 28, color: 'text-purple-600', icon: Users },
        { label: 'Đạt chuẩn', value: 1198, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Cần kiểm tra', value: 47, color: 'text-amber-600', icon: AlertTriangle },
      ]}
      tableHeaders={['Mã', 'Loại', 'Địa chỉ', 'Tình trạng', 'Ghi chú']}
      sampleData={[
        { id: 'NO001', title: 'Nhà dân', name: '12 Đường A', status: 'Tốt', date: 'Đạt chuẩn' },
        { id: 'CT001', title: 'Trường học', name: '45 Đường B', status: 'Tốt', date: 'Đạt chuẩn' },
        { id: 'NO002', title: 'Nhà dân', name: '78 Đường C', status: 'Xuống cấp', date: 'Cần sửa' },
      ]}
    />
  );
}
