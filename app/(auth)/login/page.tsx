'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import { signIn } from 'next-auth/react';

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError('Invalid email or password');
            setLoading(false);
            return;
        }

        router.push('/dashboard');
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-8">Login</h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input label="Email" name="email" type="email" placeholder="Enter your email" required />
                    <Input label="Password" name="password" type="password" placeholder="Enter your password" required />
                    <Button type="submit" disabled={loading} variant="primary">
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <p className="mt-4 text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    )
}
