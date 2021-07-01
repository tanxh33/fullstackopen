import { createGlobalStyle } from 'styled-components';
import colors from './colors';

// eslint-disable-next-line import/prefer-default-export
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Noto Sans", sans-serif;
    color: ${colors.black};
  }

  a {
    color: ${colors.primary};
    transition: 150ms;
    :hover {
      color: ${colors.secondary};
    }
  }
`;
