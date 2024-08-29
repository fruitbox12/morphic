'use client'

import { createContext, useState, ReactNode, useContext } from 'react'

interface AppState {
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  plaidData: any;  // Add this to store Plaid data
  setPlaidData: (data: any) => void;  // Function to update Plaid data
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [plaidData, setPlaidData] = useState(null)  // Initialize Plaid data as null

  return (
    <AppStateContext.Provider value={{ isGenerating, setIsGenerating, plaidData, setPlaidData }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}
