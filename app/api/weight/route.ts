import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/app/lib/mongodb';
import Weight from '@/app/models/Weight';
import { authOptions } from '@/app/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Not logged in' },
                { status: 401 }
            );
        }

        await connectDB();

        const entries = await Weight.find({ userId: session.user.id })
            .sort({ date: -1 });

        return NextResponse.json(entries);

    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Not logged in' },
                { status: 401 }
            );
        }

        const { weight, bodyFatPercentage, date } = await request.json();

        if (!weight) {
            return NextResponse.json(
                { error: 'Weight is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const entry = await Weight.create({
            userId: session.user.id,
            weight,
            bodyFatPercentage,
            date: date || Date.now(),
        });

        return NextResponse.json(entry, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}