import { useEffect, useState } from 'react'
import { Stack, Box, Text, Divider, Center } from '@chakra-ui/react'
import { useAccount, useConnect } from 'wagmi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { observer } from 'mobx-react-lite'
import { utils } from 'ethers'

import { LineButton } from '@/components/LineButton'
import { useWalletLogin } from '@/hooks/useLogin'
import { useStore } from '@/stores'

const cfgs = {
  metaMask: {
    key: 'Connect MetaMask',
    url: 'https://metamask.io/',
  },
  particle: {
    key: 'Continue with Particle ID',
    url: 'https://particle.network/',
  },
}

export const OrLine = () => {
  useLingui()

  return (
    <Center position='relative' flexDir={'row'} mt='50px' mb='30px'>
      <Divider borderColor={'#C29B60'} flex={1} />
      <Box px='8px' textStyle={'smp'}>{t`or`}</Box>
      <Divider borderColor={'#C29B60'} flex={1} />
    </Center>
  )
}

export const ConnectWallet = observer(({ isLinkWallet }: { isLinkWallet?: boolean }) => {
  useLingui()

  const { walletStore } = useStore()

  const { address } = useAccount()
  const { connectAsync, connectors, isLoading, error, pendingConnector } = useConnect()
  const [errorMsg, setMsg] = useState({
    key: '',
    value: '',
  })

  const loginFn = useWalletLogin(isLinkWallet)

  useEffect(() => {
    if (address) {
      loginFn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  if (address && utils.isAddress(address)) {
    return (
      <Stack direction={'column'} spacing={'12px'}>
        <Text textStyle={'p'} color='black'>
          {t`Waiting for signature verification from wallet with address:`}
          <br />
          {address}
        </Text>
        <LineButton
          w='full'
          bgColor={'#8AF7FC'}
          isLoading={walletStore?.loginState === 2}
          onClick={() => {
            if (address) {
              loginFn()
            }
          }}
        >{t`Signature`}</LineButton>
      </Stack>
    )
  }

  return (
    <Stack color='black' spacing={'24px'}>
      {Array.isArray(connectors) &&
        connectors?.map(connector => {
          const item = cfgs[connector.id as 'metaMask' | 'particle']
          return (
            <Box key={connector.id}>
              <LineButton
                aria-label={item.key}
                disabled={isLoading && connector.id === pendingConnector?.id}
                isLoading={isLoading && connector.id === pendingConnector?.id}
                onClick={async e => {
                  e.preventDefault()
                  e.stopPropagation()

                  try {
                    const res = await connectAsync({ connector })
                    if (res) {
                    } else {
                      setMsg({
                        key: connector.id,
                        value: t`Please install app first.`,
                      })
                    }
                  } catch (e: any) {
                    setMsg({
                      key: connector.id,
                      value: e.message,
                    })
                  }
                }}
                // bgColor={'#8AF7FC'}
                w='full'
              >
                <Stack
                  spacing={0}
                  direction='column'
                  alignItems={'center'}
                  justifyContent={'center'}
                  textAlign={'center'}
                >
                  <Text textStyle='csmp' fontWeight={700} flex={1}>
                    {item.key}
                  </Text>
                  {errorMsg.key === connector.id && errorMsg.value && (
                    <Text textStyle='ssmp' color='red.300'>
                      {error && error.message}
                    </Text>
                  )}
                </Stack>
              </LineButton>
            </Box>
          )
        })}
    </Stack>
  )
})
