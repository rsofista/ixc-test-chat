import mongoose, { Document, Schema } from "mongoose";

export type ModelUser = {
  _id: string;
  email: string;
  name: string;
  pass: string;
  img: string;
  usersLatestMessages: [
    {
      userId: string;
      name: string;
      img: string;
      message: string;
      read: boolean;
      date: Date;
    }
  ];
};

const userSchema = new Schema<ModelUser>({
  email: String,
  name: String,
  pass: String,
  img: String,
  usersLatestMessages: [
    {
      userId: String,
      name: String,
      img: String,
      message: String,
      read: Boolean,
      date: Date,
    },
  ],
});

export const User = mongoose.model<ModelUser>("User", userSchema);

export type UserLatestMessage = {
  userId: string;
  name: string;
  img: string;
  message: string;
  read: boolean;
  date: Date;
};
