'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';

export type LogoShape = 'square' | 'rounded' | 'circle';

type BusinessInfo = {
  name: string;
  address: string;
  logo: string | null;
  logoZoom?: number;
  logoShape?: LogoShape;
  logoSize?: number;
  headlineFontSize?: number;
};

type BusinessContextType = {
  businessInfo: BusinessInfo;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
};

export const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

const initialBusinessInfo: BusinessInfo = {
    name: 'CommerceFlow',
    address: 'Calle Falsa 123, Springfield',
    logo: null,
    logoZoom: 1,
    logoShape: 'square',
    logoSize: 24, // Default size in pixels
    headlineFontSize: 20, // Default headline font size
};


export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(initialBusinessInfo);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedInfo = localStorage.getItem('businessInfo');
      if (storedInfo) {
        const parsedInfo = JSON.parse(storedInfo);
        // Ensure defaults if not present
        if (!parsedInfo.logoZoom) parsedInfo.logoZoom = 1;
        if (!parsedInfo.logoShape) parsedInfo.logoShape = 'square';
        if (!parsedInfo.logoSize) parsedInfo.logoSize = 24;
        if (!parsedInfo.headlineFontSize) parsedInfo.headlineFontSize = 20;
        
        setBusinessInfo(parsedInfo);
      }
    } catch (error) {
      console.error("Failed to parse business info from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('businessInfo', JSON.stringify(businessInfo));
      } catch (error) {
          console.error("Failed to save business info to localStorage", error);
      }
    }
  }, [businessInfo, isInitialized]);


  return (
    <BusinessContext.Provider value={{ businessInfo, setBusinessInfo }}>
      {children}
    </BusinessContext.Provider>
  );
};
