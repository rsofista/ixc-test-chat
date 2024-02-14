import Axios, { AxiosRequestConfig } from "axios";
import { UserDTO } from "./types/dtos";

const axios = Axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://[::1]:3001",
});

const post = async <T>(
  path: string,
  body: any,
  config?: AxiosRequestConfig<any>
) => {
  try {
    const res = await axios.post<T>(path, body, config);

    return res.data;
  } catch (err) {
    if (Axios.isAxiosError(err)) {
      throw err.response?.data;
    }

    throw err;
  }
};

const get = async <T>(path: string) => {
  try {
    const res = await axios.get<T>(path);

    return res.data;
  } catch (err) {
    if (Axios.isAxiosError(err)) {
      throw err.response?.data;
    }

    throw err;
  }
};

export const api = {
  setToken: (token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  auth: {
    login: (body: { email: string; pass: string }) =>
      post<{ user: UserDTO; token: string }>("/auth/login", body),
  },
  users: {
    currentUser: () => get<{ user: UserDTO }>("/users/current-user"),
    create: (body: { email: string; pass: string; name: string }) =>
      post<{ user: UserDTO; token: string }>("/users/create", body),
    contacts: () =>
      get<
        {
          userId: string;
          name: string;
          img: string;
          message: string;
          read: boolean;
          date: string;
        }[]
      >("/users/contacts"),
  },
  messages: {},
};
