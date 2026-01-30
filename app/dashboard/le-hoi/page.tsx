'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { PartyPopper, Calendar, Users, TrendingUp } from 'lucide-react';

export default function LeHoiPage() {
  return (
    <ModulePageTemplate
      title="Lễ hội - Sự kiện"
      description="Quản lý lễ hội, sự kiện văn hóa"
      gradientColors="from-pink-600 via-purple-500 to-indigo-500"
      icon={PartyPopper}
      stats={[
        { label: 'Lễ hội/năm', value: 12, color: 'text-pink-600', icon: PartyPopper },
        { label: 'Sự kiện sắp diễn ra', value: 3, color: 'text-purple-600', icon: Calendar },
        { label: 'Người tham gia', value: 15000, color: 'text-blue-600', icon: Users },
        { label: 'Tăng so năm trước', value: '+20%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Tên lễ hội', 'Thời gian', 'Quy mô', 'Trạng thái']}
      sampleData={[
        { id: 'LH001', title: 'Lễ hội xuân', name: 'Tết Nguyên Đán', status: '5000 người', date: 'Hoàn thành' },
        { id: 'LH002', title: 'Hội làng', name: '15/03 ÂL', status: '2000 người', date: 'Sắp diễn ra' },
        { id: 'LH003', title: 'Hội chợ văn hóa', name: '30/04', status: '8000 người', date: 'Đang chuẩn bị' },
      ]}
    />
  );
}
