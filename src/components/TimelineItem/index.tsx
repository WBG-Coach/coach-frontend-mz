import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Button } from "../Button";
import { Icon } from "../Icon";
import {
  StyledTimelineIndicatorCircle,
  StyledTimelineIndicatorContainer,
  StyledTimelineIndicatorLine,
  StyledTimelineItemContainer,
  StyledTimelineItemDescription,
  StyledTimelineItemTextContainer,
  StyledTimelineItemTitle,
} from "./styles";

type Props = {
  title: string;
  isLast?: boolean;
  isFirst?: boolean;
  buttonValue: string;
  description: string;
  onClick: () => void;
  status: "complete" | "current" | "pending";
};

export const TimelineItem: React.FC<Props> = ({
  title,
  status,
  isLast,
  isFirst,
  onClick,
  buttonValue,
  description,
}) => {
  const user = useSelector(selectCurrentUser);

  const getStartLineColor = () => {
    if (isFirst) return "transparent";
    if (status === "pending") return "#ECEEED";
    return user.project?.primary_color || "";
  };

  const getEndLineColor = () => {
    if (isLast) return "transparent";
    if (status === "complete") return user.project?.primary_color || "";
    return "#ECEEED";
  };

  return (
    <StyledTimelineItemContainer
      onClick={() => status !== "pending" && onClick()}
    >
      <StyledTimelineIndicatorContainer>
        <StyledTimelineIndicatorLine
          height="25px"
          color={getStartLineColor()}
        />
        <StyledTimelineIndicatorCircle
          variant={status}
          color={user.project?.primary_color || ""}
        />
        <StyledTimelineIndicatorLine color={getEndLineColor()} />
      </StyledTimelineIndicatorContainer>
      <StyledTimelineItemTextContainer>
        <StyledTimelineItemTitle variant={status}>
          {title}
        </StyledTimelineItemTitle>
        {status === "current" && (
          <>
            <StyledTimelineItemDescription>
              {description}
            </StyledTimelineItemDescription>
            <Button onClick={onClick} value={buttonValue} />
          </>
        )}
      </StyledTimelineItemTextContainer>
      {status !== "pending" && (
        <Icon my="20px" size={24} color="#7D827F" name="chevron-right" />
      )}
    </StyledTimelineItemContainer>
  );
};
