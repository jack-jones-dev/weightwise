import { WeightEntry } from '@/app/types';
import { User as UserType } from '@/app/types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import connectDB from '@/app/lib/mongodb';
import Weight from '@/app/models/Weight';
import User from '@/app/models/User';
import WeightForm from '@/app/components/WeightForm';
import WeightChart from '@/app/components/WeightChart';
import WeightList from '@/app/components/WeightList';
import { authOptions } from '../lib/auth';
import LogoutButton from '@/app/components/LogoutButton';
import GoalProgress from '../components/GoalProgress';
import Link from 'next/link';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/login');
    }

    await connectDB();

    const entries = await Weight.find({ userId: session.user.id })
        .sort({ date: -1 }) //Newest first
        .lean<WeightEntry[]>(); //Get plain JS objects instead of Mongo documents

    const plainEntries = entries.map(entry => ({
        ...entry,
        _id: entry._id.toString(),
        userId: entry.userId.toString(),
        date: entry.date.toString(),
        createdAt: entry.createdAt?.toString(),
        updatedAt: entry.updatedAt?.toString(),
    }));

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
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {plainUser?.name}</h1>
                    {/* {plainUser?.goalWeight && (
                        <p className="text-gray-500 mt-1">
                            Goal: {plainUser.goalWeight} {plainUser.preferredUnits}
                        </p>
                    )} */}
                </div>
                <div className="flex gap-4">
                    <Link href="/settings" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300">
                        Settings
                    </Link>
                    <LogoutButton />
                </div>
            </div>
            <GoalProgress user={plainUser} entries={plainEntries} />
            <WeightChart entries={plainEntries} preferredUnits={plainUser.preferredUnits} />
            <WeightForm />
            <WeightList entries={plainEntries} preferredUnits={plainUser.preferredUnits} />
        </main>
    );
}