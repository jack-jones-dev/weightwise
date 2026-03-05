'use client'
import LogoutButton from "./LogoutButton"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center shadow-lg">
            <Link href="/dashboard" className="text-3xl font-bold tracking-tight hover:text-blue-400 transition-colors">
                Weightwise
            </Link>
            <div className="flex gap-3 items-center">
                <Link href="/settings" className="text-xl text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-blue-800">
                    Settings
                </Link>
                <LogoutButton />
            </div>
        </nav>
    )
}