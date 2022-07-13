import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, LoadingDots, Icon } from "..";
import { useGetContentGuideMutation } from "../../service";
import { closeGuide } from "../../store/guide";

const GuideContent: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const [getContentGuide, { data, isLoading }] = useGetContentGuideMutation();

  useEffect(() => {
    getContentGuide(id);
  }, [id, getContentGuide]);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
      <Container mb="8px" flexDirection="row" p="16px 0">
        <Container ml="auto" onClick={() => dispatch(closeGuide())}>
          <Icon name="close" size={24} />
        </Container>
      </Container>
      <div dangerouslySetInnerHTML={{ __html: data?.text || "" }}></div>
    </Container>
  );
};

export default GuideContent;
