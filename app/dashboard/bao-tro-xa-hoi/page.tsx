'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Heart, Users, Coins, TrendingUp } from 'lucide-react';

export default function BaoTroXaHoiPage() {
  return (
    <ModulePageTemplate
      title="Bảo trợ Xã hội"
      description="Hỗ trợ người có hoàn cảnh khó khăn"
      gradientColors="from-pink-600 via-rose-500 to-red-500"
      icon={Heart}
      stats={[
        { label: 'Hộ được hỗ trợ', value: 156, color: 'text-pink-600', icon: Users },
        { label: 'Gói hỗ trợ tháng', value: 145, color: 'text-blue-600', icon: Heart },
        { label: 'Tổng kinh phí', value: '125M', color: 'text-green-600', icon: Coins },
        { label: 'Tăng so tháng trước', value: '+8%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Hộ gia đình', 'Loại hỗ trợ', 'Mức hỗ trợ', 'Trạng thái']}
      sampleData={[
        { id: 'BT001', title: 'Nguyễn Văn A', name: 'Hộ nghèo', status: '800K/tháng', date: 'Đang hỗ trợ' },
        { id: 'BT002', title: 'Trần Thị B', name: 'Người già đơn thân', status: '1M/tháng', date: 'Đang hỗ trợ' },
        { id: 'BT003', title: 'Lê Văn C', name: 'Người khuyết tật', status: '1.2M/tháng', date: 'Đang hỗ trợ' },
      ]}
    />
  );
}
