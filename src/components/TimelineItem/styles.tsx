import styled, { css } from "styled-components";
const TitleVariants = {
  complete: css`
    color: #49504c;
  `,
  current: css`
    color: #000000;
  `,
  pending: css`
    color: #7d827f;
  `,
};
const CircleVariants = {
  complete: (color: string) => css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${color};
  `,
  current: (color: string) => css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 4px solid ${color};
  `,
  pending: () => css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #eceeed;
  `,
};

export const StyledTimelineItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 64px;
  align-items: stretch;
`;

export const StyledTimelineIndicatorContainer = styled.div`
  display: flex;
  width: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledTimelineIndicatorLine = styled.div<{
  color: string;
  height?: string;
}>`
  width: 2px;
  ${(props) =>
    props.height
      ? css`
          height: ${props.height};
        `
      : css`
          flex: 1;
        `}
  background-color: ${(props) => props.color};
`;

export const StyledTimelineIndicatorCircle = styled.div<{
  variant: "complete" | "current" | "pending";
  color: string;
}>`
  ${(props) => CircleVariants[props.variant](props.color)}
`;

export const StyledTimelineItemTextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 8px 0 16px;
`;

export const StyledTimelineItemTitle = styled.div<{
  variant: "complete" | "current" | "pending";
}>`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin: 20px 0;
  ${(props) => TitleVariants[props.variant]};
`;

export const StyledTimelineItemDescription = styled.div`
  margin-bottom: 8px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #49504c;
`;
