export interface Organization {
    uid: string;
    createdAt: number;
    createdByUid: string;
    lastUpdatedAt: number;
    lastUpdatedByUid: string;
}
export declare const ORGANIZATION_COLLECTION = "organizations";
export declare function getOrganizationCollection(): string;
