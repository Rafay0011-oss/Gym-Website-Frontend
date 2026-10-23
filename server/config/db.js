import admin from "firebase-admin";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Root of server folder (one level up from config/)
const serverDir = path.resolve(__dirname, "..");

let isInitialized = false;

const initFirebase = () => {
  if (isInitialized) return true;

  try {
    const rawPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "./serviceAccountKey.json";
    const serviceAccountPath = path.isAbsolute(rawPath)
      ? rawPath
      : path.resolve(serverDir, rawPath);

    if (!existsSync(serviceAccountPath)) {
      console.warn("\n⚠️  [Firebase Notice] serviceAccountKey.json not found in server/ directory.");
      console.warn("   Place your downloaded Firebase service account key in: server/serviceAccountKey.json");
      console.warn("   Server is running in standby mode. Database endpoints will connect once the file is added.\n");
      return false;
    }

    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    isInitialized = true;
    console.log("✅ Firebase initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Firebase initialization error:", error.message);
    return false;
  }
};

const getDB = () => {
  if (!isInitialized) {
    initFirebase();
  }
  if (!isInitialized) {
    const error = new Error(
      "Firebase is not configured yet. Please add serviceAccountKey.json to the server/ directory."
    );
    error.status = 503;
    throw error;
  }
  return admin.firestore();
};

const formatFirebaseError = (error) => {
  if (
    error?.message?.includes("Cloud Firestore API has not been used") ||
    error?.message?.includes("PERMISSION_DENIED") ||
    error?.code === 7
  ) {
    return "Firestore Database is not enabled in Firebase Console. Go to Firebase Console > Firestore Database > Create Database.";
  }
  return error?.message || "Server error. Please try again later.";
};

export { initFirebase, getDB, formatFirebaseError };
