import { AnimatePresence } from 'framer-motion'
import { Center, type ButtonProps, Button } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { toast } from 'react-toastify'
// import PubSub from 'pubsub-js'
import { useControllableValue } from 'ahooks'

import { save, remove } from '@/services/api/library'
import { MotionBox } from '@/components/Motion'
import { Collected, UnCollect } from '@/components/News/CollectBtn'
import { useStore } from '@/stores'

export const CollectBtn = ({
  id,
  isLike = false,
  // num = 0,
  btnProps,
  iconH,
}: {
  id?: string
  isLike?: boolean
  num?: number
  btnProps?: ButtonProps
  iconH?: any
}) => {
  useLingui()

  // TODO: 自己通过 id 去获取 用户信息里面的收藏列表  判断是否已经收藏
  const { walletStore } = useStore()

  const [isLiked, setIsLiked] = useControllableValue<boolean>(
    {
      isLike,
    },
    {
      //   valuePropName: 'isLike',
      defaultValuePropName: 'isLike',
    }
  )

  if (!id) {
    return null
  }

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
      h='max-content'
      {...btnProps}
      sx={{
        '.chakra-button__icon': {
          mr: '0px',
        },
      }}
      alignItems={'center'}
      display={'flex'}
      onClick={async e => {
        if (btnProps?.onClick) {
          const res: any = await btnProps?.onClick?.(e)
          if (!res) {
            return
          }
        }

        const fn = isLiked ? remove : save

        // const newLikeState = !isLiked
        const res1 = await fn(id, walletStore?.userInfo?.userId as string)
          .then(r => {
            if (r?.code >= 0) {
              return true
            }
            throw new Error(r?.msg)
          })
          .catch(e => {
            toast.error(e?.message || (!isLiked ? t`Failed to star` : t`Failed to unstar`))
            return null
          })
        if (res1) {
          setIsLiked(!isLiked)
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
