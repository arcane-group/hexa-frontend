import { Avatar, type AvatarProps } from '@chakra-ui/react'

// TODO: 待UI给一个图片
// const defaultIcon = ''

export const UserImg = (props: AvatarProps) => {
  return (
    <Avatar
      w='45px'
      h='45px'
      objectFit={'cover'}
      borderColor={'#155973'}
      borderWidth={'1px'}
      borderStyle={'solid'}
      //   icon={defaultIcon}
      {...props}
    ></Avatar>
  )
}
