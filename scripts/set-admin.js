const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const email = process.argv[2];

if (!email) {
    console.error('Please provide an email address.');
    console.log('Usage: node scripts/set-admin.js <email>');
    process.exit(1);
}

async function setAdminRole(email) {
    try {
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
        console.log(`Success! ${email} is now an admin.`);
        console.log('User must sign out and sign in again for changes to take effect.');
    } catch (error) {
        console.error('Error setting admin role:', error);
    }
}

setAdminRole(email);
