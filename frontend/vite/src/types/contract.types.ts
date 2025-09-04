export interface Pet {
    name: string;
    description: string;
    yearBirth: number;
}

export interface PetWithId extends Pet {
    id: number;
}
