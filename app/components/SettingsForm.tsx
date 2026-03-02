'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from './Button';
import Select from './Select';
import { User } from '../types'

interface SettingsFormProps {
    user: User;
}

export default function SettingsForm({ user }: SettingsFormProps) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [goalWeight, setGoalWeight] = useState(user.goalWeight || '');
    const [preferredUnits, setPreferredUnits] = useState(user.preferredUnits || 'lbs');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const response = await fetch('/api/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ goalWeight, preferredUnits }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            setLoading(false);
            return;
        }

        setLoading(false);
        router.push('/dashboard');
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h1 className="text-black text-3xl font-bold mb-8">Settings</h1>

            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Goal Weight"
                    name="goalWeight"
                    type="number"
                    value={goalWeight}
                    onChange={e => setGoalWeight(e.target.value)}
                />
                <Select
                    label="Preferred Units"
                    value={preferredUnits}
                    onChange={e => setPreferredUnits(e.target.value as 'lbs' | 'kg')}
                >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </Select>
                <Button type="submit" disabled={loading} variant="primary">
                    {loading ? 'Updating settings...' : 'Update Settings'}
                </Button>
            </form>
        </div>
    );
}