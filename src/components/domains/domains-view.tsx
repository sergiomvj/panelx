'use client'

import React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface DomainsViewProps {
  children: React.ReactNode;
  onNavigate: (path: string) => void;
  currentSubView: string;
}

const sidebarNavItems = [
  {
    title: 'All Domains',
    href: '/domains/all',
  },
  {
    title: 'Add Domain',
    href: '/domains/add',
  },
  {
    title: 'DNS Settings',
    href: '/domains/dns',
  },
];

export default function DomainsView({ children, onNavigate, currentSubView }: DomainsViewProps) {
  return (
    <div className="flex-1 flex h-full w-full p-6 space-x-6">
      <aside className="w-1/5">
        <Sidebar>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarNavItems.map((item) => (
                <li key={item.href}>
                  <Button
                    variant={currentSubView === item.href ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2"
                    onClick={() => onNavigate(item.href)}
                  >
                    {item.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </Sidebar>
      </aside>
      <main className="flex-1">
        <div className="bg-card p-6 rounded-lg h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
