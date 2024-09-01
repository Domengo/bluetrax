import { LucideIcon, AlertTriangle, Bell, CheckCircle, BarChart } from 'lucide-react'

export const username = "David"

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
}

export const notifications = [
  {
    logo: { icon: "AlertTriangle", bgColor: 'bg-red-500' },
    title: 'KBL 175G',
    datetime: '10/02/2023 14:21',
    content: 'Overspeed at Depot',
    tooltipContent: 'Vehicle exceeded speed limit at the depot'
  },
  {
    logo: { icon: "Bell", bgColor: 'bg-orange-500' },
    title: 'KBL 115G',
    datetime: '10/02/2023 14:19',
    content: 'Idling at Depot',
    tooltipContent: 'Vehicle has been idling at the depot for an extended period'
  },
  {
    logo: { icon: "CheckCircle", bgColor: 'bg-green-500' },
    title: 'KBL 165G',
    datetime: '10/02/2023 14:17',
    content: 'Arrived at Depot',
    tooltipContent: 'Vehicle has arrived at the depot'
  },
  {
    logo: { icon: "BarChart", bgColor: 'bg-yellow-500' },
    title: 'KBD 165G',
    datetime: '10/02/2023 14:17',
    content: 'Mileage Report',
    tooltipContent: 'Weekly mileage report is now available'
  }
]

export const drivingData = [
  { name: 'Harsh Acceleration', value: 615, color: 'hsl(358, 94%, 76%)' },
  { name: 'Harsh Braking', value: 610, color: 'hsl(174, 72%, 56%)' },
  { name: 'Speeding', value: 450, color: 'hsl(174, 72%, 46%)' },
  { name: 'Night Drive', value: 350, color: 'hsl(0, 0%, 80%)' },
]

export const fleetMilage = [
  { day: 1, kilometers: 10 },
  { day: 2, kilometers: 15 },
  { day: 3, kilometers: 20 },
  { day: 4, kilometers: 50 },
  { day: 5, kilometers: 50 },
  { day: 6, kilometers: 80 }
];
