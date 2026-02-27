import { WeightEntry } from '@/app/types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import connectDB from '@/app/lib/mongodb';
import Weight from '@/app/models/Weight';
import User from '@/app/models/User';
import WeightForm from '@/app/components/WeightForm';
import WeightChart from '@/app/components/WeightChart';
import WeightList from '@/app/components/WeightList';
import { authOptions } from '../lib/auth';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/login');
    }

    await connectDB();

    const entries = await Weight.find({ userId: session.user.id })
        .sort({ date: -1 })
        .lean<WeightEntry[]>();

    const plainEntries = entries.map(entry => ({
        ...entry,
        _id: entry._id.toString(),
        userId: entry.userId.toString(),
        date: entry.date.toString(),
        createdAt: entry.createdAt?.toString(),
        updatedAt: entry.updatedAt?.toString(),
    }));

    const user = await User.findById(session.user.id).lean();

    return (
        <main className="max-w-4xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
                    {user?.goalWeight && (
                        <p className="text-gray-500 mt-1">
                            Goal: {user.goalWeight} {user.preferredUnits}
                        </p>
                    )}
                </div>
            </div>

            <WeightChart entries={plainEntries} />
            <WeightForm />
            <WeightList entries={plainEntries} />
        </main>
    );
}