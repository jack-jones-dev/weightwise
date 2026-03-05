import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '@/app/lib/mongodb';
import { User as UserType } from '@/app/types';
import User from '@/app/models/User';
import SettingsForm from '@/app/components/SettingsForm';
import Link from 'next/link';

export default async function Settings() {
    const session = await getServerSession(authOptions);

    await connectDB();

    const user = await User.findById(session!.user.id).lean<UserType>();

    if (!user) {
        redirect('/login');
    }

    const plainUser = {
        ...user,
        _id: user._id.toString(),
    }

    return (
        <main className="max-w-4xl mx-auto p-8">
            <SettingsForm user={plainUser} />
        </main>
    );
}