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
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onButtonClick} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}