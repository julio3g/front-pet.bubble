'use client'

import { PhotoProps } from '@/actions/photos-get'
import { FeedPhoto } from './photo'

export function Feed({ photos }: { photos: PhotoProps[] }) {
  return (
    <div>
      <FeedPhoto photos={photos} />
    </div>
  )
}
