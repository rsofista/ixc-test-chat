import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  messagesRec: {
    ["1"]: [
      {
        date: new Date().toISOString(),
        sent: true,
        text: "Como foi o equema hoje?",
      },
      {
        date: new Date().toISOString(),
        sent: true,
        text: "bem loko tu hein",
      },
      {
        date: new Date().toISOString(),
        sent: false,
        text: "home du céu tu não faz ideia do que rolou, só treta, carai",
      },
    ],
  } as Record<
    string,
    {
      text: string;
      sent: boolean;
      date: string;
    }[]
  >,
};

export const messagesSlice = createSlice({
  name: "messagesSlice",
  initialState,
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<(typeof initialState)["messagesRec"]>
    ) => {
      state.messagesRec = action.payload;
    },
    addMessage: (
      state,
      {
        payload,
      }: PayloadAction<{
        userId: string;
        text: string;
        sent: boolean;
      }>
    ) => {
      state.messagesRec[payload.userId] ||= [];
      state.messagesRec[payload.userId].push({
        date: new Date().toISOString(),
        sent: payload.sent,
        text: payload.text,
      });
      state.messagesRec = { ...state.messagesRec };
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
