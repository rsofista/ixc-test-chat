import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  socketConnectionStatus: "idle" as
    | "idle"
    | "connecting"
    | "connected"
    | "error",
};
// the magic happens in socketMiddleware.ts

export const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    connectSocket: (state, { payload }: PayloadAction<string>) => {
      state.socketConnectionStatus = "connecting";
    },
    sendSocketMessage: (
      state,
      { payload }: PayloadAction<{ userId: string; text: string }>
    ) => {},
  },
});

export const { connectSocket, sendSocketMessage } = socketSlice.actions;

export const socketReducer = socketSlice.reducer;
