import { AnimatePresence } from 'framer-motion'
import { Center, type ButtonProps, Button } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'

import { save, remove, type ArticleSchema } from '@/services/api/library'
import { MotionBox } from '@/components/Motion'
import { Collected, UnCollect } from '@/components/News/CollectBtn'
import { useStore } from '@/stores'
import { useLibraryCollect } from '@/hooks/useLibraryCollect'

export const CollectBtn = observer(
  ({
    id,
    data,
    btnProps,
    iconH,
  }: {
    id: string
    data: ArticleSchema
    btnProps?: ButtonProps
    iconH?: any
  }) => {
    useLingui()

    const { walletStore } = useStore()

    const { isLiked, setIsLiked } = useLibraryCollect(id, data)

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
          e?.stopPropagation?.()
          e?.preventDefault?.()

          if (btnProps?.onClick) {
            const res: any = await btnProps?.onClick?.(e)
            if (!res) {
              return
            }
          }

          const fn = isLiked ? remove : save
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
      ></Button>
    )
  }
)
