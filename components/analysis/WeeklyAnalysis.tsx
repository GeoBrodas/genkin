'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { day: 'Monday', totalOutflow: 186 },
  { day: 'Tuesday', totalOutflow: 305 },
  { day: 'Wednesday', totalOutflow: 237 },
  { day: 'Thursday', totalOutflow: 73 },
  { day: 'Friday', totalOutflow: 209 },
  { day: 'Saturday', totalOutflow: 214 },
  { day: 'Sunday', totalOutflow: 0 },
];

const chartConfig = {
  totalOutflow: {
    label: 'Total Outflow',
    color: 'hsl(0, 42%, 45%)',
  },
} satisfies ChartConfig;

export default function WeeklyAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly spendings</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalOutflow"
              fill="var(--color-totalOutflow)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Highest outflow seen on Wednesday <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Spending went upto $400
        </div>
      </CardFooter>
    </Card>
  );
}
