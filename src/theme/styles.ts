// import noiseImg from '@/assets/images/noise.png'

export default {
  global: ({ colorMode }: { theme: any; colorMode: string }) => {
    return {
      'html, body': {
        // fontSize: '14px',
        color: colorMode === 'dark' ? '#8AF7FC' : '#1D1D1D',
        bgColor: colorMode === 'dark' ? '#202020' : '#FDD9A6',
        // bgImg: `url(${noiseImg.src})`,
        // overflowX: 'hidden',
        // w: '100vw',
        w: '100%',
        minH: '100vh',
      },
      body: {
        overflowY: 'scroll',
      },
      'img[src=""],img:not([src])': {
        opacity: 0,
      },
    }
  },
}
