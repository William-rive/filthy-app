"use client";
import Link from 'next/link';
import Image from 'next/image';
import { LoginButton, LogoutButton } from "./AuthButtons";
import { useSession } from "next-auth/react";

export default function NavBar() {
    const { data: session } = useSession();
    const user = session?.user ?? null;
    return (
        <nav className="bg-gray-900 fixed top-0 left-0 right-0 z-50">
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
                            Recruitement
                        </Link>
                        <Link href="/contact" className="text-white">
                            Contact
                        </Link>
                        <div className='text-white'>
                            {/* Affiche LoginButton si pas d'utilisateur, sinon LogoutButton */}
                            {!user ? <LoginButton /> : <LogoutButton />}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};