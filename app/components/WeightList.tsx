'use client';
import { WeightEntry } from "../types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface WeightListProps {
    entries: WeightEntry[];
    preferredUnits: 'lbs' | 'kg';
}

export default function WeightList({ entries, preferredUnits }: WeightListProps) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this entry?')) {
            return;
        }

        setLoading(true);
        const response = await fetch(`/api/weight/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            setError('Failed to delete weight entry');
            setLoading(false);
            return;
        }

        router.refresh();
        setLoading(false);

    }

    return (
        <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-black text-2xl font-bold mb-4">Your Weight Entries</h2>
            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                    {error}
                </div>
            )}
            {entries.length === 0 ? (
                <p className="text-gray-500">No weight entries logged yet.</p>
            ) : (
                <ul className="space-y-4">
                    {entries.map(entry => (
                        <li key={entry._id} className="flex justify-between items-center border-b pb-4">
                            <div>
                                <p className="text-black text-lg">{entry.weight} {preferredUnits}</p>
                                {entry.bodyFatPercentage && (
                                    <p className="text-gray-500 text-sm">Body fat: {entry.bodyFatPercentage}%</p>
                                )}
                                <p className="text-gray-400 text-sm">
                                    {new Date(entry.date).toLocaleDateString()}
                                </p>
                            </div>
                            <Button
                                variant="delete"
                                onClick={() => handleDelete(entry._id)}
                                disabled={loading}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}