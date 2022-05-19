import styled from "styled-components";
import { color, fontSize, fontWeight, space } from "styled-system";

export const StyledText = styled.span<any>`
  font-family: "Montserrat", sans-serif;
  ${space}
  ${color}
  ${fontSize}
  ${fontWeight}
`;
