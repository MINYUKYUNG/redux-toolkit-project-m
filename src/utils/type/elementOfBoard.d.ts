export interface InitialState {
  status: string[][],
  textContent: string[][],
  notAllowed: string,
  countOpen: number,
  isFirst: boolean
};

export interface ResetBoardAction {
  payload: {
    height: number,
    width: number
  };
  type: string;
};

export interface ChangeBoardAction {
  payload: {
    y: number,
    x: number,
    status: string,
    textContent: string,
    count: number
  };
  type: string;
};

export interface ExplodedAction {
  payload: {
    notAllowed: string
  };
  type: string;
};

export interface FirstClickAction {
  payload: boolean;
  type: string;
};
