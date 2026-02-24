export interface WeightEntry {
    _id: string;
    weight: number;
    bodyFatPercentage?: number;
    date: string;
    userId: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    goalWeight?: number;
    preferredUnits: 'lbs' | 'kg';
}