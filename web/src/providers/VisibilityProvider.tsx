import React, { Context, createContext, useContext, useState } from "react";
import { useNuiEvent } from "@/hooks/useNuiEvent";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null)

interface VisibilityProviderValue {
  setVisible: (visible: boolean) => void
  visible: boolean
}

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false)

  useNuiEvent<boolean>('setVisible', setVisible)

  return (
    <VisibilityCtx.Provider
      value={{
        visible,
        setVisible
      }}
    >
      <div className={`transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"} h-full dark`}>
        {children}
      </div>
    </VisibilityCtx.Provider>)
}

export const useVisibility = () => useContext<VisibilityProviderValue>(VisibilityCtx as Context<VisibilityProviderValue>)
