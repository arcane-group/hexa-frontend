import { useMemo } from 'react'
import { AspectRatio, Image } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { MotionSimpleGrid, MotionBox } from '@/components/Motion'
import px2vw from '@/utils/px2vw'

export const Screen4 = observer(() => {
  const arr = useMemo(() => {
    return [
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
      {
        href: '',
        img: '',
        alt: '',
      },
    ]
  }, [])

  return (
    <MotionSimpleGrid
      mt='30px'
      mb='78px'
      minChildWidth={{
        base: px2vw(280),
        lg: '280px',
      }}
      spacing={{
        base: px2vw(23),
        lg: '56px',
      }}
    >
      {arr?.map((item, index) => {
        return (
          <MotionBox
            className='hover'
            whileHover={{
              opacity: 1,
              backgroundImage: 'linear-gradient(to top, rgb(255, 255, 255), rgb(255, 255, 255))',
            }}
            key={index}
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              offscreen: {
                opacity: 0,
              },
              onscreen: {
                opacity: 1,
                transition: {
                  duration: 0.3,
                },
              },
            }}
            bgGradient={`linear(to-t, #8AF7FC, #fff)`}
            bgColor={'#fff'}
            sx={{
              border: '3px solid',
              borderImage: 'linear-gradient(115deg, #1ECADC, #fff) 1',
            }}
            onClick={() => {
              item?.href && window.open(item?.href, '_blank')
            }}
          >
            <AspectRatio maxW='560px' ratio={280 / 180}>
              <Image src={item?.img} alt={item?.alt} objectFit={'cover'} />
            </AspectRatio>
          </MotionBox>
        )
      })}
    </MotionSimpleGrid>
  )
})
