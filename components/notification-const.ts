import {
  LucideIcon,
  AlertTriangle,
  Bell,
  CheckCircle,
  BarChart,
} from "lucide-react";

export const username = "David";

export interface NotificationProps {
  logo: {
    icon: string;
    bgColor: string;
  };
  title: string;
  datetime: string;
  content: string;
  tooltipContent: string;
}

export const iconMap: { [key: string]: LucideIcon } = {
  AlertTriangle,
  Bell,
  CheckCircle,
  BarChart,
};

export const notifications: NotificationProps[] = [
  {
    logo: { icon: "AlertTriangle", bgColor: "bg-[#c40000]" },
    title: "KBL 175G",
    datetime: "10/02/2023 14:21",
    content: "Kapenguria Depot",
    tooltipContent: "Vehicle at the depot",
  },
  {
    logo: { icon: "Bell", bgColor: "bg-[#ff6262]" },
    title: "KBL 115G",
    datetime: "10/02/2023 14:19",
    content: "KCC Molo",
    tooltipContent:
      "Vehicle has been idling at the depot for an extended period",
  },
  {
    logo: { icon: "CheckCircle", bgColor: "bg-[#1a928c]" },
    title: "KBL 165G",
    datetime: "10/02/2023 14:17",
    content: "Mbaraki Depot",
    tooltipContent: "Vehicle has arrived at the depot",
  },
  {
    logo: { icon: "BarChart", bgColor: "bg-[#ffa333]" },
    title: "KBD 165G",
    datetime: "10/02/2023 14:17",
    content: "Mbaraki Depot",
    tooltipContent: "Weekly mileage report is now available",
  },
];

export const violationData = [
  { name: "Harsh Acceleration", value: 615, color: "hsl(9, 79%, 66%)" },
  { name: "Harsh Braking", value: 610, color: "hsl(177, 69%, 56%)" },
  { name: "Speeding", value: 450, color: "hsl(177, 70%, 34%)" },
  { name: "Night Drive", value: 350, color: "hsl(0, 0%, 66%)" },
];

export const AssetData = [
  { name: "Garage", value: 21, color: "hsl(0, 86%, 59%)" },
  { name: "Yard", value: 60, color: "hsl(39, 96%, 53%)" },
  { name: "Active", value: 40, color: "hsl(180, 100%, 33%)" },
];

export const LicenseData = [
  { name: "OK", value: 50, color: "hsl(147, 69%, 49%)" },
  { name: "In 1 Months", value: 25, color: "hsl(297, 69%, 49%)" },
  { name: "In 2 Months", value: 35, color: "hsl(177, 70%, 34%)" },
  { name: "In 3 Months", value: 45, color: "hsl(27, 69%, 49%)" },
];

export const AssetSummaryData = [
  { name: "Overal", value: 615, color: "hsl(0, 80%, 46%)" },
  { name: "in 1000km", value: 610, color: "hsl(60, 78%, 55%)" },
  { name: "in 2500km", value: 450, color: "hsl(27, 69%, 49%)" },
  { name: "in 5000km", value: 350, color: "hsl(33, 100%, 62%)" },
];

export const fleetMilage = [
  { day: 1, kilometers: 10 },
  { day: 2, kilometers: 15 },
  { day: 3, kilometers: 20 },
  { day: 4, kilometers: 50 },
  { day: 5, kilometers: 50 },
  { day: 6, kilometers: 80 },
];

export type VehicleAlert = {
  Alert: string;
  Count: number;
};

export type DrivingData = {
  name: string;
  value: number;
  color: string;
};

export type FleetMileage = {
  day: number;
  kilometers: number;
};

export interface Alert {
  type: string;
  count: number;
}

export const alerts: Alert[] = [
  { type: "Power Cuts", count: 15 },
  { type: "Antenna Faults", count: 4 },
  { type: "Panic", count: 0 },
];
