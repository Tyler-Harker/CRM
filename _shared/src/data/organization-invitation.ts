import { getOrganizationCollection } from "./organization";

export interface OrganizationInvitation {
  uid: string;
  organizationUid: string;
  userEmail: string;
  createdAt: number;
  createdBy: string;
}

export function getOrganizationInvitationCollection(organizationUid: string) {
  return `${getOrganizationCollection()}/${organizationUid}/invitations`;
}
