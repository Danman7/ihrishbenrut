import { GiYinYang } from 'react-icons/gi'

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center text-9xl flex-grow">
      <GiYinYang className="animate-spin mr-4" />
    </div>
  )
}
