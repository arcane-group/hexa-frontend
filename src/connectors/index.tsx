import { configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import getConfig from 'next/config'

import { CHAINS } from '@/constants/network'
import { ParticleAuthConnector } from './ParticleAuth'

const { publicRuntimeConfig } = getConfig()

const { chains, provider, webSocketProvider } = configureChains(CHAINS, [publicProvider()])

export const wagmiClient = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new ParticleAuthConnector({
      chains,
      options: {
        projectId: publicRuntimeConfig.particle.projectId as string,
        clientKey: publicRuntimeConfig.particle.clientKey as string,
        appId: publicRuntimeConfig.particle.appId as string,
      },
    }),
  ],
  provider,
  webSocketProvider,
})
