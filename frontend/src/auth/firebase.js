import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB5rIkHrQjhZMd8l5wDPcGYaZYHXJsMR4c",
    authDomain: "codeask-f4773.firebaseapp.com",
    projectId: "codeask-f4773",
    storageBucket: "codeask-f4773.appspot.com",
    messagingSenderId: "1079818428137",
    appId: "1:1079818428137:web:70e2c2af1324034e451a78"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;