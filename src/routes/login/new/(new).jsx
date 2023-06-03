import { useSearchParams } from 'solid-start'
import { newAuth } from '~/routes/auth/[provider]'

export default function New() {
  const [searchParams] = useSearchParams()

  if (!newAuth.has(searchParams?.id)) {
    
  }

  const auth = newAuth.get(searchParams.id)

  return <main>{JSON.stringify(auth)}</main>
}
