// import React from 'react'
// import AreaChart from "../../components/area-chart"
// import { fleetMilage } from "../../components/notification-const"

// export default function Analytics() {
//   return (
//     <div className="p-8 flex justify-center items-center h-screen w-full">
//       <AreaChart data={fleetMilage} />
//     </div>
//   )
// }

'use client'

import React, { useState, useEffect } from 'react'
// import AreaChart from "@/components/area-chart"
import GDPChart from '@/components/gdpWrapper'

type DataPoint = {
  name: string
  value: number
}

export default function Analytics() {
  const [chartData, setChartData] = useState<DataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const data = [
        { month: "Jan", sales: 4000, units: 2400 },
        { month: "Feb", sales: 3000, units: 1398 },
        { month: "Mar", sales: 2000, units: 9800 },
        { month: "Apr", sales: 2780, units: 3908 },
        { month: "May", sales: 1890, units: 4800 },
        { month: "Jun", sales: 2390, units: 3800 },
      ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/crypto-data')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setChartData(data)
      } catch (err) {
        setError('An error occurred while fetching data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="w-full h-screen flex justify-center items-center">Loading...</div>
  }

  if (error) {
    return <div className="w-full h-screen flex justify-center items-center text-red-500">{error}</div>
  }

  return (
    <div className="w-full h-screen p-4 sm:p-8 flex flex-col justify-center items-center bg-background">
      <h1 className="text-2xl font-bold mb-4">Bitcoin Price (Last 30 Days)</h1>
      <div className="w-full h-[calc(100%-2rem)] max-w-7xl">
        <GDPChart apiData={data} />
      </div>
    </div>
  )
}