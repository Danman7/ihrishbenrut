import { GiYinYang } from 'react-icons/gi'

export default function Loading() {
  return (
    <div className="w-full min-h-[calc(100dvh-4rem)] flex items-center justify-center text-9xl">
      <GiYinYang className="animate-spin mr-4" />
    </div>
  )
}
