'use client'
import LogoutButton from "./LogoutButton"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link href="/dashboard" className="text-xl font-bold">Weightwise</Link>
            <div className="flex gap-4">
                <Link href="/settings" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300">
                    Settings
                </Link>
                <LogoutButton />
            </div>
        </nav>
    )
}