import { LeadSource } from "./leadSource";
import { getOrganizationCollection } from "./organization";

export interface Lead {
  uid: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  createdAt: number;
  source: LeadSource;
}

export function getLeadCollection(organizationUid: string) {
  return `${getOrganizationCollection()}/leads`;
}
