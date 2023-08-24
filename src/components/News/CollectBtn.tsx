import { AnimatePresence } from 'framer-motion'
import {
  type IconProps,
  Center,
  type CenterProps,
  type ButtonProps,
  Button,
} from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { toast } from 'react-toastify'
// import PubSub from 'pubsub-js'
import { useControllableValue } from 'ahooks'

import { likeNews } from '@/services/news'
import { MotionBox } from '@/components/Motion'
import { CollectIcon } from '@/assets/svg/news/index'

export const Collected = ({
  boxProps,
  ...props
}: IconProps & {
  boxProps?: CenterProps
}) => {
  return (
    <Center w='34px' h='30px' {...boxProps}>
      <CollectIcon stopColor='#1ecadc' stopOpacity='1' w='100%' h='100%' {...props} />
    </Center>
  )
}

export const UnCollect = ({
  boxProps,
  ...props
}: IconProps & {
  boxProps?: CenterProps
}) => {
  return (
    <Center w='34px' h='30px' {...boxProps}>
      <CollectIcon w='100%' h='100%' {...props} />
    </Center>
  )
}

export const CollectBtn = ({
  id,
  isLike = false,
  // num = 0,
  btnProps,
  iconH,
}: {
  id: string
  isLike?: boolean
  num?: number
  btnProps?: ButtonProps
  iconH?: any
}) => {
  useLingui()

  const [isLiked, setIsLiked] = useControllableValue<boolean>(
    {
      isLike,
    },
    {
      //   valuePropName: 'isLike',
      defaultValuePropName: 'isLike',
    }
  )
  // const [newnum, setNum] = useControllableValue<number>(
  //   {
  //     num,
  //   },
  //   {
  //     //   valuePropName: 'num',
  //     defaultValuePropName: 'num',
  //   }
  // )

  return (
    <Button
      className='hover'
      variant={'unstyled'}
      title={isLiked ? t`Unstar` : t`Star`}
      aria-label={isLiked ? t`Unstar` : t`Star`}
      color={'#000000'}
      fontSize={'24px'}
      w='max-content'
      minW='max-content'
      {...btnProps}
      alignItems={'center'}
      display={'flex'}
      onClick={async e => {
        if (btnProps?.onClick) {
          const res: any = await btnProps?.onClick?.(e)
          if (!res) {
            return
          }
        }

        // const newLikeState = !isLiked
        const res1 = await likeNews(id, isLiked ? 0 : 1)
          .then(r => {
            if (r?.data?.code >= 0) {
              return r?.data?.data
            }
            throw new Error(r?.data?.msg)
          })
          .catch(e => {
            toast.error(e?.message || (!isLiked ? t`Failed to star` : t`Failed to unstar`))
            return null
          })
        if (res1) {
          setIsLiked(!isLiked)
          // const n =
          //   typeof res1?.praise_count === 'number'
          //     ? res1.praise_count
          //     : newLikeState
          //     ? newnum + 1
          //     : newnum - 1
          // setNum(n)
          //   PubSub.publish(.LIKE_MOMENT, {
          //     mid,
          //     isLiked: newLikeState,
          //     praise_count: n,
          //   })
          return
        }
      }}
      leftIcon={
        <Center
          alignSelf={'center'}
          pos='relative'
          cursor={'pointer'}
          w={iconH || '34px'}
          h={iconH || '30px'}
        >
          {isLiked ? null : (
            <UnCollect
              boxProps={{
                pos: 'absolute',
                top: '50%',
                left: '50%',
                w: '100%',
                h: '100%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}

          <AnimatePresence>
            {isLiked && (
              <MotionBox initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Collected
                  boxProps={{
                    w: iconH,
                    h: iconH,
                  }}
                />
              </MotionBox>
            )}
          </AnimatePresence>
        </Center>
      }
    >
      {/* {newnum} */}
    </Button>
  )
}
