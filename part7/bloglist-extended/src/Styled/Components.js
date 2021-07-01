import styled, { css } from 'styled-components';
import colors from './colors';

export const Container = styled.div`
  margin: 0 auto;
  padding: 1rem 0;
  max-width: 90vw;
`;

export const Button = styled.button`
  margin: 0.25rem 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  border: 2px solid ${colors.black};
  background: none;
  font-size: 14px;
  transition: 150ms;

  :hover {
    background: #ccc;
    cursor: pointer;
  }

  ${(props) => props.primary && css`
    border-color: ${colors.primary};
    color: ${colors.primary};
    :hover {
      background: #c9d4f6;
    }
  `}

  ${(props) => props.danger && css`
    border-color: ${colors.danger};
    color: ${colors.danger};
    :hover {
      background: pink;
    }
  `}
`;

export const Input = styled.input`
  display: block;
  margin-bottom: 0.25rem;
  padding: 0.5rem;
  min-width: 250px;
  border-radius: 0.25rem;
  border: 2px solid #ccc;

  :focus {
    border-color: dodgerblue;
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: 0.9rem;
`;

export const ListItems = styled.ul`
  margin: 0.5rem auto;
  list-style: square;
  padding-left: 1rem;
`;

export const ListItem = styled.li`
  line-height: 1.5;
`;
