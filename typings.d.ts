type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]

declare interface Window {
  ethereum: any
  okxwallet: any
  gtag: any
  bitkeep: any
}

declare module '@pqina/flip'
declare module '@preconstruct/next'
