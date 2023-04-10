import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCo3-r9mEG2-6L09JBIUe-5CjUwSZTaYQM",
  authDomain: "doan2023-fc2b1.firebaseapp.com",
  projectId: "doan2023-fc2b1",
  storageBucket: "doan2023-fc2b1.appspot.com",
  messagingSenderId: "56249144199",
  appId: "1:56249144199:web:16de0f9d24cf0fd5d1b922",
  measurementId: "G-NFTLB7HYHS",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
