import { createSlice } from '@reduxjs/toolkit';
import { InitialState, SettingAction } from '../utils/type/board';

const board = createSlice({
  name: 'board',
  initialState: {
    randomTable: [],
    mineIndexLists: []
  } as InitialState,
  reducers: {
  	setting: (state, action: SettingAction) => {
      const height = action.payload.height;
      const width = action.payload.width;
      const customMine = action.payload.customMine;
      const firstY = action.payload.firstY;
      const firstX = action.payload.firstX;

      const boardBase: ((number | string)[] | never[])[] = [];
      for (let i = 0; i < height; i++) {
        boardBase[i] = [];
        for (let j = 0; j < width; j++) {
          boardBase[i][j] = 0;
        };
      };
      
      let count = 0;
      const dx = [-1, 0, 1], dy = [-1, 0, 1];
      const mine = customMine ? customMine: Math.round((height * width) / 6.4);
      const mineIndexLists: { y: number, x: number }[] = [];
      done: while (count < mine) {
        // 랜덤한 지뢰 생성
        const y = Math.floor(Math.random() * height);
        const x = Math.floor(Math.random() * width);
  
        if (boardBase[y][x] === 'X') continue;

        // 첫 번째 빈칸을 열었을 때, 지뢰가 터지면 안된다
        if (customMine) { // 커스텀 버전에서는, 첫 클릭에 지뢰만 안 터지게 설정
          const firstCheck = x === firstX && y === firstY;
          if (firstCheck) continue;
        } else { // 일반 버전에서는, 오리지널 minesweeper 게임의 룰과 같이 첫 클릭은 무조건 빈칸이 클릭되게 설정
          for (let i = 0; i < dx.length; i++) {
            for (let j = 0; j < dy.length; j++) {
              const firstCheck = x === firstX + dx[i] && y === firstY + dy[j];
              if (firstCheck) continue done;
            };
          };
        };

        boardBase[y][x] = 'X';
        mineIndexLists.push({ y: y, x: x });
        count = count + 1;
  
        // 지뢰 주변 숫자 생성 (기준 [y][x])
        for (let i = 0; i < dx.length; i++) {
          for (let j = 0; j < dy.length; j++) {
            const nx = x + dx[i];
            const ny = y + dy[j];

            if (0 <= nx && nx < width && 0 <= ny && ny < height && boardBase[ny][nx] !== 'X') 
              boardBase[ny][nx] = boardBase[ny][nx] as number + 1;
          };
        };
      };

      state.randomTable = boardBase;
      state.mineIndexLists = mineIndexLists;
    }
  }
});

export default board;
export const { setting } = board.actions;
