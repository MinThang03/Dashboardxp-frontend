'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
} from 'lucide-react';

export default function VanBanPage() {
  const stats = {
    denMoi: 12,
    diMoi: 8,
    tongThang: 156,
    tongNam: 1240,
  };

  const vanBanGanDay = [
    { id: 'VB001', tieuDe: 'Công văn về tăng cường ANTT', loai: 'den', ngay: '2024-01-18', doKhan: 'khan' },
    { id: 'VB002', tieuDe: 'Báo cáo tình hình tài chính', loai: 'di', ngay: '2024-01-17', doKhan: 'thuong' },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 via-blue-500 to-indigo-500 p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Quản lý Văn bản</h1>
              </div>
              <p className="text-white/90">Tiếp nhận, phân loại văn bản đến/đi</p>
            </div>
            <Button className="bg-white text-cyan-600 hover:bg-white/90">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <Badge className="bg-red-500/10 text-red-700 border-0">Mới</Badge>
          </div>
          <p className="text-3xl font-bold">{stats.denMoi}</p>
          <p className="text-sm text-muted-foreground">VB đến hôm nay</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <Badge className="bg-green-500/10 text-green-700 border-0">Mới</Badge>
          </div>
          <p className="text-3xl font-bold">{stats.diMoi}</p>
          <p className="text-sm text-muted-foreground">VB đi hôm nay</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="p-3 bg-blue-500/10 rounded-xl mb-2">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{stats.tongThang}</p>
          <p className="text-sm text-muted-foreground">Tổng tháng này</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="p-3 bg-purple-500/10 rounded-xl mb-2">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">{stats.tongNam}</p>
          <p className="text-sm text-muted-foreground">Tổng năm nay</p>
        </Card>
      </div>

      <Card className="p-6 border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Văn bản gần đây</h3>
        <div className="space-y-3">
          {vanBanGanDay.map((vb) => (
            <div key={vb.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${vb.loai === 'den' ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                  <FileText className={`w-5 h-5 ${vb.loai === 'den' ? 'text-red-600' : 'text-green-600'}`} />
                </div>
                <div>
                  <p className="font-semibold">{vb.tieuDe}</p>
                  <p className="text-sm text-muted-foreground">{vb.id} • {vb.ngay}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {vb.doKhan === 'khan' && (
                  <Badge className="bg-red-500/10 text-red-700 border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    Khẩn
                  </Badge>
                )}
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
