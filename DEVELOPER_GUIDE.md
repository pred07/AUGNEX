# NYTVNT-OPS Developer Guide

## System Overview
NYTVNT-OPS is a cyber-security training platform built with:
- **Frontend**: React + Vite + TailwindCSS
- **Backend/Data**: Firebase (Authentication + Firestore)
- **Role Management**: Custom Claims (Admin) + Firestore Roles

---

## 🔐 Authentication & Roles
### User Types
1. **Learner (Default)**
   - Can access Learning Paths, Modules, and Profile.
   - Can purchase modules/access using **Coins**.
   - **Restriction**: Cannot access `/admin`.

2. **Admin (Super User)**
   - Access to `/admin` Console.
   - **Capabilities**:
     - Manage Users (Add/Deduct Coins, View Data).
     - Manage Economy (Create/Edit Pricing Bundles).
     - Manage Vouchers (Create/Delete Coupons).
     - **Safety**: Cannot accidentally promote/demote users via UI (safety feature).

### Sync Logic (`AuthContext.jsx`)
- When a user logs in (Google/Email), the app checks `users/{uid}` in Firestore.
- **Self-Healing**: If the document is missing (legacy user), it is auto-created with default values (Role: Learner, Balance: 20).
- **Session Cost**: 1 Coin is deducted per session/login (handled in `firestoreService.js`).

---

## 🛡️ Security Rules (`firestore.rules`)
- **Default Check**: `isAuthenticated()` is required for almost everything.
- **Profiles**: Users can read/write their own data (`isOwner(userId)`).
- **Admin**: Admins can read/write everything using `isAdmin()` function (checks `request.auth.token.role == 'admin'`).
- **Transaction Safety**:
  - `wallet` balance updates must happen via backend/admin or strictly controlled client transactions.
  - `coupons` logic allows users to `update` a coupon **only** if they are adding their ID to the `usedBy` array (preventing tampering with amount/code).

---

## 💰 Economy System
### 1. Coins
- **Currency**: Coins are the central currency. They **do not expire**.
- **Usage**: Used to unlock Modules or pay for Labs.
- **Acquisition**:
  - **Bundles**: Purchase via "Access Protocols" page.
  - **Coupons**: Redemable codes (e.g., `WELCOME2026`).
  - **Bonus**: 20 Coins on signup.

### 2. Coupons
- **Structure**: `{ code: "CODE", amount: 100, usedBy: ["uid1", "uid2"] }`
- **Redemption**: 
  - User enters code on `/subscription` page.
  - Transaction checks if `uid` is in `usedBy`.
  - If valid: Adds coins to User Wallet + Adds `uid` to Coupon `usedBy` list.

### 3. Pricing Bundles
- Configurable via **Admin Console** > **Economy Ctrl**.
- Stored in `bundles` collection.
- Frontend (`Pricing.jsx`) dynamically renders these cards.

---

## 🛠️ Feature Reference

| Feature | Component | Logic Location | Note |
| :--- | :--- | :--- | :--- |
| **User Search** | `AdminUsers.jsx` | `getAllUsers()` | Supports ID/Email/Name search. |
| **Coin Mgmt** | `AdminUsers.jsx` | `adminAddCoins()` | Use +ADD or -REM buttons. |
| **Coupon Create** | `AdminCoupons.jsx` | `createCoupon()` | Requires unique code. |
| **Pricing UI** | `Pricing.jsx` | `bundles` collection | Dynamic based on Firestore data. |
| **Navigation** | `MainLayout.jsx` | Context/Role check | Hides Admin link for non-admins. |

---

## 🚀 Deployment Notes
- **Environment**: Requires `.env` with Firebase Config.
- **Admin Setup**: Run `node scripts/set-admin.js <email>` to promote the first admin.
## 🧠 Logic Deep Dive

### 1. User Logic (Login & Wallets)
- **Login**: `AuthContext.jsx` detects login. If `users/{uid}` is missing, it creates it.
- **Session**: `App.jsx` triggers `deductSessionCost(uid)` on mount.
- **Wallet**: 
  - Stored in `users/{uid}.walletBalance`.
  - Protected by `firestore.rules` (only Admin or specific Transactions can write).

### 2. Coupon Logic
- **Collection**: `coupons/{code}`
- **Fields**: `{ amount: Number, code: String, usedBy: [uid1, uid2] }`
- **Redemption**:
  - **Check**: Is `uid` in `usedBy`?
  - **Update**: Run Transaction -> Deduct Coupon -> Add Coins to User -> Add User to Coupon.
  - **Expiry**: Currently **No Expiry** implemented (as per design choice).

### 3. Admin Console
- **Role Check**: `src/layouts/MainLayout.jsx` checks `isAdmin` claim.
- **Capabilities**:
  - **Manage Users**: Direct Firestore updates.
  - **Manage Bundles**: Edits `bundles` collection which `Pricing.jsx` reads.
  - **Sales Leads**: (New) `inquiries` collection stores "Contact Sales" requests.

### 4. Pricing & Expiry
- **Coins**: Do not expire.
- **Access**: Purchasing a module unlocks it permanently (stored in `purchasedModules` array).
- **Plans**: 3 Default Plans (Starter, Pro, Enterprise). Reset via `scripts/reset-plans.cjs`.
