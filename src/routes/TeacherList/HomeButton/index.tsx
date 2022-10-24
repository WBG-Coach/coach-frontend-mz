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
      width="100%"
      onClick={onClick}
      alignItems="center"
      borderRadius="12px"
      background="#F4F5F5"
    >
      <Icon name={icon} size={20} mr="8px" />
      <Text fontSize={16} lineHeight={"20px"} fontWeight="500" value={value} />
      <Icon ml="auto" name="angle-right" size={24} mr="8px" />
    </Container>
  );
};
