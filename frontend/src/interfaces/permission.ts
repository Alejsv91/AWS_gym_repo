import { SectionResponse } from "./sections";

export interface PermissionBase {
    sectionResponse: SectionResponse;
    action: string;
}

export interface PermissionResponse extends PermissionBase {
    id: number;
}

