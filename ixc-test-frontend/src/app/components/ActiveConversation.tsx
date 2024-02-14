"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { UserPic } from "./UserPic";

import io from "socket.io-client";
import { addMessage } from "../lib/slices/messagesSlice";
import { sendSocketMessage } from "../lib/slices/socketSlice";

export const ActiveConversation = () => {
  const dispatch = useAppDispatch();
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  const activeContact = useAppSelector(
    (state) => state.contactsReducer.activeContact
  );

  const messagesRec = useAppSelector(
    (state) => state.messagesReducer.messagesRec
  );

  const messages = activeContact?.userId
    ? messagesRec[activeContact?.userId]
    : [];

  const sendMessage = () => {
    if (!activeContact || !refTextarea.current) return;

    dispatch(
      sendSocketMessage({
        userId: activeContact.userId,
        text: refTextarea.current.value || "",
      })
    );
    refTextarea.current.value = "";
  };

  // useEffect(() => {
  //   const socket = io(":3001");

  //   socket.on("message", (msg) => {
  //     console.log(msg);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <div className="bg-gray-200 h-full rounded-br-3xl">
      {!activeContact ? (
        <h1 className="text-center mt-10">
          Clique em algum contato a esquerda para abrir a conversa
        </h1>
      ) : (
        <div className="grid grid-rows-[auto,1fr,auto] h-full pt-px pl-px">
          <div className="flex gap-4 bg-white p-2">
            <UserPic src={activeContact.img} />
            <div>
              <h1>{activeContact.name}</h1>
              <div
                title={activeContact.isOnline ? "Online" : "Offline"}
                className={`h-3 w-3 rounded-full inline-block mr-2 ${
                  activeContact.isOnline ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span>{activeContact.isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
          <div className="flex flex-col mx-4 overflow-scroll gap-2 pt-2">
            {messages?.map((msg, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 ${
                  msg.sent
                    ? "bg-blue-500 text-white self-end"
                    : "bg-white text-black self-start"
                }`}
              >
                {msg.text.split("\n").map((text, i) => (
                  <span className="block" key={i}>
                    {text}
                  </span>
                ))}
                <div className="w-full text-right">
                  <span className="text-sm opacity-50">{"hoje 05:45"}</span>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => (e.preventDefault(), sendMessage())}
            className="bg-white rounded-md border border-gray-300 grid grid-cols-[1fr,auto] p-2 mx-4 mb-4 focus-within:border-blue-400"
          >
            <textarea
              ref={refTextarea}
              rows={3}
              autoFocus
              className="resize-none rounded-md focus:outline-none"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), sendMessage())
              }
            />
            <div className="flex items-end">
              <button type="submit">Enviar {"->"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
