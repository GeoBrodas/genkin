'use client';

import * as React from 'react';
import { Ban, TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

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
import { categorySchema } from '@/schemas/form';
import { getFirstAndLastDayOfMonth } from '@/lib/helpers';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import BlurPlaceholder from '../BlurPlaceholder';

const pieData = categorySchema.options
  .map((category, index) => {
    return {
      [category]: {
        label: category,
        color: `hsl(var(--chart-${index + 1}))`,
      },
    };
  })
  .reduce((acc, obj) => {
    const [key, value] = Object.entries(obj)[0];
    acc[key.toLowerCase().split(' ')[0]] = value;
    return acc;
  }, {});

const chartConfig = {
  totalValue: {
    label: 'outflows',
  },
  ...pieData,
} satisfies ChartConfig;

export function CategoryAnalysis({ chartData, noData, totalTransactions }) {
  const { firstDay, lastDay } = getFirstAndLastDayOfMonth('local');
  const searchParams = useSearchParams();

  let highest = 0;
  let highestCategory: {
    category: string;
    totalValue: number;
    fill: string;
  } = {};

  function getHighestCategory() {
    if (noData) return;

    chartData.map((data) => {
      if (data.totalValue > highest) {
        highest = data.totalValue;
        highestCategory = data;
      }
    });

    return highestCategory;
  }

  getHighestCategory();

  return (
    <Card className="flex flex-col relative">
      {noData ? (
        <BlurPlaceholder />
      ) : (
        <>
          <CardHeader className="items-center pb-0">
            <CardTitle>Analysis by Category</CardTitle>
            <CardDescription>
              {format(searchParams.get('from') || firstDay, 'LLL dd')} -{' '}
              {format(searchParams.get('to') || lastDay, 'LLL dd y')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="totalValue"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalTransactions}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              transactions
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center font-medium leading-none">
              <span className="">
                {`${
                  highestCategory.category.charAt(0).toUpperCase() +
                  highestCategory.category.slice(1)
                }`}{' '}
                category was seen to be high
              </span>
              <TrendingUp className="h-4 w-4 ml-2" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total transactions for the last{' '}
              {new Date(searchParams.get('to') || lastDay).getDate() -
                new Date(searchParams.get('from') || firstDay).getDate()}{' '}
              days
            </div>
          </CardFooter>{' '}
        </>
      )}
    </Card>
  );
}
