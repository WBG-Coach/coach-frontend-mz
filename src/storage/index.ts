import { User } from "../store/type";

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

// @coach:user
export const setLocalUser = (user: User): void => {
  localStorage.setItem("@coach:user", JSON.stringify(user));
};
export const getLocalUser = (): User | null => {
  const localUser = localStorage.getItem("@coach:user");
  if (!localUser) return null;
  return JSON.parse(localUser);
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

// @coach:hide-onboarding-feedback
export const setLocalHideOnboardingFeedback = (onboarding: boolean): void => {
  localStorage.setItem(
    "@coach:hide-onboarding-feedback",
    JSON.stringify(onboarding)
  );
};
export const getLocalHideOnBoardingFeedback = (): boolean => {
  const onboarding = localStorage.getItem("@coach:hide-onboarding-feedback");
  if (!onboarding) return false;
  return JSON.parse(onboarding);
};
