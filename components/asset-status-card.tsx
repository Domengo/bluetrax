"'use client'"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AssetStatusCardProps {
  title: string
  children: React.ReactNode
  buttonText: string
  onButtonClick: () => void
}

export default function AssetStatusCard({ title, children, buttonText, onButtonClick }: AssetStatusCardProps) {
  return (
    <Card className=" flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow-0">
        {children}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onButtonClick} 
          className="w-full bg-[#001e6c] hover:bg-blue-900 text-white"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}