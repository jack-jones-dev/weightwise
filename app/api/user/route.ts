import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';

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

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { goalWeight, preferredUnits },
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