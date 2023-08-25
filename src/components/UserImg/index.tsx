import { Avatar, type AvatarProps, Image } from '@chakra-ui/react'

import defaultIcon from '@/assets/images/user-placeholder.jpg'

export const UserImg = (props: AvatarProps) => {
  return (
    <Avatar
      w='45px'
      h='45px'
      objectFit={'cover'}
      borderColor={'#155973'}
      borderWidth={'1px'}
      borderStyle={'solid'}
      overflow={'hidden'}
      icon={<Image src={defaultIcon.src} alt='' w='100%' h='100%' />}
      {...props}
    ></Avatar>
  )
}
