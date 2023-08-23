import { Box } from '@chakra-ui/react'

import { News } from '@/components/News'

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh'>
        <News />
      </Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'News Feed',
      needPaddingHeader: true,
    },
  }
}
