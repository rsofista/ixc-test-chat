"use client";

import { useEffect } from "react";
import { ActiveConversation } from "../components/ActiveConversation";
import { ContactList } from "../components/ContactList";
import { UserInfo } from "../components/UserInfo";
import {
  setActiveContactByUserId,
  setContacts,
} from "../lib/slices/contactsSlice";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { connectSocket } from "../lib/slices/socketSlice";
import { MainContainer } from "../components/MainContainer";
import { getCookie } from "../lib/utils";
import { api } from "../lib/api";
import { setUser } from "../lib/slices/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Messages() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user) return;

    const token = getCookie("token");

    if (!token) return;

    api.setToken(token);
    api.users
      .currentUser()
      .then((res) => {
        dispatch(setUser(res.user));
        dispatch(connectSocket(token));

        api.users.contacts().then((res) => {
          dispatch(
            setContacts(
              res.map((c) => ({
                name: c.name,
                img: c.img,
                lastMessage: c.message,
                userId: c.userId,
                messageUserId: c.userId,
                isOnline: false,
              }))
            )
          );
        });
      })
      .catch(() => {
        router.push("/");
        toast("Você não está logado");
      });
  }, [dispatch, router, user]);

  return (
    <MainContainer size="lg">
      <div className="h-full grid grid-rows-[auto,1fr]">
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h1 className="text-xl font-semibold">Mensagens</h1>
          <div>
            <UserInfo />
          </div>
        </div>
        <div className="grid grid-cols-[auto,1fr]">
          <div onClick={() => dispatch(setActiveContactByUserId(""))}>
            <ContactList />
          </div>
          <ActiveConversation />
        </div>
      </div>
    </MainContainer>
  );
}
