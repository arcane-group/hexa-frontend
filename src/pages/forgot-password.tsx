import { Box } from '@chakra-ui/react'

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh'></Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Forgot Password',
    },
  }
}
