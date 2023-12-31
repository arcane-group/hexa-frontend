import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { DynamicLoading } from '@/components/Loading'

const Library = dynamic(() => import('@/components/Library'), {
  ssr: false,
  loading: () => <DynamicLoading />,
})

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh'>
        <Library />
      </Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Library',
      needPaddingHeader: true,
    },
  }
}
