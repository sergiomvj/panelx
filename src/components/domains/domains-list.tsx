'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, PlusCircle, ShieldCheck, Settings2, List } from 'lucide-react'

export function DomainsList() {
  const [activeView, setActiveView] = useState('list')

  const menuItems = [
    { id: 'list', label: 'All Domains', icon: List },
    { id: 'add', label: 'Add Domain', icon: PlusCircle },
    { id: 'ssl', label: 'SSL Certificates', icon: ShieldCheck },
    { id: 'dns', label: 'DNS Settings', icon: Settings2 },
  ]

  const renderContent = () => {
    // For now, all views will show the same placeholder content
    return (
      <div className="text-center py-16">
        <Globe className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">Domain Management</h3>
        <p className="text-muted-foreground max-w-md mx-auto">The full functionality for managing your domains, including adding new ones and configuring SSL, is currently under development. Stay tuned!</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
      {/* Sidebar Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Domains Menu</CardTitle>
          <CardDescription>Navigation for domain settings</CardDescription>
        </CardHeader>
        <CardContent>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? 'default' : 'ghost'}
                className="w-full justify-start gap-3 px-3"
                onClick={() => setActiveView(item.id)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <CardTitle>{menuItems.find(item => item.id === activeView)?.label}</CardTitle>
          <CardDescription>Manage your domains and SSL certificates</CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  )
}
