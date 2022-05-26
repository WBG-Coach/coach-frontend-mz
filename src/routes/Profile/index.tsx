import React from "react";
import { Container, Footer, Text } from "../../components";

const Profile: React.FC<{}> = () => {
  return (
    <>
      <Container flex={1} flexDirection="column">
        <Text fontSize={32} mt={24}>
          Profile
        </Text>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
