'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalContentProps,
  useMediaQuery,
} from '@chakra-ui/react'
import {
  Children,
  ReactElement,
  cloneElement,
  JSXElementConstructor,
  useState,
  useCallback,
} from 'react'
import Confetti from 'react-confetti'
import { useDeepCompareEffect } from 'ahooks'

import { px2vw } from '@/utils/px2vw'

const isServer = typeof window === 'undefined'

interface ModalViewProps<TData> {
  title?: string | ((data?: any) => string)
  isOpen: boolean
  onClose: () => void
  data?: TData
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ((props: {
        isOpen: boolean
        onClose: () => void
        data?: TData
      }) => ReactElement<any, string | JSXElementConstructor<any>>)
  contentProps?: ModalContentProps
  hasCloseBtn?: boolean
  closeOnOverlayClick?: boolean
  hasConfetti?: boolean
  blockScrollOnMount?: boolean
}

function ModalView<TData> ({
  title,
  onClose,
  isOpen,
  children,
  data,
  hasCloseBtn = true,
  contentProps,
  closeOnOverlayClick,
  hasConfetti = false,
  blockScrollOnMount = true,
}: ModalViewProps<TData>) {
  const [isPC] = useMediaQuery(`(min-width: ${768}px)`)
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      motionPreset='slideInBottom'
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={false}
      closeOnOverlayClick={typeof closeOnOverlayClick !== 'undefined' ? closeOnOverlayClick : false}
      scrollBehavior={isPC ? 'outside' : 'inside'}
      isCentered={isPC}
      blockScrollOnMount={blockScrollOnMount}
    >
      <ModalOverlay>{hasConfetti ? <Confetti /> : null}</ModalOverlay>

      <ModalContent
        my='0'
        pos='absolute'
        left={{ base: '0', lg: 'auto' }}
        bottom={{ base: '0', lg: 'auto' }}
        w={{ base: px2vw(750), lg: '400px' }}
        minW={{ base: px2vw(750), lg: '400px' }}
        maxW={{ base: px2vw(750), lg: '400px' }}
        maxH='100vh'
        bgSize='100% 100%'
        p={0}
        {...contentProps}
      >
        {title && (
          <ModalHeader
            textStyle={'h2'}
            fontWeight='bold'
            color='#000000'
            px={{ base: px2vw(64), lg: '27px' }}
            pt={{ base: px2vw(48), lg: '24px' }}
            pb={{ base: px2vw(32), lg: '16px' }}
            borderStyle='solid'
            borderBottomWidth={'1px'}
            // borderColor='blackAlpha.200'
            borderColor='rgba(224, 226, 228, 1)'
          >
            {typeof title === 'function' ? title?.(data) : title}
          </ModalHeader>
        )}
        {hasCloseBtn && (
          <ModalCloseButton
            zIndex={2}
            top={{ base: px2vw(48), lg: '20px' }}
            right={{ base: px2vw(48), lg: '20px' }}
            w={{ base: px2vw(48), lg: '32px' }}
            h={{ base: px2vw(48), lg: '32px' }}
          />
        )}
        {/* scrollBehavior="inside" 时候 overflow="auto"， 会导致隐藏内容区 */}
        <ModalBody overflow='visible' p='0'>
          {typeof children === 'function'
            ? children({
                isOpen,
                onClose,
                data,
              })
            : children
            ? Children.map(children, child =>
                child
                  ? cloneElement(child, {
                      isOpen,
                      onClose,
                      data,
                    })
                  : child
              )
            : children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalView

export function useModal<TData = any> (
  opts: Pick<
    ModalViewProps<TData>,
    | 'title'
    | 'children'
    | 'data'
    | 'contentProps'
    | 'hasCloseBtn'
    | 'closeOnOverlayClick'
    | 'hasConfetti'
    | 'blockScrollOnMount'
  >
) {
  const { data: defaultData, children, ...resOpts } = opts

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState<TData | undefined>(defaultData)
  const [optsData, setOptsData] = useState(resOpts)

  const ThisModal = (
    <ModalView<TData> data={data} isOpen={isOpen} onClose={onClose} {...optsData}>
      {children}
    </ModalView>
  )

  const onOpenFn = useCallback(
    (
      v?: any,
      opts?: Pick<
        ModalViewProps<TData>,
        | 'title'
        | 'contentProps'
        | 'hasCloseBtn'
        | 'closeOnOverlayClick'
        | 'hasConfetti'
        | 'blockScrollOnMount'
      >
    ) => {
      typeof opts !== 'undefined' && opts && setOptsData({ ...optsData, ...opts })

      setData(v)

      setTimeout(() => {
        onOpen()
      }, 100)
    },
    [onOpen, optsData]
  )

  useDeepCompareEffect(() => {
    typeof resOpts !== 'undefined' && optsData && setOptsData({ ...optsData, ...resOpts })
  }, [resOpts])

  return {
    isOpen,
    onOpen: onOpenFn,
    onClose,
    Modal: isServer ? null : ThisModal,
  }
}
