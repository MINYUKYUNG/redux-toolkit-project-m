import { createSlice } from '@reduxjs/toolkit';
import { 
  InitialState, 
  ResetBoardAction, 
  ChangeBoardAction, 
  ExplodedAction, 
  FirstClickAction 
} from '../utils/type/elementOfBoard';

const elementOfBoard = createSlice({
  name: 'elementOfBoard',
  initialState: {
    status: [],
    textContent: [],
    notAllowed: '',
    countOpen: 0,
    isFirst: true
  } as InitialState,
  reducers: {
  	resetBoard: (state, action: ResetBoardAction) => {
      const height = action.payload.height;
      const width = action.payload.width;

      for (let i = 0; i < height; i++) {
        state.status[i] = [];
        state.textContent[i] = [];
        for (let j = 0; j < width; j++) {
          state.status[i][j] = '';
          state.textContent[i][j] = '';
        };
      };

      state.notAllowed = '';
      state.countOpen = 0;
    },
    changeBoard: (state, action: ChangeBoardAction) => {
      const y = action.payload.y;
      const x = action.payload.x;
      const status = action.payload.status;
      const textContent = action.payload.textContent;
      const count = action.payload.count;

      state.status[y][x] = status;
      state.textContent[y][x] = textContent;
      state.countOpen = state.countOpen + count;
    },
    exploded: (state, action: ExplodedAction) => {
      state.notAllowed = action.payload.notAllowed;
    },
    firstClick: (state, action: FirstClickAction) => {
      state.isFirst = action.payload;
    }
  }
});

export default elementOfBoard;
export const { resetBoard, changeBoard, exploded, firstClick } = elementOfBoard.actions;
