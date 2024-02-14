import mongoose, { Schema } from "mongoose";

export const Message = mongoose.model(
  "Message",
  new Schema({
    text: String,
    date: Date,
    senderId: String,
    receiverId: String,
  })
);
