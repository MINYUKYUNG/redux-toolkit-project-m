import * as S from './style';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { RootState } from '../../store';
import { resetBoard, exploded, firstClick } from '../../store/elementOfBoard';
import { pressTheTimer } from '../../store/timer';

function Information() {
  const dispatch = useDispatch();

  const { height, width, customMine, level } = useSelector((state: RootState) => state.difficulty);
  const { notAllowed, countOpen, isFirst }  = useSelector((state: RootState) => state.elementOfBoard);
  const { countdown }  = useSelector((state: RootState) => state.timer);

  const mine = customMine ? customMine: Math.round((height * width) / 6.4);
  const standard = (height * width) - mine;
  const NOTALLOWED = 'notallowed'; // status CONSTANT
  const TIMER_ON = 'timerOn', TIMER_RESET = 'timerReset';

  useEffect(() => {
    dispatch(firstClick(true));
    dispatch(pressTheTimer(TIMER_RESET));
  }, [level]);

  // 타이머 기능
  let timer: ReturnType<typeof setInterval>;
  useEffect(() => {
    if (!isFirst) {
      timer = setInterval(() => {
        dispatch(pressTheTimer(TIMER_ON));
      }, 1000);
    };
    return () => clearInterval(timer);
  }, [isFirst]);

  useEffect(() => {
    if (countOpen === standard) {
      dispatch(exploded({notAllowed: NOTALLOWED}));
      dispatch(firstClick(true));
    };
  }, [countOpen]);

  // 게임 리셋 기능
  const reset = () => {
    dispatch(resetBoard({height, width}));
    dispatch(firstClick(true));
    dispatch(pressTheTimer(TIMER_RESET));
  };

  // 결과 발표 (게임 중, 성공, 실패)
  const result = useMemo((): string => {
    if (countOpen === standard) return 'Win ~ !';
    else if (notAllowed) return 'Lose ~ !';
    else return '게임을 완료해주세요';
  }, [countOpen, notAllowed]);


  return (
    <S.InfoContainer>
      <S.ResultBox>{result}</S.ResultBox>
      <S.LevelBox>
        <div>Height : {height}</div>
        <div>Width : {width}</div>
        <div>Bomb : {mine}</div>
      </S.LevelBox>
      <S.EctBox>
        <button type="button" onClick={reset}>reset</button>
        <div>Timer : {countdown}</div>
      </S.EctBox>
    </S.InfoContainer>
  );
};

export default Information;
