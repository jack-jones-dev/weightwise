import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '../lib/mongodb';
import { User as UserType } from '@/app/types';
import User from '../models/User';
import SettingsForm from '../components/SettingsForm';
import Link from 'next/link';

export default async function Settings() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/login');
    }

    await connectDB();

    const user = await User.findById(session.user.id).lean<UserType>();

    if (!user) {
        redirect('/login');
    }

    const plainUser = {
        ...user,
        _id: user._id.toString(),
    }

    return (
        <main className="max-w-4xl mx-auto p-8">
            <Link href="/dashboard" className="text-blue-500 hover:underline">
                ← Back to Dashboard
            </Link>
            <SettingsForm user={plainUser} />
        </main>
    );
}