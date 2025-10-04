'use client';

import { ReactNode, useEffect, useState } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase, type FirebaseServices } from '.';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<FirebaseServices | null>(null);

  useEffect(() => {
    // Initialize Firebase on the client side
    const firebaseServices = initializeFirebase();
    setServices(firebaseServices);
  }, []);

  if (!services) {
    // You can return a loader here if you want
    return null; 
  }

  return (
    <FirebaseProvider {...services}>
      {children}
    </FirebaseProvider>
  );
}
