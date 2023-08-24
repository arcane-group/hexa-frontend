import { Box, chakra, AbsoluteCenter } from '@chakra-ui/react'
import { forwardRef, useMemo, useRef } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import {
  AnimatePresence,
  // useIsPresent
} from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { useMouse } from 'ahooks'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import type { Home } from '@/stores/pageStore/Home'
import { usePageStore } from '@/hooks/usePageStore'
import { MotionBox } from '@/components/Motion/index'
import { Screen1 } from '@/components/Home/Screen-1'
import { Screen2 } from '@/components/Home/Screen-2'
import { Screen3 } from '@/components/Home/Screen-3'
import { Screen4 } from '@/components/Home/Screen-4'
import { ClickMeIcon } from '@/assets/svg/home'

const Main = () => {
  const screens = useMemo(() => {
    return [Screen1, Screen2, Screen3, Screen4]
  }, [])

  return (
    <ReactFullpage
      scrollBar
      easing='easeInOutCubic'
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
  )
}

// eslint-disable-next-line react/display-name
const VideoBox = forwardRef((props: any, ref) => <video ref={ref} {...props} />)
const Video = chakra(VideoBox)
const VideoScreen = ({ onClick }: { onClick: any }) => {
  useLingui()

  const mouseRef = useRef(null)
  const { elementX, elementY, elementH, elementW } = useMouse(mouseRef.current)

  const isInBox = elementX > 0 && elementY > 0 && elementX < elementW && elementY < elementH

  const animate = {
    x: isInBox ? `${elementX - elementW / 2}px` : '0px',
    y: isInBox ? `${elementY - elementH / 2}px` : '0px',
    transition: { duration: 0.1, ease: 'linear' },
  }

  // TODO: 待添加 首帧图逻辑
  const videoRef = useRef<HTMLVideoElement>(null)
  return (
    <MotionBox pos='relative' h='100vh' w='100%' userSelect={'none'}>
      <AbsoluteCenter
        ref={mouseRef}
        top='70%'
        w={{
          base: '60vw',
          lg: '40vw',
        }}
        h={{
          base: '20vh',
          lg: '50vh',
        }}
        cursor={'pointer'}
      >
        <MotionBox
          pos={'absolute'}
          top={'50%'}
          left={'50%'}
          transform={'translate(-50%, -50%)'}
          animate={animate}
          zIndex={2}
        >
          <AbsoluteCenter
            onClick={onClick}
            cursor={'pointer'}
            w='max-content'
            h='36px'
            justifyContent={'space-between'}
            flexDir={'row'}
            display={'flex'}
            alignItems={'center'}
            color='#8AF7FC'
            fontSize={'11px'}
          >
            <Box>{t`CLICK`}</Box>
            <Box w='30px' mx='5px' />
            <Box>{t`ENTER`}</Box>
          </AbsoluteCenter>
        </MotionBox>
        <MotionBox
          pos={'absolute'}
          top={'50%'}
          left={'50%'}
          transform={'translate(-50%, -50%)'}
          animate={{
            ...animate,
            transition: {
              duration: 0.15,
              ease: 'linear',
            },
          }}
          zIndex={1}
        >
          <AbsoluteCenter>
            <ClickMeIcon h='36px' />
          </AbsoluteCenter>
        </MotionBox>
      </AbsoluteCenter>
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
        objectFit={'cover'}
      ></Video>
    </MotionBox>
  )
}

const Page = () => {
  const { isShow, setShow } = usePageStore<Home>('') as any

  return (
    <>
      <Box as='main' minH={'100vh'}>
        <AnimatePresence mode='wait' initial={false}>
          {isShow ? (
            <MotionBox
              key='main'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Main />
            </MotionBox>
          ) : (
            <MotionBox
              key='video'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5, ease: 'linear' } }}
              exit={{
                opacity: 0,
                transition: { duration: 0.5, ease: 'linear' },
              }}
            >
              <VideoScreen
                onClick={() => {
                  setShow(true)
                }}
              />
              <MotionBox
                initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
                animate={{
                  scaleX: 0,
                  scaleY: 0,
                  opacity: 0,
                  transition: { duration: 0.5, ease: 'linear' },
                }}
                exit={{
                  scaleX: 1,
                  scaleY: 1,
                  opacity: 1,
                  transition: { duration: 0.5, ease: 'linear' },
                }}
                pos='fixed'
                top={'-50vh'}
                left={'-50vw'}
                right={'-50vw'}
                bottom={'-50vh'}
                bg='radial-gradient(circle, #FDD9A6 0%, transparent 100%)'
                borderRadius={'50%'}
                zIndex={0}
                opacity={1}
              />
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </>
  )
}
export default observer(Page)

export const getStaticProps = async () => {
  return {
    props: {
      title: '',
      ignoreFooter: true,
    },
  }
}
