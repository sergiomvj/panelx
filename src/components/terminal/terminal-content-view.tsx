'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Plus, HardDrive, Terminal } from 'lucide-react'

export function TerminalContentView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Terminal Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="project-select" className="text-sm font-medium">Project</label>
              <Select>
                <SelectTrigger id="project-select">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project-a">Project A</SelectItem>
                  <SelectItem value="project-b">Project B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="container-select" className="text-sm font-medium">Container</label>
              <Select>
                <SelectTrigger id="container-select">
                  <SelectValue placeholder="Select a container" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="container-1">container-1</SelectItem>
                  <SelectItem value="container-2">container-2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Connect
            </Button>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <HardDrive className="w-6 h-6" />
                <div>
                  <p className="font-semibold">root@project-a:container-1</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Badge variant="success">Running</Badge>
            </div>
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Terminal className="w-6 h-6" />
                <div>
                  <p className="font-semibold">user@project-b:container-2</p>
                  <p className="text-sm text-muted-foreground">Idle</p>
                </div>
              </div>
              <Badge variant="secondary">Idle</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Plus, HardDrive, Terminal } from 'lucide-react'

export function TerminalContentView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Terminal Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="project-select" className="text-sm font-medium">Project</label>
              <Select>
                <SelectTrigger id="project-select">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project-a">Project A</SelectItem>
                  <SelectItem value="project-b">Project B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="container-select" className="text-sm font-medium">Container</label>
              <Select>
                <SelectTrigger id="container-select">
                  <SelectValue placeholder="Select a container" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="container-1">container-1</SelectItem>
                  <SelectItem value="container-2">container-2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Connect
            </Button>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <HardDrive className="w-6 h-6" />
                <div>
                  <p className="font-semibold">root@project-a:container-1</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Badge variant="success">Running</Badge>
            </div>
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Terminal className="w-6 h-6" />
                <div>
                  <p className="font-semibold">user@project-b:container-2</p>
                  <p className="text-sm text-muted-foreground">Idle</p>
                </div>
              </div>
              <Badge variant="secondary">Idle</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Icon } from '@/components/icon'

export function TerminalContentView() {
  const [selectedProject, setSelectedProject] = useState('project-1')
  const [selectedContainer, setSelectedContainer] = useState('container-a')

  const projects = [
    { id: 'project-1', name: 'Next.js Blog' },
    { id: 'project-2', name: 'E-commerce API' },
  ]

  const containers: Record<string, { id: string; name: string }[]> = {
    'project-1': [
      { id: 'container-a', name: 'web-server' },
      { id: 'container-b', name: 'database' },
    ],
    'project-2': [{ id: 'container-c', name: 'api-gateway' }],
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Terminal" className="w-5 h-5" />
            Terminal Control
          </CardTitle>
          <CardDescription>Select a container to connect.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Project</label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Container</label>
            <Select value={selectedContainer} onValueChange={setSelectedContainer}>
              <SelectTrigger>
                <SelectValue placeholder="Select Container" />
              </SelectTrigger>
              <SelectContent>
                {containers[selectedProject]?.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full flex items-center gap-2">
            <Icon name="Play" className="w-4 h-4 mr-2" />
            Connect
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Icon name="Plus" className="w-4 h-4 mr-2" />
            New Session
          </Button>
        </CardContent>
      </Card>

      <Card className="h-[70vh] flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="HardDrive" className="w-5 h-5" />
                {selectedContainer
                  ? `Connected to: ${containers[selectedProject]?.find((c) => c.id === selectedContainer)?.name}`
                  : 'No Connection'}
              </CardTitle>
              <CardDescription>Interactive shell access</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-green-500 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                CONNECTED
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="bg-black text-white font-mono text-sm h-full w-full p-4 overflow-y-auto">
            <p>
              $ <span className="text-green-400">Connecting to container...</span>
            </p>
            <p>
              $ <span className="text-green-400">Connection established.</span>
            </p>
            <p>
              root@container-a:/app# <span className="animate-pulse">_</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
