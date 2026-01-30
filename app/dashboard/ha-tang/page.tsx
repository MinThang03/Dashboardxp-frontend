'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Construction, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

export default function HaTangPage() {
  return (
    <ModulePageTemplate
      title="Hạ tầng kỹ thuật"
      description="Theo dõi tình trạng đường xá, cầu cống, chiếu sáng"
      gradientColors="from-gray-600 via-slate-500 to-zinc-500"
      icon={Construction}
      stats={[
        { label: 'Hạng mục', value: 245, color: 'text-blue-600', icon: Construction },
        { label: 'Tốt', value: 198, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Cần sửa chữa', value: 47, color: 'text-amber-600', icon: Clock },
        { label: 'Cải thiện', value: '+12%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Hạng mục', 'Loại', 'Tình trạng', 'Ghi chú']}
      sampleData={[
        { id: 'HT001', title: 'Đường Nguyễn Trãi', name: 'Đường', status: 'Tốt', date: 'Đã bê tông' },
        { id: 'HT002', title: 'Cầu Khu 2', name: 'Cầu', status: 'Cần sửa', date: 'Lún nứt' },
        { id: 'HT003', title: 'Đèn công viên', name: 'Chiếu sáng', status: 'Tốt', date: 'Hoạt động' },
      ]}
    />
  );
}
