import { Box } from '@chakra-ui/react'
// import dynamic from 'next/dynamic'

// import { DynamicLoading } from '@/components/Loading'

// const SubPage = dynamic(() => import('@/components/News/SubPage'), {
//   ssr: false,
//   loading: () => <DynamicLoading />,
// })

import { LaunchingSoon } from '@/components/LaunchingSoon'

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh'>
        {/* <SubPage /> */}
        <LaunchingSoon />
      </Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'News Sub Page',
      needPaddingHeader: true,
    },
  }
}
