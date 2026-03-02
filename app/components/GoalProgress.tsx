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
                <p className="text-gray-500">You haven't set a goal weight yet! Set a new goal in settings.</p>
            </div>
        );
    }
    if (entries.length === 0) {
        return (
            <div className="bg-white rounded-lg p-6 shadow mb-8">
                <h2 className="text-black text-2xl font-bold mb-4">Goal Progress</h2>
                <p className="text-gray-500">No weight entries yet.</p>
            </div>
        );
    }
    const startWeight = entries[entries.length - 1].weight;
    const currentWeight = entries[0].weight;
    const remaining = Math.abs(currentWeight - user.goalWeight);
    const goalProgress = Math.max(
        ((startWeight - currentWeight) / (startWeight - user.goalWeight)) * 100,
        0
    );

    if (goalProgress > 99) {
        return (
            <div className="bg-white rounded-lg p-6 shadow mb-8">
                <h2 className="text-black text-2xl font-bold mb-4">Goal Progress</h2>
                <p className="text-gray-500">
                    Goal of {user.goalWeight} {user.preferredUnits} Completed! 🎉 Set a new goal in settings.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h2 className="text-black text-2xl font-bold mb-4">Goal Progress</h2>
            <p className="text-black text-center text-sm pb-2">Current Weight: {currentWeight} {user.preferredUnits}</p>
            <div className="flex items-center mb-4">
                <p className="text-black text-sm pr-2 whitespace-nowrap">{startWeight} {user.preferredUnits}</p>
                <div className="w-full bg-gray-200 h-4 rounded-full">
                    <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${goalProgress}%` }}
                    ></div>
                </div>
                <p className="text-black text-sm pl-2 whitespace-nowrap">{user.goalWeight} {user.preferredUnits}</p>
            </div>
            <p className="text-blue-500 font-bold text-center">{remaining} {user.preferredUnits} to go!</p>
        </div>
    )
}


