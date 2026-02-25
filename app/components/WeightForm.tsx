'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from './Button';

export default function WeightForm() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const formData = new FormData(e.currentTarget);
        const weight = formData.get('weight') as string;
        const bodyFatPercentage = formData.get('bodyFatPercentage') as string;
        const date = formData.get('date') as string;

        const response = await fetch('/api/weight', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ weight, bodyFatPercentage, date }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            setLoading(false);
            return;
        }

        router.refresh();
        setLoading(false);
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h1 className="text-black text-3xl font-bold mb-8">Log Weight</h1>

            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Weight" name="weight" type="number" placeholder="Enter your weight" required />
                <Input label="Body Fat Percentage" name="bodyFatPercentage" type="number" placeholder="Enter your body fat percentage (optional)" required={false} />
                <Input label="Date" name="date" type="date" placeholder="Select date (optional)" required={false} />
                <Button type="submit" disabled={loading} variant="primary">
                    {loading ? 'Logging weight...' : 'Log Weight'}
                </Button>
            </form>
        </div>
    );

}
