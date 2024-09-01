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