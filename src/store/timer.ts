import { createSlice } from '@reduxjs/toolkit';
import { InitialState, PressTheTimerAction } from '../utils/type/timer';

const timer = createSlice({
  name: 'timer',
  initialState: {
    countdown: 0
  } as InitialState,
  reducers: {
  	pressTheTimer: (state, action: PressTheTimerAction) => {
      if (action.payload === 'timerOn') state.countdown = state.countdown + 1;
      else state.countdown = 0;
    }
  }
});

export default timer;
export const { pressTheTimer } = timer.actions;
