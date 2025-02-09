export interface OrganizationInvitation {
    uid: string;
    organizationUid: string;
    userEmail: string;
    createdAt: number;
    createdBy: string;
}
export declare function getOrganizationInvitationCollection(organizationUid: string): string;
