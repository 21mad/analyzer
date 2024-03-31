import { Task, TodoistApi } from "@doist/todoist-api-typescript";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const API_KEY = import.meta.env.FIREBASE_API_KEY;
const TODOIST_API_KEY = import.meta.env.VITE_TODOIST_API_KEY;

export const todoistApi = new TodoistApi(TODOIST_API_KEY);

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "p-m-system-l0k5i2.firebaseapp.com",
  projectId: "p-m-system-l0k5i2",
  storageBucket: "p-m-system-l0k5i2.appspot.com",
  messagingSenderId: "1063877805909",
  appId: "1:1063877805909:web:8cc3e0c6c35d9d3e8d91dc",
};

// https://firebase.google.com/docs/web/setup#available-libraries
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tasksRef = collection(db, "tasks");

export const API = {
  getTasks: async (): Promise<Task[]> => {
    const tasks = (await getDocs(tasksRef)).docs.map((doc) => {
      const data = doc.data() as Task;
      const transformed = Object.fromEntries(
        Object.entries(data).sort((a, b) => a[0].localeCompare(b[0]))
      );
      return { id: doc.id, ...transformed };
    }) as Task[];
    return tasks;
  },

  addTask: async (task: Task) => {
    const taskRef = doc(db, "tasks", task.id);
    const result = setDoc(taskRef, task);
    return result;
  },
  updateTask: async (taskId: string, task: Task): Promise<any> => {
    const taskRef = doc(db, "tasks", taskId);
    const result = await setDoc(taskRef, task);
    return result;
  },
  clearTasks: async () => {
    const docs = await getDocs(tasksRef);
    docs.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  },
};
