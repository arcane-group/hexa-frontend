import { Box } from '@chakra-ui/react'

import { Membership } from '@/components/Membership'

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh'>
        <Membership />
      </Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'merbership',
    },
  }
}
