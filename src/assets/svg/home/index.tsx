import { Icon, IconProps } from '@chakra-ui/react'

export const ArrowIcon = (props?: IconProps) => {
  return (
    <Icon width='32' height='32' viewBox='0 0 32 32' fill='none' {...props}>
      <path d='M28.9904 8.5L16 31L3.00962 8.5L28.9904 8.5Z' stroke='url(#paint0_linear_858_1100)' />
      <path
        d='M26.3923 10L16 28L5.60769 10L26.3923 10Z'
        fill='url(#paint1_linear_858_1100)'
        stroke='#1ECADC'
      />
      <defs>
        <linearGradient
          id='paint0_linear_858_1100'
          x1='16'
          y1='32.5'
          x2='16'
          y2='12.5'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1ECADC' />
          <stop offset='1' stopColor='#BAF4F7' stopOpacity='0' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_858_1100'
          x1='16'
          y1='-1.5606e-06'
          x2='16'
          y2='24.5'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1ECADC' />
          <stop offset='1' stopColor='#8AF7FC' stopOpacity='0.3' />
        </linearGradient>
      </defs>
    </Icon>
  )
}

export const GoNextIcon = (props?: IconProps) => {
  return (
    <Icon width='29' height='51' viewBox='0 0 29 51' fill='none' {...props}>
      <path
        d='M14.1426 21.1421L28.2847 14.1421L14.1426 28.2843L0.000442743 14.1421L14.1426 21.1421Z'
        fill='#1ECADC'
      />
      <path
        opacity='0.5'
        d='M14.1426 32.4264L28.2847 25.4264L14.1426 39.5686L0.000442743 25.4264L14.1426 32.4264Z'
        fill='#1ECADC'
      />
      <path
        opacity='0.2'
        d='M14.1426 43.7107L28.2847 36.7107L14.1426 50.8529L0.000442743 36.7107L14.1426 43.7107Z'
        fill='#1ECADC'
      />
    </Icon>
  )
}

export const Line285Icon = (props?: IconProps) => {
  return (
    <Icon width='4' height='285' viewBox='0 0 4 285' fill='none' {...props}>
      <line
        x1='2'
        x2='2'
        y2='285'
        stroke='url(#paint0_linear_353_756)'
        strokeWidth='4'
        strokeDasharray='2 2'
      />
      <defs>
        <linearGradient
          id='paint0_linear_353_756'
          x1='7.82672e-07'
          y1='272'
          x2='14.7707'
          y2='-11.2297'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#DFEEE9' stopOpacity='0.17' />
          <stop offset='0.897746' stopColor='#1ECADC' />
        </linearGradient>
      </defs>
    </Icon>
  )
}
