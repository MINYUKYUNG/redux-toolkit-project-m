import styled from "styled-components";

export const InfoContainer = styled.div`
  padding-top: 20px;
  margin-bottom: 10px;
`;

export const ResultBox = styled.div`
  padding: 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.MINT_GREEN};
  text-shadow: 1px 1px 1px ${({ theme }) => theme.colors.BLACK};
`;

export const LevelBox = styled.div`
  display: flex;
  justify-content: center;
  > * {
    padding: 10px;
  }
`;

export const EctBox = styled.div`
  display: flex;
  justify-content: center;
  > * {
    padding: 10px;
    margin: 0 10px;
  }
  button {
    background-color: ${({ theme }) => theme.colors.LIGHT_YELLOW};
    border: 1px solid ${({ theme }) => theme.colors.LIGHT_YELLOW};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.fontSize.MEDIUM};
  }
`;
