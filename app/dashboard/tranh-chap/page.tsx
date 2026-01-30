'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { AlertTriangle, MapPin, Clock, XCircle } from 'lucide-react';

export default function TranhChapPage() {
  return (
    <ModulePageTemplate
      title="Phát hiện Khu vực Tranh chấp"
      description="Quản lý các khu vực có tranh chấp đất đai"
      gradientColors="from-orange-600 via-red-500 to-rose-500"
      icon={AlertTriangle}
      stats={[
        { label: 'Vụ tranh chấp', value: 23, color: 'text-red-600', icon: AlertTriangle },
        { label: 'Đang giải quyết', value: 15, color: 'text-amber-600', icon: Clock },
        { label: 'Đã giải quyết', value: 8, color: 'text-green-600', icon: MapPin },
        { label: 'Phức tạp', value: 5, color: 'text-red-600', icon: XCircle },
      ]}
      tableHeaders={['Mã vụ', 'Vị trí', 'Nguyên nhân', 'Mức độ', 'Trạng thái']}
      sampleData={[
        { id: 'TC001', title: 'Thửa 123-124, tờ 45', name: 'Ranh giới', status: 'Phức tạp', date: 'Đang XL' },
        { id: 'TC002', title: 'Thửa 456, tờ 67', name: 'Quyền sở hữu', status: 'Trung bình', date: 'Đã giải quyết' },
        { id: 'TC003', title: 'Thửa 789-790, tờ 89', name: 'Lấn chiếm', status: 'Nghiêm trọng', date: 'Đang XL' },
      ]}
    />
  );
}
