import { configureStore } from '@reduxjs/toolkit';
import difficulty from './difficulty';
import board from './board';
import elementOfBoard from './elementOfBoard';
import timer from './timer';

export type RootState = ReturnType<typeof store.getState>;

const store =  configureStore({
  reducer: {
  	difficulty: difficulty.reducer,
    board: board.reducer,
    elementOfBoard: elementOfBoard.reducer,
    timer: timer.reducer
  }
});

export default store;