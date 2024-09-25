'use client'

import { PhotoProps } from '@/actions/photos-get'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function FeedPhoto({ photos }: { photos: PhotoProps[] }) {
  const router = useRouter()

  function handleCloseModal() {
    router.back()
  }

  return (
    <ul className="grid grid-cols-3 gap-5 md:container mx-auto">
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
                    <div className="flex gap-1 items-center">
                      <Eye size={16} />
                      {photo.visualizations}
                    </div>
                    <div>Nome: {photo.title}</div>
                    <div>
                      Localização: {photo.user?.city} - {photo.user?.state}
                    </div>
                  </span>
                </li>
              </Link>
            </DialogTrigger>
            <DialogContent className="max-w-5xl m-4">
              <DialogClose onClick={handleCloseModal} />
              <div className="grid grid-cols-2 gap-5">
                <div className="">
                  <Image
                    width={1000}
                    height={1000}
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div>
                  <p>{photo.title}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
    </ul>
  )
}
