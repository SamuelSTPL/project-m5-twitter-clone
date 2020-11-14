import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { u1F63F } from "react-icons-kit/noto_emoji_regular/u1F63F";
import { COLORS } from "./Global/constants";

export const ErrorPage = () => {
  return (
    <ErrorDiv>
      <ErrorIcon>
        <Icon icon={u1F63F} size={130} />
      </ErrorIcon>
      <h1>An error has occurred</h1>
      <p>Please refresh the page</p>
    </ErrorDiv>
  );
};

const ErrorDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.7rem;
`;

const ErrorIcon = styled.span`
  color: ${COLORS.primary};
`;
