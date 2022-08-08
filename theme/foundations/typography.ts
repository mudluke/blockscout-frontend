import { theme } from '@chakra-ui/react';

export const BODY_TYPEFACE = 'Inter';

const typography = {
  fonts: {
    heading: `Poppins, ${ theme.fonts.heading }`,
    body: `${ BODY_TYPEFACE }, ${ theme.fonts.body }`,
  },
  textStyles: {
    h2: {
      fontSize: [ '32px' ],
      fontWeight: '500',
      lineHeight: '40px',
      fontFamily: 'heading',
    },
    h3: {
      fontSize: '24px',
      fontWeight: '500',
      lineHeight: '32px',
      fontFamily: 'heading',
    },
  },
};

export default typography;
