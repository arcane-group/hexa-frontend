import getConfig from 'next/config'
import { mainnet, goerli, type Chain } from 'wagmi/chains'

const { publicRuntimeConfig } = getConfig()

const nobj = {
  [mainnet.id]: mainnet,
  [goerli.id]: goerli,
}

export const NET_WORK = (function () {
  const obj: {
    [id: number | string]: Chain
  } = {}

  Object.keys(nobj).map((item: any) => {
    const o = nobj[item as 5]

    if (publicRuntimeConfig.canTestnet || !o?.testnet) {
      obj[item] = o
    }
  })

  return obj
})()

export const CHAINS = Object.keys(NET_WORK).map((item) => NET_WORK[item])
