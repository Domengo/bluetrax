"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const services = [
  {
    value: "services",
    label: "Services",
  },
  {
    value: "summary",
    label: "Summary",
  },
]

export default function Combo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-1/2 justify-between"
        >
          {value
            ? services.find((service) => service.value === value)?.label
            : "Select service..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-1/2 p-0 bg-gray-300 text-black">
        <Command>
          <CommandInput placeholder="Search service..." className="h-9" />
          <CommandList>
            <CommandEmpty>No service found.</CommandEmpty>
            <CommandGroup>
              {services.map((service) => (
                <CommandItem
                  key={service.value}
                  value={service.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {service.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === service.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
