'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  budgetRevenueKPI,
  investmentDisbursementKPI,
  dossierStatisticsKPI,
  citizenSatisfactionKPI,
  crimeStatisticsKPI,
  petitionStatisticsKPI,
} from '@/lib/kpi-data';

// Budget Revenue Card
export function BudgetRevenueCard() {
  const remaining = budgetRevenueKPI.target - budgetRevenueKPI.current;

  return (
    <Card className="hover-lift animate-fade-in-scale">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{budgetRevenueKPI.title}</CardTitle>
            <CardDescription>{budgetRevenueKPI.period}</CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-800 animate-pulse">Cao</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-semibold">{budgetRevenueKPI.percentage}%</span>
          </div>
          <Progress value={budgetRevenueKPI.percentage} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Mục tiêu</p>
            <p className="font-semibold">{budgetRevenueKPI.target}T</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Đã thu</p>
            <p className="font-semibold">{budgetRevenueKPI.current}T</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Còn lại</p>
            <p className="font-semibold">{remaining.toFixed(1)}T</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={budgetRevenueKPI.monthlyData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorValue)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Administrative Dossier Statistics Card
export function DossierStatisticsCard() {
  return (
    <Card className="hover-lift animate-fade-in-scale" style={{ animationDelay: '0.1s' }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{dossierStatisticsKPI.title}</CardTitle>
            <CardDescription>{dossierStatisticsKPI.period}</CardDescription>
          </div>
          <Badge className="bg-blue-100 text-blue-800">Cao</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2 border-l-4 border-green-500 pl-3">
            <p className="text-xs text-muted-foreground">Đúng hạn</p>
            <p className="text-2xl font-bold text-green-600">{dossierStatisticsKPI.stats.onTime}</p>
            <p className="text-xs text-green-600">{dossierStatisticsKPI.percentages.onTimeRate}%</p>
          </div>
          <div className="space-y-2 border-l-4 border-red-500 pl-3">
            <p className="text-xs text-muted-foreground">Quá hạn</p>
            <p className="text-2xl font-bold text-red-600">{dossierStatisticsKPI.stats.overdue}</p>
            <p className="text-xs text-red-600">{dossierStatisticsKPI.percentages.overdueRate}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm border-t pt-3">
          <div>
            <p className="text-muted-foreground text-xs">Tổng hồ sơ</p>
            <p className="text-xl font-bold">{dossierStatisticsKPI.stats.total}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Trực tuyến</p>
            <p className="text-xl font-bold">{dossierStatisticsKPI.stats.online}</p>
            <p className="text-xs text-muted-foreground">{dossierStatisticsKPI.percentages.onlineRate}%</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={dossierStatisticsKPI.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="onTime" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="overdue" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Citizen Satisfaction Card
export function CitizenSatisfactionCard() {
  return (
    <Card className="hover-lift animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{citizenSatisfactionKPI.title}</CardTitle>
            <CardDescription>Điểm trung bình: {citizenSatisfactionKPI.overall}/10</CardDescription>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800">Trung bình</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600">{citizenSatisfactionKPI.overall}</div>
            <div className="text-xs text-muted-foreground mt-1">/10</div>
          </div>
          <div className="flex-1 space-y-2">
            {citizenSatisfactionKPI.categories.map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{cat.name}</span>
                  <span className="font-semibold">{cat.score}</span>
                </div>
                <Progress value={(cat.score / 10) * 100} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Crime Statistics Card
export function CrimeStatisticsCard() {
  return (
    <Card className="hover-lift animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{crimeStatisticsKPI.title}</CardTitle>
            <CardDescription>Tổng cộng: {crimeStatisticsKPI.totalViolations} vụ</CardDescription>
          </div>
          <Badge className="bg-red-100 text-red-800">Cao</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {crimeStatisticsKPI.categories.map((cat, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 flex-1">
                <span>{cat.name}</span>
                {cat.trend === 'down' && <TrendingDown className="w-3 h-3 text-green-600" />}
                {cat.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-600" />}
              </div>
              <Badge variant="outline">{cat.count}</Badge>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={crimeStatisticsKPI.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="violations"
              stroke="#ef4444"
              dot={{ fill: '#ef4444', r: 3 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Petition Statistics Card
export function PetitionStatisticsCard() {
  const resolutionRate = (petitionStatisticsKPI.resolved / (petitionStatisticsKPI.resolved + petitionStatisticsKPI.pending)) * 100;

  return (
    <Card className="hover-lift animate-fade-in-scale" style={{ animationDelay: '0.4s' }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{petitionStatisticsKPI.title}</CardTitle>
            <CardDescription>Tỷ lệ giải quyết: {resolutionRate.toFixed(1)}%</CardDescription>
          </div>
          <Badge className="bg-blue-100 text-blue-800">Cao</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2 rounded-lg bg-green-50 p-3 border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Đã xử lý</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{petitionStatisticsKPI.resolved}</p>
          </div>
          <div className="space-y-2 rounded-lg bg-yellow-50 p-3 border border-yellow-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-muted-foreground">Đang xử lý</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{petitionStatisticsKPI.pending}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Phân loại đơn thư</p>
          {petitionStatisticsKPI.categories.map((cat, i) => (
            <div key={i} className="flex justify-between text-xs">
              <span>{cat.name}</span>
              <Badge variant="outline">{cat.count}</Badge>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground border-t pt-2">
          Thời gian giải quyết trung bình: {petitionStatisticsKPI.averageResolutionDays} ngày
        </div>
      </CardContent>
    </Card>
  );
}
