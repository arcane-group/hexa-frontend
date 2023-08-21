// import noiseImg from '@/assets/images/noise.png'

export default {
  global: () => {
    return {
      'html, body': {
        // fontSize: '14px',
        color: '#1D1D1D',
        bgColor: '#FED18F',
        // bgImg: `url(${noiseImg.src})`,
        // overflowX: 'hidden',
        // w: '100vw',
        w: '100%',
        minH: '100vh',
      },
      'img[src=""],img:not([src])': {
        opacity: 0,
      },
    }
  },
}
