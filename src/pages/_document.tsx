import Document, { Html, Head, Main, NextScript, type DocumentProps } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

import theme from '@/theme'
import { STORAGE_KEY } from '@/constants/theme'

type Props = DocumentProps & {
  // add custom document props
}

class MyDocument extends Document<Props> {
  render () {
    return (
      <Html translate='no'>
        <Head />
        <body className='body-scroll'>
          <ColorModeScript
            initialColorMode={theme.config.initialColorMode}
            storageKey={STORAGE_KEY}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
