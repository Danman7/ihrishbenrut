import { GiYinYang } from 'react-icons/gi'

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center text-9xl">
      <GiYinYang className="animate-spin mr-4" />
    </div>
  )
}
