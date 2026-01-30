'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Ban, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

export default function XayDungTraiPhepPage() {
  return (
    <ModulePageTemplate
      title="Xây dựng Trái phép"
      description="Phát hiện, xử lý công trình xây dựng trái phép"
      gradientColors="from-red-700 via-red-600 to-orange-500"
      icon={Ban}
      stats={[
        { label: 'Tổng vụ việc', value: 34, color: 'text-red-600', icon: AlertTriangle },
        { label: 'Đang xử lý', value: 12, color: 'text-amber-600', icon: Clock },
        { label: 'Đã xử lý', value: 22, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Cưỡng chế', value: 3, color: 'text-red-600', icon: Ban },
      ]}
      tableHeaders={['Mã', 'Địa chỉ', 'Vi phạm', 'Biện pháp', 'Trạng thái']}
      sampleData={[
        { id: 'XDTP001', title: '123 Đường A', name: 'Xây vượt GP', status: 'Phạt tiền', date: 'Đã xử lý' },
        { id: 'XDTP002', title: '456 Đường B', name: 'Không có GP', status: 'Cưỡng chế', date: 'Đang xử lý' },
        { id: 'XDTP003', title: '789 Đường C', name: 'Lấn chiếm', status: 'Phạt tiền', date: 'Đang xử lý' },
      ]}
    />
  );
}
