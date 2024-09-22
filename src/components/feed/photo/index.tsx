'use client'

import { PhotoProps } from '@/actions/photos-get'
import Image from 'next/image'
import Link from 'next/link'

export function FeedPhoto({ photos }: { photos: PhotoProps[] }) {
  return (
    <ul className="grid grid-cols-3 gap-5 md:container mx-auto">
      {photos.map((photo, index) => (
        <li key={photo.id + index}>
          <Link href={`/animal/${photo.id}`} scroll={false}>
            <Image
              src={photo.src}
              height={1500}
              width={1500}
              alt={photo.title}
              sizes="80vw"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
