'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

async function handleVersionAction(action: 'upgrade' | 'rollback', toast: ReturnType<typeof useToast>['toast'], setLoading: (loading: boolean) => void) {
  setLoading(true);
  try {
    const response = await fetch('/api/version', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action }),
    });

    const result = await response.json();

    if (response.ok) {
      toast({
        title: 'Success',
        description: result.message,
      });
    } else {
      throw new Error(result.error || 'An unknown error occurred.');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    toast({
      title: 'Error',
      description: `Failed to ${action}: ${errorMessage}`,
      variant: 'destructive',
    });
  } finally {
    setLoading(false);
  }
}

export default function VersionManagement() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Version Management</h2>
        <p className="text-muted-foreground">
          Manage your application version. You can upgrade to the latest version or roll back to the previous one.
        </p>
      </div>
      <Separator />
      <div className="flex gap-4">
        <Button onClick={() => handleVersionAction('upgrade', toast, setLoading)} disabled={loading}>
          {loading ? 'Upgrading...' : 'Upgrade to Latest'}
        </Button>
        <Button variant="outline" onClick={() => handleVersionAction('rollback', toast, setLoading)} disabled={loading}>
          {loading ? 'Rolling back...' : 'Rollback to Previous'}
        </Button>
      </div>
    </div>
  );
}
