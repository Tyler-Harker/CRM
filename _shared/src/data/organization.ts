export interface Organization {
  uid: string;
  createdAt: number;
  createdByUid: string;
  lastUpdatedAt: number;
  lastUpdatedByUid: string;
}
export const ORGANIZATION_COLLECTION = "organizations";
