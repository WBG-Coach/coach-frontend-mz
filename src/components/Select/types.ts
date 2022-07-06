import { SpaceProps } from "styled-system";

export type SelectProps = {
  data: any[];
  value: string;
  modalTitle: string;
  errorMessage?: string;
  onSelectItem: (item: any) => void;
} & SpaceProps;
