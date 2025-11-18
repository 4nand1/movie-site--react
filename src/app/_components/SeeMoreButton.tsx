// src/app/_components/SeeMoreButton.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  href: string;
  label?: string;
};

export default function SeeMoreButton({ href, label = "See more" }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-[12px] font-medium text-[#09090B] hover:text-[#18181B]"
    >
      <span>{label}</span>
      <ChevronRight className="w-3 h-3" />
    </Link>
  );
}
