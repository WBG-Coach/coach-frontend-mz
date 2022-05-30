import { User } from "../store/type";

const ITEMS = {
  user: "@coach/user",
};

export const getLocalUser = (): User => {
  const user = localStorage.getItem(ITEMS.user);
  if (!user) return {};

  return JSON.parse(user);
};

export const setLocalUser = (user: User): void => {
  localStorage.setItem(ITEMS.user, JSON.stringify(user));
};
