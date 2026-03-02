import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';
import Weight from '@/app/models/Weight';

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Not logged in' },
                { status: 401 }
            );
        }

        const { goalWeight, preferredUnits } = await request.json();

        await connectDB();

        const latestEntry = await Weight.findOne({ userId: session.user.id })
            .sort({ date: -1 });

        const user = await User.findByIdAndUpdate(
            session.user.id,
            {
                goalWeight,
                preferredUnits,
                goalStartWeight: latestEntry ? latestEntry.weight : undefined,
                goalSetAt: new Date(),
            },
            { new: true }
        );

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}