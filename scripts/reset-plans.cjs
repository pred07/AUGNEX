const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require('./service-account-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const defaultPlans = [
    {
        id: 'starter',
        name: 'Starter Agent',
        price: '$29',
        coins: '500',
        features: ['Access to Basic Modules', '24/7 Support', 'Community Access']
    },
    {
        id: 'pro',
        name: 'Elite Operative',
        price: '$49',
        coins: '1500',
        features: ['All Modules Unlocked', 'Priority Support', 'Private Discord Channel', 'Certification']
    },
    {
        id: 'enterprise',
        name: 'Cyber Warlord',
        price: '$99',
        coins: '3500',
        features: ['Lifetime Access', '1-on-1 Mentorship', 'Custom Learning Path', 'Physical Swag Pack']
    }
];

async function resetPlans() {
    console.log("🔄 Resetting Pricing Plans...");
    try {
        const batch = db.batch();

        for (const plan of defaultPlans) {
            const ref = db.collection('bundles').doc(plan.id);
            batch.set(ref, plan);
        }

        await batch.commit();
        console.log("✅ Successfully restored 3 default plans.");
    } catch (error) {
        console.error("Error resetting plans:", error);
    }
}

resetPlans();
