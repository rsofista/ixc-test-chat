import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Contact = {
  name: string;
  img: string;
  lastMessage: string;
  userId: string;
  messageUserId: string;
  isOnline: boolean;
};

const initialState = {
  activeContact: null as null | Contact,
  contacts: [] as Contact[],
};

export const contactsSlice = createSlice({
  name: "contactsSlice",
  initialState,
  reducers: {
    setContacts: (
      state,
      { payload }: PayloadAction<(typeof initialState)["contacts"]>
    ) => {
      state.contacts = payload;
    },
    setActiveContactByUserId: (state, { payload }: PayloadAction<string>) => {
      state.activeContact =
        state.contacts.find((c) => c.userId === payload) || null;
    },
    setLastContactMessage: (
      state,
      {
        payload,
      }: PayloadAction<{
        userId: string;
        lastMessage: string;
        messageUserId: string;
      }>
    ) => {
      state.contacts = state.contacts.map((c) =>
        c.userId !== payload.userId
          ? c
          : {
              ...c,
              lastMessage: payload.lastMessage,
              messageUserId: payload.messageUserId,
            }
      );
    },
  },
});

export const { setContacts, setActiveContactByUserId, setLastContactMessage } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
