import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Button, Container, Icon, Modal, Text } from "../../../components";
import {
  getLocalHideOnBoardingFeedback,
  setLocalHideOnboardingFeedback,
} from "../../../storage";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/auth";

export const FeedbackOnboardingModal = () => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
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
      <Container
        m="auto"
        maxWidth="600px"
        height="100%"
        flexDirection="column"
        width="100%"
        flex={1}
      >
        {step === 0 && (
          <Container mt="64px" flex={1} flexDirection="column">
            <Icon
              mb="32px"
              mx="auto"
              size={80}
              name="comments-outline"
              color={theme.colors.primary}
            />
            <Text mb="8px" fontWeight={600} value="Feedback" fontSize="24px" />
            <Text
              mb="32px"
              fontSize="14px"
              fontWeight={400}
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
                background={user.project?.primary_color + "21"}
              >
                <Icon
                  name="edit-file"
                  size={24}
                  color={user.project?.primary_color}
                />
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
                background={user.project?.primary_color + "21"}
              >
                <Icon
                  name="comments-outline"
                  size={24}
                  color={user.project?.primary_color}
                />
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
          <Container flex={1} flexDirection="column">
            <Icon
              mx="auto"
              mt="64px"
              mb="32px"
              name="arrow-growth"
              size={80}
              color={user.project?.primary_color}
            />
            <Text
              mb="8px"
              fontWeight={600}
              value="Indique apenas 1 área de melhoria de cada vez"
              fontSize="24px"
            />
            <Text
              mb="32px"
              fontSize="14px"
              fontWeight={400}
              value="Recomenda-se apresentar aos professores uma área de melhoria de cada vez, para permitir aos professores concentrarem a energia deles na mudança dessa área. O foco na mudança numa área torna mais provável que essa mudança aconteça e que o professor reconheça o valor das sessões de orientação pedagógica."
            />
          </Container>
        )}
        {step === 2 && (
          <Container flex={1} flexDirection="column">
            <Icon
              mx="auto"
              mt="64px"
              mb="32px"
              size={80}
              name="target"
              color={user.project?.primary_color}
            />
            <Text
              mb="8px"
              fontWeight={600}
              value="Seja específico e concreto no seu feedback"
              fontSize="24px"
            />
            <Text
              mb="32px"
              fontSize="14px"
              fontWeight={400}
              value="Quando os professores ouvem feedback vagos, do tipo “Tem de envolver mais os alunos”, é difícil saberem o que fazer de diferente. Em vez disso, refira-lhes acções específicas, como por exemplo: “Para envolver mais os alunos, tente fazer-lhes perguntas no final da leitura em voz alta”. Isto é um feedback útil porque é uma acção específica e concreta que o professor pode executar para mudar algo em termos pedagógicos."
            />
          </Container>
        )}
        {step === 3 && (
          <Container flex={1} flexDirection="column">
            <Icon
              mx="auto"
              mt="64px"
              mb="32px"
              size={80}
              name="social-distancing"
              color={user.project?.primary_color}
            />
            <Text
              mb="8px"
              fontWeight={600}
              value="Demonstrar e praticar na sessão de orientação"
              fontSize="24px"
            />
            <Text
              mb="24px"
              fontSize="14px"
              fontWeight={400}
              value="Na maior parte das vezes não é suficiente dizer a um professor o que pode mudar. É preciso também que vejam a mudança, e têm de experimentá-la por si próprios."
            />
            <Text
              mb="32px"
              fontSize="14px"
              fontWeight={400}
              value="Se introduzir a demonstração e prática como parte do seu feedback ao professor, os professores terão maior probabilidade de perceber o que está a propor melhorar e como deve proceder, tornando mais provável que venham a experimentar com a turma deles o que foi praticado durante a orientação."
            />
          </Container>
        )}
        {step < 3 ? (
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
