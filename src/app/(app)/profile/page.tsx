import { photosGet } from '@/actions/photos-get'
import { userGet } from '@/actions/user-get'
import { Feed } from '@/components/feed'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Profile() {
  const { data: user } = await userGet()
  const { data } = await photosGet({ user: user?.username })
  return (
    <>
      {data?.length ? (
        <Feed photos={data} user={user?.username} />
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xl">Nenhum pet disponível no momento 😕</span>
            <span className="text-muted-foreground">
              Ajude a encontrar lares para animais! Que tal divulgar um pet para
              adoção?
            </span>
          </div>
          <Button asChild>
            <Link href="/profile/create-animal">
              Ajudar pets a encontrarem lares
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}
