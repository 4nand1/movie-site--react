import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const BackHome = () => {
  return (
    <Link
      href="/"
      className="  inline-flex items-center gap-2 px-4 py-2  hover:bg-gray-300 rounded-full text-sm "
    >
      <ArrowLeft size={16} />
      Back to Home
    </Link>
  );
};
