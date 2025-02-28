import { Input } from "@/components/ui/input";
import { ref } from "firebase/storage";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";


export default function PasswordInput({
  setPasswordState,
  passwordState,
}: {
  setPasswordState: React.Dispatch<React.SetStateAction<string>>;
  passwordState: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <div className="flex  rounded-lg w-full items-center justify-center">
      <Input
        type={isOpen ? "text" : "password"}
        onChange={(e) => setPasswordState(e.target.value)}
        className="outline-none"
        placeholder="password"
      />
      <div className="h-14 aspect-square flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <Eye color="gray"/> : <EyeOff color="gray"/>}
      </div>
    </div>
  );
}
