import 'styled-components';

const theme = {
  colors: {
    primary: '#56A2BC',
    black: '#1D191F',
    white: '#FFFFFF',
    orange: '#F6662B',
    red: '#EB3456',
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
      400: {
        normal: 'LexendDeca_400Regular',
      },
      500: {
        normal: 'LexendDeca_500Medium',
      },
      800: {
        normal: 'LexendDeca_800ExtraBold',
      },
    },
  },
} as const;

export default theme;
