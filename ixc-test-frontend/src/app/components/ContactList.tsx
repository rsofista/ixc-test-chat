"use client";

import { setActiveContactByUserId } from "../lib/slices/contactsSlice";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { UserPic } from "./UserPic";

export const ContactList = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userReducer.user?.userId);
  const contacts = useAppSelector((state) => state.contactsReducer.contacts);
  const activeContact = useAppSelector(
    (state) => state.contactsReducer.activeContact
  );

  return (
    <div className="grid grid-cols-1 p-2 gap-2">
      {contacts.map((cont) => (
        <div
          key={cont.userId}
          className={`grid grid-cols-[auto,auto] gap-2 cursor-pointer justify-start rounded-xl p-2 ${
            cont.userId === activeContact?.userId
              ? "bg-blue-200"
              : "bg-gray-200"
          }`}
          onClick={(e) => (
            e.stopPropagation(), dispatch(setActiveContactByUserId(cont.userId))
          )}
        >
          <UserPic src={cont.img} online={cont.isOnline} />

          <div>
            <h1>
              {cont.name} {cont.userId === userId && "(Você)"}
            </h1>
            <span className="block w-[300px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
              {cont.messageUserId === userId &&
                cont.lastMessage &&
                "Você enviou: "}
              {cont.lastMessage}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
