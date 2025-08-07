'use client'

import MainLayout from '@/components/layouts/main-layout';
import { DomainsList } from '@/components/domains/domains-list';

export default function DomainsPage() {
  return (
    <MainLayout>
      <DomainsList />
    </MainLayout>
  );
}
