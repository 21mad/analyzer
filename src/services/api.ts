import { TodoistApi } from "@doist/todoist-api-typescript";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "p-m-system-l0k5i2.firebaseapp.com",
  projectId: "p-m-system-l0k5i2",
  storageBucket: "p-m-system-l0k5i2.appspot.com",
  messagingSenderId: "1063877805909",
  appId: "1:1063877805909:web:8cc3e0c6c35d9d3e8d91dc",
};

// https://firebase.google.com/docs/web/setup#available-libraries
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const todoistApi = new TodoistApi(import.meta.env.TODOIST_API_KEY);

export const API = {
  getTasks: async () => {
    const tasks = await getDocs(collection(db, "tasks"));
    return tasks;
  }
}
