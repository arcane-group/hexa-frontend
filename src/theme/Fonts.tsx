import { Global } from '@emotion/react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const Fonts = () => (
  <Global
    styles={`
/* Regular */
@font-face {
  font-family: 'Quantico';
  src: url('${publicRuntimeConfig.cdn}/fonts/Quantico-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* Bold */
@font-face {
  font-family: 'Quantico';
  src: url('${publicRuntimeConfig.cdn}/fonts/Quantico-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

/* Italic */
@font-face {
  font-family: 'Quantico';
  src: url('${publicRuntimeConfig.cdn}/fonts/Quantico-Italic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

/* Bold Italic */
@font-face {
  font-family: 'Quantico';
  src: url('${publicRuntimeConfig.cdn}/fonts/Quantico-BoldItalic.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
}
`}
  />
)

export default Fonts
