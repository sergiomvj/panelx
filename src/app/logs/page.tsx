'use client'

import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Maximize2, XCircle, AlertTriangle, Info, Pause, Play, RotateCcw, Database } from 'lucide-react';

// Define the type for a single log entry
interface Log {
  id: number;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  container: string;
  message: string;
}

// Mock data
const MOCK_LOGS: Log[] = [
  { id: 1, timestamp: new Date().toISOString(), level: 'info', container: 'web-1', message: 'Server started successfully on port 3000' },
  { id: 2, timestamp: new Date().toISOString(), level: 'warn', container: 'db-1', message: 'Database connection is slow' },
  { id: 3, timestamp: new Date().toISOString(), level: 'error', container: 'web-1', message: 'Failed to fetch user data: 404 Not Found' },
];

const getLevelColor = (level: Log['level']) => {
  switch (level) {
    case 'error': return 'text-red-500';
    case 'warn': return 'text-yellow-500';
    case 'info': return 'text-blue-500';
    default: return 'text-gray-500';
  }
};

const getLevelIcon = (level: Log['level']) => {
    const className = "w-4 h-4";
    switch (level) {
        case 'error': return <XCircle className={className} />;
        case 'warn': return <AlertTriangle className={className} />;
        case 'info': return <Info className={className} />;
        default: return null;
    }
}

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString('en-US', { hour12: false });
};

export default function LogsPage() {
  const [isTailEnabled, setIsTailEnabled] = useState(true);
  const [filteredLogs, setFilteredLogs] = useState(MOCK_LOGS);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTailEnabled && logsEndRef.current) {
        logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredLogs, isTailEnabled]);

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Live Logs</h2>
              <p className="text-muted-foreground">
                {filteredLogs.length} log entries • {isTailEnabled ? 'Following' : 'Paused'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsTailEnabled(!isTailEnabled)}>
                {isTailEnabled ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isTailEnabled ? 'Pause' : 'Follow'}
              </Button>
              <Button variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline">
                <Maximize2 className="w-4 h-4 mr-2" />
                Fullscreen
              </Button>
            </div>
        </div>

        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 p-0">
            <div className="h-full bg-black text-green-400 font-mono text-sm overflow-hidden flex flex-col">
              <div className="border-b border-gray-700 p-3 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-400 w-full">
                  <span className="w-[80px]">Timestamp</span>
                  <span className="w-[70px]">Level</span>
                  <span className="w-[120px]">Container</span>
                  <span>Message</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredLogs.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No logs found</p>
                  </div>
                ) : (
                  filteredLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="border-b border-gray-800 hover:bg-gray-900 p-3 cursor-pointer transition-colors"
                      onClick={() => setSelectedLog(log)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-gray-500 text-xs whitespace-nowrap w-[80px]">
                          {formatTime(log.timestamp)}
                        </span>
                        <span className={`text-xs font-semibold whitespace-nowrap w-[70px] ${getLevelColor(log.level)} flex items-center gap-1`}>
                          {getLevelIcon(log.level)}
                          <span>{log.level.toUpperCase()}</span>
                        </span>
                        <span className="text-xs text-gray-400 whitespace-nowrap w-[120px]">
                          {log.container}
                        </span>
                        <span className="text-green-400 flex-1 break-words whitespace-pre-wrap">
                          {log.message}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
