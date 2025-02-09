import { LeadSource } from "./leadSource";
export interface Lead {
    uid: string;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    createdAt: number;
    source: LeadSource;
}
export declare function getLeadCollection(organizationUid: string): string;
