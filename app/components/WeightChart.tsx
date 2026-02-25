'use client';
import { WeightEntry } from '@/app/types';

interface WeightChartProps {
    entries: WeightEntry[];
}

export default function WeightChart({ entries }: WeightChartProps) {
    return (
        <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h2 className="text-black text-xl font-bold mb-4">Progress Chart</h2>
            <p className="text-gray-500">Chart coming soon...</p>
        </div>
    );
}