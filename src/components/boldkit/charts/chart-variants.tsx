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
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey={categoryKey} stroke="#000" />
          <YAxis stroke="#000" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey={dataKey} stroke="var(--primary)" strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} />
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
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey={categoryKey} stroke="#000" />
          <YAxis stroke="#000" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey={dataKey} fill="var(--primary)" stroke="#000" strokeWidth={2} />
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
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey={categoryKey} stroke="#000" />
          <YAxis stroke="#000" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey={dataKey} stroke="#000" strokeWidth={2} fill="var(--secondary)" fillOpacity={0.7} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BoldPieChart({ data, config, className, dataKey = 'value', categoryKey = 'name' }: BaseChartProps) {
  const COLORS = ['#8B1E2D', '#E8A317', '#1E3F66', '#15803D', '#5B2A86'];
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie data={data} dataKey={dataKey} nameKey={categoryKey} cx="50%" cy="50%" outerRadius={80} stroke="#000" strokeWidth={2}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey={categoryKey} stroke="#000" name="X" />
          <YAxis dataKey={dataKey} stroke="#000" name="Y" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Scatter data={data} fill="var(--primary)" stroke="#000" strokeWidth={2} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
