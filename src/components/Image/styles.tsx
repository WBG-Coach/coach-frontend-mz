import styled, { css } from "styled-components";
import { border, borderRadius, size, space } from "styled-system";

export const StyledImage = styled.img<any>`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
