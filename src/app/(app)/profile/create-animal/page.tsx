import { CreateANewAnimalForm } from '@/components/profile/create-animal'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adicione um novo pet - Pet Bubble',
  description: 'Onde lares encontram patinhas',
}

export default function CreateANewAnimal() {
  return <CreateANewAnimalForm />
}
