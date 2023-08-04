import 'styled-components';

const theme = {
  colors: {
    primary: '#00A7C1',
    primaryHover: '#63B6C9',
    primaryLight: '#53bac9',
    black: '#1D191F',
    gray: '#CCCCCC',
    mediumGray: '#DDDDDD',
    lightGray: '#EEEEEE',
    darkGray: '#808080',
    white: '#FFFFFF',
    whiteOff: '#EEEEEE',
    orange: '#F6662B',
    red: '#CF1D3D',
    green: '#64CF1D',
  },

  ui: {
    borderRadius: {
      card: '32px',
      badge: '12px',
      button: '16px',
      buttonSmall: '8px',
    },
    shadows: '0px 6px 6px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4)',
  },

  fonts: {
    LexendDeca: {
      400: 'LexendDeca_400Regular',
      500: 'LexendDeca_500Medium',
      800: 'LexendDeca_800ExtraBold',
    },
  },
} as const;

export default theme;
