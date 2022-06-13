import { User } from "../store/type";

// @coach:user
export const setLocalUser = (user: User): void => {
  localStorage.setItem("@coach:user", JSON.stringify(user));
};
export const getLocalUser = (): User | null => {
  const localUser = localStorage.getItem("@coach:user");
  if (!localUser) return null;
  return JSON.parse(localUser);
};
// @coach:notes
export const setLocalNotes = (notes: string[]): void => {
  localStorage.setItem("@coach:notes", JSON.stringify(notes));
};
export const getLocalNotes = (): string[] => {
  const notes = localStorage.getItem("@coach:notes");
  if (!notes) return [];
  return JSON.parse(notes);
};
