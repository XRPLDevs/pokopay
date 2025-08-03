import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showFooter: boolean;
  setShowFooter: (show: boolean) => void;
  businessMode: 'payment' | 'invoice';
  setBusinessMode: (mode: 'payment' | 'invoice') => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('home');
  const [showFooter, setShowFooter] = useState(true);
  const [businessMode, setBusinessMode] = useState<'payment' | 'invoice'>('payment');

  return (
    <NavigationContext.Provider value={{
      activeTab,
      setActiveTab,
      showFooter,
      setShowFooter,
      businessMode,
      setBusinessMode
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
} 