'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { BarChart3, AlertTriangle, Clock, TrendingDown } from 'lucide-react';

export default function HoSoTonDongPage() {
  return (
    <ModulePageTemplate
      title="Thống kê Hồ sơ Tồn động"
      description="Báo cáo hồ sơ tồn đọng chưa xử lý"
      gradientColors="from-amber-600 via-orange-500 to-red-500"
      icon={BarChart3}
      stats={[
        { label: 'Hồ sơ tồn động', value: 34, color: 'text-red-600', icon: AlertTriangle },
        { label: 'Quá hạn', value: 12, color: 'text-red-600', icon: Clock },
        { label: 'Sắp hết hạn', value: 22, color: 'text-amber-600', icon: Clock },
        { label: 'Giảm so tháng trước', value: '-15%', color: 'text-green-600', icon: TrendingDown },
      ]}
      tableHeaders={['Mã HS', 'Loại hồ sơ', 'Ngày nộp', 'Hạn XL', 'Tình trạng']}
      sampleData={[
        { id: 'TD001', title: 'Cấp sổ đỏ', name: '15/11/2023', status: '15/01/2024', date: 'Quá hạn' },
        { id: 'TD002', title: 'Chuyển MPSD', name: '20/12/2023', status: '20/02/2024', date: 'Sắp hết hạn' },
        { id: 'TD003', title: 'Tách thửa', name: '10/01/2024', status: '10/03/2024', date: 'Đúng hạn' },
      ]}
    />
  );
}
