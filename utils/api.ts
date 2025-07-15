import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "authToken";

export const BASE_URL = "http://15.164.98.121:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically (runs every request)
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url} \nBearer ${token}`);
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Manually set token into axios & storage
export async function setAuthToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function initAuth() {
  const stored = await AsyncStorage.getItem(TOKEN_KEY);
  if (stored) {
    api.defaults.headers.common["Authorization"] = `Bearer ${stored}`;
  }
}

// ---------- Auth ----------
interface LoginParams {
  username: string;
  password: string;
}

export async function login({ username, password }: LoginParams) {
  const body = { name: username, password };
  const res = await api.post("/login", body);
  const token = res.data.accessToken;
  await setAuthToken(token);
  return res;
}

interface SignUpParams {
  username: string;
  password: string;
  role: string;
  level: string;
  age?: number;
  assets?: number;
  expectedAssets?: number;
}

export async function signUp({ username, password, role, level, age = 0, assets = 0, expectedAssets = 0 }: SignUpParams) {
  const body = {
    name: username,
    password,
    role,
    level,
    age,
    assets,
    expectedAssets,
  };
  return api.post("/signup", body);
}

// ---------- Quiz ----------
interface Quiz {
  id: number;
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: number;
  feedback?: string;
}

interface SubmitQuizBody {
  id: number;
  userAnswer: number;
}

export async function submitQuizAnswer(payload: SubmitQuizBody) {
  const res = await api.post("/quizs", payload);
  return res.data; // expected shape: { isCorrected: boolean, feedback: string, answer: number }
}

export async function fetchQuizzes(): Promise<Quiz[]> {
  const res = await api.get<Quiz[]>("/quizs");
  return res.data;
}

// Utility to retrieve token elsewhere if needed
export async function getStoredToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export { api }; 