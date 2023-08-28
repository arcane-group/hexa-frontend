import { useEffect, useRef } from 'react'
import Typed, { TypedOptions } from 'typed.js'

export const TypedBox = ({ text, opts }: { text: string[]; opts?: TypedOptions }) => {
  const el = useRef<HTMLSpanElement>(null)
  const typed = useRef<Typed>(null)

  useEffect(() => {
    const options: TypedOptions = {
      strings: text,
      typeSpeed: 15,
      showCursor: true,
      ...opts,
    }

    if (el.current) {
      // @ts-ignore
      typed.current = new Typed(el.current, options)
    }

    return () => {
      if (typed.current) {
        typed.current?.destroy()
      }
    }
  }, [text, opts])

  return <span ref={el} />
}
