import { Icon, IconProps } from '@chakra-ui/react'

export const ArrowIcon = (props?: IconProps) => {
  return (
    <Icon width='17' height='20' viewBox='0 0 17 20' fill='none' {...props}>
      <path d='M17 10L0.499997 19.5263L0.499998 0.47372L17 10Z' fill='#C29B60' />
    </Icon>
  )
}

export const BlueArrowIcon = (props?: IconProps) => {
  return (
    <Icon width='17' height='20' viewBox='0 0 17 20' fill='none' {...props}>
      <path
        d='M16 18.6603L1 10L16 1.33975L16 18.6603Z'
        fill='url(#paint0_linear_1661_3478)'
        stroke='#1ECADC'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1661_3478'
          x1='17'
          y1='10'
          x2='-3.96196e-07'
          y2='10'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1ECADC' />
          <stop offset='1' stopColor='#1ECADC' stopOpacity='0' />
        </linearGradient>
      </defs>
    </Icon>
  )
}

export const CurNavIcon = (props?: IconProps) => {
  return (
    <Icon width='20' height='20' viewBox='0 0 20 20' fill='none' {...props}>
      <rect
        x='0.707107'
        y='9.89954'
        width='13'
        height='13'
        transform='rotate(-45 0.707107 9.89954)'
        fill='url(#paint0_linear_1646_984)'
        stroke='#1ECADC'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1646_984'
          x1='6.29284'
          y1='10.5355'
          x2='7'
          y2='23.8995'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1ECADC' />
          <stop offset='1' stopColor='#1ECADC' stopOpacity='0' />
        </linearGradient>
      </defs>
    </Icon>
  )
}
