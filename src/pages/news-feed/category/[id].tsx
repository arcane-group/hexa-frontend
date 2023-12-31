import { Box } from '@chakra-ui/react'
import type { GetStaticProps, GetStaticPaths } from 'next'
// import dynamic from 'next/dynamic'

// import { DynamicLoading } from '@/components/Loading'

// const Category = dynamic(() => import('@/components/News/Category'), {
//   ssr: false,
//   loading: () => <DynamicLoading />,
// })

import { LaunchingSoon } from '@/components/LaunchingSoon'

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh'>
        {/* <Category /> */}
        <LaunchingSoon />
      </Box>
    </>
  )
}
export default Page

const pathCfg = [
  {
    label: `NEWS ARTICLES`,
    href: '/news-feed/category/1',
  },
  {
    label: `BLOGS`,
    href: '/news-feed/category/2',
  },
  {
    label: `TRENDING TWEETS`,
    href: '/news-feed/category/3',
  },
  {
    label: `DEV GUIDES`,
    href: '/news-feed/category/4',
  },
  {
    label: `PODCAST`,
    href: '/news-feed/category/5',
  },
].map(item => {
  return {
    id: item.href.split('/').pop(),
    ...item,
  }
})

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: pathCfg?.map(item => {
      return {
        params: {
          id: item.id,
        },
      }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const title = pathCfg.find(item => item.id === params?.id)?.label
  return {
    props: {
      title,
      needPaddingHeader: true,
    },
  }
}
