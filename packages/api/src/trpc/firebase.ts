// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import dotenv from "dotenv";
import crypto from "crypto";


dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY as string,
    authDomain: process.env.AUTH_DOMAIN as string,
    projectId: process.env.PROJECT_ID as string,
    storageBucket: process.env.STORAGE_BUCKET as string,
    messagingSenderId: process.env.MESSAGING_SENDER_ID as string,
    appId: process.env.APP_ID as string,
    measurementId: process.env.MEASUREMENT_ID as string
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadImage = async(image:string) => {
    const [header, data] = image.split(',')
    const storageRef = ref(storage, `images/${crypto.randomBytes(16).toString("hex")}`);
    const snapshot = await uploadString(storageRef, data, 'base64');
    const link = await getDownloadURL(snapshot.ref);

    return link;
}


