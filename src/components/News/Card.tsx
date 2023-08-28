import { Flex, Box, type FlexProps, Text, Stack, AspectRatio, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { LikeBtn } from './LikeBtn'
import { CollectBtn } from './CollectBtn'
import { UserImg } from '@/components/UserImg'
import defaultImg from '@/assets/images/news/default.jpg'
import { formatTime } from '@/utils/formatTime'
import px2vw from '@/utils/px2vw'

export const NewsCard = ({
  data,
  ...props
}: FlexProps & {
  data: any
}) => {
  const router = useRouter()

  return (
    <Flex
      pos='relative'
      flexDir={'column'}
      w={{ base: '100%', lg: '410px' }}
      h={{ lg: '720px' }}
      {...props}
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
        border: '2px solid',
        borderImageSource: 'linear-gradient(135deg, #1ECADC 0.8%, rgba(17, 71, 92, 0) 33.6%)',
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
        border: '2px solid',
        borderImageSource: 'linear-gradient(-45deg, #1ECADC 18.93%, rgba(21, 89, 115, 0) 27.54%)',
        borderImageSlice: 1,
      }}
      className='hover'
      _hover={{
        bgColor: 'whiteAlpha.300',
      }}
      transition={'all 0.3s'}
      onClick={() => {
        router.push({
          pathname: '/news-feed/sub-page',
          query: {
            id: data?.id,
          },
        })
      }}
    >
      <Box px='22px' pt='30px' pb='20px'>
        <Text textStyle={'h2'} color='#000000' className='ellipsis'>
          Title of Video screenTitle of Video screenTitle of Video screenTitle of Video screenTitle
          of Video screen
        </Text>
        <Stack direction={'row'} spacing={'20px'} alignItems={'center'} mt='14px'>
          <UserImg src={''} w='69px' h='69px' />
          <Stack
            direction={'column'}
            color='#595959'
            textStyle={'csmp'}
            spacing={0}
            className='ellipsis'
          >
            <Text className='ellipsis'>ellenellenellenellenellenellen</Text>
            <Text className='ellipsis'>{formatTime(1692930902631)}</Text>
          </Stack>
        </Stack>
      </Box>
      <AspectRatio maxW='100%' ratio={410 / 254}>
        <Image src={''} fallbackSrc={defaultImg.src} objectFit='cover' alt='' />
      </AspectRatio>
      <Box
        pos='relative'
        flex={1}
        px='25px'
        pt='22px'
        pb={{
          base: px2vw(106),
          lg: '36px',
        }}
        bgGradient={'linear-gradient(164.72deg, #8AF7FC 0%, rgba(138, 247, 252, 0) 75.08%)'}
      >
        <Text textStyle={'h2'} color='#000000' className='ellipsis'>
          MEMBER TITLE MEMBER TITLEMEMBER TITLEMEMBER TITLEMEMBER TITLE
        </Text>
        <Text
          color='#595959'
          textStyle={{ base: 'smp', lg: 'p' }}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
          }}
          overflow={'hidden'}
          textOverflow='ellipsis'
          display={'-webkit-box'}
          h={{
            base: px2vw(14 * 1.5 * 5),
            lg: `${16 * 1.5 * 5}px`,
          }}
        >
          Arcane welcomes the different, the trailblazers, the novel. If you have a growth mindset
          and deep，if you have Arcane welcomes the different, the trailblazers, the novel. If you
          have a growth mindset and deep，if you have Arcane welcomes the different, the
          trailblazers, the novel. If you have a growth mindset and deep，if you have Arcane
          welcomes the different, the trailblazers, the novel. If you have a growth mindset and
          deep，if you have Arcane welcomes the different, the trailblazers, the novel. If you have
          a growth mindset and deep，if you have Arcane welcomes the different, the trailblazers,
          the novel. If you have a growth mindset and deep，if you have Arcane welcomes the
          different, the trailblazers, the novel. If you have a growth mindset and deep，if you have
        </Text>
        <Stack direction='row' spacing={'18px'} mt='20px'>
          {['#dasd', '#dasdas', '#dsada'].map(item => {
            return (
              <Text key={item} color='#000000' textStyle={'p'}>
                {item}
              </Text>
            )
          })}
        </Stack>

        <Stack pos='absolute' bottom={'38px'} right={'21px'} direction='row' spacing={'25px'}>
          <LikeBtn id={data?.id} />
          <CollectBtn id={data?.id} />
        </Stack>
      </Box>
    </Flex>
  )
}
