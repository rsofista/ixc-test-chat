import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDTO } from "../types/dtos";

const initialState = {
  user: null as null | UserDTO,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDTO>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
