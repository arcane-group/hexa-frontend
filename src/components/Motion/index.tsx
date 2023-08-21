import { motion } from 'framer-motion'
import {
  Box,
  BoxProps,
  Center,
  CenterProps,
  SimpleGrid,
  SimpleGridProps,
  Accordion,
  AccordionProps,
  Image,
  ImageProps,
  Stack,
  StackProps,
  GridItem,
  GridItemProps,
  GridProps,
  Grid,
  TabPanelProps,
  TabPanel,
} from '@chakra-ui/react'

export const MotionBox = motion<BoxProps | { transition: any }>(Box)

export const MotionCenter = motion<CenterProps | { transition: any }>(Center)

export const MotionSimpleGrid = motion<SimpleGridProps | { transition: any }>(SimpleGrid)

export const MotionAccordion = motion<AccordionProps | { transition: any }>(Accordion)

export const MotionImage = motion<ImageProps | { transition: any }>(Image)

export const MotionStack = motion<StackProps | { transition: any }>(Stack)

export const MotionGridItem = motion<GridItemProps | { transition: any }>(GridItem)

export const MotionGrid = motion<GridProps | { transition: any }>(Grid)

export const MotionTabPanel = motion<TabPanelProps | { transition: any }>(TabPanel)
