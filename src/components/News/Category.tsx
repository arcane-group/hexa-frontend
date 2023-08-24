import { useRouter } from 'next/router'

export const Category = () => {
  const router = useRouter()
  const { id } = router.query
  console.log('id:', id)

  return null
}
