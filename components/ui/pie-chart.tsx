"use client"

import React from "react"
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Label } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Using your custom chart colors from the theme
const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

type CustomToolTip = {
    active?:boolean,
    payload?: any
}

export type PieChartData = {
  name: string
  value: number
}

type SimplePieChartProps = {
  data: PieChartData[]
  title?: string
  showLabels?: boolean
  donut?: boolean
}

export function SimplePieChart({
  data,
  title = "Chart",
  showLabels = true,
  donut = true
}: SimplePieChartProps) {
  const total = React.useMemo(() => 
    data.reduce((sum, item) => sum + item.value, 0), 
    [data]
  )

  const CustomTooltip = ({ active, payload }: CustomToolTip) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded shadow-sm p-2 text-sm">
          <p className="font-medium text-card-foreground">{payload[0].name}</p>
          <p className="text-muted-foreground">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={donut ? 60 : 0}
                outerRadius={90}
                paddingAngle={2}
                label={showLabels ? ({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%` : false}
                labelLine={showLabels}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
                {donut && (
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                              {total.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-sm"
                            >
                              Total
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                )}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}