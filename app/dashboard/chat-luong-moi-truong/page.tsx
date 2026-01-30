'use client';

import { ModulePageTemplate } from '@/components/module-page-template';
import { Activity, Wind, Droplet, TrendingUp } from 'lucide-react';

export default function ChatLuongMoiTruongPage() {
  return (
    <ModulePageTemplate
      title="Giám sát Chất lượng Môi trường"
      description="Theo dõi chất lượng không khí, nước, đất"
      gradientColors="from-green-600 via-emerald-500 to-teal-500"
      icon={Activity}
      stats={[
        { label: 'Chỉ số AQI', value: 45, color: 'text-green-600', icon: Wind },
        { label: 'Chất lượng nước', value: 'Tốt', color: 'text-blue-600', icon: Droplet },
        { label: 'Điểm quan trắc', value: 12, color: 'text-purple-600', icon: Activity },
        { label: 'Cải thiện', value: '+8%', color: 'text-green-600', icon: TrendingUp },
      ]}
      tableHeaders={['Mã', 'Điểm quan trắc', 'Chỉ số', 'Giá trị', 'Đánh giá']}
      sampleData={[
        { id: 'MT001', title: 'Trạm KK Trung tâm', name: 'AQI', status: '42', date: 'Tốt' },
        { id: 'MT002', title: 'Trạm Nước sông', name: 'pH', status: '7.2', date: 'Đạt chuẩn' },
        { id: 'MT003', title: 'Trạm Đất khu A', name: 'Độ ẩm', status: '65%', date: 'Bình thường' },
      ]}
    />
  );
}
