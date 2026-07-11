// components/logo.tsx
import Image from "next/image";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/logo.png" alt="Corner" width={250} height={50} priority />
    </div>
  );
};
