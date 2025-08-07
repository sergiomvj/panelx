'use client'

import React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface TerminalViewProps {
  children: React.ReactNode;
  onNavigate: (path: string) => void;
  currentSubView: string;
}

const sidebarNavItems = [
  {
    title: 'Console',
    href: '/terminal/console',
  },
  {
    title: 'Connection',
    href: '/terminal/connection',
  },
  {
    title: 'Sessions',
    href: '/terminal/sessions',
  },
];

export default function TerminalView({ children, onNavigate, currentSubView }: TerminalViewProps) {
  return (
    <div className="flex h-full w-full p-6 space-x-6">
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
      <main className="flex-1 flex flex-col">
        <div className="flex-1 bg-black rounded-lg overflow-hidden h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
