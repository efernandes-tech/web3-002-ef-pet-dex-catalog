export interface Technology {
    id: number;
    name: string;
    description: string;
    adopters: number;
}

export interface TechFormData {
    name: string;
    description: string;
    adopters: number;
}

export interface TechFormProps {
    tech?: Technology;
    onSubmit: (data: TechFormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export interface TechCardProps {
    tech: Technology;
    onEdit?: (tech: Technology) => void;
    onDelete?: (id: number) => void;
}
