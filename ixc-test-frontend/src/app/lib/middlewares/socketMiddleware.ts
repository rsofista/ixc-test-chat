import { Middleware } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { connectSocket, sendSocketMessage } from "../slices/socketSlice";
import { addMessage } from "../slices/messagesSlice";
import { AppDispatch, AppStore, useAppDispatch } from "../store";
import { setLastContactMessage } from "../slices/contactsSlice";

export const socketMiddleware: Middleware = (store) => {
  let socket: ReturnType<typeof io> | undefined;

  return (next) => (action) => {
    if (connectSocket.match(action)) {
      if (!socket) {
        console.log("io()");
        socket = io(":3001", {
          query: {
            token: action.payload,
          },
        });

        socket.on(
          "server-message",
          (res: { userId: string; msg: { userId: string; text: string } }) => {
            const state: ReturnType<AppStore["getState"]> = store.getState();
            const userId = state.userReducer.user?.userId;

            // it's someone else's message
            if (userId !== res.userId && userId !== res.msg.userId) return;

            store.dispatch(
              addMessage({
                userId: res.userId === userId ? res.msg.userId : res.userId,
                sent: res.msg.userId !== userId,
                text: res.msg.text,
              })
            );

            store.dispatch(
              setLastContactMessage({
                userId: res.userId === userId ? res.msg.userId : res.userId,
                lastMessage: res.msg.text,
                messageUserId: res.userId,
              })
            );
          }
        );
      }
    }

    if (socket) {
      if (sendSocketMessage.match(action)) {
        socket.emit("message", action.payload);
      }
    }

    next(action);
  };
};
