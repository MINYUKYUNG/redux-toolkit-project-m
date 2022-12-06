import * as S from './style';
import { ChangeEvent, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { chooseLevel } from '../../store/difficulty';
import { resetBoard } from '../../store/elementOfBoard';

function Difficulty() {
  const dispatch = useDispatch();
  const [custom, setCustom] = useState(false);
  const customUpdate = useRef(0);

  // 난이도 변경 Custom 기능 (가로, 세로, 지뢰 수 조정 가능)
  const createCustomBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customUpdate.current = customUpdate.current + 1;
    const target = e.currentTarget;
    const customHeight = Number(target.customHeight.value);
    const customWidth = Number(target.customWidth.value);
    const customMine = Number(target.customMine.value);
    
    const checkHeight = 1 <= customHeight && customHeight <= 50;
    const checkWidth = 1 <= customWidth && customWidth <= 50;
    const checkMine = 1 <= customMine && customMine < (customHeight * customWidth);

    if (!checkHeight || !checkWidth || !checkMine) {
      alert(`
        다시 설정해주세요!
        * Height : 1 ~ 50
        * Width : 1 ~ 50
        * Number of Bombs : 1 ~ ((Height * Width) - 1)
      `);
      return;
    };
    
    dispatch(chooseLevel({
      height: customHeight, 
      width: customWidth, 
      customMine: customMine, 
      level: `Custom${customUpdate.current}`
    }));
    dispatch(resetBoard({height: customHeight, width: customWidth}));
  };

  const customForm = () => {
    return (
      <S.CustomFormBox>
        <form onSubmit={createCustomBoard}>
          <p>Height : </p>
          <input type="text" name="customHeight" required />  
          <p>Width : </p>
          <input type="text" name="customWidth" required /> 
          <p>Number of Bombs : </p> 
          <input type="text" name="customMine" required />  
          <button type="submit">OK</button>
        </form>
      </S.CustomFormBox>
    )
  };

  // 난이도 변경 Beginner, Intermediate, Expert, Custom
  const levelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'Beginner':
        dispatch(chooseLevel({height: 8, width: 8, customMine: 0, level: 'Beginner'}));
        dispatch(resetBoard({height: 8, width: 8}));
        if (custom) setCustom(false);
        break;
      case 'Intermediate':
        dispatch(chooseLevel({height: 16, width: 16, customMine: 0, level: 'Intermediate'}));
        dispatch(resetBoard({height: 16, width: 16}));
        if (custom) setCustom(false);
        break;
      case 'Expert':
        dispatch(chooseLevel({height: 16, width: 32, customMine: 0, level: 'Expert'}));
        dispatch(resetBoard({height: 16, width: 32}));
        if (custom) setCustom(false);
        break;
      case 'Custom':
        if (!custom) setCustom(true);
        break;
    };
  };


  return (
    <S.DifficultyContainer>
      <select defaultValue="Intermediate" onChange={levelChange}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
        <option value="Custom">Custom</option>
      </select>
      { custom ? customForm(): null }
    </S.DifficultyContainer>
  );
};

export default Difficulty;
