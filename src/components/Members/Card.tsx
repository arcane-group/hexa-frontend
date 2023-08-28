import { Flex, Box, type FlexProps, Text, AspectRatio, Image } from '@chakra-ui/react'

import defaultImg from '@/assets/images/news/default.jpg'
import px2vw from '@/utils/px2vw'

export const MemberCard = ({
  data,
  ...props
}: FlexProps & {
  data: any
}) => {
  return (
    <Flex flexDir={'column'} w={{ base: '100%', lg: '300px' }} h={{ lg: '570px' }} {...props}>
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
        pb={{
          base: px2vw(106),
          lg: '36px',
        }}
        bgGradient={'linear-gradient(164.72deg, #8AF7FC 0%, rgba(138, 247, 252, 0) 75.08%)'}
      >
        <Text
          textStyle={'h2'}
          color='#000000'
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
        <Text color='#595959' textStyle={{ base: 'smp', lg: 'p' }} className='ellipsis'>
          Product/Service Info
        </Text>
        <Text color='#595959' textStyle={{ base: 'smp', lg: 'p' }} className='ellipsis'>
          Services available for Hexa Hub members
        </Text>
        <Text color='#595959' textStyle={{ base: 'smp', lg: 'p' }} className='ellipsis'>
          Discord ID
        </Text>
      </Box>
    </Flex>
  )
}
