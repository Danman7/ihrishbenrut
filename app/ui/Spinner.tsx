import { ImSpinner5 } from 'react-icons/im'

export const Spinner = ({ message }: { message?: string }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center text-3xl">
      <ImSpinner5 className="animate-spin mr-4" /> {message || 'Loading...'}
    </div>
  )
}
