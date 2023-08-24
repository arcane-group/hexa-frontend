import { observer } from 'mobx-react-lite'
import { Box, Center, Input, Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { CropperModal } from '@/components/Cropper'
import { useStore } from '@/stores'
import { UserImg } from '@/components/UserImg'
import { Button } from '@/components/Button'
import { useModal } from '@/components/Modal'
import { px2vw } from '@/utils/px2vw'
import { fileToBase64, hashBlob } from '@/utils/blob2hash'

export const EditAvatar = observer(() => {
  useLingui()

  // 这个只是选择文件的loading  不包括上传文件
  const [isLoading, setLoading] = useState(false)

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null)

  const { walletStore } = useStore()

  const { onOpen, Modal, onClose, isOpen } = useModal({
    contentProps: {
      w: { base: px2vw(750), lg: 'max-content' },
      maxW: { base: px2vw(750), lg: 'max-content' },
    },
    blockScrollOnMount: false,
    children: (
      <CropperModal
        canvasWidth={300}
        canvasHeight={300}
        onOk={cropperHtml => {
          try {
            onClose()

            cropperHtml?.toBlob(async (blob: Blob) => {
              const fileName = await hashBlob('sha256', blob)
              const file = new File([blob], `${fileName}.png`, {
                type: 'image/png',
              })
              console.log('file:', file)
              // const url = await uploadFiles(file)
              // console.log('上传后的 url：', url)
              // setFieldValue(name, url)

              toast.success(t`Upload success`)
            }, 'image/png')
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
    <Center flexDir={'row'}>
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
      <Stack spacing={'20px'} direction={'row'} alignItems={'center'}>
        <UserImg src={walletStore?.userExtInfo?.pic} w='120px' h='120px' />
        <Box>
          <Box>
            <Button
              size='sm'
              isLoading={isLoading}
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
