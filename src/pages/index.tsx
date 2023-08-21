import { Box, chakra } from '@chakra-ui/react'
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'

import { MotionBox } from '@/components/Motion/index'
import { Screen1 } from '@/components/Home/Screen-1'
import { Screen2 } from '@/components/Home/Screen-2'
import { Screen3 } from '@/components/Home/Screen-3'
import { Screen4 } from '@/components/Home/Screen-4'
import { Container } from '@/components/Container'

// eslint-disable-next-line react/display-name
const VideoBox = forwardRef((props: any, ref) => <video ref={ref} {...props} />)
const Video = chakra(VideoBox)

const Page = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [animate, setAnimate] = useState<'lg' | 'sm' | 'none'>('none')

  const screens = useMemo(() => {
    return [Screen1, Screen2, Screen3, Screen4]
  }, [])

  const onChange = useCallback((_origin: any, destination: any, _direction: any) => {
    // 可以播放视频
    if (destination.index === 0) {
      setAnimate('lg')
      videoRef.current?.play()
    }
    // 可以小窗口播放视频
    else if (destination.index === 1) {
      setAnimate('sm')
      videoRef.current?.play()
    }
    // 隐藏
    else {
      setAnimate('none')
      videoRef.current?.pause()
    }
  }, [])

  return (
    <>
      <Box as='main' minH='100vh'>
        <ReactFullpage
          scrollBar
          easing='easeInOutCubic'
          afterLoad={(origin: any, destination: any, direction: any) => {
            if (direction !== 'down') {
              onChange(origin, destination, direction)
            }
          }}
          beforeLeave={(origin: any, destination: any, direction: any) => {
            if (direction === 'down') {
              onChange(origin, destination, direction)
            }
          }}
          render={({ fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                {screens.map((Screen, index) => {
                  return (
                    <Box as='section' key={index} className='section'>
                      <Screen fullpageApi={fullpageApi} />
                    </Box>
                  )
                })}
              </ReactFullpage.Wrapper>
            )
          }}
        />
        <Container
          pos='fixed'
          top={0}
          left={'50%'}
          transform={'translateX(-50%)'}
          h='100vh'
          zIndex={0}
          pointerEvents={'none'}
        >
          <MotionBox
            animate={animate}
            initial={'none'}
            variants={{
              lg: {
                width: `${524 - 20}px`,
                height: `${(524 - 20) / (524 / 327)}px`,
                opacity: 1,
              },
              sm: {
                width: `${278 - 20}px`,
                height: `${(278 - 20) / (278 / 173)}px`,
                opacity: 1,
              },
              none: {
                width: '278px',
                height: '173px',
                opacity: 0,
              },
            }}
            pos={'absolute'}
            zIndex={1}
            right={'80px'}
            bottom={'80px'}
          >
            <Video
              ref={videoRef}
              disablePictureInPicture
              pointerEvents={'none'}
              src={'/video/134_1691829781.mp4'}
              w={'100%'}
              h={'100%'}
              autoPlay
              loop
              muted
              playsInline
            ></Video>
          </MotionBox>
        </Container>
      </Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: '',
      ignoreFooter: true,
    },
  }
}
