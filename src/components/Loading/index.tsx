'use client'

import { Center, Spinner, SpinnerProps } from '@chakra-ui/react'

export const Loading = (props: SpinnerProps) => (
  <Center overflow='hidden'>
    <Spinner size='lg' color='blackAlpha.500' {...props} />
  </Center>
)

export default Loading

export const DynamicLoading = () => (
  <Center h='100%' minH='60vh' w='100%'>
    <Spinner size='lg' color='blackAlpha.500' />
  </Center>
)
