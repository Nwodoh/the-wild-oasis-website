import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
import { Span } from "next/dist/trace";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-2"
            >
              <span className="relative top-[-3px] h-8 w-8 inline-block">
                <Image
                  src={session.user.image}
                  fill
                  className="rounded-full"
                  alt={session.user?.name}
                  referrerPolicy="no-referrer"
                />
              </span>
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
