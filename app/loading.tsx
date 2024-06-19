import Loader from '@/components/Loader'
export default function LoadingPage() {
  return (
    <div className="-mt-20 flex h-screen w-full items-center justify-center">
      <div className="mx-auto my-auto">
        <Loader />
      </div>
    </div>
  )
}
