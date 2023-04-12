import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const database = getDatabase(app);