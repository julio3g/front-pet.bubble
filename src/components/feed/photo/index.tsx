'use client'

import { PhotoProps } from '@/actions/photos-get'
import { Button } from '@/components/ui/button'
import { WhatsAppButton } from '@/components/ui/button-wa'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { InfoItem } from '@/components/ui/info-item'
import { Separator } from '@/components/ui/separator'
import { StatusItem } from '@/components/ui/status-item'

import {
  AlertCircle,
  Blend,
  Calendar,
  Dna,
  Eye,
  PawPrint,
  Scissors,
  Syringe,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface MessageWhatsAppProps {
  animalName: string
  animalAge: string
  animalGender: string
}

export function FeedPhoto({ photos }: { photos: PhotoProps[] }) {
  const router = useRouter()

  const handleCloseModal = () => router.back()

  function messageWhatsApp({
    animalName,
    animalGender,
    animalAge,
  }: MessageWhatsAppProps) {
    const message = `Olá! Tenho interesse em adotar o ${animalName}. Gostaria de saber mais detalhes, por favor:

    - Nome do pet: ${animalName}
    - Idade: ${animalAge} anos
    - Gênero: ${animalGender}

    Agradeço desde já pela resposta e pela oportunidade de dar um lar amoroso ao animal!`

    return message
  }

  return (
    <ul className="grid grid-cols-3 gap-5 max-w-5xl mx-auto">
      {photos &&
        photos.map((photo, index) => (
          <Dialog
            key={photo.id + index}
            onOpenChange={(isOpen) => {
              if (!isOpen) handleCloseModal()
            }}
          >
            <DialogTrigger asChild>
              <Link
                key={photo.id + index}
                href={`/animal/${photo.id}`}
                scroll={false}
              >
                <li className="aspect-square flex overflow-hidden rounded-lg relative group cursor-pointer">
                  <div
                    style={{ backgroundImage: `url(${photo.src})` }}
                    className="aspect-square h-full bg-cover bg-center bg-no-repeat"
                  />
                  <span className="absolute flex-1 flex flex-col gap-1 h-full w-full text-base items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black bg-opacity-30 backdrop-blur-sm">
                    <span className="flex gap-1 items-center">
                      <Eye size={16} />
                      {photo.visualizations}
                    </span>
                    <span>Nome: {photo.title}</span>
                    <span>
                      Localização: {photo.user?.city} - {photo.user?.state}
                    </span>
                  </span>
                </li>
              </Link>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[36rem] h-full flex">
              <DialogClose onClick={handleCloseModal} />
              <div className="grid grid-cols-2 flex-1">
                <div
                  className="rounded-lg"
                  style={{ backgroundImage: `url(${photo.src})` }}
                />
                <div className="flex flex-col">
                  <DialogTitle className="py-4 px-6 flex justify-between">
                    <Button variant="link" className="p-0 h-auto" asChild>
                      <Link href={`/me/${photo.author}`}>@{photo.author}</Link>
                    </Button>
                    <DialogDescription className="flex gap-1 items-center">
                      <Eye size={16} /> {photo.visualizations}
                    </DialogDescription>
                  </DialogTitle>
                  <div className="grid content-between flex-col flex-1 px-6">
                    <div className="space-y-2">
                      <InfoItem icon={User} label="Nome" value={photo.title} />
                      <InfoItem
                        icon={Calendar}
                        label="Idade"
                        value={photo.animal_age}
                      />
                      <InfoItem
                        icon={Blend}
                        label="Gênero"
                        value={photo.animal_gender}
                      />
                      <InfoItem
                        icon={Dna}
                        label="Raça"
                        value={photo.animal_breed}
                      />
                      <InfoItem
                        icon={PawPrint}
                        label="Tipo"
                        value={photo.animal_type}
                      />
                    </div>
                    {/* <div className="flex gap-1 items-center">
                      <strong>Vacinado:</strong>{' '}
                      <Badge
                      variant={
                        photo.animal_vaccinated ? 'default' : 'destructive'
                        }
                        >
                        {photo.animal_vaccinated ? 'Sim' : 'Não'}
                        </Badge>
                        </div>
                        {photo.animal_special_condition === 'Não' && (
                          <p>
                          <strong>Condição Especial:</strong> oi
                          {photo.animal_special_condition_description}
                          </p>
                          )} */}
                    <div className="space-y-5">
                      <Separator />
                      <div className="grid grid-cols-3 gap-3">
                        <StatusItem
                          icon={Syringe}
                          label="Vacinado"
                          value={photo.animal_vaccinated}
                        />
                        <StatusItem
                          icon={Scissors}
                          label="Castrado"
                          value={photo.animal_castrated}
                        />
                        <StatusItem
                          icon={AlertCircle}
                          label="Condição Especial"
                          value={photo.animal_special_condition}
                        />
                      </div>
                      <WhatsAppButton
                        phoneNumber={`55${photo.responsible_contact}`}
                        message={messageWhatsApp({
                          animalAge: photo.animal_age,
                          animalGender: photo.animal_gender,
                          animalName: photo.title,
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
    </ul>
  )
}
