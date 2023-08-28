import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useMemo } from 'react'
import { useRouter } from 'next/router'

import { LineButton } from '@/components/LineButton'
import { MotionCenter, MotionStack, MotionBox } from '@/components/Motion'
import { Container } from '@/components/Container'
import px2vw from '@/utils/px2vw'

export const Screen2 = () => {
  const { i18n } = useLingui()

  const { push } = useRouter()

  const arr = useMemo(() => {
    return [
      t`Become a panelist at major industry events...`,
      t`Publish your insights to an audience of industry leaders...`,
      t`Join our podcasts to share your unique experiences...`,
      t`And many more...`,
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])

  return (
    <>
      <MotionStack
        initial='offscreen'
        whileInView='onscreen'
        viewport={{ once: true, amount: 0.3 }}
        direction={'column'}
        spacing={'10px'}
      >
        {arr.map((item, index) => {
          return (
            <MotionCenter
              key={index}
              height={{
                base: px2vw(72),
                lg: '90px',
              }}
              border='1px solid #8AF7FC'
              bgGradient={`linear(to-${index % 2 === 1 ? 'l' : 'r'}, #9DD5EA, transparent)`}
              variants={{
                offscreen: {
                  opacity: 0,
                },
                onscreen: {
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    delay: index * 0.5,
                  },
                },
              }}
            >
              <Container
                maxW='xxl'
                textAlign={index % 2 === 1 ? 'right' : 'left'}
                px={{
                  base: px2vw(19),
                  lg: '138px',
                }}
              >
                <MotionBox
                  variants={{
                    offscreen: {
                      x: 100 * (index % 2 === 1 ? -1 : 1),
                    },
                    onscreen: {
                      x: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.3,
                      },
                    },
                  }}
                  textStyle={{
                    base: 'csmp',
                    lg: 'cp',
                  }}
                  color='#4E4E4E'
                >
                  {item}
                </MotionBox>
              </Container>
            </MotionCenter>
          )
        })}
      </MotionStack>

      <MotionCenter
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
              duration: 0.5,
              delay: 0.5,
            },
          },
        }}
        mt='43px'
      >
        <LineButton
          minW='210px'
          onClick={() => {
            push({
              pathname: '/contact-us/membership-application',
            })
          }}
        >{t`APPLY NOW`}</LineButton>
      </MotionCenter>
    </>
  )
}
