import { Box } from '@chakra-ui/react'

import dynamic from 'next/dynamic'
import { DynamicLoading } from '@/components/Loading'

const Profile = dynamic(() => import('@/components/Profile'), {
  ssr: false,
  loading: () => <DynamicLoading />,
})

const Page = () => {
  return (
    <>
      <Box as='main' minH={'100vh'}>
        <Profile />
      </Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'My Account',
      needPaddingHeader: true,
    },
  }
}
