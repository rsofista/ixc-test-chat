import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import { contactsReducer } from "./slices/contactsSlice";
import { messagesReducer } from "./slices/messagesSlice";
import { socketReducer } from "./slices/socketSlice";
import { userReducer } from "./slices/userSlice";

export const makeAppStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      contactsReducer,
      messagesReducer,
      socketReducer,
    },
    middleware: (defaultMiddleware) =>
      defaultMiddleware().prepend(socketMiddleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeAppStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
