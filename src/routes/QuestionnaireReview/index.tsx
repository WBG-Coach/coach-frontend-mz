import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Container, Text, TextArea } from "../../components";
import { QuestionnaireHeader } from "../Questionnaire/QuestionnaireHeader";
import { getLocalNotes, setLocalNotes } from "../../storage";

const QuestionnaireReview: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { index, applicationId, questionnaireId } = useParams<{
    index: string;
    applicationId: string;
    questionnaireId: string;
  }>();

  useEffect(() => {
    setNote(getLocalNotes()[parseInt(index || "0", 10)]);
  }, [index]);

  const sendQuestionnaire = async () => {
    console.log(applicationId);
    console.log(questionnaireId);
    const notes = getLocalNotes();
    setLocalNotes([...notes, note]);
    navigate(-1);
    setNote("");
  };

  return (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.title-review")} />
      {index === undefined ? (
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
      ) : (
        <>
          <Text mt="24px" fontWeight={500} fontSize="16px" value={note} />
        </>
      )}
    </Container>
  );
};

export default QuestionnaireReview;
