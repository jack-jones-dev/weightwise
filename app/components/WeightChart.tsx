'use client';
import { WeightEntry } from '../types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface WeightChartProps {
    entries: WeightEntry[];
}

export default function WeightChart({ entries }: WeightChartProps) {
    const data = entries
        .slice()
        .reverse()
        .map(entry => ({
            date: new Date(entry.date).toLocaleDateString(),
            weight: entry.weight,
            bodyFatPercentage: entry.bodyFatPercentage,
        }));

    if (entries.length === 0) {
        return (
            <div className="bg-white rounded-lg p-6 shadow mb-8">
                <h2 className="text-black text-2xl font-bold mb-4">Weight Progress</h2>
                <p className="text-gray-500">No weight entries to display.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h2 className="text-black text-2xl font-bold mb-4">Weight Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="weight" />
                    <YAxis yAxisId="bodyFat" orientation="right" />
                    <Tooltip />
                    <Line
                        yAxisId="weight"
                        type="monotone"
                        dataKey="weight"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={true}
                    />
                    <Line
                        yAxisId="bodyFatPercentage"
                        type="monotone"
                        dataKey="bodyFatPercentage"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}