'use client'

import { useState, useEffect } from 'react';

export interface VpsStats {
  cpu: number;
  memory: {
    total: number;
    used: number;
  };
  disk: {
    total: string;
    used: string;
    percent: string;
  };
}

export function useVpsStats(refreshInterval: number = 5000, historyLength: number = 60) {
  const [stats, setStats] = useState<VpsStats | null>(null);
  const [history, setHistory] = useState<{ cpu: number[], memory: number[], disk: number[] }>({ cpu: [], memory: [], disk: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/vps/stats?_=${new Date().getTime()}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to fetch VPS stats');
      }
      const data: VpsStats = await response.json();
      setStats(data);

      // Update history
      setHistory(prevHistory => {
        const newCpu = [...prevHistory.cpu, data.cpu].slice(-historyLength);
        const memPercent = (data.memory.used / data.memory.total) * 100;
        const newMemory = [...prevHistory.memory, memPercent].slice(-historyLength);
        const diskPercent = parseFloat(data.disk.percent.replace('%', ''));
        const newDisk = [...prevHistory.disk, diskPercent].slice(-historyLength);
        return { cpu: newCpu, memory: newMemory, disk: newDisk };
      });

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error fetching stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(); // Fetch immediately on mount
    const intervalId = setInterval(fetchStats, refreshInterval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [refreshInterval, historyLength]);

  return { stats, history, loading, error };
}
