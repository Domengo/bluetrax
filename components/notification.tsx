import React from 'react'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { iconMap, NotificationProps } from './notification-const';

const Notification: React.FC<NotificationProps> = ({ logo, title, datetime, content, tooltipContent }) => {
  const IconComponent = iconMap[logo.icon]

  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded flex items-center justify-center text-white shadow ${logo.bgColor}`}>
          {IconComponent && <IconComponent className="w-4 h-4" />}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500">{datetime}</p>
          <p className="text-sm text-cyan-400">{content}</p>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info className="w-4 h-4 text-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default Notification;