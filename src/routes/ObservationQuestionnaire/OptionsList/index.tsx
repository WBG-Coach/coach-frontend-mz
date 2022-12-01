import React, { useEffect, useState } from "react";
import { Container, Icon, OptionButton, Text } from "../../../components";
import { Input } from "../../../components/Input";
import { Option } from "../../../store/type";

type Props = {
  type: string;
  options: Option[];
  selectedOptionId?: number;
  onClick: (optionId: number) => void;
};

export const OptionsList: React.FC<Props> = ({
  type,
  options,
  selectedOptionId,
  onClick,
}) => {
  const [filtedOptions, setFiltedOptions] = useState(options);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setFiltedOptions(
          options.filter(
            (option, index) =>
              (index + 1).toString() === filter ||
              option.text
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())
          )
        ),
      500
    );
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return type === "LIST" ? (
    <Container flexDirection="column">
      <Input
        mb="16px"
        icon="search"
        value={filter}
        placeholder="Find"
        onChangeText={setFilter}
      />

      {filtedOptions.map((option, index) => (
        <Container
          py="16px"
          key={index}
          alignItems="center"
          onClick={() => onClick(option.id)}
          borderBottom="1px solid #F0F2F5"
        >
          <Container
            mr="4px"
            width="32px"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              value={(options.indexOf(option) + 1).toString()}
              color="#94979E"
              fontSize="16px"
            />
          </Container>
          <Text value={option.text} />
          <Icon size={24} name="chevron-right" color="#94979E" />
        </Container>
      ))}
    </Container>
  ) : filtedOptions.length <= 5 ? (
    <Container flexDirection="column">
      {filtedOptions.map((option) => (
        <OptionButton
          key={option.id}
          mb="16px"
          textAlign="left"
          variant="secondary"
          value={option.text}
          selectedColor={option.selected_color}
          onClick={() => onClick(option.id)}
          selectedIcon={option.selected_icon as any}
          isSelected={selectedOptionId === option.id}
        />
      ))}
    </Container>
  ) : (
    <Container flexDirection="column">
      <Container gridGap="16px">
        {filtedOptions.slice(0, 5).map((option) => (
          <OptionButton
            key={option.id}
            mb="16px"
            justifyContent="center"
            variant="secondary"
            value={option.text}
            selectedColor={option.selected_color}
            onClick={() => onClick(option.id)}
            selectedIcon={option.selected_icon as any}
            isSelected={selectedOptionId === option.id}
          />
        ))}
      </Container>
      <Container gridGap="16px">
        {filtedOptions.slice(5).map((option) => (
          <OptionButton
            key={option.id}
            mb="16px"
            justifyContent="center"
            variant="secondary"
            value={option.text}
            selectedColor={option.selected_color}
            onClick={() => onClick(option.id)}
            selectedIcon={option.selected_icon as any}
            isSelected={selectedOptionId === option.id}
          />
        ))}
      </Container>
    </Container>
  );
};
