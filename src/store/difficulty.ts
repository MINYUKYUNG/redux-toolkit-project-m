import { createSlice } from '@reduxjs/toolkit';
import { InitialState, ChooseLevelAction } from '../utils/type/difficulty';

const difficulty = createSlice({
  name: 'difficulty',
  initialState: {
    height: 16,
    width: 16,
    customMine: 0,
    level: 'Intermediate'
  } as InitialState,
  reducers: {
  	chooseLevel: (state, action: ChooseLevelAction) => {
      state.height = action.payload.height;
      state.width = action.payload.width;
      state.customMine = action.payload.customMine;
      state.level = action.payload.level;
    }
  }
});

export default difficulty;
export const { chooseLevel } = difficulty.actions;
