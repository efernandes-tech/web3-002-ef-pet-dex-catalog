export interface Tech {
    name: string;
    description: string;
    adopters: number;
}

export interface TechWithId extends Tech {
    id: number;
}
