'use client'

import { useCallback, useRef, useState } from 'react'
import { Center, HStack, Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Button } from '@/components/Button'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import { px2vw } from '@/utils/px2vw'

export const CropperModal = ({
  canvasWidth,
  canvasHeight,
  data,
  onOk,
}: {
  canvasWidth?: number
  canvasHeight?: number
  data: string
  onOk: (cropperHtml: any) => void
}) => {
  useLingui()

  const cropperRef = useRef<HTMLImageElement>(null)
  const [scaleX, setScaleX] = useState(1)

  const onCrop = useCallback(() => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    const cropperHtml = cropper.getCroppedCanvas({
      width: canvasWidth,
      height: canvasHeight,
    })

    onOk?.(cropperHtml)
  }, [onOk, canvasHeight, canvasWidth])

  const onReset = useCallback(() => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    cropper.reset()
  }, [])

  const onRotate = useCallback(() => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    cropper.rotate(-15)
  }, [])

  const onScale = useCallback(() => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    cropper.scaleX(-1 * scaleX)
    setScaleX(-1 * scaleX)
  }, [scaleX])

  return (
    <Center
      flexDir={'column'}
      w={{ base: px2vw(700 / 2), lg: '750px' }}
      h={{ base: px2vw(800 / 2, 750 / 2, true), lg: '80vh' }}
      pt='60px'
      pb='20px'
      px='12px'
      margin='auto'
    >
      <Center overflow={'hidden'} mb={{ base: px2vw(40), lg: '30px' }} w='100%' flex={1}>
        <Cropper
          src={data}
          dragMode='move'
          style={{ height: '100%', width: '100%' }}
          // Cropper.js options
          aspectRatio={1}
          guides={false}
          ref={cropperRef}
          autoCropArea={1}
          viewMode={1}
        />
      </Center>
      <Stack
        spacing={{ base: px2vw(40), lg: '20px' }}
        direction={{ base: 'column', lg: 'row' }}
        justifyContent={'center'}
        alignItems={'center'}
        mt='12px'
      >
        <HStack spacing={{ base: px2vw(40), lg: '12px' }}>
          <Button onClick={onReset} variant='ghost' size={'sm'}>{t`Reset`}</Button>
          <Button onClick={onRotate} variant='ghost' size={'sm'}>{t`Rotate 15`}</Button>
          <Button onClick={onScale} variant='ghost' size={'sm'}>{t`Scale`}</Button>
        </HStack>
        <Button onClick={onCrop} size={'sm'}>
          {t`Submit`}
        </Button>
      </Stack>
    </Center>
  )
}
export default CropperModal
