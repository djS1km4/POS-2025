'use client';
import { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { BusinessContext, LogoShape } from '@/context/business-context';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo() {
  const context = useContext(BusinessContext);

  const logoShapeClasses: Record<LogoShape, string> = {
    square: 'rounded-none',
    rounded: 'rounded-sm',
    circle: 'rounded-full',
  };

  if (!context) {
    // This can happen during initial server render before the context provider is mounted.
    // Return a default logo.
    return (
        <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">CommerceFlow</span>
        </div>
    );
  }

  const { businessInfo } = context;
  const shapeClass = logoShapeClasses[businessInfo.logoShape || 'square'];
  const logoSize = businessInfo.logoSize || 24;
  const headlineFontSize = businessInfo.headlineFontSize || 20;

  return (
    <div className="flex items-center gap-2">
      {businessInfo.logo ? (
        <div 
          className={cn("overflow-hidden flex-shrink-0", shapeClass)}
          style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
        >
            <Image 
              src={businessInfo.logo} 
              alt={businessInfo.name} 
              width={logoSize} 
              height={logoSize} 
              className="h-full w-full object-cover" 
              style={{ transform: `scale(${businessInfo.logoZoom || 1})` }}
            />
        </div>
      ) : (
        <ShoppingCart 
          className="text-primary flex-shrink-0" 
          style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
        />
      )}
      <span 
        className="font-bold whitespace-nowrap"
        style={{ fontSize: `${headlineFontSize}px` }}
      >
        {businessInfo.name}
      </span>
    </div>
  );
}
