"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple area chart"

const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type ChartAreaDefaultProps = {
  chartData: { date: string; count: number }[]
}

export function ChartAreaDefault({ chartData = [] }: ChartAreaDefaultProps) {
  const sortedData = [...chartData].sort((a, b) =>
    a.date.localeCompare(b.date)
  )

  const formattedData = sortedData.map((item) => ({
    date: item.date,
    transactions: item.count,
  }))

  const latest = sortedData[sortedData.length - 1]?.count ?? 0
  const previous = sortedData[sortedData.length - 2]?.count ?? 0

  const trend =
    previous === 0
      ? latest > 0
        ? 100
        : 0
      : ((latest - previous) / previous) * 100

  const formattedTrend = trend.toFixed(1)
  const trendText =
    trend === 0
      ? "No change"
      : trend > 0
      ? `Trending up by ${formattedTrend}%`
      : `Trending down by ${Math.abs(+formattedTrend)}%`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Showing total transactions per day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <AreaChart
            accessibilityLayer
            data={formattedData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)} // Show MM-DD
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="transactions"
              type="natural"
              fill="var(--color-transactions)"
              fillOpacity={0.4}
              stroke="var(--color-transactions)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {trendText} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Based on last 2 days
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
