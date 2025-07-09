import getServerSession from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from 'next/link';
import Image from 'next/image';
import { LoginButton, LogoutButton } from "./AuthButtons";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-gray-900 fixed top-0 left-0 right-0 z-50">
      <div className='flex items-center justify-between px-6 py-4 '>
        <div className="text-white text-xl font-bold">
          <Link href="/">
            <Image src='/assets/logo.png' alt="Logo" width={200} height={200} />
          </Link>
        </div>
        <div className="flex items-center ">
          <div className="flex gap-4">
            <Link href="/tunes" className="text-white">Tunes</Link>
            <Link href="/liveries" className="text-white">Liveries</Link>
            <Link href="/services" className="text-white">Recruitement</Link>
            <Link href="/contact" className="text-white">Contact</Link>
            <div className='text-white'>
              {!session ? <LoginButton /> : <LogoutButton />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
