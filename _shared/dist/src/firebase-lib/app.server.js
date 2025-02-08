"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshIdTokenAsync = exports.functions = exports.db = exports.auth = void 0;
const auth_1 = require("firebase/auth");
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const functions_1 = require("firebase/functions");
const js_cookie_1 = __importDefault(require("js-cookie"));
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const app = (0, app_1.initializeServerApp)(firebaseConfig, { authIdToken: undefined });
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
const functions = (0, functions_1.getFunctions)(app);
exports.functions = functions;
if (process.env.NODE_ENV === "development") {
    (0, auth_1.connectAuthEmulator)(auth, "http://localhost:9099");
    (0, firestore_1.connectFirestoreEmulator)(db, "localhost", 8080);
    (0, functions_1.connectFunctionsEmulator)(functions, "localhost", 5001);
}
const refreshIdTokenAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ((_a = auth.currentUser) === null || _a === void 0 ? void 0 : _a.getIdToken(true));
    js_cookie_1.default.set("token", result);
});
exports.refreshIdTokenAsync = refreshIdTokenAsync;
