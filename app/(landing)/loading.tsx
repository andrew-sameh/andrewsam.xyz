import Loader from "@/components/Loader";
export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen -mt-20">
      <div className="mx-auto my-auto">
        <Loader />
      </div>
    </div>
  );
}
