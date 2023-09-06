import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { Link } from '@chakra-ui/next-js'

import { px2vw } from '@/utils/px2vw'
import { Button as MyButton } from '@/components/Button'
import { UserImg } from '@/components/UserImg'
import { useStore } from '@/stores'
import { useLogout } from '@/hooks/useLogin'

const WalletLogin = observer(({ colorMode }: { colorMode: 'dark' | 'light' }) => {
  useLingui()

  const router = useRouter()

  const { walletStore } = useStore()
  const logoutFn = useLogout()

  // 已登录
  if (walletStore?.loginState === 3) {
    const nameStr =
      walletStore?.userExtInfo?.username ||
      walletStore?.userExtInfo?.email ||
      `${walletStore?.userExtInfo?.walletAddress?.slice(
        0,
        6
      )}...${walletStore?.userExtInfo?.walletAddress?.slice(-4)}`

    return (
      <Popover trigger='hover'>
        <PopoverTrigger>
          <Link
            href={'/profile'}
            _hover={{
              textDecoration: 'none',
            }}
            title={t`My Account`}
          >
            <Stack
              direction={'row'}
              flexDir='row'
              spacing='8px'
              alignItems={'center'}
              className='hover'
            >
              <UserImg
                src={walletStore?.userExtInfo?.avatar}
                w={{
                  base: px2vw(40),
                  lg: '45px',
                }}
                h={{
                  base: px2vw(40),
                  lg: '45px',
                }}
              />
              <Text textStyle={'cp'}>{nameStr}</Text>
            </Stack>
          </Link>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w='max-content'>
            <Button
              w='120px'
              color={'#E23434'}
              onClick={() => {
                logoutFn()
                  .then(() => {
                    window?.location?.reload()
                  })
                  .catch(e => console.error(e))
              }}
            >
              {t`Logout`}
            </Button>
          </PopoverContent>
        </Portal>
      </Popover>
    )
  }

  // 未登录
  return (
    <MyButton
      size={{
        base: 'sm',
        lg: 'md',
      }}
      isLoading={walletStore?.loginState === 2}
      onClick={() => {
        if (router.pathname === '/sign-in') {
          return
        }

        router.push({
          pathname: '/sign-in',
          query: {
            redirectTo: [
              '/sign-up',
              '/reset-password',
              '/verify-email',
              '/forgot-password',
            ].includes(router.pathname)
              ? router.query.redirectTo || '/'
              : router.asPath,
          },
        })
      }}
      color={colorMode === 'dark' ? '#8AF7FC' : '#000'}
    >
      {t`Sign In`}
    </MyButton>
  )
})

export default WalletLogin
