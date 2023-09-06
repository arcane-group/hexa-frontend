import { Stack, Box, ButtonProps } from '@chakra-ui/react'
import {
  useState,
  // useContext,
  // createContext,
  // useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react'

import { Container as ContainerBox } from '@/components/Container'
import { MotionImage } from '@/components/Motion'
import { LineButton } from '@/components/LineButton'
import px2vw from '@/utils/px2vw'
// import { px2vw } from '@/utils/px2vw'

// // 0 未注册 1 注册成功但未验证邮箱 2 注册并已经验证邮件
// export enum RSTATE {
//   UNREGISTERED = 0,
//   REGISTERED = 1,
//   // VERIFIED = 2,
// }

// const StoreContext = createContext<{
//   email: string
//   setEmail: (o: string) => void
//   registerState: RSTATE
//   setRegisterState: (o: RSTATE) => void
// }>({
//   email: '--',
//   setEmail: () => {},
//   registerState: 0,
//   setRegisterState: () => {},
// })

// export function useRegisterStore () {
//   const context = useContext(StoreContext)
//   if (context === undefined) {
//     throw new Error('useRegisterStore must be used within StoreContext.Provider')
//   }
//   return context
// }

export const Container = ({ spacing, children }: { spacing?: any; children: React.ReactNode }) => {
  // const [email, setEmail] = useState('--')
  // const [registerState, setRegisterState] = useState<RSTATE>(RSTATE.UNREGISTERED)

  // const main = useMemo(() => {
  //   switch (registerState) {
  //     case RSTATE.UNREGISTERED:
  //       return children
  //     case RSTATE.REGISTERED:
  //       return <REGISTERED />
  //     // case RSTATE.VERIFIED:
  //     //   return <VERIFIED />
  //   }
  // }, [registerState, children])

  const bgImg = useMemo(() => {
    return `/images/card-bg/${Math.ceil(Math.random() * 4)}.png`
  }, [])

  return (
    // <StoreContext.Provider
    //   value={{
    //     email,
    //     setEmail,
    //     registerState,
    //     setRegisterState,
    //   }}
    // >
    <ContainerBox
      as='main'
      minH={'100vh'}
      pt={{
        base: px2vw(20),
        lg: '45px',
      }}
      pb='114px'
    >
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        spacing={
          spacing || {
            base: px2vw(20),
            lg: '143px',
          }
        }
      >
        <Box
          pos='relative'
          w={{
            base: '100%',
            lg: '320px',
          }}
          h={{
            base: px2vw(100),
            lg: '743px',
          }}
          border='3px solid #1ECADC'
        >
          <Box
            pos='absolute'
            zIndex={2}
            left={0}
            top={0}
            w={'100%'}
            h={'100%'}
            bgGradient='linear(164.72deg, #8AF7FC 1.21%, transparent 75.08%)'
          ></Box>
          <MotionImage
            initial='offscreen'
            whileInView='onscreen'
            variants={{
              offscreen: {
                opacity: 0,
              },
              onscreen: {
                opacity: 1,
              },
            }}
            pos='relative'
            zIndex={0}
            src={bgImg}
            alt=''
            w='100%'
            h='100%'
          />
        </Box>
        <Box
          flex={1}
          w={{
            lg: 0,
          }}
        >
          {/* {main} */}
          {children}
        </Box>
      </Stack>
    </ContainerBox>
    // </StoreContext.Provider>
  )
}

// const VERIFIED = () => {
//   useLingui()

//   return <>VERIFIED</>
// }

// eslint-disable-next-line react/display-name
export const CountdownButton = forwardRef(function (
  {
    num = 60,
    children,
    onClick,
    ...props
  }: ButtonProps & {
    num?: number
  },
  ref
) {
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timer | null = null

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      interval && clearInterval(interval)
    }

    return () => {
      interval && clearInterval(interval)
    }
  }, [countdown])

  useImperativeHandle(
    ref,
    () => {
      return {
        setCountdown: () => {
          setCountdown(num)
        },
      }
    },
    [num]
  )

  return (
    <LineButton
      minW='180px'
      isDisabled={countdown > 0}
      onClick={async e => {
        if (countdown > 0) {
          return
        }

        const res: any = await onClick?.(e)
        if (res !== false) {
          setCountdown(num)
        }
      }}
      {...props}
    >
      {countdown > 0 ? `${countdown}s` : children}
    </LineButton>
  )
})
