import { UserProps } from '@/actions/user-get'
import { FlagBR } from '@/assets/flag-br'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { User } from 'lucide-react'
import { ButtonShare } from './button-share'

export function ProfileDataPublic({ data }: { data: UserProps }) {
  const { username, city, state } = data

  return (
    <Card className="max-w-5xl mx-auto overflow-hidden opacity-70">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 h-52" />
      <CardContent>
        <div className="border-8 w-40 h-40 grid place-content-center border-white rounded-full bg-muted p-4 -mt-24">
          <User size={96} />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-950">{username}</h2>
          <p className="flex gap-2 text-base font-medium">
            <FlagBR className="size-6" />
            <span>
              {city} - {state}, Brasil
            </span>
          </p>
          <p className="text-slate-950 font-medium">@{username}</p>
        </div>
      </CardContent>
      <CardFooter>
        <ButtonShare />
      </CardFooter>
    </Card>
  )
}
