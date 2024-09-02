// "use client";

// import AssetStatusCard from "@/components/asset-status-card";
// import DonutChart from "./donut-chart";
// import AreaChart from "./area-chart";
// import DateRangePicker from "./DateRangePicker";
// import DatePicker from "./DatePicker";
// import {
//   violationData,
//   fleetMilage,
//   LicenseData,
//   alerts,
//   AssetData,
//   AssetSummaryData,
// } from "./notification-const";
// import TableData from "@/components/Table";
// import UnderlineInput from "./UnderlineInput";
// import { CarFront } from "lucide-react";
// import ServiceCombobox from "./ServiceCombobox";
// import { ArrowRight } from "lucide-react";

// export default function Dashboard() {
//   const handleSearch = () => {
//     console.log("Search button clicked");
//     // search logic here
//   };

//   return (
//     <div className="flex flex-col min-h-screen mb-4">
//       <div className="">
//         <h1 className="text-[#001e6c] text-xl font-bold my-4">
//           Dashboard
//         </h1>
//       </div>
//       <div className="grid grid-cols-2 mt-4">
//         <div>
//           <UnderlineInput
//             icon={<CarFront className="text-[#001e6c]" />}
//             placeholder="Search by Reg No."
//             aria-label="Search input"
//             onSearch={handleSearch}
//             buttonText="Go To Track"
//           />
//         </div>
//         <div className="ml-auto">
//           <DatePicker />
//         </div>
//       </div>
//       <div className="grid grid-cols-3 gap-4 mt-4 ">
//         <div className="">
//           <AssetStatusCard
//             title="Assets status"
//             buttonText="Current status"
//             onButtonClick={() => console.log("Button clicked")}
//             className="pb-8"
//             icon={ArrowRight}
//           >
//             <DonutChart data={AssetData} />
//           </AssetStatusCard>
//           <div className="mt-8"></div>
//         </div>
//         <div className="">
//           <AssetStatusCard
//             title="Fleet Mileage"
//             buttonText="Movement"
//             onButtonClick={() => console.log("Button clicked")}
//             icon={ArrowRight}
//           >
//             <DateRangePicker className="" />
//             <AreaChart data={fleetMilage} />
//           </AssetStatusCard>
//         </div>
//         <div className="">
//           <AssetStatusCard
//             title="Total Violations"
//             buttonText="Violations"
//             onButtonClick={() => console.log("Button clicked")}
//             className="pb-8"
//             icon={ArrowRight}
//           >
//             <DonutChart data={violationData} />
//           </AssetStatusCard>
//         </div>
//       </div>
//       <div className="grid grid-cols-2">
//         <div>
//           <h1 className="text-[#001e6c] font-bold text-xl">Fleet</h1>
//         </div>
//         <div className="ml-auto">
//           <DatePicker />
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mt-4">
//         <div>
//           <AssetStatusCard
//             title="Licenses"
//             className="pb-16"
//           >
//             <DonutChart data={LicenseData} />
//           </AssetStatusCard>
//         </div>
//         <div>
//           <AssetStatusCard
//             title="Alerts summary"
//           >
//             <DateRangePicker />
//             <TableData alerts={alerts} />
//           </AssetStatusCard>
//         </div>
//         <div>
//           <AssetStatusCard
//             title="Assets Service Summary"
//             className="pb-16"
//           >
//             <div className="items-end">
//               <ServiceCombobox />
//             </div>

//             <DonutChart data={AssetSummaryData} />
//           </AssetStatusCard>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import AssetStatusCard from "@/components/asset-status-card";
import DonutChart from "./donut-chart";
import AreaChart from "./area-chart";
import DateRangePicker from "./DateRangePicker";
import DatePicker from "./DatePicker";
import {
  violationData,
  fleetMilage,
  LicenseData,
  alerts,
  AssetData,
  AssetSummaryData,
} from "./notification-const";
import TableData from "@/components/Table";
import UnderlineInput from "./UnderlineInput";
import { CarFront, ArrowRight } from "lucide-react";
import ServiceCombobox from "./ServiceCombobox";

export default function Dashboard() {
  const handleSearch = () => {
    console.log("Search button clicked");
    // search logic here
  };

  return (
    <div className="flex flex-col mb-4 px-4 sm:px-6 lg:px-8">
      <div className="my-4">
        <h1 className="text-[#001e6c] text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-row items-center mt-4 ">
        <div className="w-full ">
          <UnderlineInput
            icon={<CarFront className="text-[#001e6c]" />}
            placeholder="Search by Reg No."
            aria-label="Search input"
            onSearch={handleSearch}
            buttonText="Go To Track"
          />
        </div>
        <div className="w-full ">
          <DatePicker />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <AssetStatusCard
          title="Assets status"
          buttonText="Current status"
          onButtonClick={() => console.log("Button clicked")}
          className="pb-8"
          icon={ArrowRight}
        >
          <DonutChart data={AssetData} />
        </AssetStatusCard>
        <AssetStatusCard
          title="Fleet Mileage"
          buttonText="Movement"
          onButtonClick={() => console.log("Button clicked")}
          icon={ArrowRight}
        >
          <DateRangePicker className="" />
          <AreaChart data={fleetMilage} />
        </AssetStatusCard>
        <AssetStatusCard
          title="Total Violations"
          buttonText="Violations"
          onButtonClick={() => console.log("Button clicked")}
          className="pb-8"
          icon={ArrowRight}
        >
          <DonutChart data={violationData} />
        </AssetStatusCard>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 space-y-4 sm:space-y-0">
        <h1 className="text-[#001e6c] font-bold text-xl">Fleet</h1>
        <DatePicker />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <AssetStatusCard title="Licenses" className="pb-16">
          <DonutChart data={LicenseData} />
        </AssetStatusCard>
        <AssetStatusCard title="Alerts summary">
          <DateRangePicker />
          <TableData alerts={alerts} />
        </AssetStatusCard>
        <AssetStatusCard title="Assets Service Summary" className="pb-16">
          <div className="items-end">
            <ServiceCombobox />
          </div>
          <DonutChart data={AssetSummaryData} />
        </AssetStatusCard>
      </div>
    </div>
  );
}
