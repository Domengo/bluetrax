// "'use client'"

// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// interface AssetStatusCardProps {
//   title: string
//   children: React.ReactNode
//   buttonText: string
//   onButtonClick: () => void
// }

// export default function AssetStatusCard({ title, children, buttonText, onButtonClick }: AssetStatusCardProps) {
//   return (
//     <Card className=" flex flex-col bg-slate-100">
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold text-[#001e6c]">{title}</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-grow-0">
//         {children}
//       </CardContent>
//       <CardFooter>
//         <Button 
//           onClick={onButtonClick} 
//           className="w-full bg-[#001e6c] hover:bg-blue-900 text-white"
//         >
//           {buttonText}
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }
"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AssetStatusCardProps {
  title: string
  children: React.ReactNode
  buttonText?: string
  onButtonClick?: () => void
}

export default function AssetStatusCard({ title, children, buttonText, onButtonClick }: AssetStatusCardProps) {
  return (
    <Card className="flex flex-col bg-slate-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#001e6c]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
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

// Example usage
export function AssetStatusCardExample() {
  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {/* Card with button */}
      <AssetStatusCard
        title="Asset Status"
        buttonText="View Details"
        onButtonClick={() => console.log("Button clicked")}
      >
        <p>This is an asset status card with a button.</p>
      </AssetStatusCard>

      {/* Card without button */}
      <AssetStatusCard title="Asset Information">
        <p>This is an asset information card without a button.</p>
      </AssetStatusCard>
    </div>
  )
}