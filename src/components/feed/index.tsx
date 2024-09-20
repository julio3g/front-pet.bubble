import { photosGet } from '@/actions/photos-get'
import { FeedPhoto } from './photo'

export async function Feed() {
  const data = await photosGet()
  return (
    <div>
      <FeedPhoto photos={data} />
    </div>
  )
}
