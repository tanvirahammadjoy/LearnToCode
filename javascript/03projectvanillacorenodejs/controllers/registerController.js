import { users } from "../db/users.js";

export function registerUser(username, password) {

  const user = {
    username,
    password
  };

  users.push(user);

  return user;
}