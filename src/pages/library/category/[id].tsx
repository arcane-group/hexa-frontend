import { Box } from '@chakra-ui/react'
import type { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'

import { DynamicLoading } from '@/components/Loading'

const Category = dynamic(() => import('@/components/Library/Category'), {
  ssr: false,
  loading: () => <DynamicLoading />,
})

const Page = () => {
  return (
    <>
      <Box as='main' minH='100vh'>
        <Category />
      </Box>
    </>
  )
}
export default Page

const pathCfg = [
  {
    label: `FOUNDER’S EXCLUSIVE`,
    href: '/library/category/[id]',
    query: {
      category: 'founders-exclusive',
    },
  },
  {
    label: `LABS`,
    href: '/library/category/[id]',
    query: {
      category: 'labs',
    },
  },
  {
    label: `MARKET COMMENTARY`,
    href: '/library/category/[id]',
    query: {
      category: 'market-commentary',
    },
  },
  {
    label: `PODCAST`,
    href: '/library/category/[id]',
    query: {
      category: 'podcasts',
    },
  },
].map(item => {
  return {
    id: item.query.category,
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
