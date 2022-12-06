export interface InitialState {
  height: number,
  width: number
  customMine: number,
  level: string
};

export interface ChooseLevelAction {
  payload: {
    height: number,
    width: number
    customMine: number,
    level: string
  };
  type: string;
};
