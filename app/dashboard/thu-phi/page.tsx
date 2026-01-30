'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Coins, TrendingUp, Calendar, Users } from 'lucide-react';

export default function ThuPhiPage() {
  return (
    <ModulePageTemplate
      title="Thu phí - Lệ phí"
      description="Quản lý thu phí chợ, vệ sinh, môi trường"
      gradientColors="from-amber-600 via-yellow-500 to-orange-500"
      icon={Coins}
      stats={[
        { label: 'Thu hôm nay', value: '2.5M', color: 'text-green-600', icon: Coins },
        { label: 'Thu tháng', value: '45.8M', color: 'text-blue-600', icon: Calendar },
        { label: 'Số đối tượng', value: 356, color: 'text-purple-600', icon: Users },
        { label: 'Tỷ lệ thu', value: '94%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Loại phí', 'Đối tượng', 'Số tiền', 'Trạng thái']}
      sampleData={[
        { id: 'PH001', title: 'Phí chợ', name: 'Gian 45', status: '200K', date: 'Đã thu' },
        { id: 'PH002', title: 'Phí vệ sinh', name: 'Hộ KD 102', status: '150K', date: 'Đã thu' },
        { id: 'PH003', title: 'Phí chợ', name: 'Gian 67', status: '200K', date: 'Chưa thu' },
      ]}
    />
  );
}
