import { Flex, Box, type FlexProps, Text, AspectRatio, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { CollectBtn } from '@/components/News/CollectBtn'
import defaultImg from '@/assets/images/news/default.jpg'

export const LibraryCard = ({
  data,
  ...props
}: FlexProps & {
  data: any
}) => {
  const router = useRouter()

  return (
    <Flex
      flexDir={'column'}
      w='300px'
      h='570px'
      className='hover'
      {...props}
      onClick={() => {
        router.push({
          pathname: '/library/sub-page',
          query: {
            id: data?.id,
          },
        })
      }}
    >
      <AspectRatio maxW='100%' ratio={300 / 254}>
        <Image
          src={''}
          fallbackSrc={defaultImg.src}
          objectFit='cover'
          alt=''
          border='3px solid'
          sx={{
            borderImage: 'linear-gradient(306.23deg, #1ECADC 1.23%, rgba(30, 202, 220, 0) 100%) 1',
          }}
        />
      </AspectRatio>

      <Box
        pos='relative'
        flex={1}
        px='16px'
        pt='21px'
        pb='36px'
        bgGradient={'linear-gradient(164.72deg, #8AF7FC 0%, rgba(138, 247, 252, 0) 75.08%)'}
      >
        <Flex justifyContent={'space-between'}>
          <Text
            textStyle={'h2'}
            color='#000000'
            flex={1}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
            overflow={'hidden'}
            textOverflow='ellipsis'
            display={'-webkit-box'}
            minH={`${22 * 1.5 * 2}px`}
          >
            MEMBER TITLE MEMBER TITLEMEMBER TITLEMEMBER TITLEMEMBER TITLE
          </Text>
          <Box>
            <CollectBtn id={data?.id} iconH={'28px'} />
          </Box>
        </Flex>
        <Text
          color='#595959'
          textStyle={'p'}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          overflow={'hidden'}
          textOverflow='ellipsis'
          display={'-webkit-box'}
          h={`${16 * 1.5 * 2}px`}
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
        <Text color='#595959' textStyle={'p'} mt='12px'>
          {dayjs(1692864161725).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
      </Box>
    </Flex>
  )
}