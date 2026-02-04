// __mocks__/prisma.js
export const PrismaClient = function() {
  return {
    user: {
      findMany: async () => [{ id: 1, name: 'Alice' }],
    },
  };
};