'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Palmtree, Users, Coins, TrendingUp } from 'lucide-react';

export default function KinhDoanhDuLichPage() {
  return (
    <ModulePageTemplate
      title="Kinh doanh Du lịch"
      description="Quản lý cơ sở lưu trú, dịch vụ du lịch"
      gradientColors="from-cyan-600 via-teal-500 to-emerald-500"
      icon={Palmtree}
      stats={[
        { label: 'Cơ sở kinh doanh', value: 28, color: 'text-cyan-600', icon: Palmtree },
        { label: 'Khách hàng/tháng', value: 1245, color: 'text-blue-600', icon: Users },
        { label: 'Doanh thu/tháng', value: '450M', color: 'text-green-600', icon: Coins },
        { label: 'Tăng trưởng', value: '+18%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Cơ sở', 'Loại hình', 'Sức chứa', 'Trạng thái']}
      sampleData={[
        { id: 'DL001', title: 'Nhà nghỉ ABC', name: 'Lưu trú', status: '20 phòng', date: 'Hoạt động' },
        { id: 'DL002', title: 'Nhà hàng XYZ', name: 'Ăn uống', status: '100 khách', date: 'Hoạt động' },
        { id: 'DL003', title: 'Tour du lịch 123', name: 'Dịch vụ', status: '40 người/tour', date: 'Hoạt động' },
      ]}
    />
  );
}
