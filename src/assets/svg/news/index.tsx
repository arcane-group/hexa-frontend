import { Icon, IconProps } from '@chakra-ui/react'

export const LikedIcon = ({ stopColor = '#8af7fc', stopOpacity = 0, id, ...props }: IconProps) => {
  return (
    <Icon fill='none' height='30' viewBox='0 0 34 30' width='34' {...props}>
      <linearGradient
        id={id}
        gradientUnits='userSpaceOnUse'
        x1='10.8462'
        x2='24.6977'
        y1='14.2696'
        y2='30.6123'
      >
        <stop offset='0' stopColor='#1ecadc' stopOpacity='1' />
        <stop offset='1' stopColor={stopColor} stopOpacity={stopOpacity} />
      </linearGradient>
      <path
        d='m15.4957 1-7.9316 10.5406h-6.5641v17.4594h27.0769l4.9231-17.287h-17.5043l5.4701-7.54778z'
        fill={`url(#${id})`}
        stroke='#1ecadc'
      />
    </Icon>
  )
}

export const CollectIcon = ({
  stopColor = '#8af7fc',
  stopOpacity = 0,
  id,
  ...props
}: IconProps) => {
  return (
    <Icon width='175.495692' height='154.297664' viewBox='0 0 175.495692 154.297664' {...props}>
      <linearGradient x1='50%' y1='100%' x2='50%' y2='12.8894722%' id={id}>
        <stop stopColor={stopColor} stopOpacity={stopOpacity} offset='0%'></stop>
        <stop stopColor='#1ECADC' offset='100%'></stop>
      </linearGradient>
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g
          transform='translate(0.500000, 0.500000)'
          fill={`url(#${id})`}
          fillRule='nonzero'
          stroke='#1ECADC'
        >
          <path d='M129.644501,-7.10542736e-15 C111.15104,-7.10542736e-15 95.0927273,9.43640215 87.2480459,23.1718895 C79.4035645,9.43640215 63.345252,-7.10542736e-15 44.8565873,-7.10542736e-15 C16.7770252,-7.10542736e-15 0,24.1524246 0,47.5037924 C0,102.8023 81.2247297,150.597895 84.682985,152.606533 C85.4764471,153.06822 86.3596482,153.297664 87.2478459,153.297664 C88.1360437,153.297664 89.0194447,153.06822 89.8127068,152.606533 C93.2709621,150.598095 174.495692,102.8023 174.495692,47.5037924 C174.495692,24.1524246 157.719267,-7.10542736e-15 129.644501,-7.10542736e-15 Z'></path>
        </g>
      </g>
    </Icon>
  )
}
