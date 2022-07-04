import React from "react";
import { Container } from "../Container";
import { Icon } from "../Icon";
import { Image } from "../Image";
import { Text } from "../Text";
import ListItemProps from "./types";

export const ListItem: React.FC<ListItemProps> = ({
  description,
  imageUrl,
  onClick,
  title,
  children,
  leftContent,
  rigthContent,
}) => {
  return (
    <Container
      p="16px 0"
      width="100%"
      onClick={onClick}
      alignItems="center"
      borderBottom={"1px solid #F0F2F5"}
    >
      {imageUrl ? (
        <Image
          width={48}
          height={48}
          src={imageUrl}
          borderRadius="50%"
          border="1px solid #E3E5E8"
        />
      ) : (
        <Container
          width={48}
          height={48}
          borderRadius={24}
          background="#F0F2F5"
        >
          <Icon name="school" size={24} />
        </Container>
      )}

      {leftContent}

      <Container
        ml="8px"
        flex={1}
        flexDirection="column"
        justifyContent="space-between"
      >
        <Text
          mb="4px"
          fontSize="16px"
          fontWeight={600}
          lineHeight="24px"
          color="#000000"
          value={title}
        />
        <Text
          fontSize="14px"
          fontWeight={400}
          lineHeight="18px"
          color="#494B50"
          value={description}
        />
        {children}
      </Container>
      {rigthContent || <Icon size={24} name="chevron-right" color="#94979E" />}
    </Container>
  );
};
