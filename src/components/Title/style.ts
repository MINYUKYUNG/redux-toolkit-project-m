import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.TITLE};;
  h1 {
    padding-right: 5px;
  }
`;
