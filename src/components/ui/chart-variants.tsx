import * as React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from './chart';
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid
} from 'recharts';

export interface BaseChartProps {
  data: any[];
  config?: ChartConfig;
  className?: string;
  dataKey?: string;
  categoryKey?: string;
}

export function BoldLineChart({ data, config, className, dataKey = 'value', categoryKey = 'name' }: BaseChartProps) {
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
          <XAxis dataKey={categoryKey} stroke="#1F1F1F" strokeWidth={2} />
          <YAxis stroke="#1F1F1F" strokeWidth={2} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#5B2A85"
            strokeWidth={3}
            dot={{ stroke: '#1F1F1F', strokeWidth: 3, r: 5, fill: '#FE8812' }}
            isAnimationActive={true}
            animationDuration={400}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BoldBarChart({ data, config, className, dataKey = 'value', categoryKey = 'name' }: BaseChartProps) {
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
          <XAxis dataKey={categoryKey} stroke="#1F1F1F" strokeWidth={2} />
          <YAxis stroke="#1F1F1F" strokeWidth={2} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey={dataKey}
            fill="#5B2A85"
            stroke="#1F1F1F"
            strokeWidth={3}
            isAnimationActive={true}
            animationDuration={400}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BoldAreaChart({ data, config, className, dataKey = 'value', categoryKey = 'name' }: BaseChartProps) {
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
          <XAxis dataKey={categoryKey} stroke="#1F1F1F" strokeWidth={2} />
          <YAxis stroke="#1F1F1F" strokeWidth={2} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#1F1F1F"
            strokeWidth={3}
            fill="#5B2A85"
            fillOpacity={0.75}
            isAnimationActive={true}
            animationDuration={400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BoldPieChart({ data, config, className, dataKey = 'value', categoryKey = 'name' }: BaseChartProps) {
  const COLORS = ['#5B2A85', '#FE8812', '#266264', '#A85300', '#4A216E', '#134E4A'];
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={categoryKey}
            cx="50%"
            cy="50%"
            outerRadius={80}
            stroke="#1F1F1F"
            strokeWidth={3}
            isAnimationActive={true}
            animationDuration={400}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#1F1F1F" strokeWidth={3} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BoldScatterChart({ data, config, className, dataKey = 'y', categoryKey = 'x' }: BaseChartProps) {
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
          <XAxis dataKey={categoryKey} stroke="#1F1F1F" strokeWidth={2} name="X" />
          <YAxis dataKey={dataKey} stroke="#1F1F1F" strokeWidth={2} name="Y" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Scatter
            data={data}
            fill="#5B2A85"
            stroke="#1F1F1F"
            strokeWidth={3}
            isAnimationActive={true}
            animationDuration={400}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
