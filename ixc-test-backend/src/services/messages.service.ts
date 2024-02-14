import { MessageCreateDTO } from "../dtos/messages.dtos";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";

const create = (senderId: String, dto: MessageCreateDTO) => {
  return Message.create({
    date: new Date(),
    senderId,
    receiverId: dto.userId,
    text: dto.text,
  });
};

// for now everyone is a contact
const userContactList = (userId: string) => {
  return User.find();
};

export const messagesService = { create, userContactList };
