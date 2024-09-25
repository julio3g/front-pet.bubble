import { photosGet } from '@/actions/photos-get'
import { userGetByUserName } from '@/actions/user-get-by-username'
import { Feed } from '@/components/feed'
import { ProfileDataPublic } from '@/components/me'

interface ProfileSearchParams {
  params: { username: string }
}

export default async function Profile({ params }: ProfileSearchParams) {
  const user = params.username
  const { data: photosToFeed } = await photosGet({ user })
  const { data: userData } = await userGetByUserName(user)

  return (
    <>
      <ProfileDataPublic data={userData} />
      <section className="mt-8">
        {photosToFeed.length ? (
          <div>
            <Feed photos={photosToFeed} user={user} />
          </div>
        ) : (
          <div className="pt-10 flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col items-center gap-3">
              <span className="text-xl">
                Nenhum pet disponível no momento 😕
              </span>
              <span className="text-muted-foreground">
                Ajude a encontrar lares para animais! Que tal divulgar um pet
                para adoção?
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
