import { Box } from '@chakra-ui/react'

import { Library } from '@/components/Library'

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
