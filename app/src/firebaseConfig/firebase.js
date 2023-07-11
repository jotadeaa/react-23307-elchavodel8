// Importacion de node_modules
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

// Credenciales de firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);