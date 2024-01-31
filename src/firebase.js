import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCqhROGGCHnImjDXBCuWsZcTdBWP6a-BTk",
	authDomain: "emotion-diary-f833f.firebaseapp.com",
	projectId: "emotion-diary-f833f",
	storageBucket: "emotion-diary-f833f.appspot.com",
	messagingSenderId: "468376112215",
	appId: "1:468376112215:web:fab61b2cc0d7f3cb482712",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
