import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    margin: 0;
    padding: 0;
    font-family: 'Jua', sans-serif;
    box-sizing: border-box;
  };

  a {
    color: inherit;
    text-decoration: none;
  };

  ol,
  li,
  ul {
    list-style: none;
  };

  textarea {
    resize: none;
    outline: none;
  };

  input,
  select,
  button {
    border: none;
    outline: none;
    box-sizing: border-box;
    background: none;
    cursor: pointer;
    font-family: 'Jua', sans-serif;
  };
`;
