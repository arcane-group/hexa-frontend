import { useLingui } from '@lingui/react'
import { Text, Stack } from '@chakra-ui/react'
import { useMemo } from 'react'

import { dynamicActivateLanguage } from '@/hooks/useLinguiInit'
import { ArrowIcon, BlueArrowIcon } from '@/assets/svg/header/index'

type LOCALES = 'en' | 'zh'

const languages: { [key: string]: string } = {
  en: `English`,
  zh: `中文`,
}

export function LangSwitcher () {
  const { i18n } = useLingui()

  async function handleChange (value: any) {
    const locale = value as LOCALES
    await dynamicActivateLanguage(locale)
  }

  const [enState, zhState] = useMemo(() => {
    console.log('i18n:', i18n.locale)
    return [
      {
        isCur: i18n.locale === 'en',
        hasRotate: i18n.locale === 'zh',
      },
      {
        isCur: i18n.locale === 'zh',
        hasRotate: i18n.locale === 'zh',
      },
    ]
  }, [i18n.locale])

  return (
    <Stack direction={'row'} spacing={'0'}>
      <Stack
        title={languages.en}
        className={enState?.isCur ? undefined : 'hover'}
        onClick={
          enState?.isCur
            ? undefined
            : () => {
                handleChange('en')
              }
        }
        direction={'row'}
        spacing={'11px'}
        alignItems={'center'}
      >
        <Text textStyle={'csmp'}>{languages.en}</Text>

        {enState?.isCur ? (
          <BlueArrowIcon
            w='22px'
            h='22px'
            transform={enState?.hasRotate ? 'rotate(180deg)' : undefined}
          />
        ) : (
          <ArrowIcon
            w='22px'
            h='22px'
            transform={enState?.hasRotate ? 'rotate(180deg)' : undefined}
          />
        )}
      </Stack>
      <Stack
        title={languages.zh}
        className={zhState?.isCur ? undefined : 'hover'}
        onClick={
          zhState?.isCur
            ? undefined
            : () => {
                handleChange('zh')
              }
        }
        direction={'row'}
        spacing={'11px'}
        alignItems={'center'}
      >
        {zhState?.isCur ? (
          <BlueArrowIcon
            w='22px'
            h='22px'
            transform={zhState?.hasRotate ? 'rotate(180deg)' : undefined}
          />
        ) : (
          <ArrowIcon
            w='22px'
            h='22px'
            transform={zhState?.hasRotate ? 'rotate(180deg)' : undefined}
          />
        )}
        <Text textStyle={'csmp'}>{languages.zh}</Text>
      </Stack>
    </Stack>
  )
}
