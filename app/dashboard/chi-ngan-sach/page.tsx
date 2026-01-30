'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Receipt, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ChiNganSachPage() {
  return (
    <ModulePageTemplate
      title="Theo dõi Chi ngân sách"
      description="Quản lý và theo dõi các khoản chi ngân sách địa phương"
      gradientColors="from-red-600 via-rose-500 to-pink-500"
      icon={Receipt}
      stats={[
        { label: 'Tổng chi tháng', value: '380M', color: 'text-red-600', icon: Receipt },
        { label: 'Tỷ lệ giải ngân', value: '72%', color: 'text-blue-600', icon: TrendingDown },
        { label: 'Số khoản chi', value: 124, color: 'text-purple-600', icon: Receipt },
        { label: 'Vượt dự toán', value: 3, color: 'text-amber-600', icon: AlertTriangle },
      ]}
      tableHeaders={['Mã', 'Hạng mục chi', 'Số tiền', 'Ngày chi', 'Trạng thái']}
      sampleData={[
        { id: 'CHI001', title: 'Lương cán bộ tháng 1', name: '125.000.000đ', status: 'Đã chi', date: '05/01/2024' },
        { id: 'CHI002', title: 'Sửa chữa hạ tầng', name: '45.500.000đ', status: 'Đã chi', date: '12/01/2024' },
        { id: 'CHI003', title: 'Mua sắm văn phòng phẩm', name: '8.200.000đ', status: 'Chờ phê duyệt', date: '20/01/2024' },
      ]}
    />
  );
}
