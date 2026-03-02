export interface WeightEntry {
    _id: string;
    weight: number;
    bodyFatPercentage?: number;
    date: string;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    goalWeight?: number;
    goalStartWeight?: number;
    goalSetAt?: string;
    preferredUnits: 'lbs' | 'kg';
}

