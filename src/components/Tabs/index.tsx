import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Container } from "../Container";
import { Text } from "../Text";

type Props = {
  data: string[];
  currentTab: number;
  onChange: (currentTab: number) => void;
};

export const Tabs: React.FC<Props> = ({ data, currentTab, onChange }) => {
  const user = useSelector(selectCurrentUser);

  return (
    <Container mb="16px">
      {data.map((tab, index) => (
        <Container
          flex={1}
          justifyContent="center"
          key={index}
          onClick={() => onChange(index)}
          pb="8px"
          borderBottom={
            index === currentTab
              ? `2px solid ${user.project?.primary_color}`
              : "1px solid #F4F5F5"
          }
        >
          <Text
            value={tab}
            lineHeight="20px"
            fontWeight={index === currentTab ? 500 : 400}
            color={
              index === currentTab ? user.project?.primary_color : "#49504C"
            }
          />
        </Container>
      ))}
    </Container>
  );
};
