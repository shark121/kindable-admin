import { Ban } from 'lucide-react';

export default function NotFound({description}:{description?:string}) {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <Ban className=" text-gray-400 mb-4" size={200} />
      <div className="text-xs">{description ?? "Not Found"}</div>
    </div>
  );
}
