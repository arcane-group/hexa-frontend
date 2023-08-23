import { Box } from '@chakra-ui/react'

import { Members } from '@/components/Members'

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh'>
        <Members />
      </Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Members',
      needPaddingHeader: true,
    },
  }
}
