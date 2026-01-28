'use client';

import { Card } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-4">
        Cài đặt hệ thống
      </h1>
      <Card className="bg-card border-border p-6">
        <p className="text-muted-foreground">Cấu hình các tham số hệ thống chính</p>
      </Card>
    </div>
  );
}
