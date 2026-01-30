'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Sparkles, Users, TrendingUp, Award } from 'lucide-react';

export default function LangNghePage() {
  return (
    <ModulePageTemplate
      title="Làng nghề truyền thống"
      description="Quản lý làng nghề, bảo tồn nghề thủ công"
      gradientColors="from-orange-600 via-amber-500 to-yellow-500"
      icon={Sparkles}
      stats={[
        { label: 'Làng nghề', value: 3, color: 'text-orange-600', icon: Sparkles },
        { label: 'Nghệ nhân', value: 45, color: 'text-purple-600', icon: Award },
        { label: 'Hộ nghề', value: 156, color: 'text-blue-600', icon: Users },
        { label: 'Tăng doanh thu', value: '+15%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Làng nghề', 'Nghề', 'Số hộ', 'Tình trạng']}
      sampleData={[
        { id: 'LN001', title: 'Làng gốm ABC', name: 'Gốm sứ', status: '45 hộ', date: 'Phát triển' },
        { id: 'LN002', title: 'Làng mộc XYZ', name: 'Mộc mỹ nghệ', status: '60 hộ', date: 'Phát triển' },
        { id: 'LN003', title: 'Làng dệt 123', name: 'Dệt thổ cẩm', status: '51 hộ', date: 'Ổn định' },
      ]}
    />
  );
}
