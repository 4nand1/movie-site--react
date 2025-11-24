// src/app/_components/SeeMoreButton.tsx
import Link from "next/link";

export default function SeeMoreButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-[#09090B] hover:underline flex items-center gap-1"
    >
      See more <span>›</span>
    </Link>
  );
}
