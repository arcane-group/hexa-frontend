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

export const ClickMeIcon = (props?: IconProps) => {
  return (
    <Icon height='36' viewBox='0 0 30 36' width='30' fill='none' {...props}>
      <linearGradient id='a'>
        <stop offset='0' stopColor='#8af7fc' />
        <stop offset='1' stopColor='#8af7fc' stopOpacity='0' />
      </linearGradient>
      <linearGradient
        id='b'
        gradientUnits='userSpaceOnUse'
        x1='15'
        x2='15'
        xlinkHref='#a'
        y1='6'
        y2='36'
      />
      <linearGradient
        id='c'
        gradientUnits='userSpaceOnUse'
        x1='14.3539'
        x2='14.3539'
        xlinkHref='#a'
        y1='-2.625'
        y2='8.625'
      />
      <mask id='d' fill='#fff'>
        <path
          clipRule='evenodd'
          d='m27.7718 21-12.9055-15-12.90543 15h-1.96087l14.8663 15 15.1337-15z'
          fill='#fff'
          fillRule='evenodd'
        />
      </mask>
      <mask id='e' fill='#fff'>
        <path d='m14.909 0 9.091 15-9.091-10-8.909 10z' fill='#fff' />
      </mask>
      <path
        clipRule='evenodd'
        d='m27.7718 21-12.9055-15-12.90543 15h-1.96087l14.8663 15 15.1337-15z'
        fill='url(#b)'
        fillRule='evenodd'
      />
      <path
        d='m14.8663 6 .7581-.6522-.7581-.88108-.758.88108zm12.9055 15-.758.6522.2992.3478h.4588zm-25.81093 0v1h.45881l.29924-.3478zm-1.96087 0 .00000049-1h-2.39901049l1.688744 1.7039zm14.8663 15-.7103.7039.704.7103.7102-.704zm15.1337-15 .704.7102 1.7254-1.7102h-2.4294zm-15.8917-14.3478 12.9055 15 1.5161-1.3044-12.9055-15zm-11.38938 15 12.90548-15-1.5161-1.3044-12.90548 15zm-.75805-1.6522h-1.96086951l-.00000098 2h1.96087049zm-2.671136 1.7039 14.866266 15 1.4205-1.4078-14.866234-15zm16.280466 15.0063 15.1338-15-1.408-1.4204-15.1337 15zm14.4298-16.7102h-2.2282v2h2.2282z'
        fill='#1ecadc'
        mask='url(#d)'
      />
      <path d='m14.909 0 9.091 15-9.091-10-8.909 10z' fill='url(#c)' />
      <path
        d='m14.909 0 .8552-.518307-.8639-1.425363-.8511 1.433016zm9.091 15-.7399.6727 1.5951-1.191zm-18 0-.85979-.5107 1.60645 1.1759zm8.909-10 .7399-.67268-.7475-.82219-.7391.82967zm-.8552-4.481693 9.091 14.999993 1.7104-1.0366-9.091-15.000007zm-7.19401 14.992393 8.90901-15.000046-1.7196-1.021308-8.90899 14.999954zm17.88011-1.1834-9.091-9.99998-1.4799 1.34536 9.0911 10.00002zm-10.5776-9.9925-8.90896 10 1.49332 1.3304 8.90894-10z'
        fill='#1ecadc'
        mask='url(#e)'
      />
    </Icon>
  )
}
