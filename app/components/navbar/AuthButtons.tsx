"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
    return (
        <button onClick={() => signIn()}>
            Login
        </button>
    );
}

export const LogoutButton = () => {
    return (
        <div className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200">
            <button onClick={() => signOut()}>
                Logout
            </button>
        </div>
    );
}