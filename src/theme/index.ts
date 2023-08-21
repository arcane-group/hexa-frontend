import { extendTheme, theme as baseTheme, type ThemeConfig } from '@chakra-ui/react'

import px2vw from '../utils/px2vw' // 用别名会导致chakra ui cli报错
import styles from './styles'
import components from './components'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const breakpoints = {
  ssm: '320px',
  sm: '768px',
  md: '768px',
  lg: '768px',
  xl: '1080px',
  xxl: '1440px',
}

const colors = {
  ...baseTheme.colors,
  white: '#FFFFFF',
  black: '#000000',
  // gray: {
  //   '200': '#AFAFB0',
  //   '400': '#373739',
  //   '500': '#2A2A2D',
  //   '600': '#252529',
  //   '700': '#1A1A1B',
  // },
}

const textStyles = {
  ch1: {
    fontSize: {
      base: px2vw(36),
      lg: '36px',
    },
    fontWeight: 700,
    lineHeight: 1.5,
  },
  h1: {
    fontSize: {
      base: px2vw(22),
      lg: '22px',
    },
    fontWeight: 700,
    lineHeight: 1.5,
  },
  ch2: {
    fontSize: {
      base: px2vw(30),
      lg: '30px',
    },
    fontWeight: 400,
    lineHeight: 1.5,
  },
  h2: {
    fontSize: {
      base: px2vw(22),
      lg: '22px',
    },
    fontWeight: 400,
    lineHeight: 1.5,
  },
  cp: {
    fontSize: {
      base: px2vw(24),
      lg: '24px',
    },
    fontWeight: 400,
    lineHeight: 1.5,
  },
  p: {
    fontSize: {
      base: px2vw(16),
      lg: '16px',
    },
    fontWeight: 400,
    lineHeight: 1.5,
  },
  csmp: {
    fontSize: {
      base: px2vw(18),
      lg: '18px',
    },
    fontWeight: 400,
    lineHeight: 1.5,
  },
  smp: {
    fontSize: {
      base: px2vw(14),
      lg: '14px',
    },
    fontWeight: 400,
    lineHeight: 1.5,
  },
  cssmp: {
    fontSize: {
      base: px2vw(14),
      lg: '14px',
    },
    fontWeight: 400,
    lineHeight: 1.5,
  },
  ssmp: {
    fontSize: {
      base: px2vw(12),
      lg: '12px',
    },
    fontWeight: 400,
    lineHeight: 1.5,
  },
}

const layerStyles = {}

// https://chakra-ui.com/docs/theming/theme
const theme = extendTheme({
  config,
  colors,
  fonts: {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  sizes: {
    md: '768px',
    lg: '768px',
    xl: '1080px',
    xxl: '1440px',
  },
  styles,
  // borders,
  components,
  breakpoints,
  layerStyles,
  textStyles,
})

export default theme
