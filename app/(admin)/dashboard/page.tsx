'use client';

import { useState } from 'react';
import {
  Bell,
  Calendar,
  CreditCard,
  Home,
  Menu,
  MessageSquare,
  MoreVertical,
  Search,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  Eye,
  CheckCircle,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

import Badge from '../../../src/components/ui/Badge';
import Button from '../../../src/components/ui/Button';
import { Card, CardContent } from '../../../src/components/ui/Card';
import Input from '../../../src/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../src/components/ui/Select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../src/components/ui/Sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../src/components/ui/Table';

const mockMetrics = {
  todayBookings: 12,
  pendingPayments: 3,
  monthlyRevenue: 18500,
  newCustomers: 8,
};

type BookingStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'No-show';
type PaymentStatus = 'Paid' | 'Pending' | 'Refunded';

interface Booking {
  id: string;
  customer: string;
  service: string;
  dateTime: Date;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
}

const mockBookings: Booking[] = [
  {
    id: 'BK001',
    customer: 'Jeremiah Kondja',
    service: 'Adult Haircut',
    dateTime: new Date(2026, 3, 25, 10, 0),
    status: 'Confirmed',
    paymentStatus: 'Paid',
  },
  {
    id: 'BK002',
    customer: 'Nalova Kavinanue',
    service: 'Kids Haircut (7-16)',
    dateTime: new Date(2026, 3, 25, 11, 30),
    status: 'Confirmed',
    paymentStatus: 'Paid',
  },
  {
    id: 'BK003',
    customer: 'Isaac Shimakalala',
    service: 'Adult Haircut',
    dateTime: new Date(2026, 3, 25, 14, 0),
    status: 'Pending',
    paymentStatus: 'Pending',
  },
  {
    id: 'BK004',
    customer: 'Shipia Limpopo',
    service: 'Adult Haircut',
    dateTime: new Date(2026, 3, 26, 9, 0),
    status: 'Confirmed',
    paymentStatus: 'Paid',
  },
  {
    id: 'BK005',
    customer: 'Tshegofatso Modise',
    service: 'Kids Haircut (Under 7)',
    dateTime: new Date(2026, 3, 26, 13, 0),
    status: 'Completed',
    paymentStatus: 'Paid',
  },
  {
    id: 'BK006',
    customer: 'Amina Okafor',
    service: 'Adult Haircut',
    dateTime: new Date(2026, 3, 27, 10, 30),
    status: 'Cancelled',
    paymentStatus: 'Refunded',
  },
  {
    id: 'BK007',
    customer: 'David Mutua',
    service: 'Package - 31 Day',
    dateTime: new Date(2026, 3, 27, 15, 0),
    status: 'No-show',
    paymentStatus: 'Pending',
  },
];

const revenueTrend = [
  { day: 'Mon', amount: 2100 },
  { day: 'Tue', amount: 1850 },
  { day: 'Wed', amount: 2440 },
  { day: 'Thu', amount: 1980 },
  { day: 'Fri', amount: 2750 },
  { day: 'Sat', amount: 3180 },
  { day: 'Sun', amount: 1620 },
];

const bookingStatusBreakdown: Array<{ status: BookingStatus; count: number }> = [
  { status: 'Confirmed', count: 18 },
  { status: 'Pending', count: 7 },
  { status: 'Completed', count: 31 },
  { status: 'Cancelled', count: 5 },
  { status: 'No-show', count: 3 },
];

const sidebarLinks = [
  { icon: Home, label: 'Overview', href: '#overview' },
  { icon: Calendar, label: 'Bookings', href: '#bookings' },
  { icon: ShoppingCart, label: 'Services', href: '#services' },
  { icon: CreditCard, label: 'Payments', href: '#payments' },
  { icon: Users, label: 'Customers', href: '#customers' },
  { icon: MessageSquare, label: 'Reviews', href: '#reviews' },
  { icon: Settings, label: 'Settings', href: '#settings' },
];

const statusVariant: Record<BookingStatus, 'default' | 'warning' | 'success' | 'danger' | 'muted'> = {
  Confirmed: 'default',
  Pending: 'warning',
  Completed: 'success',
  Cancelled: 'danger',
  'No-show': 'muted',
};

const paymentVariant: Record<PaymentStatus, 'success' | 'warning' | 'danger'> = {
  Paid: 'success',
  Pending: 'warning',
  Refunded: 'danger',
};

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
}) {
  return (
    <Card className="border-brand-border/70 bg-white/95 shadow-[0_20px_55px_-45px_rgba(17,20,30,0.55)]">
      <CardContent className="flex items-start justify-between p-6">
        <div>
          <p className="mb-2 text-sm text-slate-500">{label}</p>
          <p className="text-3xl font-bold text-brand-navy">{value}</p>
        </div>
        <div className="rounded-xl bg-brand-blue/10 p-3">
          <Icon className="h-6 w-6 text-brand-blue" />
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueTrendChart() {
  const maxAmount = Math.max(...revenueTrend.map((point) => point.amount));
  const minAmount = Math.min(...revenueTrend.map((point) => point.amount));
  const range = Math.max(maxAmount - minAmount, 1);

  const points = revenueTrend
    .map((point, index) => {
      const x = (index / (revenueTrend.length - 1)) * 100;
      const normalized = (point.amount - minAmount) / range;
      const y = 90 - normalized * 65;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Card className="border-brand-border/70 bg-white/95 shadow-[0_20px_55px_-45px_rgba(17,20,30,0.55)]">
      <CardContent className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Weekly Revenue Trend</p>
            <p className="text-lg font-bold text-brand-navy">N$15,920</p>
          </div>
          <Badge variant="success">+12.6%</Badge>
        </div>

        <div className="h-44 w-full">
          <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0D66B4" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#0D66B4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline fill="url(#revenueFill)" stroke="none" points={`0,100 ${points} 100,100`} />
            <polyline
              fill="none"
              stroke="#0D66B4"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
          {revenueTrend.map((point) => (
            <span key={point.day}>{point.day}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusDistributionChart() {
  const maxCount = Math.max(...bookingStatusBreakdown.map((item) => item.count));

  return (
    <Card className="border-brand-border/70 bg-white/95 shadow-[0_20px_55px_-45px_rgba(17,20,30,0.55)]">
      <CardContent className="p-6">
        <div className="mb-5">
          <p className="text-sm text-slate-500">Bookings by Status</p>
          <p className="text-lg font-bold text-brand-navy">This Month</p>
        </div>

        <div className="space-y-4">
          {bookingStatusBreakdown.map((item) => (
            <div key={item.status} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <span>{item.status}</span>
                <span>{item.count}</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-blue"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-white/20 p-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue">
          <ShoppingCart className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">GFT Admin</h1>
      </div>

      <nav className="space-y-2 p-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/20 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue">
            <span className="text-sm font-bold text-white">JK</span>
          </div>
          <div className="text-sm text-white">
            <p className="font-medium">Jeremiah Kondja</p>
            <p className="text-xs text-white/70">Admin</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_48%,#eef4f9_100%)]">
      <aside className="sticky top-0 hidden h-screen w-64 flex-col bg-brand-navy md:flex">
        <SidebarContent />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-brand-border/60 bg-white/90 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-4">
            <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
                  aria-label="Open sidebar"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 md:hidden">
                <SheetHeader className="hidden">
                  <SheetTitle>Admin navigation</SheetTitle>
                </SheetHeader>
                <div className="flex h-full flex-col">
                  <SidebarContent onNavigate={() => setMobileSidebarOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <h2 className="text-2xl font-bold text-brand-navy">Dashboard</h2>
          </div>

          <Button variant="ghost" className="h-10 w-10 p-0">
            <Bell className="h-5 w-5 text-slate-700" />
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard icon={Calendar} label="Today's Bookings" value={mockMetrics.todayBookings} />
            <MetricCard icon={Clock} label="Pending Payments" value={mockMetrics.pendingPayments} />
            <MetricCard icon={TrendingUp} label="Revenue This Month" value={`N$${mockMetrics.monthlyRevenue.toLocaleString()}`} />
            <MetricCard icon={Users} label="New Customers" value={mockMetrics.newCustomers} />
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
            <RevenueTrendChart />
            <StatusDistributionChart />
          </div>

          <section id="bookings">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-brand-navy">Recent Bookings</h3>
              <Badge variant="secondary">{filteredBookings.length} records</Badge>
            </div>

            <Card className="mb-5 border-brand-border/70 bg-white/95">
              <CardContent className="space-y-4 p-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px_220px]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search by customer name..."
                      className="pl-9"
                    />
                  </div>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="No-show">No-show</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="justify-start">
                    <Calendar className="h-4 w-4" />
                    Date Range
                  </Button>
                </div>
              </CardContent>
            </Card>

            {filteredBookings.length > 0 ? (
              <Card className="overflow-hidden border-brand-border/70 bg-white/95">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium text-brand-navy">{booking.customer}</TableCell>
                          <TableCell className="text-slate-600">{booking.service}</TableCell>
                          <TableCell className="text-slate-600">
                            {booking.dateTime.toLocaleDateString()} {booking.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={paymentVariant[booking.paymentStatus]}>{booking.paymentStatus}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" className="h-8 w-8 p-0" title="View booking">
                                <Eye className="h-4 w-4 text-brand-blue" />
                              </Button>
                              {booking.status === 'Confirmed' ? (
                                <Button variant="ghost" className="h-8 w-8 p-0" title="Mark as complete">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </Button>
                              ) : null}
                              <Button variant="ghost" className="h-8 w-8 p-0" title="Cancel booking">
                                <XCircle className="h-4 w-4 text-red-600" />
                              </Button>
                              <Button variant="ghost" className="h-8 w-8 p-0" title="More actions">
                                <MoreVertical className="h-4 w-4 text-slate-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-brand-border/70 bg-white/95">
                <CardContent className="p-12 text-center">
                  <AlertCircle className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                  <p className="text-slate-600">No bookings found matching your filters</p>
                </CardContent>
              </Card>
            )}

            <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
              <p>
                Showing {Math.min(filteredBookings.length, 10)} of {filteredBookings.length} bookings
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button size="sm">1</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
