import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { Info } from "lucide-react";

// Notification component
const Notification = ({ logo, title, datetime, content, tooltipContent }) => (
  <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
    <div className="flex items-center space-x-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${logo.bgColor}`}
      >
        {logo.icon}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{datetime}</p>
        <p className="text-sm">{content}</p>
      </div>
    </div>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info className="w-4 h-4 text-gray-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

export default Notification;
