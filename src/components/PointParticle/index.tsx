import { useCallback, useId, useMemo } from 'react'
import Particles from 'react-particles'
//import { loadFull } from "tsparticles";
import { loadSlim } from 'tsparticles-slim'
import type {
  // Container,
  ISourceOptions,
  Engine,
} from 'tsparticles-engine'
import { observer } from 'mobx-react-lite'

import { useStore } from '@/stores'

export const PointParticle = observer(() => {
  const particlesId = useId()

  const {
    commonStore: { isPC },
  } = useStore()

  const particlesInit = useCallback(async (engine: Engine) => {
    //await loadFull(engine);
    await loadSlim(engine)
  }, [])

  // const particlesLoaded = useCallback(async (container: Container | undefined) => {
  //   await console.log(container)
  // }, [])

  const opts: ISourceOptions = useMemo(() => {
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
          distance: isPC ? 400 : 200,
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
            area: isPC ? 2000 : 768,
          },
          value: isPC ? 40 : 20,
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
  }, [isPC])

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
})
