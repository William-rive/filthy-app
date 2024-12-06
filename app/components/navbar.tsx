import Link from 'next/link';
import Image from 'next/image';
import { LoginButton, LogoutButton } from "./AuthButtons";

import { Session } from 'next-auth';

export default function NavBar({ session }: { session: Session | null }) {

    return (
        <nav className="bg-gray-800 ">
            <div className='flex items-center justify-between px-6 py-4 '>
                <div className="text-white text-xl font-bold">
                    <Link href="/">
                        <Image src='/assets/logo.png' alt="Logo" width={200} height={200} />
                    </Link>
                </div>
                <div className="flex items-center ">
                    {/* Onglets */}
                    <div className="flex gap-4">
                        <Link href="/tunes" className="text-white">
                            Tunes
                        </Link>
                        <Link href="/liveries" className="text-white">
                            Liveries
                        </Link>
                        <Link href="/services" className="text-white">
                            Services
                        </Link>
                        <Link href="/blog" className="text-white">
                            Blog
                        </Link>
                        <Link href="/contact" className="text-white">
                            Contact
                        </Link>
                        <div className='text-white'>
                        {!session?.user ? <LoginButton /> : <LogoutButton />}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
