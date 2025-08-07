'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'
import { Loader2, Terminal } from 'lucide-react'

export function SettingsContentView() {
  const { toast } = useToast()
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [isDowngrading, setIsDowngrading] = useState(false)

  async function handleUpgrade() {
    setIsUpgrading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast({
      title: 'System Upgrade Successful',
      description: 'All services have been updated to the latest version.',
    })
    setIsUpgrading(false)
  }

  async function handleDowngrade() {
    setIsDowngrading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast({
      title: 'System Downgrade Complete',
      description: 'The system has been reverted to the previous stable version.',
      variant: 'destructive',
    })
    setIsDowngrading(false)
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>System Management</CardTitle>
          <CardDescription>Perform system-level actions like upgrades and downgrades.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Upgrade System</h3>
              <p className="text-sm text-muted-foreground">Run the upgrade script to update all services to the latest version.</p>
            </div>
            <Button onClick={handleUpgrade} disabled={isUpgrading}>
              {isUpgrading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Terminal className="w-4 h-4 mr-2" />
              )}
              Run Upgrade
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Downgrade System</h3>
              <p className="text-sm text-muted-foreground">Revert to a previous stable version if you encounter issues.</p>
            </div>
            <Button onClick={handleDowngrade} disabled={isDowngrading} variant="destructive">
              {isDowngrading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Terminal className="w-4 h-4 mr-2" />
              )}
              Run Downgrade
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
