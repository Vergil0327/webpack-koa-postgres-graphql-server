export default {
  Query: {
    user: (_, args) => ({ id: Math.floor(Math.random() * 10000), name: `${args.name}` }),
  },
};
