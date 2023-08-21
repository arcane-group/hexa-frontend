import { useCallback, useId } from 'react'
import Particles from 'react-particles'
//import { loadFull } from "tsparticles";
import { loadSlim } from 'tsparticles-slim'
import { useConst } from '@chakra-ui/react'
import type {
  // Container,
  ISourceOptions,
  Engine,
} from 'tsparticles-engine'

export const PointParticle = () => {
  const particlesId = useId()

  const particlesInit = useCallback(async (engine: Engine) => {
    //await loadFull(engine);
    await loadSlim(engine)
  }, [])

  // const particlesLoaded = useCallback(async (container: Container | undefined) => {
  //   await console.log(container)
  // }, [])

  const opts: ISourceOptions = useConst(() => {
    return {
      fullScreen: {
        enable: false,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
          resize: true,
        },
        modes: {
          grab: {
            line_linked: {
              opacity: 0.7,
            },
            distance: 400,
          },
        },
      },
      particles: {
        color: {
          value: '#80EAEF',
        },
        links: {
          color: '#80EAEF',
          distance: 400,
          enable: true,
          opacity: 0.8,
          width: 2,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: false,
            area: 2000,
          },
          value: 40,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 2, max: 6 },
          anim: {
            enable: true,
            speed: 1,
            size_min: 0.5,
          },
        },
      },
      detectRetina: true,
    }
  })

  return (
    <Particles
      id={particlesId}
      init={particlesInit}
      //  loaded={particlesLoaded}
      options={opts}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 0,
      }}
    />
  )
}
