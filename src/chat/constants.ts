export default {
  PRISMA: {
    CHAT_INCLUDE_USERS: {
      UserInChat: { select: { user: { include: { avatarFile: true } } } },
    },
  },
};
