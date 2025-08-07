'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Terminal as TerminalIcon } from 'lucide-react'

export default function TerminalPage() {
  const [command, setCommand] = useState('ls -la')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleExecuteCommand = async () => {
    setLoading(true)
    setOutput('')

    try {
      const response = await fetch('/api/vps/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      })

      const result = await response.json()

      if (response.ok) {
        setOutput(`STDOUT:\n${result.stdout}\n\nSTDERR:\n${result.stderr}`)
      } else {
        setOutput(`Error: ${result.error}\nDetails: ${result.details}`)
      }
    } catch (error: any) {
      setOutput(`Failed to fetch: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Remote Terminal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Execute Command on VPS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={command}
              onChange={e => setCommand(e.target.value)}
              placeholder="Enter command to execute on VPS"
              onKeyDown={e => e.key === 'Enter' && handleExecuteCommand()}
            />
            <Button onClick={handleExecuteCommand} disabled={loading}>
              {loading ? 'Executing...' : 'Execute'}
            </Button>
          </div>
          <Card className="bg-black text-white font-mono text-sm">
            <CardHeader className="flex-row items-center gap-2 space-y-0 py-2">
              <TerminalIcon className="h-4 w-4" />
              <CardTitle className="text-base">Output</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap break-all">
                {output || 'No output yet. Run a command to see the result.'}
              </pre>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

