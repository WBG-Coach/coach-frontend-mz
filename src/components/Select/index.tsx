import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Container } from "../Container";
import { Icon } from "../Icon";
import { Text } from "../Text";
import {
  StyledErrorMessage,
  StyledInput,
  StyledInputContainer,
} from "./styles";
import { SelectProps } from "./types";

export const Select: React.FC<SelectProps> = ({
  value,
  data,
  modalTitle,
  errorMessage,
  onSelectItem,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const getItemValue = (item: any): string => {
    return item?.title || item?.name || item?.value;
  };

  useEffect(() => {
    setOpen(false);
  }, [value]);

  return (
    <Container flexDirection="column" {...props} onClick={() => setOpen(true)}>
      <StyledInputContainer hasError={errorMessage}>
        <StyledInput readOnly value={value} placeholder={value} />
        <Icon mr="8px" color="#494B50" size={24} name="chevron-bottom" />
      </StyledInputContainer>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}

      <BottomSheet open={open} onDismiss={() => setOpen(false)}>
        <Container p="16px" flexDirection="column">
          <Text value={modalTitle} mb="24px" fontSize="20px" fontWeight={500} />
          {data.map((item, index) => (
            <Container
              key={index}
              height="56px"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              onClick={() => onSelectItem(item)}
              borderBottom="1px solid #C7CAD1"
            >
              <Text
                value={getItemValue(item)}
                color={getItemValue(item) === value ? "primary" : "#000000"}
              />
              <Icon size={24} name="chevron-right" color="#C7CAD1" />
            </Container>
          ))}
        </Container>
      </BottomSheet>
    </Container>
  );
};
