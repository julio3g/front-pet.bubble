'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { useState } from 'react'

interface Animal {
  id: number
  name: string
  type: string
  age: number
  height: number
  gender: 'Male' | 'Female'
  breed: string
  specialCondition: string | null
  vaccinated: boolean
  imageUrl: string
}

const animals: Animal[] = [
  {
    id: 1,
    name: 'Max',
    type: 'Dog',
    age: 3,
    height: 60,
    gender: 'Male',
    breed: 'Golden Retriever',
    specialCondition: null,
    vaccinated: true,
    imageUrl: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    age: 2,
    height: 25,
    gender: 'Female',
    breed: 'Siamese',
    specialCondition: 'Allergies',
    vaccinated: true,
    imageUrl: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 3,
    name: 'Rocky',
    type: 'Dog',
    age: 5,
    height: 55,
    gender: 'Male',
    breed: 'German Shepherd',
    specialCondition: 'Hip dysplasia',
    vaccinated: true,
    imageUrl: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 4,
    name: 'Whiskers',
    type: 'Cat',
    age: 4,
    height: 23,
    gender: 'Male',
    breed: 'Maine Coon',
    specialCondition: null,
    vaccinated: false,
    imageUrl: '/placeholder.svg?height=200&width=200',
  },
]

export default function AnimalGallery() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Animal Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animals.map((animal) => (
          <Card
            key={animal.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => setSelectedAnimal(animal)}
          >
            <CardContent className="p-4">
              <Image
                src={animal.imageUrl}
                alt={animal.name}
                width={200}
                height={200}
                className="rounded-lg mb-2"
              />
              <h2 className="text-xl font-semibold">{animal.name}</h2>
              <p className="text-muted-foreground">{animal.type}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={selectedAnimal !== null}
        onOpenChange={() => setSelectedAnimal(null)}
      >
        {selectedAnimal && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedAnimal.name}</DialogTitle>
              <DialogDescription>{selectedAnimal.type}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <Image
                  src={selectedAnimal.imageUrl}
                  alt={selectedAnimal.name}
                  width={150}
                  height={150}
                  className="rounded-lg"
                />
                <div>
                  <p>
                    <strong>Age:</strong> {selectedAnimal.age} years
                  </p>
                  <p>
                    <strong>Height:</strong> {selectedAnimal.height} cm
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedAnimal.gender}
                  </p>
                </div>
              </div>
              <div>
                <p>
                  <strong>Breed:</strong> {selectedAnimal.breed}
                </p>
                <p>
                  <strong>Special Condition:</strong>{' '}
                  {selectedAnimal.specialCondition || 'None'}
                </p>
                <p>
                  <strong>Vaccinated:</strong>{' '}
                  <Badge
                    variant={
                      selectedAnimal.vaccinated ? 'default' : 'destructive'
                    }
                  >
                    {selectedAnimal.vaccinated ? 'Yes' : 'No'}
                  </Badge>
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
