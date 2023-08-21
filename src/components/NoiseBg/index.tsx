import Script from 'next/script'
import { Box } from '@chakra-ui/react'

export const NoiseBg = () => {
  const noiseId = `noise-bg`
  return (
    <>
      {/* grained */}
      <Script
        id='grained-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          grained('#${noiseId}', {
            "animate": false,
            "patternWidth": 194,
            "patternHeight": 96,
            "grainOpacity": 0.09,
            "grainDensity": 1,
            "grainWidth": 1,
            "grainHeight": 1
          })
          `,
        }}
      />
      <Box
        id={noiseId}
        sx={{
          pos: 'fixed !important',
        }}
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        userSelect={'none'}
        pointerEvents={'none'}
      />
    </>
  )
}

// import { useCallback, useId } from 'react'
// import type {
//   // Container,
//   Engine,
// } from 'tsparticles-engine'
// import Particles from 'react-particles'
// import { loadSlim } from 'tsparticles-slim'

// export const NoticeBg = () => {
//   const particlesId = useId()

//   const particlesInit = useCallback(async (engine: Engine) => {
//     await loadSlim(engine)
//   }, [])

//   // const particlesLoaded = useCallback(async (container: Container | undefined) => {
//   //   await console.log(container)
//   // }, [])

//   return (
//     <Particles
//       id={particlesId}
//       init={particlesInit}
//       // loaded={particlesLoaded}
//       options={{
//         fpsLimit: 120,
//         particles: {
//           number: { value: 600, density: { enable: true, value_area: 800 } },
//           color: { value: '#000' },
//           shape: {
//             type: 'edge',
//             stroke: { width: 0 },
//             polygon: { nb_sides: 5 },
//           },
//           opacity: {
//             value: 0.2,
//             random: true,
//             anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
//           },
//           size: {
//             value: { min: 1, max: 3 },
//             random: true,
//             anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
//           },
//           line_linked: {
//             enable: false,
//           },
//           move: {
//             enable: true,
//             speed: 0.3,
//             direction: 'none',
//             random: true,
//             straight: false,
//             out_mode: 'out',
//             bounce: false,
//             attract: { enable: false },
//           },
//         },
//         interactivity: {
//           detect_on: 'canvas',
//           events: {
//             onhover: { enable: false, mode: 'repulse' },
//             onclick: { enable: false, mode: 'repulse' },
//             resize: true,
//           },
//           modes: {
//             grab: { distance: 400, line_linked: { opacity: 0.5 } },
//             bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
//             repulse: { distance: 200, duration: 0.4 },
//             push: { particles_nb: 4 },
//             remove: { particles_nb: 2 },
//           },
//         },
//         retina_detect: true,
//       }}
//     />
//   )
// }
