import { Icon, IconProps } from '@chakra-ui/react'

export const LikedIcon = (props?: IconProps) => {
  return (
    <Icon fill='none' height='30' viewBox='0 0 34 30' width='34' {...props}>
      <linearGradient
        id='a'
        gradientUnits='userSpaceOnUse'
        x1='10.8462'
        x2='24.6977'
        y1='14.2696'
        y2='30.6123'
      >
        <stop offset='0' stopColor='currentColor' stopOpacity='0.9' />
        <stop offset='1' stopColor='currentColor' stopOpacity='0' />
      </linearGradient>
      <path
        d='m15.4957 1-7.9316 10.5406h-6.5641v17.4594h27.0769l4.9231-17.287h-17.5043l5.4701-7.54778z'
        fill='url(#a)'
        stroke='#1ecadc'
      />
    </Icon>
  )
}
