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
      category: '1',
    },
  },
  {
    label: `LABS`,
    href: '/library/category/[id]',
    query: {
      category: '2',
    },
  },
  {
    label: `MARKET COMMENTARY`,
    href: '/library/category/[id]',
    query: {
      category: '3',
    },
  },
  {
    label: `PODCAST`,
    href: '/library/category/[id]',
    query: {
      category: '4',
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
