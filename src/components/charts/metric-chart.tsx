'use client'

import { useState } from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown,
  Info
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricDataPoint {
  timestamp: number
  value: number
}

interface MetricChartProps {
  title: string
  data: MetricDataPoint[]
  icon: React.ElementType
  unit: string
  color: string
  type?: 'line' | 'area' | 'bar'
  maxValue?: number
  showDetails?: boolean
  onShowDetails?: () => void
}

export function MetricChart({
  title,
  data,
  icon: Icon,
  unit,
  color,
  type = 'line',
  maxValue = 100,
  showDetails = false,
  onShowDetails
}: MetricChartProps) {
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h')

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    switch (timeRange) {
      case '1h':
      case '6h':
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      case '24h':
        return date.toLocaleTimeString('en-US', { hour: '2-digit' })
      case '7d':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      default:
        return ''
    }
  }

  const chartData = data.map(point => ({
    timestamp: formatTimestamp(point.timestamp),
    value: point.value,
  }))

  const currentValue = data.length > 0 ? data[data.length - 1].value : 0
  const previousValue = data.length > 1 ? data[data.length - 2].value : 0
  const trend = currentValue > previousValue ? 'up' : currentValue < previousValue ? 'down' : 'stable'

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-card border rounded-lg shadow-lg">
          <p className="text-sm text-muted-foreground">{`Time: ${label}`}</p>
          <p className="text-sm font-bold" style={{ color }}>{`${title}: ${Math.round(payload[0].value)}${unit}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const chartComponents = {
      line: LineChart,
      area: AreaChart,
      bar: BarChart,
    };

    const ChartComponent = chartComponents[type];

    const seriesComponents = {
        line: <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />,
        area: <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={2} />,
        bar: <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />
    };

    const SeriesComponent = seriesComponents[type];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="timestamp" 
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={[0, maxValue]} 
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={(value) => `${value}${unit}`}
          />
          <Tooltip content={<CustomTooltip />} />
          {SeriesComponent}
        </ChartComponent>
      </ResponsiveContainer>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="p-4 sm:p-6 sm:w-2/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">{title}</CardTitle>
              </div>
              {showDetails && onShowDetails && (
                <Button variant="ghost" size="icon" onClick={onShowDetails} className="sm:hidden">
                  <Info size={16} />
                </Button>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold">{Math.round(currentValue)}{unit}</span>
              <span className={cn('flex items-center', trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground')}>
                {trend === 'up' && <TrendingUp size={16} />}
                {trend === 'down' && <TrendingDown size={16} />}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center justify-between">
            <div className="flex gap-1 mt-4">
              {(['1h', '6h', '24h', '7d'] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="h-7 px-2 text-xs"
                >
                  {range}
                </Button>
              ))}
            </div>
            {showDetails && onShowDetails && (
              <Button variant="ghost" size="icon" onClick={onShowDetails}>
                <Info size={16} />
              </Button>
            )}
          </div>
        </div>

        <div className="flex-grow h-32 sm:h-auto w-full sm:w-3/5 p-2 pr-4">
          {renderChart()}
        </div>
      </div>
      <div className="sm:hidden flex gap-1 p-2 justify-center border-t">
        {(['1h', '6h', '24h', '7d'] as const).map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTimeRange(range)}
            className="flex-1 h-7 px-2 text-xs"
          >
            {range}
          </Button>
        ))}
      </div>
    </Card>
  )
}