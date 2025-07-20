"use client";
import Link from 'next/link';
import Image from 'next/image';
import { LoginButton, LogoutButton } from "./AuthButtons";
import { useSession } from "next-auth/react";
import type { User } from "@prisma/client";
import { useState } from 'react';

// On étend le type User de Prisma pour le client (car NextAuth peut renvoyer un user partiel)
type UserClient = Partial<User> & { role?: string };

export default function NavBar() {
    const { data: session } = useSession();
    const user = session?.user as UserClient ?? null;
    const [showProfileMenu, setShowProfileMenu] = useState(false);

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
                        {/* Lien Admin visible uniquement pour les admins */}
                        {user?.role === "admin" && (
                            <Link href="/admin" className="text-white">
                                Admin
                            </Link>
                        )}
                    </div>
                    <div>
                        {/* Profil utilisateur */}
                        {user && (
                            <div className="relative ml-4">
                                <button
                                    className="flex items-center focus:outline-none"
                                    onClick={() => setShowProfileMenu((prev) => !prev)}
                                >
                                    <Image
                                        src={user.image && user.image !== '' ? user.image : "/assets/logo.png"}
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full hover:opacity-80 transition-opacity"
                                    />
                                </button>
                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded shadow-lg z-50">
                                        <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Mon profil</Link>
                                        <LogoutButton />
                                    </div>
                                )}
                            </div>
                        )}
                        <div className='text-white flex items-center ml-4'>
                            {!user ? <LoginButton /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};