'use client';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

export type FirebaseServices = {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

let firebaseServices: FirebaseServices | null = null;

export function initializeFirebase(): FirebaseServices {
  if (firebaseServices) {
    return firebaseServices;
  }

  if (getApps().length === 0) {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    firebaseServices = { firebaseApp, auth, firestore };
  } else {
    const firebaseApp = getApps()[0];
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    firebaseServices = { firebaseApp, auth, firestore };
  }
  
  return firebaseServices;
}
