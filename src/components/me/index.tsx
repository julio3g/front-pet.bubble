import { UserProps } from '@/actions/user-get'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Building, Hash, Mail, MapPin, User } from 'lucide-react'

export function ProfileDataPublic({ data }: { data: UserProps }) {
  const { name, username, email, city, zipCode, state } = data
  return (
    <Card className="max-w-5xl mx-auto mt-8 p-12">
      <CardContent className="py-4">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 flex flex-col justify-center items-center text-center">
            <User size={128} />
            <h1 className="text-2xl font-bold mb-2">{name}</h1>
            <p className="text-muted-foreground mb-4">@{username}</p>
          </div>
          <div className="col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </Label>
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {name}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </Label>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  {email}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label
                  htmlFor="zipCode"
                  className="block text-sm font-medium mb-1"
                >
                  Zip Code
                </Label>
                <div className="flex items-center">
                  <Hash size={16} className="mr-2" />
                  {zipCode}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="state"
                  className="block text-sm font-medium mb-1"
                >
                  State
                </Label>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {state}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="city"
                  className="block text-sm font-medium mb-1"
                >
                  City
                </Label>
                <div className="flex items-center">
                  <Building size={16} className="mr-2" />
                  {city}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
