'use client'

import dynamic from 'next/dynamic';
import MainLayout from '@/components/layouts/main-layout';

const XtermTerminal = dynamic(
  () => import('@/components/terminal/xterm-terminal'),
  { ssr: false }
);

export default function TerminalPage() {
  return (
    <MainLayout>
      <XtermTerminal />
    </MainLayout>
  );
}
