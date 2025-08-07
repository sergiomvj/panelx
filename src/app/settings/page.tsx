'use client'

import MainLayout from '@/components/layouts/main-layout';
import VersionManagement from '@/components/settings/version-management';

export default function SettingsPage() {
  return (
    <MainLayout>
      <VersionManagement />
    </MainLayout>
  );
}
