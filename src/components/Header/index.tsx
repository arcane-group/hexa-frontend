import {
  Box,
  Flex,
  Image,
  Collapse,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  StackDivider,
  Divider,
  Text,
  useDisclosure,
  Icon,
  Center,
  type ResponsiveValue,
  IconButton,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { RemoveScroll } from 'react-remove-scroll'
import { memo, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ChevronRightIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Link } from '@chakra-ui/next-js'
import dynamic from 'next/dynamic'
import type * as CSS from 'csstype'
import { Global } from '@emotion/react'

import { MotionBox, MotionCenter } from '@/components/Motion'
import { Button as MyButton } from '@/components/Button'
import { Container } from '@/components/Container'
import { LangSwitcher } from '@/components/LangSwitcher'
import { px2vw } from '@/utils/px2vw'
import Logo from '@/assets/images/header/logo.png'
import { CurNavIcon } from '@/assets/svg/header/index'
import { usePageStore } from '@/hooks/usePageStore'
import { useStore } from '@/stores'

const WalletLogin = dynamic(() => import('./Wallet'), { ssr: false })

// 首页  首屏需要黑色系
const useColorMode = () => {
  const pageStore = usePageStore<any>('') as any
  if (pageStore?.isShow === false) {
    return 'dark'
  }
  return 'light'
}

interface NavItem {
  label: string
  children?: NavItem[]
  href?: string
  query?: {
    [key: string]: string
  }
  render?: (...p: any[]) => any
}

const Header = ({
  headerPosition = 'fixed',
}: {
  headerPosition?: ResponsiveValue<CSS.Property.Position>
}) => {
  const { i18n } = useLingui()

  const {
    commonStore: { isPC },
  } = useStore()

  const colorMode = useColorMode()

  const NAV_ITEMS: NavItem[] = useMemo(() => {
    return [
      {
        label: t`ABOUT`,
        href: '/',
      },
      {
        label: t`MEMBERSHIP`,
        href: '/membership',
      },
      {
        label: t`MEMBERS`,
        href: '/members',
        query: {
          category: 'all',
        },
        children: [
          {
            label: t`All members`,
            href: '/members',
            query: {
              category: 'all',
            },
          },
          {
            label: t`Project Founders`,
            href: '/members',
            query: {
              category: '1',
            },
          },
          {
            label: t`Investors`,
            href: '/members',
            query: {
              category: '2',
            },
          },
          {
            label: t`Service Providers`,
            href: '/members',
            query: {
              category: '3',
            },
          },
          {
            label: t`Researchers`,
            href: '/members',
            query: {
              category: '4',
            },
          },
        ],
      },
      {
        label: t`LIBRARY`,
        href: '/library',
        children: [
          {
            label: t`FOUNDER’S EXCLUSIVE`,
            href: '/library/category/[id]',
            query: {
              id: '1',
            },
          },
          {
            label: t`LABS`,
            href: '/library/category/[id]',
            query: {
              id: '2',
            },
          },
          {
            label: t`MARKET COMMENTARY`,
            href: '/library/category/[id]',
            query: {
              id: '3',
            },
          },
          {
            label: t`PODCAST`,
            href: '/library/category/[id]',
            query: {
              id: '4',
            },
          },
        ],
      },
      {
        label: t`NEWS FEED`,
        href: '/news-feed',
        children: [
          {
            label: t`NEWS ARTICLES`,
            href: '/news-feed/category/[id]',
            query: {
              id: '1',
            },
          },
          {
            label: t`BLOGS`,
            href: '/news-feed/category/[id]',
            query: {
              id: '2',
            },
          },
          {
            label: t`TRENDING TWEETS`,
            href: '/news-feed/category/[id]',
            query: {
              id: '3',
            },
          },
          {
            label: t`DEV GUIDES`,
            href: '/news-feed/category/[id]',
            query: {
              id: '4',
            },
          },
          {
            label: t`PODCAST`,
            href: '/news-feed/category/[id]',
            query: {
              id: '5',
            },
          },
        ],
      },
      {
        label: t`CONTACT US`,
        href: '/contact-us/membership-application',
        children: [
          {
            label: t`MEMBERSHIP APPLICATION`,
            href: '/contact-us/membership-application',
          },
          {
            label: t`CONSULTATION SERVICES`,
            href: '/contact-us/consultation-services',
          },
          {
            label: t`FAQs`,
            href: '/contact-us/faq',
          },
          {
            label: t`ENQUIRIES`,
            href: '/contact-us/enquiries',
          },
        ],
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])

  const { isOpen, onToggle, onClose } = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', onClose)
    return () => {
      router.events.off('routeChangeComplete', onClose)
    }
  }, [router.events, onClose])

  return (
    <>
      <Global
        styles={{
          'html, body': {
            color: colorMode === 'dark' ? '#8AF7FC' : '#1D1D1D',
            backgroundColor: colorMode === 'dark' ? '#202020' : '#FDD9A6',
          },
        }}
      />
      <MotionCenter
        as='header'
        pos={headerPosition}
        zIndex={9}
        top={'0'}
        left={'0'}
        right={'0'}
        flexDir={'column'}
        w={'full'}
        h={{
          base: px2vw(35 + 26 * 2),
          lg: '120px',
        }}
        animate={colorMode}
        initial={{
          background: 'transparent',
        }}
        variants={{
          dark: {
            background: '#202020',
            transition: {
              duration: 0.3,
            },
          },
          light: {
            background: '#FBD59F',
            transition: {
              duration: 0.3,
            },
          },
        }}
      >
        <Container px={{ base: px2vw(20), lg: '40px', xxl: '80px' }}>
          <Flex
            display={'flex'}
            alignItems='center'
            justifyContent={'space-between'}
            w='full'
            h='48px'
          >
            <Center
              textStyle={'cp'}
              display={{
                base: 'none',
                lg: 'flex',
              }}
            >
              <Image
                w={{ base: px2vw(90), lg: '48px' }}
                src={Logo.src}
                borderRadius={'10px'}
                alt='Logo'
                display='block'
                ignoreFallback
                textTransform={'uppercase'}
              />
              HEXA HUB
            </Center>

            <MyButton
              aria-label='Toggle Navigation'
              size='sm'
              display={{
                base: 'block',
                lg: 'none',
              }}
              onClick={onToggle}
              color={colorMode === 'dark' ? '#8AF7FC' : '#000'}
            >{t`Menu`}</MyButton>

            <WalletLogin colorMode={colorMode} />
          </Flex>

          <Flex
            display={{
              base: 'none',
              lg: 'flex',
            }}
            alignItems='center'
            justifyContent={'space-between'}
            mt={'6px'}
            w='full'
            h='48px'
          >
            <DesktopNav navs={NAV_ITEMS} colorMode={colorMode} />
            <LangSwitcher />
          </Flex>

          <RemoveScroll enabled={isPC ? false : isOpen} forwardProps>
            <MotionBox
              display={{
                base: 'block',
                lg: 'none',
              }}
              pos='absolute'
              left={0}
              top={0}
              right={0}
              height={0}
              pt={px2vw(35 + 26 * 2)}
              zIndex={4}
              bg={isOpen ? '#FBD59F' : 'transparent'}
              animate={isOpen ? 'open' : 'closed'}
              variants={{
                open: {
                  opacity: 1,
                  height: '100vh',
                  zIndex: 4,
                  display: isPC ? 'none' : 'block',
                },
                closed: {
                  opacity: 0,
                  height: 0,
                  zIndex: 0,
                  display: 'none',
                },
              }}
            >
              <Box
                pos='absolute'
                right={px2vw(20)}
                top={px2vw(32)}
                opacity={isOpen ? 1 : 0}
                color={'#000'}
              >
                <LangSwitcher />
              </Box>
              <IconButton
                isRound={true}
                variant='solid'
                bgColor={'#FBD59F'}
                size='sm'
                aria-label='Toggle Navigation'
                pos='absolute'
                left={px2vw(20)}
                top={px2vw(26)}
                onClick={onClose}
                icon={<CloseIcon />}
                opacity={isOpen ? 1 : 0}
              />
              <Collapse in={isOpen} animateOpacity endingHeight='100%'>
                <MobileNav navs={NAV_ITEMS} colorMode={colorMode} />
              </Collapse>
            </MotionBox>
          </RemoveScroll>
        </Container>
      </MotionCenter>
    </>
  )
}

// PC Nav
// eslint-disable-next-line react/display-name
const DesktopNav = memo(
  ({ navs, colorMode }: { navs?: NavItem[]; colorMode: 'dark' | 'light' }) => {
    const router = useRouter()

    return (
      <Stack
        userSelect={'none'}
        direction='row'
        spacing={{
          lg: '35px',
          xxl: '40px',
        }}
        align='center'
        pl='30px'
        textTransform={'uppercase'}
      >
        {Array.isArray(navs) &&
          navs.map((navItem: NavItem, index) => {
            let isCur = navItem?.href ? router.pathname === navItem.href : false
            if (!isCur) {
              isCur = router.pathname.includes(`${navItem.href}/`)
            }
            if (!isCur) {
              if (Array.isArray(navItem?.children) && navItem?.children.length > 0) {
                for (let i = 0; i < navItem.children.length; i++) {
                  const item = navItem?.children[i]
                  if (isCur === false && item?.href && router.pathname === item.href) {
                    isCur = true
                    break
                  }
                  isCur = false
                }
              }
            }

            return (
              <Box key={navItem.label || index}>
                <Popover trigger='hover' placement='bottom-start' id={`${navItem.label}-${index}`}>
                  <PopoverTrigger>
                    <Box pos='relative'>
                      {isCur && (
                        <CurNavIcon
                          w='16px'
                          h='16px'
                          pos='absolute'
                          left={`${-(8 + 16)}px`}
                          top='50%'
                          transform='translateY(-50%)'
                        />
                      )}
                      <Link
                        whiteSpace={'nowrap'}
                        href={{
                          pathname: navItem.href ?? '#',
                          query: navItem.query,
                        }}
                        display={{ lg: 'inline-block' }}
                        cursor={navItem.href === '#' ? 'default' : 'pointer'}
                        position='relative'
                        py='6px'
                        textStyle='cp'
                        fontWeight={isCur ? 700 : 400}
                        color={
                          colorMode === 'dark'
                            ? isCur
                              ? '#8AF7FC'
                              : '#616161'
                            : isCur
                            ? '#1D1D1D'
                            : '#C29B60'
                        }
                        _hover={{
                          textDecoration: 'none',
                          color: colorMode === 'dark' ? '#8AF7FC' : '#1D1D1D',
                        }}
                      >
                        {navItem.label}
                      </Link>
                    </Box>
                  </PopoverTrigger>
                  {Array.isArray(navItem?.children) && navItem?.children.length > 0 && (
                    <PopoverContent
                      border={0}
                      borderRadius={0}
                      boxShadow='xl'
                      py={2}
                      px={0}
                      minW='max-content'
                      w='max-content'
                      bgGradient={
                        colorMode === 'dark'
                          ? 'linear(to-b, #202020 60%, #155973)'
                          : 'linear(to-b, #FBD59F 20%, #F1B967)'
                      }
                    >
                      <Stack spacing={0}>
                        {navItem.children.map((child: NavItem) => (
                          <DesktopSubNav key={child.label} colorMode={colorMode} {...child} />
                        ))}
                      </Stack>
                    </PopoverContent>
                  )}
                </Popover>
              </Box>
            )
          })}
      </Stack>
    )
  }
)
const DesktopSubNav = ({
  label,
  href,
  query,
  colorMode,
}: NavItem & {
  colorMode: 'dark' | 'light'
}) => {
  const router = useRouter()

  const isCur = useMemo(() => {
    const isCur = href && router.pathname.includes(href)
    if (query) {
      const queryKeys = Object.keys(query)
      if (queryKeys.length > 0) {
        for (let i = 0; i < queryKeys.length; i++) {
          const key = queryKeys[i]
          if (router.query[key] === query[key]) {
            return isCur
          }
        }
        return false
      }
    }
    return isCur
  }, [query, href, router.pathname, router.query])

  return (
    <Link
      href={{
        pathname: href,
        query,
      }}
      role='group'
      display='block'
      px={4}
      py={2}
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Stack direction='row' align='center'>
        <Box>
          <Text
            textStyle='csmp'
            transition='all .3s ease'
            color={
              colorMode === 'dark' ? (isCur ? '#8AF7FC' : '#616161') : isCur ? '#1D1D1D' : '#C29B60'
            }
            _groupHover={{
              color: colorMode === 'dark' ? '#8AF7FC' : '#616161',
            }}
          >
            {label}
          </Text>
        </Box>
        <Flex
          transition='all .3s ease'
          transform='translateX(-10px)'
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justifyContent='flex-end'
          align='center'
          flex={1}
        >
          <Icon
            color={colorMode === 'dark' ? '#8AF7FC' : '#616161'}
            fontSize='14'
            w={5}
            h={5}
            as={ChevronRightIcon}
          />
        </Flex>
      </Stack>
      <Divider
        borderColor={
          colorMode === 'dark' ? (isCur ? '#8AF7FC' : '#616161') : isCur ? '#1D1D1D' : '#C29B60'
        }
        _groupHover={{
          borderColor: colorMode === 'dark' ? '#8AF7FC' : '#616161',
        }}
      />
    </Link>
  )
}

// H5 Nav
// eslint-disable-next-line react/display-name
const MobileNav = memo(({ navs, colorMode }: { navs?: NavItem[]; colorMode: 'dark' | 'light' }) => {
  return (
    <Stack
      userSelect={'none'}
      className='body-scroll'
      height={'100%'}
      overflow={'auto'}
      px={px2vw(20)}
      pb={px2vw(100)}
      spacing={0}
      divider={<StackDivider borderColor='rgba(255, 255, 255, 0.2)' borderStyle={'dashed'} />}
    >
      {Array.isArray(navs) &&
        navs.map(navItem => (
          <MobileNavItem key={navItem.label} colorMode={colorMode} {...navItem} />
        ))}
    </Stack>
  )
})
const MobileNavItem = ({
  colorMode,
  label,
  href,
  children,
  ...navItem
}: NavItem & {
  colorMode: 'dark' | 'light'
}) => {
  const router = useRouter()
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })
  const hasChild: boolean = Array.isArray(children) && children.length > 0

  let isCur = href ? router.pathname === href : false
  if (!isCur) {
    isCur = router.pathname.includes(`${href}/`)
  }
  if (!isCur) {
    if (Array.isArray(children) && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        const item = children[i]
        if (isCur === false && item?.href && router.pathname === item.href) {
          isCur = true
          break
        }
        isCur = false
      }
    }
  }

  const main = (
    <>
      <Text
        color={isCur ? '#1D1D1D' : '#C29B60'}
        textStyle={'cp'}
        py={px2vw(12)}
        pr='20px'
        minW={px2vw(200)}
      >
        {label}
      </Text>
      {hasChild && (
        <Center
          py={px2vw(12)}
          flex={1}
          justifyContent={'flex-end'}
          onClick={e => {
            e.preventDefault?.()
            e.stopPropagation?.()
            onToggle?.()
          }}
        >
          <Icon
            as={ChevronDownIcon}
            transition='all .25s ease-in-out'
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={px2vw(24)}
            h={px2vw(24)}
            color='#C29B60'
          />
        </Center>
      )}
    </>
  )

  return (
    <Stack textTransform={'uppercase'} spacing={px2vw(2)}>
      {!href ? (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          _hover={{
            textDecoration: 'none',
          }}
        >
          {main}
        </Box>
      ) : (
        <Link
          display='flex'
          href={{
            pathname: href ?? '#',
            query: navItem.query,
          }}
          justifyContent='space-between'
          alignItems='center'
          _hover={{
            textDecoration: 'none',
          }}
        >
          {main}
        </Link>
      )}

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0 !important' }}>
        <Stack pl={4} align='start' mb={px2vw(12)} spacing={px2vw(2)}>
          {children?.map((child: NavItem) => {
            return <MobileNavItem2 key={child.label} colorMode={colorMode} {...child} />
          })}
        </Stack>
      </Collapse>
    </Stack>
  )
}
const MobileNavItem2 = ({
  // colorMode,
  label,
  href,
  query,
}: NavItem & {
  colorMode: 'dark' | 'light'
}) => {
  const router = useRouter()

  const isCur = useMemo(() => {
    const isCur = href && router.pathname.includes(href)
    if (query) {
      const queryKeys = Object.keys(query)
      if (queryKeys.length > 0) {
        for (let i = 0; i < queryKeys.length; i++) {
          const key = queryKeys[i]
          if (router.query[key] === query[key]) {
            return isCur
          }
        }
        return false
      }
    }
    return isCur
  }, [query, href, router.pathname, router.query])

  return (
    <Link
      href={{
        pathname: href,
        query,
      }}
      py={px2vw(6)}
      textStyle={'smp'}
      color={isCur ? '#616161' : '#C29B60'}
    >
      {label}
    </Link>
  )
}

export default observer(Header)
