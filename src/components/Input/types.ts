import { SpaceProps } from "styled-system";

export type InputProps = {
  value?: string;
  icon?: "search";
  placeholder?: string;
  onChangeText: (text: string) => void;
} & SpaceProps;
