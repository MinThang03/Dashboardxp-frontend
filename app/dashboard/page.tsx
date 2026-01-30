'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/dashboard-layout';
import { redirect } from 'next/navigation';
import { LeaderDashboardV2 } from '@/components/pages/leader-dashboard-v2';
import { OfficerDashboardPremium } from '@/components/pages/officer-dashboard-premium';
import { CitizenDashboardPremium } from '@/components/pages/citizen-dashboard-premium';
import { AdminDashboardPremium } from '@/components/pages/admin-dashboard-premium';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    redirect('/');
  }

  return (
    <>
      {user.role === 'leader' && <LeaderDashboardV2 />}
      {user.role === 'officer' && <OfficerDashboardPremium />}
      {user.role === 'citizen' && <CitizenDashboardPremium />}
      {user.role === 'admin' && <AdminDashboardPremium />}
    </>
  );
}
