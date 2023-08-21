import { Box } from '@chakra-ui/react'
import { NoSSR } from '@/components/NoSSRWrapper'

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh' className='noise-background'>
        <NoSSR></NoSSR>
      </Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Test',
      ignoreHeader: true,
      ignoreFooter: true,
    },
  }
}
