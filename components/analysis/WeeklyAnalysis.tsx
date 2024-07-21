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
import { getCurrentWeekDates } from '@/lib/helpers';
import { format } from 'date-fns';
import { ChartData } from '@/lib/types';

const chartConfig = {
  totalOutflow: {
    label: 'Outflow',
    color: 'hsl(0, 42%, 45%)',
  },
} satisfies ChartConfig;

export default function WeeklyAnalysis({
  chartData,
}: {
  chartData: ChartData;
}) {
  const { startOfWeek, endOfWeek } = getCurrentWeekDates();
  const start = format(startOfWeek, 'LLL dd, y');
  const end = format(endOfWeek, 'LLL dd, y');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly spendings</CardTitle>
        <CardDescription>
          {start} - {end}
        </CardDescription>
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
              radius={5}
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
