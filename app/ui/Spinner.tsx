import { GiYinYang } from 'react-icons/gi'

export const Spinner = ({ message }: { message?: string }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center text-3xl">
      <GiYinYang className="animate-spin mr-4" /> {message || 'Миг...'}
    </div>
  )
}
