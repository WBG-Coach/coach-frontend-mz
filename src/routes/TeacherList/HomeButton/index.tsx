import { Container, Icon, Text } from "../../../components";

type Props = {
  icon: string;
  value: string;
  onClick: () => void;
};

export const HomeButton: React.FC<Props> = ({ icon, onClick, value }) => {
  return (
    <Container
      p="16px"
      // flex={1}
      minWidth="85px"
      onClick={onClick}
      alignItems="center"
      borderRadius="12px"
      flexDirection="column"
      justifyContent="center"
      background="#F4F5F5"
    >
      <Icon name={icon} size={24} mb="8px" />
      <Text fontSize={12} lineHeight={"16px"} value={value} />
    </Container>
  );
};
