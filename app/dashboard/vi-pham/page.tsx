'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { AlertTriangle, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function ViPhamPage() {
  return (
    <ModulePageTemplate
      title="Hồ sơ Vi phạm"
      description="Quản lý biên bản vi phạm, xử phạt VPHC"
      gradientColors="from-red-600 via-rose-500 to-pink-500"
      icon={AlertTriangle}
      stats={[
        { label: 'Tổng vụ việc', value: 87, color: 'text-red-600', icon: AlertTriangle },
        { label: 'Đang xử lý', value: 23, color: 'text-amber-600', icon: Clock },
        { label: 'Đã xử lý', value: 64, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Vi phạm lại', value: 5, color: 'text-red-600', icon: XCircle },
      ]}
      tableHeaders={['Mã BB', 'Loại vi phạm', 'Đối tượng', 'Mức phạt', 'Trạng thái']}
      sampleData={[
        { id: 'VP001', title: 'VPHC công trình', name: 'Nguyễn Văn A', status: '5.000.000đ', date: 'Đã xử lý' },
        { id: 'VP002', title: 'VPHC trật tự đô thị', name: 'Trần Thị B', status: '2.000.000đ', date: 'Đang xử lý' },
        { id: 'VP003', title: 'VPHC vệ sinh môi trường', name: 'Lê Văn C', status: '1.000.000đ', date: 'Đã xử lý' },
      ]}
    />
  );
}
