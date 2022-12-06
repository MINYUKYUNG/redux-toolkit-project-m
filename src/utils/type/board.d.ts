export interface InitialState {
  randomTable: ((string | number)[] | never[])[],
  mineIndexLists: { y: number, x: number }[]
};

export interface SettingAction {
  payload: {
    height: number,
    width: number,
    customMine: number,
    firstY: number,
    firstX: number
  };
  type: string;
};
