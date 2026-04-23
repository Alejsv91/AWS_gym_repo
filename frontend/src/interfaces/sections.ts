export interface SectionBase {
    name: string;
    description: string;
}

export interface SectionResponse extends SectionBase {
    id: number;
}