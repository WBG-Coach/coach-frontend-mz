import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import {
  Button,
  Container,
  Icon,
  Image,
  Modal,
  Text,
} from "../../../components";
import OnboardingChecks from "../../../assets/images/onboarding-check.svg";
import {
  getLocalHideOnBoardingFeedback,
  setLocalHideOnboardingFeedback,
} from "../../../storage";

export const FeedbackOnboardingModal = () => {
  const { t } = useTranslation();
  const theme: any = useTheme();
  const [onboarding, setOnboarding] = useState(
    !getLocalHideOnBoardingFeedback()
  );
  const [step, setStep] = useState(0);

  const closeOnboarding = () => {
    setLocalHideOnboardingFeedback(true);
    setOnboarding(false);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <Modal isOpen={onboarding} onClose={closeOnboarding}>
      <Container flexDirection="column" width="100%" flex={1}>
        {step === 0 && (
          <Container
            flex={1}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <Icon
              mb="32px"
              size={80}
              name="comments-outline"
              color={theme.colors.primary}
            />
            <Text mb="8px" fontWeight={600} value="Feedback" fontSize="24px" />
            <Text
              mb="32px"
              fontSize="14px"
              fontWeight={400}
              textAlign="center"
              value="Agora que preencheu a ficha de observação, selecione uma competência pedagógica para focar o seu feedback ao professor."
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
                <Icon name="edit-file" size={24} color="#3373CC" />
              </Container>
              <Container flex={1} flexDirection="column">
                <Text
                  mb="4px"
                  color="#191A1B"
                  fontSize="14px"
                  fontWeight={600}
                  value="Prepare o feedback"
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
                  value="Oriente o professor"
                />
                <Text
                  color="#494B50"
                  fontSize="12px"
                  value="Oriente o professor, de acordo com o que preparou, usando o protocolo de orientação para a competência selecionada."
                />
              </Container>
            </Container>
          </Container>
        )}
        {step === 1 && (
          <Container
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={OnboardingChecks} width={168} mb="32px" />
            <Text
              mb="8px"
              fontWeight={600}
              textAlign="center"
              value="Indique apenas 1 área de melhoria de cada vez"
              fontSize="24px"
            />
            <Text
              mb="32px"
              fontSize="14px"
              fontWeight={400}
              textAlign="center"
              value="Recomenda-se apresentar aos professores uma área de melhoria de cada vez, para permitir aos professores concentrarem a energia deles na mudança dessa área. O foco na mudança numa área torna mais provável que essa mudança aconteça e que o professor reconheça o valor das sessões de orientação pedagógica."
            />
          </Container>
        )}
        {step === 2 && (
          <Container
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={OnboardingChecks} width={168} mb="32px" />
            <Text
              mb="8px"
              fontWeight={600}
              textAlign="center"
              value="Demonstrar e praticar na sessão de orientação"
              fontSize="24px"
            />
            <Text
              mb="32px"
              fontSize="14px"
              fontWeight={400}
              textAlign="center"
              value="Na maior parte das vezes não é suficiente dizer a um professor o que pode mudar. É preciso também que vejam a mudança, e têm de experimentá-la por si próprios. Se introduzir a demonstração e prática como parte do seu feedback ao professor, os professores terão maior probabilidade de perceber o que está a propor melhorar e como deve proceder, tornando mais provável que venham a experimentar com a turma deles o que foi praticado durante a orientação."
            />
          </Container>
        )}
        {step < 2 ? (
          <Button
            mb="16px"
            mt="auto"
            width="100%"
            onClick={nextStep}
            value={t("FeedbackList.continue")}
          />
        ) : (
          <Button
            mb="16px"
            mt="auto"
            width="100%"
            value={t("FeedbackList.finish")}
            onClick={closeOnboarding}
          />
        )}
      </Container>
    </Modal>
  );
};
