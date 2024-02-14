"use client";
/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "../lib/store";
import { UserPic } from "./UserPic";

export const UserInfo = () => {
  const user = useAppSelector((state) => state.userReducer.user);

  return (
    <div className="flex gap-2">
      <div>
        <h1 className="text-xl text-right">{user?.name || "-"}</h1>
        <h3 className="text-sm opacity-75">{user?.email || "-"}</h3>
      </div>
      <UserPic src={user?.img || ""} />
    </div>
  );
};
