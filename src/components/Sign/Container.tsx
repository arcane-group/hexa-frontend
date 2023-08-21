import { Stack, Box, Image, Text, Center } from '@chakra-ui/react'
import { useState, useContext, createContext, useMemo } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { Container as ContainerBox } from '@/components/Container'
import { LineButton } from '@/components/LineButton'
// import { px2vw } from '@/utils/px2vw'

// 0 未注册 1 注册成功但未验证邮箱 2 注册并已经验证邮件
export enum RSTATE {
  UNREGISTERED = 0,
  REGISTERED = 1,
  // VERIFIED = 2,
}

const StoreContext = createContext<{
  email: string
  setEmail: (o: string) => void
  registerState: RSTATE
  setRegisterState: (o: RSTATE) => void
}>({
  email: '--',
  setEmail: () => {},
  registerState: 0,
  setRegisterState: () => {},
})

export function useRegisterStore () {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useRegisterStore must be used within StoreContext.Provider')
  }
  return context
}

export const Container = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState('--')
  const [registerState, setRegisterState] = useState<RSTATE>(RSTATE.UNREGISTERED)

  const main = useMemo(() => {
    switch (registerState) {
      case RSTATE.UNREGISTERED:
        return children
      case RSTATE.REGISTERED:
        return <REGISTERED />
      // case RSTATE.VERIFIED:
      //   return <VERIFIED />
    }
  }, [registerState, children])

  return (
    <StoreContext.Provider
      value={{
        email,
        setEmail,
        registerState,
        setRegisterState,
      }}
    >
      <ContainerBox as='main' minH={'100vh'} pt={'45px'} pb='114px'>
        <Stack direction={'row'} spacing={'143px'}>
          <Box
            w='320px'
            h='743px'
            border='3px solid #1ECADC'
            bgGradient='linear(164.72deg, #8AF7FC 1.21%, transparent 75.08%)'
          >
            <Image src='' alt='' w='100%' h='100%' />
          </Box>
          <Box flex={1} w={0}>
            {main}
          </Box>
        </Stack>
      </ContainerBox>
    </StoreContext.Provider>
  )
}

const REGISTERED = () => {
  useLingui()

  const { email } = useRegisterStore()

  return (
    <Center flexDir={'column'} minH='100%' h='max-content' w='80%'>
      <Text textStyle={'ch2'} color='#000'>
        {t`We have sent a verification link to ${email}, please click on the link to complete the verification process.`}
        <br />
        {t`You might need to check your spam folder.`}
      </Text>
      <Box w='100%' mt='30px'>
        {/* TODO： 待添加一个倒计时限制 */}
        <LineButton>{t`Resend Email`}</LineButton>
      </Box>
    </Center>
  )
}

// const VERIFIED = () => {
//   useLingui()

//   return <>VERIFIED</>
// }
