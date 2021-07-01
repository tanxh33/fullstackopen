import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import colors from './colors';

export const Nav = styled.nav`
  background: ${colors.white};
  padding: 1rem;
`;

export const NavBrand = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.primary};
  text-decoration: none;
`;

export const NavItems = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavItem = styled(Link)`
  cursor: pointer;
  color: ${colors.primary};
  text-decoration: none;
  transition: 150ms;

  :hover {
    color: ${colors.secondary};
  }
`;

export const NavStatus = styled.span`
  font-size: 14px;
  color: ${colors.black};
  ${(props) => props.push && css`
    margin-left: auto;
  `}
  
`;

export const NavItemButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  border: 2px solid ${colors.black};
  font-size: 14px;
  transition: 150ms;
  cursor: pointer;

  &:hover {
    background: ${colors.black};
    color: ${colors.white};
  }

  /* This applies when we pass in "primary" as a prop */
  ${(props) => props.primary && css`
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    color: ${colors.white};
    :hover {
      background-color: ${colors.white};
      color: ${colors.primary};
    }
  `}
`;
