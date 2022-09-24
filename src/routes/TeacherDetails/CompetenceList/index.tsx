import React from "react";
import { useDispatch } from "react-redux";
import { Container, Icon, ListItem } from "../../../components";
import { openGuide } from "../../../store/guide";
import { Answer } from "../../../store/type";

type Props = {
  data?: Answer[];
};

export const CompetenceList: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <Container flexDirection="column" borderBottom="1px solid #F0F2F5">
      <Container flexDirection="column">
        {data?.map(
          (answer, index) =>
            answer?.option?.question?.competence && (
              <ListItem
                key={index}
                title={answer?.option?.question?.competence.title}
                description={answer?.option?.question?.competence.subtitle}
                onClick={() => {
                  dispatch(
                    openGuide(
                      answer?.option?.question?.competence.content_guide_id
                    )
                  );
                }}
                leftContent={
                  <Container
                    width="24px"
                    height="24px"
                    alignItems="center"
                    borderRadius="24px"
                    justifyContent="center"
                    background={answer?.option?.selected_color}
                  >
                    <Icon
                      size={16}
                      color="#fff"
                      name={answer?.option?.selected_icon || ""}
                    />
                  </Container>
                }
              />
            )
        )}
      </Container>
    </Container>
  );
};
