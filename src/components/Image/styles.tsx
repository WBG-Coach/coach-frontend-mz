import styled, { css } from "styled-components";
import { border, borderRadius, size, space } from "styled-system";

export const StyledImage = styled.img<any>`
  ${size}
  ${space}
  ${border}
  ${borderRadius}
  ${(props) =>
    props.filter &&
    css`
      filter: ${props.filter};
    `}
`;
