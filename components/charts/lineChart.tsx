"use client"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { StatisticsSchemaType } from "@/lib/types"

const chartData = [
  { date: "2024-04-01", amount: 222, donations: 150 },
  { date: "2024-04-02", amount: 97, donations: 180 },
  { date: "2024-04-03", amount: 167, donations: 120 },
  { date: "2024-04-04", amount: 242, donations: 260 },
  { date: "2024-04-05", amount: 373, donations: 290 },
  { date: "2024-04-06", amount: 301, donations: 340 },
  { date: "2024-04-07", amount: 245, donations: 180 },
  { date: "2024-04-08", amount: 409, donations: 320 },
  { date: "2024-04-09", amount: 59, donations: 110 },
  { date: "2024-04-10", amount: 261, donations: 190 },
  { date: "2024-04-11", amount: 327, donations: 350 },
  { date: "2024-04-12", amount: 292, donations: 210 },
  { date: "2024-04-13", amount: 342, donations: 380 },
  { date: "2024-04-14", amount: 137, donations: 220 },
  { date: "2024-04-15", amount: 120, donations: 170 },
  { date: "2024-04-16", amount: 138, donations: 190 },
  { date: "2024-04-17", amount: 446, donations: 360 },
  { date: "2024-04-18", amount: 364, donations: 410 },
  { date: "2024-04-19", amount: 243, donations: 180 },
  { date: "2024-04-20", amount: 89, donations: 150 },
  { date: "2024-04-21", amount: 137, donations: 200 },
  { date: "2024-04-22", amount: 224, donations: 170 },
  { date: "2024-04-23", amount: 138, donations: 230 },
  { date: "2024-04-24", amount: 387, donations: 290 },
  { date: "2024-04-25", amount: 215, donations: 250 },
  { date: "2024-04-26", amount: 75, donations: 130 },
  { date: "2024-04-27", amount: 383, donations: 420 },
  { date: "2024-04-28", amount: 122, donations: 180 },
  { date: "2024-04-29", amount: 315, donations: 240 },
  { date: "2024-04-30", amount: 454, donations: 380 },
  { date: "2024-05-01", amount: 165, donations: 220 },
  { date: "2024-05-02", amount: 293, donations: 310 },
  { date: "2024-05-03", amount: 247, donations: 190 },
  { date: "2024-05-04", amount: 385, donations: 420 },
  { date: "2024-05-05", amount: 481, donations: 390 },
  { date: "2024-05-06", amount: 498, donations: 520 },
  { date: "2024-05-07", amount: 388, donations: 300 },
  { date: "2024-05-08", amount: 149, donations: 210 },
  { date: "2024-05-09", amount: 227, donations: 180 },
  { date: "2024-05-10", amount: 293, donations: 330 },
  { date: "2024-05-11", amount: 335, donations: 270 },
  { date: "2024-05-12", amount: 197, donations: 240 },
  { date: "2024-05-13", amount: 197, donations: 160 },
  { date: "2024-05-14", amount: 448, donations: 490 },
  { date: "2024-05-15", amount: 473, donations: 380 },
  { date: "2024-05-16", amount: 338, donations: 400 },
  { date: "2024-05-17", amount: 499, donations: 420 },
  { date: "2024-05-18", amount: 315, donations: 350 },
  { date: "2024-05-19", amount: 235, donations: 180 },
  { date: "2024-05-20", amount: 177, donations: 230 },
  { date: "2024-05-21", amount: 82, donations: 140 },
  { date: "2024-05-22", amount: 81, donations: 120 },
  { date: "2024-05-23", amount: 252, donations: 290 },
  { date: "2024-05-24", amount: 294, donations: 220 },
  { date: "2024-05-25", amount: 201, donations: 250 },
  { date: "2024-05-26", amount: 213, donations: 170 },
  { date: "2024-05-27", amount: 420, donations: 460 },
  { date: "2024-05-28", amount: 233, donations: 190 },
  { date: "2024-05-29", amount: 78, donations: 130 },
  { date: "2024-05-30", amount: 340, donations: 280 },
  { date: "2024-05-31", amount: 178, donations: 230 },
  { date: "2024-06-01", amount: 178, donations: 200 },
  { date: "2024-06-02", amount: 470, donations: 410 },
  { date: "2024-06-03", amount: 103, donations: 160 },
  { date: "2024-06-04", amount: 439, donations: 380 },
  { date: "2024-06-05", amount: 88, donations: 140 },
  { date: "2024-06-06", amount: 294, donations: 250 },
  { date: "2024-06-07", amount: 323, donations: 370 },
  { date: "2024-06-08", amount: 385, donations: 320 },
  { date: "2024-06-09", amount: 438, donations: 480 },
  { date: "2024-06-10", amount: 155, donations: 200 },
  { date: "2024-06-11", amount: 92, donations: 150 },
  { date: "2024-06-12", amount: 492, donations: 420 },
  { date: "2024-06-13", amount: 81, donations: 130 },
  { date: "2024-06-14", amount: 426, donations: 380 },
  { date: "2024-06-15", amount: 307, donations: 350 },
  { date: "2024-06-16", amount: 371, donations: 0 },
  { date: "2024-06-17", amount: 475, donations: 0 },
  { date: "2024-06-18", amount: 107, donations: 0 },
  { date: "2024-06-19", amount: 341, donations: 0 },
  { date: "2024-06-20", amount: 408, donations: 0 },
  { date: "2024-06-21", amount: 169, donations: 0 },
  { date: "2024-06-22", amount: 317, donations: 270 },
  { date: "2024-06-23", amount: 480, donations: 530 },
  { date: "2024-06-24", amount: 132, donations: 180 },
  { date: "2024-06-25", amount: 141, donations: 190 },
  { date: "2024-06-26", amount: 434, donations: 380 },
  { date: "2024-06-30", amount: 446, donations: 400 },
  { date: "2024-06-27", amount: 448, donations: 490 },
  { date: "2024-06-28", amount: 149, donations: 200 },
  { date: "2024-06-29", amount: 103, donations: 160 },
]

const chartConfig = {
  views: {
    label: "activity",
  },
  amount: {
    label: "amount",
    color: "hsl(var(--chart-1))",
  },
  donations: {
    label: "donations",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Chart({data}:{data:StatisticsSchemaType[]}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("amount")

  const total = React.useMemo(
    () => ({
      amount: data.reduce((acc, curr) => acc + curr.amount, 0),
      donations: data.reduce((acc, curr) => acc + curr.donations, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Stats</CardTitle>
          <CardDescription>
            Showing donor and donation statistics over the last 90 days.
          </CardDescription>
        </div>
        <div className="flex">
          {["amount", "donations"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
