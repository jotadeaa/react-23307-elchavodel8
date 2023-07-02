// Importacion de node_modules
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

// Credenciales de firebase
/*
    ATENCIÓN: Estas son las credenciales mías (Nicolás Díaz)
    que usé para razones de prueba y desarrollo.

    >>> allow read, write: if true;

    En el futuro se deberá modificar o conservar según la
    necesidad del grupo.
*/
const firebaseConfig = {
  apiKey: "AIzaSyAbtwtQZbuifD-XQaPncyikfuiwPZf8k3A",
  authDomain: "cac-23307-ndiaz.firebaseapp.com",
  projectId: "cac-23307-ndiaz",
  storageBucket: "cac-23307-ndiaz.appspot.com",
  messagingSenderId: "1074832897697",
  appId: "1:1074832897697:web:d691bf9e21b49989c6e2e0"
};

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);