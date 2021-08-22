let users = [];

export const addUser = (id, username) => {
  const user = {
    id,
    username,
  };

  users.push(user);
};

export const removeUser = (id) => {
  users = users.filter((aUser) => aUser.id !== id);
};

export const getCurrentUser = (id) => users.find((aUser) => aUser.id === id);
