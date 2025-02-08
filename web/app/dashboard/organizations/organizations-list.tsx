// import { collection, getDocs, query } from "firebase/firestore";
import { OrganizationsListClient } from "./organizations-list.client";
// import { getFirestoreAsUser } from "@/firebase-lib/app.as-user";
// import {
//   USER_ORGANIZATION_COLLECTION,
//   UserOrganization,
// } from "@tyler-harker/crm-shared";

export async function OrganizationsList() {
  // const firestoreAsUser = await getFirestoreAsUser();
  // const userOrgCollection = collection(
  //   firestoreAsUser,
  //   USER_ORGANIZATION_COLLECTION
  // );

  // const userOrgQuery = query(userOrgCollection);
  // const userOrgSnapshot = await getDocs(userOrgQuery);

  // // Create a plain array of objects, no methods or metadata
  // const userOrgs: UserOrganization[] = userOrgSnapshot.docs.map((doc) => {
  //   // Get document data and include the document id as part of the object
  //   return doc.data() as UserOrganization;
  // });

  // Return the client component with the plain data
  return <OrganizationsListClient />;
}
