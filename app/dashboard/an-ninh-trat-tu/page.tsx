'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Shield, AlertCircle, CheckCircle2, TrendingDown } from 'lucide-react';

export default function AnNinhTratTuPage() {
  return (
    <ModulePageTemplate
      title="An ninh Trật tự"
      description="Giám sát tình hình ANTT trên địa bàn"
      gradientColors="from-slate-700 via-gray-600 to-zinc-500"
      icon={Shield}
      stats={[
        { label: 'Sự kiện hôm nay', value: 3, color: 'text-blue-600', icon: Shield },
        { label: 'Đang xử lý', value: 2, color: 'text-amber-600', icon: AlertCircle },
        { label: 'Đã giải quyết', value: 1, color: 'text-green-600', icon: CheckCircle2 },
        { label: 'Giảm so tháng trước', value: '-15%', color: 'text-green-600', icon: TrendingDown },
      ]}
      tableHeaders={['Mã', 'Sự kiện', 'Địa điểm', 'Mức độ', 'Trạng thái']}
      sampleData={[
        { id: 'ANTT001', title: 'Tranh chấp đất đai', name: 'Khu phố 3', status: 'Trung bình', date: 'Đang xử lý' },
        { id: 'ANTT002', title: 'Mâu thuẫn hàng xóm', name: 'Khu phố 5', status: 'Nhẹ', date: 'Đã xử lý' },
        { id: 'ANTT003', title: 'Ẩu đả', name: 'Khu phố 2', status: 'Nặng', date: 'Đang xử lý' },
      ]}
    />
  );
}
