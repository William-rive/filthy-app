export interface Event {
    id: number;
    title: string;
    description: string | null;
    date: Date;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    finished: boolean;
}