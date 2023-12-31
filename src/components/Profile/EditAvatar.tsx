import { observer } from 'mobx-react-lite'
import { Box, Center, Input, Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from 'ahooks'

import { CropperModal } from '@/components/Cropper'
import { useStore } from '@/stores'
import { UserImg } from '@/components/UserImg'
import { Button } from '@/components/Button'
import { useModal } from '@/components/Modal'
import { px2vw } from '@/utils/px2vw'
import {
  fileToBase64,
  // hashBlob
} from '@/utils/blob2hash'
import { editInfo } from '@/services/api/user'

export const EditAvatar = observer(() => {
  useLingui()

  // 这个只是选择文件的loading  不包括上传文件
  const [isLoading, setLoading] = useState(false)

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null)

  const { walletStore } = useStore()

  const { loading, run } = useRequest(
    async data => {
      const res = await editInfo(`${walletStore?.userInfo?.userId}`, {
        avatar: data,
      }).catch(() => {
        return null
      })
      if (res && res?.code >= 0) {
        walletStore?.setUserExtInfo(
          walletStore?.userExtInfo
            ? {
                ...walletStore?.userExtInfo,
                avatar: data,
              }
            : null
        )
        toast.success(t`Success`)
      } else {
        toast.error(res?.data?.msg || 'App error')
      }
    },
    {
      manual: true,
    }
  )

  const { onOpen, Modal, onClose, isOpen } = useModal({
    contentProps: {
      w: { base: px2vw(750), lg: 'max-content' },
      maxW: { base: px2vw(750), lg: 'max-content' },
    },
    blockScrollOnMount: false,
    children: (
      <CropperModal
        canvasWidth={160}
        canvasHeight={160}
        onOk={(cropperHtml: HTMLCanvasElement) => {
          try {
            onClose()

            const dataUrl = cropperHtml?.toDataURL('image/png')
            console.log('upload image data:', dataUrl)

            run?.(dataUrl)

            // cropperHtml?.toBlob(async (blob: Blob) => {
            //   console.log('blob:', blob)
            //   // const fileName = await hashBlob('sha256', blob)
            //   // const file = new File([blob], `${fileName}.png`, {
            //   //   type: 'image/png',
            //   // })
            //   // console.log('file:', file)
            //   // const url = await uploadFiles(file)
            //   // console.log('上传后的 url：', url)
            //   // setFieldValue(name, url)

            //   toast.success(t`Upload success`)
            // }, 'image/png')
          } catch (e) {
            console.error(e)
          }
        }}
        data={''}
      />
    ),
  })

  useEffect(() => {
    if (isOpen === false) {
      setLoading(false)
    }
  }, [isOpen])

  return (
    <Center flexDir={'row'} w={{ base: '100%', lg: 'max-content' }}>
      {Modal}
      <Input
        ref={inputRef}
        type='file'
        hidden
        accept='image/png, image/jpeg'
        onChange={async e => {
          try {
            if (e?.target?.files?.[0]) {
              setLoading(true)
              const str = await fileToBase64(e.target.files[0])
              onOpen(str)
            }
          } catch (e: any) {
            console.error(e)

            toast.error(e?.message || t`Upload failed`)
          }
        }}
      />
      <Stack
        spacing={'20px'}
        direction={'row'}
        alignItems={'center'}
        w={{ base: '100%', lg: 'max-content' }}
      >
        <UserImg
          src={walletStore?.userExtInfo?.avatar}
          w={{ base: px2vw(84), lg: '120px' }}
          h={{ base: px2vw(84), lg: '120px' }}
        />
        <Box>
          <Box>
            <Button
              size='sm'
              isLoading={isLoading || loading}
              height={'26px'}
              onClick={() => {
                inputRef?.current?.value && (inputRef.current.value = '')
                inputRef?.current?.click()
              }}
            >{t`Upload Profile Pic`}</Button>
          </Box>
        </Box>
      </Stack>
    </Center>
  )
})
