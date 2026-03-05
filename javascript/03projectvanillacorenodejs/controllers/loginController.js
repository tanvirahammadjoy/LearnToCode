import { users } from "../db/users.js";

export function loginUser(username, password) {
  return users.find(
    (user) => user.username === username && user.password === password,
  );
}
