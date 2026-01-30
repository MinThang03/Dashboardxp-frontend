'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Users, Building2, TrendingUp, AlertTriangle } from 'lucide-react';

export default function TramYTePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-pink-500 to-rose-500 p-8 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Quản lý Trạm Y tế</h1>
              </div>
              <p className="text-white/90">Cơ sở vật chất, nhân lực, trang thiết bị</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="p-3 bg-red-500/10 rounded-xl mb-2">
            <Stethoscope className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-muted-foreground">Trạm y tế</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="p-3 bg-blue-500/10 rounded-xl mb-2">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-muted-foreground">Nhân viên y tế</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="p-3 bg-green-500/10 rounded-xl mb-2">
            <Building2 className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold">850</p>
          <p className="text-sm text-muted-foreground">Lượt khám/tháng</p>
        </Card>

        <Card className="p-6 border-0 shadow-lg hover-lift">
          <div className="p-3 bg-amber-500/10 rounded-xl mb-2">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-3xl font-bold">2</p>
          <p className="text-sm text-muted-foreground">Thiết bị cần bảo trì</p>
        </Card>
      </div>

      <Card className="p-6 border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Danh sách trạm y tế</h3>
        <div className="space-y-3">
          {[
            { ten: 'Trạm Y tế Phường 1', nhanVien: 8, trangBi: 'Đầy đủ' },
            { ten: 'Trạm Y tế Phường 2', nhanVien: 10, trangBi: 'Đầy đủ' },
            { ten: 'Trạm Y tế Phường 3', nhanVien: 6, trangBi: 'Thiếu' },
          ].map((tram, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <Building2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold">{tram.ten}</p>
                  <p className="text-sm text-muted-foreground">{tram.nhanVien} nhân viên</p>
                </div>
              </div>
              <Badge className={`${tram.trangBi === 'Đầy đủ' ? 'bg-green-500/10 text-green-700' : 'bg-amber-500/10 text-amber-700'} border-0`}>
                {tram.trangBi}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
