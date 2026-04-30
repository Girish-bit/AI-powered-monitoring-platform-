import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, enableNetwork } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Connectivity Test
async function testConnection() {
  try {
    await enableNetwork(db);
    // Attempt to probe a non-existent document to check server connectivity
    await getDocFromServer(doc(db, '_internal_', 'probe'));
  } catch (error: any) {
    if (error.message?.includes('the client is offline')) {
      console.warn("GuardianAI: Firebase client is offline. Some features may be limited.");
    }
  }
}

// Only run in browser
if (typeof window !== 'undefined') {
  testConnection();
}

export type { User };
export { onAuthStateChanged };
