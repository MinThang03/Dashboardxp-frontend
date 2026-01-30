'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Briefcase, Users, TrendingUp, FileText } from 'lucide-react';

export default function HoTroDoanhNghiepPage() {
  return (
    <ModulePageTemplate
      title="Hỗ trợ Doanh nghiệp nhỏ"
      description="Tư vấn, hỗ trợ DNNVV và hộ kinh doanh"
      gradientColors="from-blue-600 via-cyan-500 to-teal-500"
      icon={Briefcase}
      stats={[
        { label: 'DN được hỗ trợ', value: 45, color: 'text-blue-600', icon: Briefcase },
        { label: 'Yêu cầu mới', value: 12, color: 'text-amber-600', icon: FileText },
        { label: 'Đang tư vấn', value: 8, color: 'text-green-600', icon: Users },
        { label: 'Thành công', value: '78%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Tên DN/Hộ KD', 'Lĩnh vực', 'Loại hỗ trợ', 'Trạng thái']}
      sampleData={[
        { id: 'HT001', title: 'Cửa hàng ABC', name: 'Bán lẻ', status: 'Tư vấn pháp lý', date: 'Đang xử lý' },
        { id: 'HT002', title: 'Xưởng XYZ', name: 'Sản xuất', status: 'Hỗ trợ vốn', date: 'Hoàn thành' },
        { id: 'HT003', title: 'Quán ăn 123', name: 'Dịch vụ', status: 'Tư vấn ATTP', date: 'Chờ xử lý' },
      ]}
    />
  );
}
