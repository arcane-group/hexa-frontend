import { Box } from '@chakra-ui/react'

// import { NoSSR } from '@/components/NoSSRWrapper'
// import { News } from '@/components/News'
import { LaunchingSoon } from '@/components/LaunchingSoon'

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh'>
        {/* <NoSSR>
          <News />
        </NoSSR> */}
        <LaunchingSoon />
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
