import { Box } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export const LaunchingSoon = () => {
  useLingui()

  return (
    <Box textStyle={'cp'} pt='200px' textAlign={'center'}>
      {t`Launching Soon`}
    </Box>
  )
}
