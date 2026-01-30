'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Building2, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export default function TratTuXayDungPage() {
  return (
    <ModulePageTemplate
      title="Trật tự Xây dựng"
      description="Quản lý trật tự xây dựng, giấy phép"
      gradientColors="from-amber-600 via-orange-500 to-yellow-500"
      icon={Building2}
      stats={[
        { label: 'Công trình theo dõi', value: 156, color: 'text-blue-600', icon: Building2 },
        { label: 'Vi phạm', value: 12, color: 'text-red-600', icon: AlertTriangle },
        { label: 'Đã xử lý', value: 144, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Đang kiểm tra', value: 8, color: 'text-amber-600', icon: Clock },
      ]}
      tableHeaders={['Mã', 'Công trình', 'Địa chỉ', 'Tình trạng', 'Ghi chú']}
      sampleData={[
        { id: 'TTXD001', title: 'Nhà 3 tầng', name: '123 Đường A', status: 'Đủ GP', date: 'Hợp lệ' },
        { id: 'TTXD002', title: 'Nhà 2 tầng', name: '456 Đường B', status: 'Vi phạm', date: 'Chưa có GP' },
        { id: 'TTXD003', title: 'Nhà 4 tầng', name: '789 Đường C', status: 'Đủ GP', date: 'Đang kiểm tra' },
      ]}
    />
  );
}
