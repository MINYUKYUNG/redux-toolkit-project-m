type Colors = {
  WHITE: string;
  BLACK: string;
  GRAY: string;
  LIGHT_GRAY: string;
  LIGHT_YELLOW: string;
  MINT_GREEN: string;
};

type FontSize = {
  X_SMALL: string;
  SMALL: string;
  MEDIUM: string;
  SEMI_M: string;
  TITLE: string;
};

const colors: Colors = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: '#d8d7d7',
  LIGHT_GRAY: '#f4f4f4',
  LIGHT_YELLOW: '#fdffcd',
  MINT_GREEN: '#35d0ba',
};

const fontSize: FontSize = {
  X_SMALL: '12px',
  SMALL: '14px',
  MEDIUM: '16px',
  SEMI_M: '20px',
  TITLE: '36px',
};

const theme = {
  colors,
  fontSize,
};

export default theme;
