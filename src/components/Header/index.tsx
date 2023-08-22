import {
  Box,
  Flex,
  Image,
  Collapse,
  IconButton,
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
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { RemoveScroll } from 'react-remove-scroll'
import { memo, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ChevronRightIcon, ChevronDownIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Link } from '@chakra-ui/next-js'
import dynamic from 'next/dynamic'
import type * as CSS from 'csstype'

import { Container } from '@/components/Container'
import { LangSwitcher } from '@/components/LangSwitcher'
import { px2vw } from '@/utils/px2vw'
import Logo from '@/assets/images/header/logo.png'
import { CurNavIcon } from '@/assets/svg/header/index'

const WalletLogin = dynamic(() => import('./Wallet'), { ssr: false })

interface NavItem {
  label: string
  children?: NavItem[]
  href?: string
  render?: (...p: any[]) => any
}

const Header = ({
  headerPosition = 'fixed',
}: {
  headerPosition?: ResponsiveValue<CSS.Property.Position>
}) => {
  const { i18n } = useLingui()

  // const {
  //   commonStore: { isPC },
  // } = useStore()

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
        children: [
          {
            label: 'MEMBERS-1',
            href: '/members/1',
          },
          {
            label: 'MEMBERS-2',
            href: '/members/2',
          },
        ],
      },
      {
        label: t`LIBRARY`,
        children: [
          {
            label: 'LIBRARY-1',
            href: '/library/1',
          },
          {
            label: 'LIBRARY-2',
            href: '/library/2',
          },
          {
            label: 'LIBRARY-3',
            href: '/library/3',
          },
        ],
      },
      {
        label: t`NEWS FEED`,
        href: '/news-feed',
      },
      {
        label: t`CONTACT US`,
        children: [
          {
            label: 'Membership Application',
            href: '/contact-us/membership-application',
          },
          {
            label: 'Consultation Services',
            href: '/contact-us/consultation-services',
          },
          {
            label: 'FAQs',
            href: '/contact-us/faq',
          },
          {
            label: 'Enquiries',
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
    <Center
      as='header'
      pos={headerPosition}
      zIndex={9}
      top={'0'}
      left={'0'}
      right={'0'}
      flexDir={'column'}
      w={'full'}
      h={{
        base: px2vw(120),
        lg: '120px',
      }}
      bg={{
        base: 'blackAlpha.800',
        lg: '#FED18F',
      }}
      boxShadow={{
        base: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        lg: 'none',
      }}
    >
      <Container px={{ lg: '40px', xxl: '80px' }}>
        <Flex
          display={'flex'}
          alignItems='center'
          justifyContent={'space-between'}
          zIndex='3'
          w='full'
          h='48px'
        >
          <Center textStyle={'cp'}>
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

          <WalletLogin />
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
          <DesktopNav navs={NAV_ITEMS} />
          <LangSwitcher />
        </Flex>

        <RemoveScroll enabled={isOpen} forwardProps>
          <Box
            pos='fixed'
            zIndex='2'
            top='0'
            left='0'
            right='0'
            bottom='0'
            bg='black'
            display={!isOpen ? 'none' : 'block'}
          />
        </RemoveScroll>
        <Flex
          align='center'
          justify='center'
          pos='relative'
          zIndex='3'
          ml={px2vw(30)}
          display={{
            base: 'flex',
            lg: 'none',
          }}
        >
          <IconButton
            display={router.pathname.includes('share') ? 'none' : 'flex'}
            w={px2vw(40)}
            minW={px2vw(40)}
            h={px2vw(40)}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon fontSize={18} /> : <HamburgerIcon fontSize={24} />}
            _active={{ bgColor: 'transparent' }}
            _hover={{ bgColor: 'transparent' }}
            variant='ghost'
            aria-label='Toggle Navigation'
            color={'white'}
          />
        </Flex>
        <Box
          pos='absolute'
          left={0}
          top={px2vw(120)}
          right={0}
          borderTop={isOpen ? '1px solid rgba(255,255,255,0.2)' : 'none'}
          px={px2vw(64)}
          zIndex='4'
        >
          <Collapse in={isOpen} animateOpacity>
            <MobileNav navs={NAV_ITEMS} />
          </Collapse>
        </Box>
      </Container>
    </Center>
  )
}

// PC Nav
// eslint-disable-next-line react/display-name
const DesktopNav = memo(({ navs }: { navs?: NavItem[] }) => {
  const router = useRouter()
  return (
    <Stack
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
          let isCur = false
          if (Array.isArray(navItem?.children) && navItem?.children.length > 0) {
            for (let i = 0; i < navItem.children.length; i++) {
              const item = navItem?.children[i]
              if (isCur === false && item?.href && router.pathname.includes(item.href)) {
                isCur = true
                break
              }
              isCur = false
            }
          } else if (navItem?.href === '/') {
            isCur = router.pathname === navItem?.href
          } else {
            isCur = navItem?.href ? router.pathname === navItem.href : false
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
                      href={navItem.href ?? '#'}
                      display={{ lg: 'inline-block' }}
                      cursor={navItem.href === '#' ? 'default' : 'pointer'}
                      position='relative'
                      py='6px'
                      textStyle='cp'
                      fontWeight={isCur ? 700 : 400}
                      color={isCur ? '#1D1D1D' : '#C29B60'}
                      _hover={{
                        textDecoration: 'none',
                        color: '#1D1D1D',
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
                    bgGradient='linear(to-b, #FCD090, #F1B967)'
                  >
                    <Stack spacing={0}>
                      {navItem.children.map((child: NavItem) => (
                        <DesktopSubNav key={child.label} {...child} />
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
})
const DesktopSubNav = ({ label, href }: NavItem) => {
  const router = useRouter()
  const isCur = href && router.pathname.includes(href)
  return (
    <Link
      href={`${href}`}
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
            color={isCur ? '#616161' : '#C29B60'}
            _groupHover={{ color: '#616161' }}
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
          <Icon color='#616161' fontSize='14' w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
      <Divider
        borderColor={isCur ? '#616161' : '#C29B60'}
        _groupHover={{
          borderColor: '#616161',
        }}
      />
    </Link>
  )
}

// H5 Nav
// eslint-disable-next-line react/display-name
const MobileNav = memo(({ navs }: { navs?: NavItem[] }) => {
  return (
    <Stack
      fontSize={px2vw(36)}
      lineHeight={px2vw(44)}
      spacing={0}
      divider={<StackDivider borderColor='rgba(255, 255, 255, 0.2)' borderStyle={'dashed'} />}
    >
      {Array.isArray(navs) &&
        navs.map(navItem => <MobileNavItem key={navItem.label} {...navItem} />)}
    </Stack>
  )
})
const MobileNavItem = ({ label, href, children, ...navItem }: NavItem) => {
  const router = useRouter()
  const { isOpen, onToggle } = useDisclosure()
  const hasChild: boolean = Array.isArray(children) && children.length > 0

  const isCur = href
    ? href === '/'
      ? router.pathname === href
      : router.pathname.includes(`${href}`)
    : false

  if (typeof navItem?.render === 'function') {
    return navItem?.render({
      navItem: {
        ...navItem,
        label,
        href,
        children,
      },
      isCur,
      colorTheme: 'dark',
    })
  }

  return (
    <Stack
      textTransform={'uppercase'}
      // spacing={px2vw(2)}
      onClick={children && onToggle}
      // divider={<StackDivider borderColor="rgba(255, 255, 255, 0.2)" borderStyle={'dashed'} />}
    >
      {!href ? (
        <Box
          display='flex'
          py={px2vw(36)}
          justifyContent='space-between'
          alignItems='center'
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text color={isCur ? 'green.400' : 'white'}>{label}</Text>
          {hasChild && (
            <Icon
              as={ChevronDownIcon}
              transition='all .25s ease-in-out'
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={px2vw(48)}
              h={px2vw(48)}
              color='gray.200'
            />
          )}
        </Box>
      ) : (
        <Link
          display='flex'
          py={px2vw(36)}
          href={href}
          justifyContent='space-between'
          alignItems='center'
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text color={isCur ? 'green.400' : 'white'}>{label}</Text>
          {hasChild && (
            <Icon
              as={ChevronDownIcon}
              transition='all .25s ease-in-out'
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={px2vw(48)}
              h={px2vw(48)}
              color='gray.200'
            />
          )}
        </Link>
      )}

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0 !important' }}>
        <Stack pl={4} align='start' mb={px2vw(48)}>
          {children?.map((child: NavItem) => {
            const isCur1 = child.href ? router.pathname.includes(`${child.href}`) : false
            return (
              <Link
                key={child.label}
                href={`${child.href}`}
                py={px2vw(32)}
                textStyle='16'
                color={isCur1 ? 'green.400' : 'gray.200'}
              >
                {child.label}
              </Link>
            )
          })}
        </Stack>
      </Collapse>
    </Stack>
  )
}
export default observer(Header)
