import { Flex, Box, type FlexProps, Text, Stack, AspectRatio, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { LikeBtn } from './LikeBtn'
import { CollectBtn } from './CollectBtn'
import { UserImg } from '@/components/UserImg'
import lineBgImg from '@/assets/svg/news/news-line.svg'
import defaultImg from '@/assets/images/news/default.jpg'
import { formatTime } from '@/utils/formatTime'

export const NewsCard = ({
  data,
  ...props
}: FlexProps & {
  data: any
}) => {
  const router = useRouter()

  return (
    <Flex
      flexDir={'column'}
      w='410px'
      h='720px'
      bgImage={lineBgImg.src}
      bgSize={'100% 100%'}
      bgColor={'transparent'}
      {...props}
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
        pb='36px'
        bgGradient={'linear-gradient(164.72deg, #8AF7FC 0%, rgba(138, 247, 252, 0) 75.08%)'}
      >
        <Text textStyle={'h2'} color='#000000' className='ellipsis'>
          MEMBER TITLE MEMBER TITLEMEMBER TITLEMEMBER TITLEMEMBER TITLE
        </Text>
        <Text
          color='#595959'
          textStyle={'p'}
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
          h={`${16 * 1.5 * 5}px`}
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
