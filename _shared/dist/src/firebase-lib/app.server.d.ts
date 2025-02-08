declare const auth: import("@firebase/auth").Auth;
declare const db: import("@firebase/firestore").Firestore;
declare const functions: import("@firebase/functions").Functions;
declare const refreshIdTokenAsync: () => Promise<void>;
export { auth, db, functions, refreshIdTokenAsync };
