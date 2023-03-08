import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: props => ({
    // body: {
    //   bg: mode('gray.400', 'whiteAlpha.400')(props),
    //   color: 'white',
    // },
    // '*::placeholder': {
    //   color: mode('gray.400', 'whiteAlpha.400')(props),
    //   scrollbarWidth: 'thin',
    //   scrollbarColor: ' #564d56 #363636',
    // },
    'html::-webkit-scrollbar': {
      width: '16px',
    },

    'html::-webkit-scrollbar-track': {
      background: mode('#e6eaf0', '#1b202b')(props),
    },

    'html::-webkit-scrollbar-thumb': {
      backgroundColor: mode('#bcbec4', '#383d47')(props),
      borderRadius: '9px',
      border: mode('4px solid #e6eaf0', '4px solid #1b202b')(props),
    },
    // 'html::before, html::after': {
    //   borderColor: mode('gray.200', 'whiteAlpha.300')(props),
    //   wordWrap: 'break-word',
    // },
  }),
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

export default theme;
