import styled from "styled-components";
import theme from "../../styles/theme";
import { CardBoxStyle } from '../../utils/type/GameBoard';

export const GameBoardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const BoardOuterBox = styled.div`
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const BoardBox = styled.div`
  display: grid;
  grid-template-rows: ${(props: {height: number, width: number}) => {
    return `repeat(${props.height}, 30px)`;
  }};
  grid-template-columns: ${(props: {height: number, width: number}) => {
    return `repeat(${props.width}, 30px)`;
  }};
  justify-content: center;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.LIGHT_YELLOW};
  border: 1px solid ${({ theme }) => theme.colors.LIGHT_YELLOW};
  border-radius: 5px;
`;

export const CardBox = styled.div<CardBoxStyle>`
  cursor: pointer;
  background-color: ${(props: {status: string}) => {
    if (props.status === 'open') return `${theme.colors.GRAY}`;
    else return `${theme.colors.MINT_GREEN}`;
  }};
  border: 1px solid ${({ theme }) => theme.colors.LIGHT_YELLOW};;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  color: ${(props: {color: string, status: string}) => {
    if (props.color === '0' || props.color === 'X') return 'black';
    else if (props.color === '1') return 'blue';
    else if (props.color === '2') return 'green';
    else if (props.color === '3') return 'red';
    else if (props.status === 'flag') return 'white';
    else return 'purple';
  }};
`;
