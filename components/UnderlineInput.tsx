// import React from "react";

// interface UnderlineInputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   icon?: React.ReactNode;
//   placeholder?: string;
//   onSearch?: () => void;
//   buttonText?: string;
// }

// export default function UnderlineInput({
//   icon,
//   placeholder,
//   onSearch,
//   buttonText = "Search",
//   ...props
// }: UnderlineInputProps) {
//   return (
//     <div className="relative flex items-center">
//       {icon && (
//         <div className="absolute left-0 flex items-center pl-3 pointer-events-none text-blue-700">
//           {icon}
//         </div>
//       )}
//       <input
//         type="text"
//         className={`w-3/4 py-2 bg-transparent border-b border-[#001e6c] focus:border-primary focus:outline-none transition-colors ${
//           icon ? "pl-10" : "pl-0"
//         } pr-24 text-sm placeholder-gray-400`}
//         placeholder={placeholder}
//         {...props}
//       />
//       <button
//         className="absolute right-0 px-3 py-1 text-sm text-white bg-[#001e6c] hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md transition-colors"
//         onClick={onSearch}
//         aria-label={buttonText}
//       >
//         <span className="flex items-center">
//           {/* <Search className="w-4 h-4 mr-1" /> */}
//           {buttonText}
//         </span>
//       </button>
//     </div>
//   );
// }

import React, { useRef, useEffect, useState } from "react"
import { Search } from "lucide-react"

interface UnderlineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  placeholder?: string
  onSearch?: () => void
  buttonText?: string
}

export default function UnderlineInput({ icon, placeholder, onSearch, buttonText = "Search", ...props }: UnderlineInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputWidth, setInputWidth] = useState("50%")

  useEffect(() => {
    if (inputRef.current && placeholder) {
      const textWidth = getTextWidth(placeholder, getComputedStyle(inputRef.current).font)
      setInputWidth(`max(50%, ${textWidth + 40}px)`)
    }
  }, [placeholder])

  function getTextWidth(text: string, font: string) {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (context) {
      context.font = font
      return context.measureText(text).width
    }
    return 0
  }

  return (
    <div className="flex items-center">
      <div className="relative" style={{ width: inputWidth }}>
        {icon && (
          <div className="absolute left-0 flex items-start pl-3 pointer-events-none text-[#001e6c]">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          className={`w-full py-2 bg-transparent border-b border-[#001e6c] focus:border-primary focus:outline-none transition-colors ${
            icon ? 'pl-10' : 'pl-0'
          } pr-3 text-sm placeholder-gray-400`}
          placeholder={placeholder}
          {...props}
        />
      </div>
      <button
        className="ml-2 px-3 py-1 text-sm text-white bg-[#001e6c] hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md transition-colors"
        onClick={onSearch}
        aria-label={buttonText}
      >
        <span className="flex items-center">
          {/* <Search className="w-4 h-4 mr-1" /> */}
          {buttonText}
        </span>
      </button>
    </div>
  )
}
