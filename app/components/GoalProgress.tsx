'use client';
import { User, WeightEntry } from '../types';

interface GoalProgressProps {
    user: User;
    entries: WeightEntry[];
}

export default function GoalProgress({ user, entries }: GoalProgressProps) {
    if (!user.goalWeight) {
        return (
            <div className="bg-white rounded-lg p-6 shadow mb-8">
                <h2 className="text-black text-2xl font-bold mb-4">Goal Progress</h2>
                <p className="text-gray-500">You haven't set a goal weight yet.</p>
            </div>
        );
    }
    if (entries.length === 0) {
        return (
            <div className="bg-white rounded-lg p-6 shadow mb-8">
                <h2 className="text-black text-2xl font-bold mb-4">Goal Progress</h2>
                <p className="text-gray-500">No entries yet.</p>
            </div>
        );
    }
    const startWeight = entries[entries.length - 1].weight;
    const currentWeight = entries[0].weight;
    const goalProgress = Math.abs(((startWeight - currentWeight) / (startWeight - user.goalWeight)) * 100);

    if (goalProgress > 99) {
        return (
            <div className="bg-white rounded-lg p-6 shadow mb-8">
                <h2 className="text-black text-2xl font-bold mb-4">Goal Progress</h2>
                <p className="text-gray-500">Goal Completed! 🎉</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h2 className="text-black text-2xl font-bold mb-4">Goal Progress</h2>
            <p className="text-black text-center text-sm pb-2">Current Weight: {currentWeight}lbs</p>
            <div className="flex items-center mb-4">
                <p className="text-black text-sm px-2">{startWeight}lbs</p>
                <div className="w-full bg-gray-200 h-4 rounded-full">
                    <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${goalProgress}%` }}
                    ></div>
                </div>
                <p className="text-black text-sm px-2">{user.goalWeight}lbs</p>
            </div>
        </div>
    )
}


