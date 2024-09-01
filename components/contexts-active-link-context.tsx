"'use client'"

import React, { createContext, useContext, useState } from "'react'"

type ActiveLinkContextType = {
  activeLink: string
  setActiveLink: (link: string) => void
}

const ActiveLinkContext = createContext<ActiveLinkContextType | undefined>(undefined)

export function ActiveLinkProvider({ children }: { children: React.ReactNode }) {
  const [activeLink, setActiveLink] = useState("'/dashboard'")

  return (
    <ActiveLinkContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </ActiveLinkContext.Provider>
  )
}

export function useActiveLink() {
  const context = useContext(ActiveLinkContext)
  if (context === undefined) {
    throw new Error("'useActiveLink must be used within an ActiveLinkProvider'")
  }
  return context
}