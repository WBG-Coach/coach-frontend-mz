import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Icon, Modal, Text } from "../../../components";
import {
  getLocalHideOnBoardingApplication,
  setLocalHideOnboardingApplication,
} from "../../../storage";

export const OnboardingApplicationModal = () => {
  const { t } = useTranslation();

  const [onboarding, setOnboarding] = useState(
    !getLocalHideOnBoardingApplication()
  );

  const closeOnboarding = () => {
    setLocalHideOnboardingApplication(true);
    setOnboarding(false);
  };

  return (
    <Modal
      isOpen={onboarding}
      onClose={closeOnboarding}
      title={t("ApplicationStatus.onboarding-modal-title")}
    >
      <Container
        mx="auto"
        mt={100}
        maxWidth="600px"
        alignItems="center"
        flexDirection="column"
      >
        <Text
          mb="12px"
          color="#000000"
          fontSize="24px"
          textAlign="center"
          fontWeight={600}
          value="Sessão de orientação"
        />
        <Text
          mb="32px"
          color="#191A1B"
          fontSize="14px"
          textAlign="center"
          value="Acompanhe a e documente a sessão de orientação e apoio ao professor. Cada sessão de orientação consiste em 4 partes fundamentais:"
        />

        <Container
          mb="24px"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Container
            mr="8px"
            width={40}
            height={40}
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
            background="#EBF1FF"
          >
            <Icon name="eye" size={24} color="#3373CC" />
          </Container>
          <Container flex={1} flexDirection="column">
            <Text
              mb="4px"
              color="#191A1B"
              fontWeight={600}
              fontSize="14px"
              value="Observação de toda a aula"
            />
            <Text
              color="#494B50"
              fontSize="12px"
              value="Observe o professor a leccionar a aula de acordo com o plano de aula e preencha a Ficha de Observação de Aulas."
            />
          </Container>
        </Container>

        <Container
          mb="24px"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Container
            mr="8px"
            width={40}
            height={40}
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
            background="#EBF1FF"
          >
            <Icon name="edit-file" size={24} color="#3373CC" />
          </Container>
          <Container flex={1} flexDirection="column">
            <Text
              mb="4px"
              color="#191A1B"
              fontWeight={600}
              fontSize="14px"
              value="Preparação do feedback"
            />
            <Text
              color="#494B50"
              fontSize="12px"
              value="Utilize o protocolo de orientação da competência selecionada e prepare-se para dar o feedback ao professor."
            />
          </Container>
        </Container>

        <Container
          mb="24px"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Container
            mr="8px"
            width={40}
            height={40}
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
            background="#EBF1FF"
          >
            <Icon name="comments-outline" size={24} color="#3373CC" />
          </Container>
          <Container flex={1} flexDirection="column">
            <Text
              mb="4px"
              color="#191A1B"
              fontWeight={600}
              fontSize="14px"
              value="Feedback"
            />
            <Text
              color="#494B50"
              fontSize="12px"
              value="Oriente o professor, de acordo com o que preparou, usando o protocolo de orientação para a competência selecionada."
            />
          </Container>
        </Container>

        <Container
          mb="24px"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Container
            mr="8px"
            width={40}
            height={40}
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
            background="#EBF1FF"
          >
            <Icon name="notes" size={24} color="#3373CC" />
          </Container>
          <Container flex={1} flexDirection="column">
            <Text
              mb="4px"
              color="#191A1B"
              fontWeight={600}
              fontSize="14px"
              value="Documentação"
            />
            <Text
              color="#494B50"
              fontSize="12px"
              value="Documente a sessão de orientação criando notas"
            />
          </Container>
        </Container>

        <Button
          mt="auto"
          mb="16px"
          width="100%"
          value="Continuar"
          onClick={closeOnboarding}
        />
      </Container>
    </Modal>
  );
};
