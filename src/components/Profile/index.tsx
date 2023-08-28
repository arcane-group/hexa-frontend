import { Box, Center, Stack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'

import { VerifyLogin } from '@/components/Layout/VerifyLogin'
import { Button } from '@/components/Button'
import { useStore } from '@/stores'
import { UserImg } from '@/components/UserImg'
import { SAVED } from './SAVED'
import { useInitSetPageScroll } from '@/hooks/usePageStore'
import px2vw from '@/utils/px2vw'

const Profile = () => {
  useLingui()

  useInitSetPageScroll()

  const { walletStore } = useStore()

  const { push } = useRouter()

  return (
    <VerifyLogin>
      <Box
        py={{
          base: px2vw(20),
          lg: '110px',
        }}
        px={{
          base: px2vw(20),
          lg: 0,
        }}
      >
        <Center flexDir={'row'} pb='24px' w={{ base: '100%', lg: 'max-content' }}>
          <Stack
            spacing={'20px'}
            direction={'row'}
            alignItems={'center'}
            w={{ base: '100%', lg: 'max-content' }}
          >
            <UserImg
              src={walletStore?.userExtInfo?.pic}
              w={{ base: px2vw(84), lg: '120px' }}
              h={{ base: px2vw(84), lg: '120px' }}
            />
            <Box
              flex={{
                base: 1,
                lg: undefined,
              }}
            >
              {walletStore?.userExtInfo?.name && (
                <Box textStyle={'ch1'} color='#000000'>
                  {walletStore?.userExtInfo?.name}
                </Box>
              )}

              {walletStore?.userExtInfo?.email && (
                <Box textStyle={'csmp'} color='#595959'>
                  {walletStore?.userExtInfo?.email}
                </Box>
              )}

              {walletStore?.userExtInfo?.email &&
                // TODO：判断是否已经验证过邮箱
                true && (
                  <Box>
                    <Button
                      mt='10px'
                      size='sm'
                      height={'26px'}
                      onClick={() => {
                        push({
                          pathname: '/resend-email',
                          query: {
                            email: walletStore?.userExtInfo?.email,
                          },
                        })
                      }}
                    >{t`Verify Email`}</Button>
                  </Box>
                )}

              {walletStore?.userExtInfo?.address ? (
                <Box
                  textStyle={'csmp'}
                  color='#595959'
                >{`${walletStore?.userExtInfo?.address?.slice(
                  0,
                  6
                )}...${walletStore?.userExtInfo?.address?.slice(-4)}`}</Box>
              ) : (
                <Box>
                  <Button
                    mt='10px'
                    size='sm'
                    height={'26px'}
                    onClick={() => {
                      push('/profile/connect-wallet')
                    }}
                  >{t`Connect Wallet`}</Button>
                </Box>
              )}

              <Box>
                <Button
                  mt='10px'
                  size='sm'
                  height={'26px'}
                  onClick={() => {
                    push('/profile/edit-profile')
                  }}
                >{t`Edit Profile`}</Button>
              </Box>

              {walletStore?.userExtInfo?.email ? null : (
                <Box>
                  <Button
                    mt='10px'
                    size='sm'
                    height={'26px'}
                    onClick={() => {
                      push('/profile/link-email')
                    }}
                  >{t`Link Email`}</Button>
                </Box>
              )}
            </Box>
          </Stack>
        </Center>
        <SAVED />
      </Box>
    </VerifyLogin>
  )
}

export default observer(Profile)
