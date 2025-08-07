'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/icon'
import { cn } from '@/lib/utils'

export function LogsContentView() {
  const [searchTerm, setSearchTerm] = useState('')

  const fakeLogs = [
    {
      timestamp: '2023-10-27T10:00:00Z',
      level: 'info',
      service: 'api-gateway',
      message: 'Request received: GET /api/users',
    },
    {
      timestamp: '2023-10-27T10:00:01Z',
      level: 'warn',
      service: 'user-service',
      message: 'Deprecated field `username` accessed.',
    },
    {
      timestamp: '2023-10-27T10:00:02Z',
      level: 'error',
      service: 'payment-service',
      message: 'Failed to connect to database: timeout',
    },
    {
      timestamp: '2023-10-27T10:00:03Z',
      level: 'debug',
      service: 'api-gateway',
      message: 'Response sent: 200 OK',
    },
  ]

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <CardTitle>Container Logs</CardTitle>
            <CardDescription>Real-time log stream from your services.</CardDescription>
          </div>
          <div className="relative">
            <Icon name="Search" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search logs..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="font-mono text-sm bg-background p-4 rounded-lg overflow-x-auto h-96">
          {fakeLogs
            .filter(log => log.message.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((log, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-muted-foreground">{log.timestamp}</span>
                <span
                  className={cn('font-semibold',
                    log.level === 'error' && 'text-red-500',
                    log.level === 'warn' && 'text-yellow-500',
                    log.level === 'info' && 'text-blue-500',
                  )}
                >
                  [{log.level.toUpperCase()}]
                </span>
                <span className="font-bold text-purple-500">{log.service}</span>
                <span>{log.message}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
