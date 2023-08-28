import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { MotionStack } from '@/components/Motion'
import { useMemo } from 'react'
import { Center, Image, Text } from '@chakra-ui/react'
import px2vw from '@/utils/px2vw'

export const Screen3 = () => {
  const { i18n } = useLingui()

  const arr = useMemo(() => {
    return [
      {
        title: t`Build`,
        desc: t`A channel connecting our members with researchers and developers to publish pioneering reports`,
        img: '/images/membership/screen2/0.png',
      },
      {
        title: t`Spark`,
        desc: t`A platform to discover potential co-hosts and sponsors for your next big industry event`,
        img: '/images/membership/screen2/1.png',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])

  return (
    <MotionStack
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.3 }}
      spacing={{
        base: px2vw(32),
        lg: 0,
      }}
      direction={'column'}
      m='auto'
      w='max-content'
    >
      {arr.map((item, index) => {
        const isLeft = index % 2 === 0
        return (
          <MotionStack
            variants={{
              offscreen: {
                opacity: 0,
                x: 100 * (isLeft ? -1 : 1),
              },
              onscreen: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.3,
                  delay: index * 0.5,
                },
              },
            }}
            key={index}
            direction={{
              base: 'column-reverse',
              lg: isLeft ? 'row' : 'row-reverse',
            }}
            spacing={0}
            h={{
              lg: '350px',
            }}
            w={{
              base: px2vw(315),
              lg: `${558 * 2}px`,
            }}
          >
            <Center
              w={{
                base: '100%',
                lg: '50%',
              }}
              h='100%'
            >
              <Center
                h='100%'
                alignItems={'flex-start'}
                flexDir={'column'}
                mr={{
                  lg: !isLeft ? '50px' : '0',
                }}
                ml={{
                  lg: isLeft ? '50px' : '0',
                }}
                px={{
                  base: px2vw(18),
                  lg: '60px',
                }}
                py={{
                  base: px2vw(28),
                  lg: '0',
                }}
                bgGradient={{
                  base: `linear(to-r, #8AF7FC, transparent)`,
                  lg: `linear(to-${isLeft ? 'l' : 'r'}, #8AF7FC, transparent)`,
                }}
              >
                <Text textStyle={'ch2'} color='#1D1D1D'>
                  {item?.title}
                </Text>
                <Text
                  textStyle={'csmp'}
                  color='#4E4E4E'
                  mt={{
                    base: px2vw(13),
                    lg: '36px',
                  }}
                >
                  {item?.desc}
                </Text>
              </Center>
            </Center>
            <Image
              src={item?.img}
              alt=''
              w={{
                base: '100%',
                lg: '50%',
              }}
              h={{
                base: px2vw(185),
                lg: '100%',
              }}
            />
          </MotionStack>
        )
      })}
    </MotionStack>
  )
}
