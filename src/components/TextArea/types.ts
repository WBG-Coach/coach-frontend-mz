import { SpaceProps } from "styled-system";

export type TextAreaProps = {
  value?: string;
  onLoadFile: (file: any) => void;
  onChangeText: (text: string) => void;
} & SpaceProps;
