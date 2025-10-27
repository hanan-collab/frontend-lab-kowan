import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, TrendingDown, Clock, CheckCircle, X } from 'lucide-react';
import { Button } from '../../../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../../../ui/dropdown-menu';
import { Badge } from '../../../ui/badge';
import { ScrollArea } from '../../../ui/scroll-area';
import { Separator } from '../../../ui/separator';

export interface Notification {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  metadata?: {
    projectName?: string;
    targetValue?: number;
    actualValue?: number;
    kpiName?: string;
  };
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // Check for unmet targets and generate notifications
    const savedNotifications = localStorage.getItem('systemNotifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(
        parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }))
      );
    } else {
      // Generate initial mock notifications
      generateMockNotifications();
    }
  };

  const generateMockNotifications = () => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'danger',
        title: 'Target KPI Tidak Tercapai',
        message:
          'Penyelesaian investigasi pada Project "Korupsi APBD 2024" hanya mencapai 45% dari target 80%',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        link: '/projects/1',
        metadata: {
          projectName: 'Korupsi APBD 2024',
          targetValue: 80,
          actualValue: 45,
          kpiName: 'Penyelesaian Investigasi',
        },
      },
      {
        id: '2',
        type: 'warning',
        title: 'Pencapaian Aset Dibawah Target',
        message: 'Total aset teridentifikasi bulan ini (Rp 2.5M) dibawah target Rp 5M',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        read: false,
        link: '/performance',
        metadata: {
          targetValue: 5000000,
          actualValue: 2500000,
          kpiName: 'Identifikasi Aset',
        },
      },
      {
        id: '3',
        type: 'danger',
        title: 'Kualitas Data Rendah',
        message:
          'Akurasi data pada Project "Pencucian Uang Internasional" hanya 65%, di bawah standar minimal 85%',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        read: false,
        link: '/projects/2',
        metadata: {
          projectName: 'Pencucian Uang Internasional',
          targetValue: 85,
          actualValue: 65,
          kpiName: 'Akurasi Data',
        },
      },
      {
        id: '4',
        type: 'warning',
        title: 'Waktu Respons Investigasi Lambat',
        message: 'Rata-rata waktu respons tim 4.2 hari, melebihi target maksimal 3 hari',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        read: false,
        link: '/performance',
        metadata: {
          targetValue: 3,
          actualValue: 4.2,
          kpiName: 'Waktu Respons',
        },
      },
      {
        id: '5',
        type: 'info',
        title: 'Deadline Mendekat',
        message: 'Project "Gratifikasi Korporasi" akan berakhir dalam 3 hari',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: false,
        link: '/projects/3',
        metadata: {
          projectName: 'Gratifikasi Korporasi',
        },
      },
    ];

    setNotifications(mockNotifications);
    localStorage.setItem('systemNotifications', JSON.stringify(mockNotifications));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    localStorage.setItem('systemNotifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('systemNotifications', JSON.stringify(updated));
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('systemNotifications', JSON.stringify(updated));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <TrendingDown className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Clock className="h-5 w-5 text-blue-400" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Baru saja';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} menit yang lalu`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam yang lalu`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} hari yang lalu`;
    return date.toLocaleDateString('id-ID');
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-semibold">Notifikasi</h3>
            <p className="text-sm text-muted-foreground">{unreadCount} notifikasi belum dibaca</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
              Tandai Semua Dibaca
            </Button>
          )}
        </div>

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Tidak ada notifikasi</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-accent/50 transition-colors cursor-pointer relative group ${
                    !notification.read ? 'bg-blue-500/5' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.link) {
                      window.location.href = notification.link;
                      setIsOpen(false);
                    }
                  }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={e => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

                      {notification.metadata && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {notification.metadata.targetValue && (
                            <Badge variant="outline" className="text-xs">
                              Target: {notification.metadata.targetValue}
                              {notification.metadata.kpiName?.includes('Waktu') ? ' hari' : '%'}
                            </Badge>
                          )}
                          {notification.metadata.actualValue && (
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                notification.type === 'danger' || notification.type === 'warning'
                                  ? 'border-red-500 text-red-500'
                                  : ''
                              }`}
                            >
                              Aktual: {notification.metadata.actualValue}
                              {notification.metadata.kpiName?.includes('Waktu') ? ' hari' : '%'}
                            </Badge>
                          )}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">
                        {getTimeAgo(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator />

        <div className="p-3 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
            onClick={() => {
              window.location.href = '/performance';
              setIsOpen(false);
            }}
          >
            Lihat Semua KPI & Kinerja
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
