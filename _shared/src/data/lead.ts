import { LeadSource } from "./leadSource";

export interface Lead {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  createdAt: number;
  source: LeadSource;
}
export const LEAD_COLLECTION = "leads";
