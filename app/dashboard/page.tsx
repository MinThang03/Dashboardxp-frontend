'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/dashboard-layout';
import { redirect } from 'next/navigation';
import { LeaderDashboard } from '@/components/pages/leader-dashboard';
import { OfficerDashboard } from '@/components/pages/officer-dashboard';
import { CitizenDashboard } from '@/components/pages/citizen-dashboard';
import { AdminDashboard } from '@/components/pages/admin-dashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    redirect('/');
  }

  return (
    <>
      {user.role === 'leader' && <LeaderDashboard />}
      {user.role === 'officer' && <OfficerDashboard />}
      {user.role === 'citizen' && <CitizenDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </>
  );
}
