import { Flex, Box, type FlexProps, Text, AspectRatio, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { CollectBtn } from '@/components/Library/CollectBtn'
import defaultImg from '@/assets/images/news/default.jpg'
import { px2vw } from '@/utils/px2vw'
import type { ArticleSchema } from '@/services/api/library'

export const LibraryCard = ({
  data,
  ...props
}: FlexProps & {
  data: ArticleSchema
}) => {
  const router = useRouter()

  return (
    <Flex
      flexDir={'column'}
      w={{ base: '100%', lg: '300px' }}
      h={{ lg: '570px' }}
      className='hover'
      {...props}
      onClick={() => {
        router.push({
          pathname: '/library/sub-page',
          query: {
            id: data?._id,
          },
        })
      }}
    >
      <AspectRatio maxW='100%' ratio={300 / 254}>
        <Image
          src={data?.image}
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
        pb={{
          base: px2vw(106),
          lg: '36px',
        }}
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
            {data?.title}
          </Text>
          <Box>
            <CollectBtn id={data?._id} iconH={'28px'} />
          </Box>
        </Flex>
        <Text
          color='#595959'
          textStyle={{ base: 'smp', lg: 'p' }}
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
          h={{
            base: px2vw(14 * 1.5 * 2),
            lg: `${16 * 1.5 * 2}px`,
          }}
        >
          {data?.text}
        </Text>
        <Text color='#595959' textStyle={{ base: 'smp', lg: 'p' }} mt='12px'>
          {dayjs(data?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
      </Box>
    </Flex>
  )
}
