// "use client"

// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// interface AssetStatusCardProps {
//   title: string
//   children: React.ReactNode
//   buttonText?: string
//   onButtonClick?: () => void
// }

// export default function AssetStatusCard({ title, children, buttonText, onButtonClick, ...props }: AssetStatusCardProps) {
//   return (
//     <Card className="flex flex-col bg-slate-100">
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold text-[#001e6c]">{title}</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-grow overflow-auto">
//         {children} 
//       </CardContent>
//       {buttonText && onButtonClick && (
//         <CardFooter >
//           <Button 
//             onClick={onButtonClick} 
//             className="w-full  bg-[#001e6c] hover:bg-blue-900 text-white"
//           >
//             {buttonText}
//           </Button>
//         </CardFooter>
//       )}
//     </Card>
//   )
// }
"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AssetStatusCardProps {
  title: string
  children: React.ReactNode
  buttonText?: string
  onButtonClick?: () => void
  className?: string
}

export default function AssetStatusCard({ 
  title, 
  children, 
  buttonText, 
  onButtonClick, 
  className,
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
        <CardFooter>
          <Button 
            onClick={onButtonClick} 
            className="w-full bg-[#001e6c] hover:bg-blue-900 text-white"
          >
            {buttonText}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}