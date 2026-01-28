'use client';

import { Card } from '@/components/ui/card';

export default function RolesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-4">
        Vai trò & Quyền
      </h1>
      <Card className="bg-card border-border p-6">
        <p className="text-muted-foreground">Quản lý vai trò và phân quyền cho người dùng</p>
      </Card>
    </div>
  );
}
