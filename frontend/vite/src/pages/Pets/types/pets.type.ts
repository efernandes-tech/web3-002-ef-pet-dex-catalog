export interface Pet {
    id: number;
    name: string;
    description: string;
    yearBirth: number;
}

export interface PetFormData {
    name: string;
    description: string;
    yearBirth: number;
}

export interface PetFormProps {
    pet?: Pet;
    onSubmit: (data: PetFormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export interface PetCardProps {
    pet: Pet;
    onEdit?: (pet: Pet) => void;
    onDelete?: (id: number) => void;
}
