import { Bell, AlertTriangle, CheckCircle, BarChart } from "lucide-react";

// Sample user data
export const username = "David";

// Sample notifications data
export const notifications = [
  {
    logo: {
      icon: "<AlertTriangle className=\"w-4 h-4\" />",
      bgColor: "bg-red-500",
    },
    title: "KBL 175G",
    datetime: "10/02/2023 14:21",
    content: "Overspeed at Depot",
    tooltipContent: "Vehicle exceeded speed limit at the depot",
  },
  {
    logo: { icon: "<Bell className=\"w-4 h-4\" />", bgColor: "bg-orange-500" },
    title: "KBL 115G",
    datetime: "10/02/2023 14:19",
    content: "Idling at Depot",
    tooltipContent:
      "Vehicle has been idling at the depot for an extended period",
  },
  {
    logo: {
      icon: "<CheckCircle className=\"w-4 h-4\" />",
      bgColor: "bg-green-500",
    },
    title: "KBL 165G",
    datetime: "10/02/2023 14:17",
    content: "Arrived at Depot",
    tooltipContent: "Vehicle has arrived at the depot",
  },
  {
    logo: { icon: "<BarChart className=\"w-4 h-4\" />", bgColor: "bg-yellow-500" },
    title: "KBD 165G",
    datetime: "10/02/2023 14:17",
    content: "Mileage Report",
    tooltipContent: "Weekly mileage report is now available",
  },
];
