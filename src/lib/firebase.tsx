import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration (could be switched to React env vars)
const firebaseConfig = {
  apiKey: 'AIzaSyBRczcO0vfAMr79Y4BDZa8imLsIcbj9mho',
  authDomain: 'tweetforme-c9003.firebaseapp.com',
  projectId: 'tweetforme-c9003',
  storageBucket: 'tweetforme-c9003.appspot.com',
  messagingSenderId: '9526308706',
  appId: '1:9526308706:web:760f6091cafda1b072863b'
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export const mapErrorCodeToUserFriendlyMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-email':
      return 'Invalid email or password.';
    default:
      return 'An unknown error occurred. Please try again later.';
  }
};
