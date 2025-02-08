import * as admin from "firebase-admin";
import { connectFirestoreEmulator } from "firebase/firestore";

let app: admin.app.App;
if (!admin.apps.length) {
  app = admin.initializeApp({
    projectId: "tgharker-crm",
  });
} else if (admin.apps[0] !== null) {
  app = admin.apps[0];
}
export { app as firebaseAdmin };
