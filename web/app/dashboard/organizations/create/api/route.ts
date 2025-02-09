import { getIdToken, getUserClaims } from "@/utils/cookieUtils.server";
import { firebaseAdmin } from "@/firebase-lib/app.admin";
import { FormModel } from "../create-organization-form.model";
import {
  Organization,
  ORGANIZATION_COLLECTION,
  getUserOrganziationCollection,
  UserClaims,
  UserOrganization,
} from "@tyler-harker/crm-shared";

export async function POST(request: Request) {
  const idToken = await getIdToken();
  const userClaims: UserClaims | null = await getUserClaims();
  if (idToken === null || userClaims == null) {
    return Response.json(null, { status: 401 });
  }
  const model: FormModel = await request.json();
  model.name = model.name.toLowerCase();

  const firestore = firebaseAdmin.firestore();

  const organizationsCollection = firestore.collection(ORGANIZATION_COLLECTION);
  const userOrganizationCollection = firestore.collection(
    getUserOrganziationCollection()
  );

  return await firestore.runTransaction(async (transaction) => {
    const currentTime = new Date().getTime();

    const existingOrgQuery = await organizationsCollection
      .where("name", "==", model.name)
      .limit(1)
      .count();
    const existingOrgCount = (await transaction.get(existingOrgQuery)).data()
      .count;

    if (existingOrgCount !== 0) {
      return Response.json(null, { status: 409 });
    }

    const newOrgRef = organizationsCollection.doc();
    transaction.create(newOrgRef, {
      uid: newOrgRef.id,
      name: model.name,
      createdAt: currentTime,
      createdByUid: userClaims.sub,
      lastUpdatedAt: currentTime,
      lastUpdatedByUid: userClaims.sub,
    } as Partial<Organization>);

    const newUserOrgRef = userOrganizationCollection.doc();
    transaction.create(newUserOrgRef, {
      uid: newUserOrgRef.id,
      organizationUid: newOrgRef.id,
      organizationName: model.name,
      userUid: userClaims.sub,
      userEmail: userClaims.email,
      createdAt: currentTime,
      createdBy: userClaims.sub,
      lastUpdatedAt: currentTime,
      lastUpdatedby: userClaims.sub,
    } as Partial<UserOrganization>);

    firebaseAdmin.auth().setCustomUserClaims(userClaims.sub, {
      selectedOrganizationUid: newOrgRef.id,
    } as UserClaims);

    return Response.json({}, { status: 201 });
  });
}
