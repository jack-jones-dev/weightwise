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
import { useState } from 'react';
import Button from './Button';

interface WeightChartProps {
    entries: WeightEntry[];
}

export default function WeightChart({ entries }: WeightChartProps) {
    const [showBodyFat, setShowBodyFat] = useState(true);
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
            <Button onClick={() => setShowBodyFat(!showBodyFat)} variant='secondary'>
                {showBodyFat ? 'Hide Body Fat %' : 'Show Body Fat %'}
            </Button>
            <ResponsiveContainer width="100%" height={300} className="mt-4">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="weight" />
                    {showBodyFat && (<YAxis yAxisId="bodyFat" orientation="right" />)}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                        }}
                        labelStyle={{
                            color: '#111827',
                            marginBottom: '4px',
                        }}
                        formatter={(value, name) => {
                            if (name === 'weight') return [`${value} lbs`, 'Weight'];
                            if (name === 'bodyFatPercentage') return [`${value}%`, 'Body Fat'];
                            return [value, name];
                        }}
                    />
                    <Line
                        yAxisId="weight"
                        type="monotone"
                        dataKey="weight"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={true}
                    />
                    {showBodyFat && (
                        <Line
                            yAxisId="bodyFat"
                            type="monotone"
                            dataKey="bodyFatPercentage"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={true}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}