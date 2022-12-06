import styled from "styled-components";

export const DifficultyContainer = styled.div`
  text-align: center;
  select {
    background-color: ${({ theme }) => theme.colors.LIGHT_YELLOW};
    border: 10px solid ${({ theme }) => theme.colors.LIGHT_YELLOW};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.fontSize.MEDIUM};
    margin-bottom: 15px;
  }
`;

export const CustomFormBox = styled.div`
  display: flex;
  justify-content: center;
  form {
    display: flex;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    > * {
      border-radius: 5px;
      padding: 5px;
      margin: 5px;
      font-size: ${({ theme }) => theme.fontSize.MEDIUM};
    }
    input,
    button {
      background-color: ${({ theme }) => theme.colors.LIGHT_YELLOW};
    }
  }
`;
