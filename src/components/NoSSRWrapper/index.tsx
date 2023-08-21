import dynamic from 'next/dynamic'
import React from 'react'

const NoSSRWrapper = (props: any) => <React.Fragment>{props.children}</React.Fragment>

export const NoSSR = dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
})

export default NoSSR
