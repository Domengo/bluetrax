"use client";

import AssetStatusCard from "@/components/asset-status-card";
import DonutChart from "./donut-chart";
import AreaChart from "./area-chart";
import DateRangePicker from "./DateRangePicker";
import DatePicker from "./DatePicker";
import { drivingData, fleetMilage, alerts } from "./notification-const";
import TableData from "@/components/Table";
import UnderlineInput from "./UnderlineInput";
import { CarFront } from "lucide-react";

export default function Dashboard() {
  const handleSearch = () => {
    console.log("Search button clicked");
    // search logic here
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 mt-4">
        <div>
          <UnderlineInput
            icon={<CarFront className="text-[#001e6c]" />}
            placeholder="Search by Reg No."
            aria-label="Search input"
            onSearch={handleSearch}
            buttonText="Go To Track"
          />
        </div>
        <div className="ml-auto">
          <DatePicker />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <AssetStatusCard
            title="Assets status"
            buttonText="Current status"
            onButtonClick={() => console.log("Button clicked")}
          >
            <DonutChart data={drivingData} />
          </AssetStatusCard>
        </div>
        <div>
          <AssetStatusCard
            title="Fleet Mileage"
            buttonText="Movement"
            onButtonClick={() => console.log("Button clicked")}
          >
            <DateRangePicker className="" />
            <AreaChart data={fleetMilage} />
          </AssetStatusCard>
        </div>
        <div>
          <AssetStatusCard
            title="Total Violations"
            buttonText="Violations"
            onButtonClick={() => console.log("Button clicked")}
          >
            <DonutChart data={drivingData} />
          </AssetStatusCard>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-[#001e6c] font-bold text-xl">Fleet</h1>
        </div>
        <div className="ml-auto">
          <DatePicker />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <AssetStatusCard
            title="Licenses"
            // buttonText="Current status"
            // onButtonClick={() => console.log("Button clicked")}
          >
            <DonutChart data={drivingData} />
          </AssetStatusCard>
        </div>
        <div>
          <AssetStatusCard
            title="Alerts summary"
            // buttonText="Current status"
            // onButtonClick={() => console.log("Button clicked")}
          >
            <DateRangePicker />
            <TableData alerts={alerts} />
          </AssetStatusCard>
        </div>
        <div>
          <AssetStatusCard
            title="Assets Service Summary"
            // buttonText="Current status"
            // onButtonClick={() => console.log("Button clicked")}
          >
            <DonutChart data={drivingData} />
          </AssetStatusCard>
        </div>
      </div>
    </div>
  );
}
