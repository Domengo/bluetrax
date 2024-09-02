import React from 'react'
import AreaChart from "../../components/area-chart"
import { fleetMilage } from "../../components/notification-const"

export default function Analytics() {
  return (
    <div className="p-8 flex justify-center items-center h-screen w-full">
      <AreaChart data={fleetMilage} />
    </div>
  )
}