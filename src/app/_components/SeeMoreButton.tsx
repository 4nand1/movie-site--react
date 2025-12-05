
import Link from "next/link";

export default function SeeMoreButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="text-sm  hover:underline flex items-center gap-1"
    >
      See more <span>›</span>
    </Link>
  );
}
