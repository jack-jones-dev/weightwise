import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/app/lib/mongodb';
import Weight from '@/app/models/Weight';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const weightId = params.id;
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not logged in' },
        { status: 401 }
      );
    }

    await connectDB();

    const entry = await Weight.findById(weightId);

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    if (entry.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden action' },
        { status: 403 }
      );
    }

    await Weight.findByIdAndDelete(weightId);

    return NextResponse.json(
      { message: 'Entry deleted' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
