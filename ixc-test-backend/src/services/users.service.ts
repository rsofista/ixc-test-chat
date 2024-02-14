import { UserCreateDTO } from "../dtos/users.dtos";
import { ModelUser, User, UserLatestMessage } from "../models/user.model";

const userToExpressUser = (user: ModelUser): Express.User => {
  return {
    email: user.email,
    name: user.name,
    userId: user._id.toString(),
    img: user.img,
  };
};

const findByEmail = (email: string) => {
  return User.findOne({ email });
};

const exists = (email: string) => {
  return User.exists({ email });
};

const create = (dto: UserCreateDTO) => {
  return User.create({
    email: dto.email,
    name: dto.name,
    pass: dto.pass,
    img: dto.img,
  });
};

// for now everyone is a contact
const userContactList = async (userId: string) => {
  const allUsers = await User.find();

  const user = allUsers.find((u) => u._id.toString() === userId);

  if (!user) throw new Error("Calamidade, usuário logado sumiu...");

  const usersNotContactedYet = allUsers.filter(
    (u) =>
      u._id !== user._id &&
      !user.usersLatestMessages.find(
        (latestMessage) => latestMessage.userId === u._id.toString()
      )
  );

  return [
    ...user.usersLatestMessages,
    ...usersNotContactedYet.map((u) => ({
      userId: u._id,
      name: u.name,
      img: u.img,
    })),
  ];
};

const pushLatestMessage = async (
  userId: string,
  message: UserLatestMessage
) => {
  await User.updateMany(
    { _id: { $in: [userId, message.userId] } },
    {
      $pull: {
        usersLatestMessages: { userId: { $in: [userId, message.userId] } },
      },
    }
  );

  await User.updateMany(
    { _id: { $in: [userId, message.userId] } },
    {
      $push: { usersLatestMessages: message },
    }
  );
};

export const usersService = {
  create,
  userContactList,
  findByEmail,
  exists,
  pushLatestMessage,
  userToExpressUser,
};
