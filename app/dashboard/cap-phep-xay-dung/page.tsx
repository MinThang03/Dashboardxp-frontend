'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Hammer, FileCheck, Building2, AlertTriangle } from 'lucide-react';

export default function CapPhepXayDungPage() {
  return (
    <ModulePageTemplate
      title="Cấp phép Xây dựng"
      description="Tiếp nhận và xử lý hồ sơ cấp phép xây dựng"
      gradientColors="from-orange-600 via-amber-500 to-yellow-500"
      icon={Hammer}
      stats={[
        { label: 'Chờ xử lý', value: 8, color: 'text-yellow-600', icon: FileCheck },
        { label: 'Đang xử lý', value: 15, color: 'text-blue-600', icon: Building2 },
        { label: 'Đã cấp phép', value: 156, color: 'text-green-600', icon: FileCheck },
        { label: 'Từ chối', value: 3, color: 'text-red-600', icon: AlertTriangle },
      ]}
      sampleData={[
        { id: 'XD001', title: 'Nhà ở riêng lẻ - Nguyễn Văn A', status: 'Đang xử lý', date: '2024-01-15' },
        { id: 'XD002', title: 'Sửa chữa nhà - Trần Thị B', status: 'Chờ duyệt', date: '2024-01-16' },
      ]}
    />
  );
}
