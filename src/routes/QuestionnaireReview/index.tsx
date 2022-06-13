import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Container, FabButton, Text, TextArea } from "../../components";
import { QuestionnaireHeader } from "../Questionnaire/QuestionnaireHeader";

const QuestionnaireReview: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const { applicationId, questionnaireId } = useParams<{
    applicationId: string;
    questionnaireId: string;
  }>();

  const sendQuestionnaire = () => {
    console.log(applicationId);
    console.log(questionnaireId);
    console.log(notes);
    if (!!note) setNotes([...notes, note]);
    setNote("");
    setStep(0);
  };

  return (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.title-review")} />
      {step === 0 ? (
        <>
          <Container
            mt="32px"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {notes.map((currentNote) => (
              <Container
                p="12px"
                mb="24px"
                borderRadius="12px"
                width="calc(50% - 32px)"
                border="1px solid #E3E5E8"
              >
                <Text value={currentNote} />
              </Container>
            ))}
          </Container>
          <FabButton
            icon="plus"
            onClick={() => setStep(1)}
            position="fixed"
            bottom="16px"
            right="16px"
          />
        </>
      ) : (
        <>
          <TextArea onChangeText={setNote} />
          <Container
            left="0"
            right="0"
            bottom="0"
            p="24px 16px"
            position="absolute"
          >
            <Button
              mt={3}
              width="100%"
              isDisabled={!note}
              onClick={() => sendQuestionnaire()}
              value={t("Questionnaire.save")}
            />
          </Container>
        </>
      )}
    </Container>
  );
};

export default QuestionnaireReview;
