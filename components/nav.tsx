"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NavLink {
  href: string;
  label: string;
}

interface TrackingOption {
  value: string;
  label: string;
}

interface NavbarProps {
  links: NavLink[];
  trackingOptions?: TrackingOption[];
}

export default function Navbar({ links, trackingOptions = [] }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const pathname = usePathname();

  const hasTrackingOptions = trackingOptions.length > 0;

  return (
    <nav className="bg-[#001e6c] p-4">
      <div className="container mx-auto flex items-center">
        <Link href="/" className="flex items-center text-white">
          <svg
            className="h-8 w-8 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-bold text-xl">BlueTrax</span>
        </Link>
        <div className="flex items-center space-x-4 ml-8">
          {links.map((link) =>
            link.label.toLowerCase() === "tracking" && hasTrackingOptions ? (
              <Popover key={link.href} open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between text-white hover:bg-blue-900 hover:text-white"
                  >
                    {value
                      ? trackingOptions.find((option) => option.value === value)
                          ?.label
                      : "Tracking"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search tracking..." />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {trackingOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === option.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-white hover:bg-blue-900 px-3 py-2 rounded-md text-sm font-medium relative",
                  pathname === link.href &&
                    "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-white"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}