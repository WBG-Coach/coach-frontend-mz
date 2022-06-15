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
// @coach:feedbacks
export const setLocalFeedbacks = (feedbacks: any[]): void => {
  localStorage.setItem("@coach:feedbacks", JSON.stringify(feedbacks));
};
export const getLocalFeedbacks = (): any[] => {
  const feedbacks = localStorage.getItem("@coach:feedbacks");
  if (!feedbacks) return [];
  return JSON.parse(feedbacks);
};

// @coach:hide-onboarding-application
export const setLocalHideOnboardingApplication = (
  onboarding: boolean
): void => {
  localStorage.setItem(
    "@coach:hide-onboarding-application",
    JSON.stringify(onboarding)
  );
};
export const getLocalHideOnBoardingApplication = (): boolean => {
  const onboarding = localStorage.getItem("@coach:hide-onboarding-application");
  if (!onboarding) return false;
  return JSON.parse(onboarding);
};
