import { initializeServerApp } from "firebase/app";
import { app } from "./app";

import { getIdToken, getUserClaims } from "@/utils/cookieUtils.server";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth, User } from "firebase/auth";
import { UserClaims } from "@tyler-harker/crm-shared";

const getFirebaseAsUser = async (idToken: string | null = null) => {
  if (idToken == null) {
    idToken = await getIdToken();
  }
  return initializeServerApp(app, {
    authIdToken: idToken ?? undefined,
  });
};

const getAuthAsUser = async () => {
  const auth = getAuth(app);
  const userClaims = (await getUserClaims()) as UserClaims;
  try {
    if (process.env.NODE_ENV === "development") {
      connectAuthEmulator(auth, "localhost");
    }
  } catch (ex) {}

  auth.updateCurrentUser({ uid: userClaims.sub } as User);
};

const getFirestoreAsUser = async (idToken: string | null = null) => {
  const firebase = await getFirebaseAsUser(idToken);
  const firestore = getFirestore(firebase);

  await getAuthAsUser();
  try {
    if (process.env.NODE_ENV === "development") {
      connectFirestoreEmulator(firestore, "localhost", 8080);
    }
  } catch (ex) {}

  return firestore;
};

export { getFirebaseAsUser, getFirestoreAsUser };
