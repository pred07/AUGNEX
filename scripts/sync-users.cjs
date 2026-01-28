const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require('./service-account-key.json');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function syncUsers() {
    console.log("🔄 Starting User Sync (Auth -> Firestore)...");

    try {
        // 1. Get all users from Auth
        const listUsersResult = await admin.auth().listUsers(1000);
        const authUsers = listUsersResult.users;
        console.log(`Found ${authUsers.length} users in Authentication.`);

        let syncedCount = 0;

        for (const user of authUsers) {
            const userRef = db.collection('users').doc(user.uid);
            const docSnap = await userRef.get();

            if (!docSnap.exists) {
                console.log(`⚠️  User ${user.email} (${user.uid}) missing in Firestore. Creating...`);

                // Create basic profile
                await userRef.set({
                    email: user.email,
                    displayName: user.displayName || user.email.split('@')[0],
                    photoURL: user.photoURL || null,
                    role: user.email === 'admin@nytvnt.dev' ? 'admin' : 'learner',
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    lastActive: admin.firestore.FieldValue.serverTimestamp(),
                    walletBalance: 20, // Default bonus
                    progress: {
                        xp: 0,
                        completedModules: {},
                        unlockedBadges: []
                    }
                });
                syncedCount++;
                console.log(`✅ Created Firestore doc for ${user.email}`);
            } else {
                // Optional: Update role if mismatch? 
                // console.log(`✓  User ${user.email} exists.`);
            }
        }

        console.log(`\n🎉 Sync Complete! Created ${syncedCount} missing documents.`);
        process.exit(0);

    } catch (error) {
        console.error("Sync Error:", error);
        process.exit(1);
    }
}

syncUsers();
