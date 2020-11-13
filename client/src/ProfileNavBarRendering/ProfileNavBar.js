import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "../Global/constants";

const Wrapper = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 10px;
  border-radius: 25px;

  &:hover {
    background-color: ${COLORS.hover};
  }
`;

const ListItems = styled.li``;

export const ProfileNavBar = ({ setDisplay }) => {
  return (
    <Wrapper>
      <ListItems>
        <StyledNavLink
          to="#"
          onClick={(e) => {
            e.preventDefault();
            setDisplay("Tweet");
          }}
        >
          Tweet
        </StyledNavLink>
      </ListItems>
      <li>
        <StyledNavLink
          to="#"
          onClick={(e) => {
            e.preventDefault();
            setDisplay("Media");
          }}
        >
          Media
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink
          to="#"
          onClick={(e) => {
            e.preventDefault();
            setDisplay("Likes");
          }}
        >
          Likes
        </StyledNavLink>
      </li>
    </Wrapper>
  );
};
