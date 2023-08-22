import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Link } from '@chakra-ui/next-js'

import { Container } from '@/components/Sign/Container'
import { useMemo } from 'react'

const Page = () => {
  const { i18n } = useLingui()

  const arr = useMemo(() => {
    return [
      {
        title: t`WHY JOIN HEXA HUB?`,
        desc: (
          <>
            {t`Apart from our services and solutions tailored to founders, we also are a community that promotes forming connections and fostering growth. By joining our community, you will have access to all of our events and an opportunity to connect, collaborate and create with some of the greatest minds in the emerging tech landscape.`}
            <br />
            {t`Did we mention our merch? We frequently gift our members with mystery boxes!`}
          </>
        ),
      },
      {
        title: t`HOW DO I RECEIVE A HEXA ARCANA?`,
        desc: (
          <>{t`Once the application has gone through, we will airdrop your Hexa Arcana to your wallet. Thus, please ensure the wallet address is correct in the application form!`}</>
        ),
      },
      {
        title: t`WHAT ARE THE PERKS FOR MEMBERS?`,
        desc: (
          <>
            {t`Hexa Hub members are a group of industry builders and researchers who are motivated to explore and experiment innovations. By joining us, you will be able to access and take part in all the research and insights formulated within our ecosystem.`}
            <br />
            {t`Hexa Arcana also acts as a pass to all our ecosystem partners through rewards, discounts, whitelists or partnerships.`}
            <br />
            {t`Did we mention the occasional airdrop of goodies? Yes, we did.`}
          </>
        ),
      },
      {
        title: t`WHY A MEMBERS-ONLY COMMUNITY?`,
        desc: (
          <>
            {t`A gated access into our community allows us to identify like-minded individuals who are core contributors and leaders within the emerging tech space. By curating our members list, we hope to assemble individuals that are aligned with the vision of bringing forward the paridgm shift into the next digital society.`}
            <br />
            {t`Most importantly, it helps us create an environment of openness and trust that enables deeper connections and richer conversations.`}
          </>
        ),
      },
      {
        title: t`IS THE MEMBERSHIP TRANSFERRABLE?`,
        desc: (
          <>{t`No. Our membership is tied with our soul bound tokens, hence non-transferrable. We want to ensure that every member within the community is vetted to ensure an open and intimate space for communication.`}</>
        ),
      },
      {
        title: t`IS IT ONLY AVAILABLE ON ETHEREUM?`,
        desc: <>{t`For now, Hexa Arcana will only be available on the Ethereum blockchain.`}</>,
      },
      {
        title: t`Why do I need to connect wallet/email?`,
        desc: (
          <>
            {t`If you signed up with email, by connecting your wallet, we will be able to verify your Hexa Arcana token. Once verified, you will be able to log in using email and enjoy all functions available on the Hexa Hub website.`}
            <br />
            {t`If you signed up by connecting wallet, by linking your email, you will be able to access your Hexa membership through email.`}
          </>
        ),
      },
      {
        title: t`WHAT IS THE APPLICATION PROCESS?`,
        desc: (
          <>
            {i18n.locale === 'zh' ? (
              <>TODO 中文</>
            ) : (
              <>
                {`Fill out the `}
                <Link
                  color='#03A9F4'
                  href={'/contact-us/membership-application'}
                >{t`application form`}</Link>
                {` and we will contact you either through Telegram, Twitter or Wechat. If you were referred by someone from our team, we will have a brief chat about your preferred role in our community. If you weren’t referred through our networks, we will have a chat with you about your knowledge and expertise as well as how you would like to apply that to our community.`}
              </>
            )}

            <br />
            {t`After which, an evaluation will be done. If you are accepted to Hexa Hub, we will airdrop your Hexa Arcana token to your wallet.`}
          </>
        ),
      },
      {
        title: t`WHAT KIND OF MEMBERS ARE WE LOOKING FOR?`,
        desc: (
          <>{t`At Hexa Hub, we are looking for leaders within the emerging tech landscape. Whether you are a project, an investor, ecosystem partner, builder, researcher or simply a digital enthusiast, Hexa Hub is the place for you to explore and develop your passion. We believe in the power of collaboration and the strength that comes from a diverse community.`}</>
        ),
      },
    ]
  }, [i18n.locale])

  return (
    <>
      <Container spacing='52px'>
        <Box maxW='100%' pt='0px'>
          <Text textStyle={'ch2'} color='#000000' mb='20px' fontWeight={700}>{t`FAQs`}</Text>
          <Box
            sx={{
              columnCount: {
                base: 1,
                lg: 2,
              },
              columnGap: '64px',
              counterReset: 'count',
            }}
          >
            {arr.map((item, index) => (
              <Box
                key={index}
                mb='45px'
                sx={{
                  pageBreakInside: 'avoid',
                }}
              >
                <Text textStyle={'csmp'} color='#000'>
                  {item?.title}
                </Text>
                <Box
                  pos='relative'
                  textStyle={'smp'}
                  color='#616161'
                  py='14px'
                  px='15'
                  _before={{
                    userSelect: 'none',
                    pointerEvents: 'none',
                    display: 'block',
                    pos: 'absolute',
                    zIndex: 0,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    content: '""',
                    border: '1px solid',
                    borderImageSource:
                      'linear-gradient(135deg, #11475C 0.8%, rgba(17, 71, 92, 0) 33.6%)',
                    borderImageSlice: 1,
                  }}
                  _after={{
                    userSelect: 'none',
                    pointerEvents: 'none',
                    display: 'block',
                    pos: 'absolute',
                    zIndex: 0,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    content: '""',
                    border: '1px solid',
                    borderImageSource:
                      'linear-gradient(-45deg, #155973 18.93%, rgba(21, 89, 115, 0) 27.54%)',
                    borderImageSlice: 1,
                  }}
                >
                  {item.desc}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'FAQs',
      headerPosition: 'relative',
    },
  }
}
