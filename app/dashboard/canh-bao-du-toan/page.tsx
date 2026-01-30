'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { AlertTriangle, AlertCircle, TrendingUp, XCircle } from 'lucide-react';

export default function CanhBaoDuToanPage() {
  return (
    <ModulePageTemplate
      title="Cảnh báo Vượt dự toán"
      description="Thông báo và cảnh báo khi các khoản mục có nguy cơ vượt dự toán"
      gradientColors="from-orange-600 via-red-500 to-rose-500"
      icon={AlertTriangle}
      stats={[
        { label: 'Cảnh báo nghiêm trọng', value: 3, color: 'text-red-600', icon: XCircle },
        { label: 'Cảnh báo trung bình', value: 8, color: 'text-amber-600', icon: AlertCircle },
        { label: 'Đang theo dõi', value: 15, color: 'text-blue-600', icon: AlertTriangle },
        { label: 'Đã xử lý', value: 12, color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Khoản mục', 'Dự toán', 'Đã chi', 'Mức độ']}
      sampleData={[
        { id: 'CB001', title: 'Sửa chữa hạ tầng', name: '800M', status: '850M', date: 'Nghiêm trọng' },
        { id: 'CB002', title: 'Văn phòng phẩm', name: '50M', status: '48M', date: 'Theo dõi' },
        { id: 'CB003', title: 'Điện nước', name: '120M', status: '115M', date: 'Trung bình' },
      ]}
    />
  );
}
