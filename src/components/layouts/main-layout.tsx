'use client'

import { Sidebar } from '@/components/ui/sidebar';
import { menuItems } from '@/components/menu-items';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getTitle = () => {
    const currentPath = pathname.split('/')[1] || 'dashboard';
    const item = menuItems.find(item => item.id === currentPath);
    return item ? item.label : 'Page';
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 border-r bg-card flex flex-col">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">P</span>
              </div>
              <h1 className="text-xl font-bold">FacePanel</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Container Management</p>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/${item.id}`}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-foreground hover:bg-muted ${
                      pathname.startsWith(`/${item.id}`) ? 'bg-muted' : ''
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <User size={20} />
              <span>Account</span>
            </Button>
          </div>
        </div>
      </Sidebar>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </Button>
            <div>
              <h2 className="text-xl font-semibold">{getTitle()}</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
