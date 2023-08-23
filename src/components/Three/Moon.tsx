import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import {
  useRef,
  // useState
} from 'react'
import { Box } from '@chakra-ui/react'

// import { MotionBox } from '@/components/Motion'
import textureImg from '@/assets/images/home/lroc_color_poles_1k-3.jpg'
import displacementMapImg from '@/assets/images/home/ldem_3_8bit.jpg'

const Moon = () => {
  const texture = useLoader(TextureLoader, textureImg.src)
  const displacementMap = useLoader(TextureLoader, displacementMapImg.src)

  const moonRef = useRef<any>()
  useFrame((_state, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.05 * delta
    }
  })

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[2, 60, 60]} />
      <meshPhongMaterial
        color={'#ffffff'}
        map={texture}
        displacementMap={displacementMap}
        displacementScale={0.06}
        bumpMap={displacementMap}
        bumpScale={0.04}
        reflectivity={0}
        shininess={0}
        emissive={'#629e8a'}
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

export default ThreeMoon

export function ThreeMoon () {
  // const [animationCompleted, setAnimationCompleted] = useState(false)

  return (
    <Box pos='relative' h='100%'>
      <Canvas
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
        }}
      >
        <Moon />
        <Env />
      </Canvas>
      <Box
        pos='absolute'
        zIndex={1}
        left={'50%'}
        top={'50%'}
        transform={'translate(-50%, -50%)'}
        w='55%'
        h='55%'
        borderRadius={'100%'}
        sx={{
          '@keyframes glowing': {
            '0%': {
              boxShadow: '0 0 40px 20px rgba(98, 158, 138, 1)',
            },
            '100%': {
              boxShadow: '0 0 20px 15px rgba(98, 158, 138, 0.7)',
            },
          },
        }}
        animation='glowing 2s alternate-reverse infinite'
      />
      {/* <MotionBox
        onAnimationComplete={() => {
          animationCompleted === false && setAnimationCompleted(true)
        }}
        initial={'initial'}
        animate={animationCompleted ? 'loop' : 'onscreen'}
        variants={{
          initial: {
            opacity: 0,
            boxShadow: '0 0 40px 20px rgba(98, 158, 138, 0.7)',
          },
          loop: {
            opacity: [1, 1],
            boxShadow: [
              '0 0 40px 20px rgba(98, 158, 138, 1)',
              '0 0 20px 15px rgba(98, 158, 138, 0.7)',
            ],
            transition: {
              duration: 2,
              times: [0, 1],
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            },
          },
          onscreen: {
            opacity: 1,
            boxShadow: '0 0 40px 20px rgba(98, 158, 138, 0.7)',
            transition: {
              duration: 1,
              times: [0, 1],
              ease: 'easeInOut',
            },
          },
        }}
        pos='absolute'
        zIndex={1}
        left={'50%'}
        top={'50%'}
        transform={'translate(-50%, -50%)'}
        w='55%'
        h='55%'
        borderRadius={'100%'}
      ></MotionBox> */}
    </Box>
  )
}

function Env () {
  return (
    <>
      <directionalLight color={'#ffffff'} position={[-100, 10, 50]} intensity={1} />
      <hemisphereLight groundColor={'#ffffff'} intensity={0.1} position={[0, 0, 0]} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  )
}
