import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { DynamicLoading } from '@/components/Loading'

const Members = dynamic(() => import('@/components/Members'), {
  ssr: false,
  loading: () => <DynamicLoading />,
})

const Page = () => {
  const {
    query: { category },
  } = useRouter()

  const categoryStr = Array.isArray(category) ? category[0] : category

  return (
    <>
      <Box as='main' minH='100vh'>
        {categoryStr ? <Members id={categoryStr} /> : null}
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
