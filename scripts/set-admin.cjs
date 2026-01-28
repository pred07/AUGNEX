const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require('./service-account-key.json');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const email = process.argv[2];
const password = process.argv[3] || 'nytvnt@207'; // Default password if not provided

if (!email) {
    console.error('Please provide an email address.');
    console.log('Usage: node scripts/set-admin.js <email> [password]');
    process.exit(1);
}

async function setAdminRole(email, password) {
    try {
        let user;
        try {
            user = await admin.auth().getUserByEmail(email);
            console.log(`User ${email} found. ID: ${user.uid}`);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                console.log(`User ${email} not found. Creating new user...`);
                user = await admin.auth().createUser({
                    email: email,
                    password: password,
                    emailVerified: true, // Auto-verify dummy emails
                    displayName: 'Super Admin'
                });
                console.log(`User created. ID: ${user.uid}`);
            } else {
                throw error;
            }
        }

        // Set custom claim
        await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
        console.log(`Success! ${email} is now an admin.`);
        console.log(`You can login with:`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('NOTE: Ensure "Email/Password" sign-in is enabled in your Firebase Console!');

    } catch (error) {
        console.error('Error:', error);
    }
}

setAdminRole(email, password);
