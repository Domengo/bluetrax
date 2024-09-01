"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface AssetStatusCardProps {
  title: string
  children: React.ReactNode
  buttonText?: string
  onButtonClick?: () => void
  className?: string
  icon?: LucideIcon
}

export default function AssetStatusCard({ 
  title, 
  children, 
  buttonText, 
  onButtonClick, 
  className,
  icon: Icon,
  ...props 
}: AssetStatusCardProps) {
  return (
    <Card className={cn("flex flex-col bg-slate-100", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#001e6c]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        {children} 
      </CardContent>
      {buttonText && onButtonClick && (
        <CardFooter className="justify-end">
          <Button 
            onClick={onButtonClick} 
            className="bg-[#001e6c] hover:bg-blue-900 text-white"
          >
            {buttonText}
            {Icon && <Icon className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}