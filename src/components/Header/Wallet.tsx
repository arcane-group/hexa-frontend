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

import { UserImg } from '@/components/UserImg'
import { useStore } from '@/stores'
import { useLogout } from '@/hooks/useLogin'

const WalletLogin = observer(() => {
  useLingui()

  const router = useRouter()

  const { walletStore } = useStore()
  const logoutFn = useLogout()

  // 已登录
  if (walletStore?.loginState === 3) {
    const nameStr =
      walletStore?.userExtInfo?.name ||
      walletStore?.userExtInfo?.email ||
      `${walletStore?.userExtInfo?.address?.slice(
        0,
        6
      )}...${walletStore?.userExtInfo?.address?.slice(-4)}`

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
              <UserImg src={walletStore?.userExtInfo?.pic} />
              <Text color='#000000' textStyle={'cp'}>
                {nameStr}
              </Text>
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
    <Button
      isLoading={walletStore?.loginState === 2}
      variant='outline'
      borderRadius={0}
      borderColor={'#155973'}
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
    >
      {t`Sign In`}
    </Button>
  )
})

export default WalletLogin
