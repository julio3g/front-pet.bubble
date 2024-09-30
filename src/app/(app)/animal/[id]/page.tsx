import { photoGet } from '@/actions/photo-get'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { WhatsAppButton } from '@/components/ui/button-wa'
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

interface SingleAnimalParams {
  params: { id: string }
}

interface MessageWhatsAppProps {
  animalName: string
  animalAge: string
  animalGender: string
}

export async function generateMetadata({ params }: SingleAnimalParams) {
  const { data } = await photoGet(params.id)

  if (!data) return { title: 'Fotos' }
  return { title: `${data.title} - Pet.Bubble` }
}

export default async function SingleAnimal({ params }: SingleAnimalParams) {
  const { data } = await photoGet(params.id)
  // console.log(data)

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
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <section className="flex-1 pt-8 p-4 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-5">
          <div
            className="rounded-lg"
            style={{ backgroundImage: `url(${data.src})` }}
          />
          <div>
            <div className="pb-4 flex justify-between">
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href={`/me/${data.author}`}>@{data.author}</Link>
              </Button>
              <div className="flex gap-1 items-center">
                <Eye size={16} /> {data.visualizations}
              </div>
            </div>
            {/* <div className="flex flex-col gap-4">
              <p>
                <strong>Nome:</strong> {data.title}
              </p>
              <p>
                <strong>Idade:</strong> {data.animal_age} anos
              </p>
              <p>
                <strong>Gênero:</strong> {data.animal_gender}
              </p>
              <p>
                <strong>Raça</strong> {data.animal_breed}
              </p>
              <p>
                <strong>Tipo de animal:</strong> {data.animal_type}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Vacinado:</strong>{' '}
                <Badge
                  variant={data.animal_vaccinated ? 'default' : 'destructive'}
                >
                  {data.animal_vaccinated ? 'Sim' : 'Não'}
                </Badge>
              </div>
              <div className="flex gap-1 items-center">
                <strong>Castrado:</strong>{' '}
                <Badge
                  variant={data.animal_castrated ? 'default' : 'destructive'}
                >
                  {data.animal_castrated ? 'Sim' : 'Não'}
                </Badge>
              </div>
              <div className="flex gap-1 items-center">
                <strong>Condição Especial:</strong>{' '}
                <Badge
                  variant={
                    data.animal_special_condition ? 'default' : 'destructive'
                  }
                >
                  {data.animal_special_condition ? 'Sim' : 'Não'}
                </Badge>
              </div>
              {data.animal_special_condition === 'Sim' && (
                <p>
                  <strong>Condição Especial:</strong> teste
                </p>
              )}

              <div className="mt-auto">
                <span>Entrar em contato com o responsável:</span>
                <WhatsAppButton
                  phoneNumber={`55${data.responsible_contact}`}
                  message={messageWhatsApp({
                    animalAge: data.animal_age,
                    animalGender: data.animal_gender,
                    animalName: data.title,
                  })}
                />
              </div>
            </div> */}
            <div className="grid content-between flex-col flex-1 gap-24">
              <div className="space-y-2">
                <InfoItem icon={User} label="Nome" value={data.title} />
                <InfoItem
                  icon={Calendar}
                  label="Idade"
                  value={data.animal_age}
                />
                <InfoItem
                  icon={Blend}
                  label="Gênero"
                  value={data.animal_gender}
                />
                <InfoItem icon={Dna} label="Raça" value={data.animal_breed} />
                <InfoItem
                  icon={PawPrint}
                  label="Tipo"
                  value={data.animal_type}
                />
              </div>
              {/* <div className="flex gap-1 items-center">
                      <strong>Vacinado:</strong>{' '}
                      <Badge
                      variant={
                        data.animal_vaccinated ? 'default' : 'destructive'
                        }
                        >
                        {data.animal_vaccinated ? 'Sim' : 'Não'}
                        </Badge>
                        </div>
                        {data.animal_special_condition === 'Não' && (
                          <p>
                          <strong>Condição Especial:</strong> oi
                          {data.animal_special_condition_description}
                          </p>
                          )} */}
              <div className="space-y-5">
                <Separator />
                <div className="grid grid-cols-3 gap-3">
                  <StatusItem
                    icon={Syringe}
                    label="Vacinado"
                    value={data.animal_vaccinated}
                  />
                  <StatusItem
                    icon={Scissors}
                    label="Castrado"
                    value={data.animal_castrated}
                  />
                  <StatusItem
                    icon={AlertCircle}
                    label="Condição Especial"
                    value={data.animal_special_condition}
                  />
                </div>
                {data.animal_special_condition === 'Sim' && (
                  <p>
                    <strong>Condição Especial:</strong>
                    {data.animal_special_condition_description}
                  </p>
                )}
                <WhatsAppButton
                  phoneNumber={`55${data.responsible_contact}`}
                  message={messageWhatsApp({
                    animalAge: data.animal_age,
                    animalGender: data.animal_gender,
                    animalName: data.title,
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
