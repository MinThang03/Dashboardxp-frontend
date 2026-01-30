'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Store, Users, Coins, TrendingUp } from 'lucide-react';

export default function ChoKinhDoanhPage() {
  return (
    <ModulePageTemplate
      title="Quản lý Chợ & Điểm kinh doanh"
      description="Giám sát hoạt động chợ, quầy hàng, vỉa hè"
      gradientColors="from-emerald-600 via-green-500 to-teal-500"
      icon={Store}
      stats={[
        { label: 'Chợ/Điểm KD', value: 5, color: 'text-green-600', icon: Store },
        { label: 'Số gian hàng', value: 245, color: 'text-blue-600', icon: Users },
        { label: 'Thu phí/tháng', value: '45M', color: 'text-amber-600', icon: Coins },
        { label: 'Tăng trưởng', value: '+5.2%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Tên chợ/Điểm', 'Số gian', 'Loại hình', 'Trạng thái']}
      sampleData={[
        { id: 'CH001', title: 'Chợ Trung tâm', name: '120 gian', status: 'Chợ truyền thống', date: 'Hoạt động' },
        { id: 'CH002', title: 'Chợ Phường 2', name: '80 gian', status: 'Chợ truyền thống', date: 'Hoạt động' },
        { id: 'DK001', title: 'Khu vực vỉa hè P1', name: '25 điểm', status: 'Vỉa hè', date: 'Hoạt động' },
      ]}
    />
  );
}
