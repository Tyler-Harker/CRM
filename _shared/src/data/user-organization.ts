export interface UserOrganization {
  uid: string;
  userUid: string;
  userFirstName?: string;
  userLastName?: string;
  userEmail: string;
  organizationUid: string;
  organizationName: string;
  createdAt: number;
  createdBy: string;
  lastUpdatedAt: number;
  lastUpdatedby: string;
}
export function getUserOrganziationCollection() {
  return "userOrganizations";
}
