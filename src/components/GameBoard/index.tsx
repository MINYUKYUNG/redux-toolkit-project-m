import * as S from './style';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, ReactNode, useRef } from 'react';
import { RootState } from '../../store';
import { StatusLists } from '../../utils/type/GameBoard';
import { setting } from '../../store/board';
import { resetBoard, changeBoard, exploded, firstClick } from '../../store/elementOfBoard';
import { FaBomb, FaFlag } from 'react-icons/fa';

function GameBoard() {
  const dispatch = useDispatch();
  const isLoaded = useRef(false);

  const { height, width, customMine } = useSelector((state: RootState) => state.difficulty);
  const { status, textContent, notAllowed, isFirst }  = useSelector((state: RootState) => state.elementOfBoard);
  const { randomTable, mineIndexLists }  = useSelector((state: RootState) => state.board);
  
  const OPEN = 'open', FLAG = 'flag', NOTALLOWED = 'notallowed', CLEAN_STATUS = ''; // status CONSTANT
  const BOMB_TEXT = 'X', FLAG_TEXT = '깃발', CLEAN_TEXT = ''; // text CONSTANT
  
  const firstY = useRef(0);
  const firstX = useRef(0);

  useEffect(() => {
    dispatch(resetBoard({height: 16, width: 16}));
    isLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!isFirst) openCard(firstY.current, firstX.current);
  }, [randomTable]);

  // 게임 card 열기
  const openCard = (y: number, x: number) => {
    if (notAllowed === NOTALLOWED) return;
    if (status[y][x] === OPEN) return;
    if (status[y][x] === FLAG) return;

    if (isFirst) {
      dispatch(setting({height, width, customMine, firstY: y, firstX: x}));
      dispatch(firstClick(false));
      firstY.current = y;
      firstX.current = x;
      return;
    };
    
    const value = randomTable[y][x];
    if (value === BOMB_TEXT) {
      mineIndexLists.forEach(({ y, x }) => {
        dispatch(changeBoard({
          y, 
          x, 
          status: OPEN, 
          textContent: BOMB_TEXT,
          count: 0
        }));
      });

      dispatch(exploded({notAllowed: NOTALLOWED}));
      dispatch(firstClick(true));
    } else if (value === 0) {
      const statuslists: StatusLists = {};
      oepnZeroCard(y, x, statuslists);
    } else {
      dispatch(changeBoard({
        y, 
        x, 
        status: OPEN, 
        textContent: value.toString(),
        count: 1
      }));
    };
  };

  // 게임 card 가 빈칸일 경우, 0 보다 큰 숫자가 나올때까지 카드를 열어준다
  const dx = [-1, 0, 1], dy = [-1, 0, 1];
  const oepnZeroCard = (y: number, x: number, statuslists: StatusLists) => {
    if (y < 0 || height <= y || x < 0 || width <= x) return;

    const index = (y * width) + x;
    if (statuslists[index] === OPEN) return;
    if (status[y][x] === OPEN) return;
    if (status[y][x] === FLAG) return;

    const value = randomTable[y][x];
    if (0 < value) {
      statuslists[index] = OPEN;
      dispatch(changeBoard({
        y, 
        x, 
        status: OPEN, 
        textContent: value.toString(),
        count: 1
      }));
    } else if (value === 0) {
      statuslists[index] = OPEN;
      dispatch(changeBoard({
        y, 
        x, 
        status: OPEN, 
        textContent: CLEAN_TEXT,
        count: 1
      }));
      for (let i = 0; i < dx.length; i++) {
        for (let j = 0; j < dy.length; j++) {
          const nx = x + dx[i];
          const ny = y + dy[j];

          oepnZeroCard(ny, nx, statuslists);
        };
      };
    };
  };

  // 깃발 기능 (오른쪽 클릭)
  const flag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, y: number, x: number) => {
    e.preventDefault();
    if (notAllowed === NOTALLOWED) return;
    if (status[y][x] === OPEN) return;

    if (status[y][x] === FLAG) {
      dispatch(changeBoard({
        y, 
        x, 
        status: CLEAN_STATUS, 
        textContent: CLEAN_TEXT,
        count: 0
      }));
    } else {
      dispatch(changeBoard({
        y, 
        x, 
        status: FLAG, 
        textContent: FLAG_TEXT,
        count: 0
      }));
    };
  };
  
  // 기본 게임 board
  const cleanBoard = (height: number, width: number) => {
    const boardBase: ReactNode[][] = [];
    for (let i = 0; i < height; i++) {
      boardBase[i] = [];
      for (let j = 0; j < width; j++) {
        const textConvert = () => {
          if (textContent[i][j] === FLAG_TEXT) return <FaFlag /> 
          else if (textContent[i][j] === BOMB_TEXT) return <FaBomb />
          else return textContent[i][j];
        };
        boardBase[i].push(
          <S.CardBox 
            key={(i * width) + j} 
            onClick={() => openCard(i, j)} 
            onContextMenu={(e) => flag(e, i, j)} 
            color={textContent[i][j]} 
            status={status[i][j]}
          >
            {textConvert()}
          </S.CardBox>
        );
      };
    };

    return boardBase;
  };


  return (
    <S.GameBoardContainer>
      <S.BoardOuterBox>
        <S.BoardBox height={height} width={width}>
          {isLoaded.current ? cleanBoard(height, width): <div>Loading...</div>}
        </S.BoardBox>
      </S.BoardOuterBox>
    </S.GameBoardContainer>
  );
};

export default GameBoard;
