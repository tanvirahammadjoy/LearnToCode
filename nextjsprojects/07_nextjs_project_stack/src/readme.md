# Love it 🔥 This is a very solid stack already. Since you're building a custom JWT auth system (not using NextAuth), let’s design a clean, production-ready stack around:

- ✅ Next.js
- ✅ TypeScript
- ✅ MongoDB + Mongoose
- ✅ JWT
- ✅ bcrypt
- Now let’s structure it properly.

🧱 Core Stack (Your Base)
### 1️⃣ Frontend & Backend
Next.js
TypeScript
Use:
App Router (/app)
Route Handlers (app/api/.../route.ts)
Server Components where possible

### 2️⃣ Database
MongoDB
Mongoose
You’ll need:
DB connection utility
User schema
Index on email (unique)

### 3️⃣ Authentication
JSON Web Token
bcrypt
JWT → Access token
bcrypt → Hash & compare passwords

🚀 What Else You NEED (Important)
Here’s what people forget:

## 1️⃣ Validation Layer (VERY IMPORTANT)
Use:
Zod (Recommended)
Request body validation
Type-safe schema validation
This prevents:
Invalid email format
Weak passwords
Missing fields

### 2️⃣ Environment Variables
Use:
.env.local
process.env.JWT_SECRET
process.env.MONGODB_URI
Never hardcode secrets.

### 3️⃣ Cookie Handling
Instead of storing JWT in localStorage ❌
Store it in:

#### HTTP-only cookies ✅
Why?
Prevents XSS attacks
More secure
Use:
cookies().set(...)

### 4️⃣ Middleware (Route Protection)
Use Next.js middleware:
Protect dashboard routes
Check JWT before allowing access
File:
middleware.ts

### 5️⃣ Token Strategy (VERY IMPORTANT DESIGN)
You need to decide:

#### Option A — Simple
- Access token only
- Expires in 1–2 hours

#### Option B — Professional (Recommended)
- Access token (short expiry)
- Refresh token (long expiry)
- Rotation system
- For learning → start with simple
- For production → use refresh token strategy

#### 6️⃣ Password Security Rules
Add:
```
Minimum 8–10 characters
Hash with salt rounds (10–12)
Example:
bcrypt.hash(password, 12)

7️⃣ Error Handling Structure
Create:
/lib/errors.ts

Standardize:
400 – Validation
401 – Unauthorized
403 – Forbidden
500 – Server error
```

### 8️⃣ Folder Structure (Clean Architecture)
Here’s a clean structure:

```
src/
 ├── app/
 │    ├── api/
 │    │    ├── auth/
 │    │    │    ├── register/route.ts
 │    │    │    ├── login/route.ts
 │    │    │    ├── logout/route.ts
 │    │    │    └── me/route.ts
 │
 ├── lib/
 │    ├── db.ts
 │    ├── jwt.ts
 │    ├── hash.ts
 │
 ├── models/
 │    └── User.ts
 │
 ├── middleware.ts
 ```

#### 🧠 Extra Professional Additions (Optional but Powerful)
If you want production-level:

#### 🔹 Rate Limiting
Prevent brute-force login attacks.
Use:
Upstash Redis
or in-memory limiter

####  🔹 Logging
Use:
Pino
Winston

#### 🔹 Email Verification
Use:
Resend
Nodemailer

#### 🔹 Role-Based Access Control (RBAC)
Add to User model:

```
role: "user" | "admin"
```

#### 🔐 Security Checklist (Very Important)
- Hash passwords with bcrypt
- Never return password field
- Store JWT in HTTP-only cookie
- Use strong JWT_SECRET (32+ chars)
- Add token expiration
- Validate input
- Add CORS rules if needed

## 🧱 Final Tech Stack Summary
| Layer            | Tech               |
| ---------------- | ------------------ |
| Framework        | Next.js            |
| Language         | TypeScript         |
| Database         | MongoDB            |
| ODM              | Mongoose           |
| Auth             | JWT                |
| Password Hashing | bcrypt             |
| Validation       | Zod                |
| Cookie Handling  | HTTP-only cookies  |
| Route Protection | Next.js Middleware |

## 🎯 Project Goal

We will build:

✅ Register

✅ Login

✅ Logout

✅ Get current user (/me)

✅ Protected routes

✅ Middleware JWT verification

✅ HTTP-only cookies

✅ Password hashing with bcrypt

✅ Custom JWT implementation (no NextAuth)

We will NOT use:

❌ NextAuth

❌ Auth0

❌ Clerk

Everything manual. Everything understood.
-
### 🧠 First — Understand The Architecture

Here’s how authentication will flow:
```
Client → Register → Hash Password → Save User

Client → Login → Compare Password → Generate JWT → Set HTTP-only Cookie

Client → Request Protected Route → Middleware → Verify JWT → Allow / Block

Client → Logout → Clear Cookie
```
That’s the full lifecycle.

#### 🧱 Step 0 — Install Stack
We start with:

Next.js

TypeScript

MongoDB

Mongoose

JSON Web Token

bcrypt

Zod

### ` 🛠 Step 1 — Create Project `
```
npx create-next-app@latest deep-auth-project
```
Choose:

✅ TypeScript

✅ App Router

❌ No Tailwind (optional)

❌ No ESLint (your choice)

```
Then install:

npm install mongoose jsonwebtoken bcrypt zod
npm install -D @types/jsonwebtoken @types/bcrypt
```
```
📁 Step 2 — Clean Architecture Setup
Create this structure:
src/
 ├── app/
 │    ├── api/
 │    │    └── auth/
 │
 ├── lib/
 │    ├── db.ts
 │    ├── jwt.ts
 │    ├── hash.ts
 │
 ├── models/
 │    └── User.ts
 │
 └── middleware.ts
```

### `🧠 Before Writing Code — Important Design Decision`
We will use:

***`🔐 Strategy 1 (For Learning First) `***

*****`Access token only`*****
- Expiry: 1 hour
- Stored in HTTP-only cookie
- Verified in middleware

Later we can upgrade to refresh tokens.

### `🔥 Step 3 — Database Connection (Very Important)`
In lib/db.ts:
</br>
* We create a reusable Mongo connection.
* Key concept:
* In Next.js dev mode, files reload often.
So we must cache the connection globally.
* This prevents multiple connections.

### 🔐 Step 4 — User Model

User fields:
```
{
  name: string
  email: string (unique)
  password: string (hashed)
  role: "user" | "admin"
}
```
#### Important:
- Never return password
- Add unique index on email

### 🔑 Step 5 — Hash Utility (Understanding bcrypt Deeply)

Why bcrypt?
#### Because:
- It automatically salts
- It is slow by design
Protects against rainbow tables

#### We’ll create:
- hashPassword()
- comparePassword()

And understand internally what bcrypt does.

### 🧾 Step 6 — JWT Utility (Very Important)

#### We’ll manually:
- signToken(payload)
- verifyToken(token)
- Important understanding:

#### When verifying:
1. We extract header + payload
2. Recalculate signature using secret
3. Compare signature

Just like we discussed before 🔥

### 🧠 Step 7 — Register Route
Flow:

1. Validate input (Zod)
2. Check if user exists
3. Hash password
4. Save user
5. Return success

NO TOKEN on register (for now).

### 🧠 Step 8 — Login Route
**Flow:**
1. Validate input
2. Find user
3. Compare password
4. Generate JWT
5. Set HTTP-only cookie

**Important:**
```
cookies().set("token", jwt, {
  httpOnly: true,
  secure: true,
  sameSite: "strict"
})
```

### 🧠 Step 9 — Middleware Protection
**In middleware.ts:**
1. Get token from cookie
2. Verify token
3. If invalid → redirect
4. If valid → allow

This is where you’ll fully understand stateless auth.

### 🧠 Step 10 — /me Route
**This route:**
1. Reads token
2. Verifies
3. Returns current user info

This proves authentication works.

### 🧠 What You Will Deeply Understand After This
* Stateless authentication
* Why JWT signature matters
* Why secret key must be strong
* Why HTTP-only cookies > localStorage
* Why hashing must be slow
* Why middleware is powerful
* Why backend validation matters

$$🚀 Question Before We Start Coding$$

*Do you want to:*

*Build backend only first (API focus)?*

*Or build backend + simple frontend forms together?*

*Since you're serious about learning auth deeply,*
*I recommend:*

*👉 Backend first. Test with Postman. Then connect frontend.*

*Tell me your choice and we start Step 1 properly — with real code and explanation for every line.*

## 🧠 PHASE 1 — Backend Auth API (Deep Understanding Mode)
What We’re Building 
</br>
**Auth Routes**
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```
**Protected Example Route**
```
GET    /api/protected
```

### 🧱 STEP 1 — Project Setup
**If not created yet:**
```
npx create-next-app@latest . or deep-auth
```

Choose:

✅ TypeScript

✅ App Router

❌ No Tailwind (for now)

**Then install dependencies:**
```
npm install mongoose jsonwebtoken bcrypt zod
npm install -D @types/jsonwebtoken @types/bcrypt
```

### 🧠 STEP 2 — Environment Variables
**Create:**
```
.env.local
```
**Add:**
```
MONGODB_URI=mongodb://127.0.0.1:27017/deep-auth
JWT_SECRET=super_secret_key_that_is_long_32_chars
```

### 🧠 STEP 3 — Database Connection (Important Concept)
**Create:**
<code>
src/lib/db.ts
</code>
</br>
We must cache connection globally because Next.js hot reload reconnects often.

Here’s the correct professional pattern:
```
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
```
**Why this matters**
</br>
***In development:***
</br>
1. Next.js reloads files
2. Without caching → many Mongo connections
3. Mongo will crash eventually

Now you understand real-world backend problem.

### 🧠 STEP 4 — User Model
```
src/models/User.ts
```

```
import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);
```
**Important:**</br>
We use:
```
models.User || model(...)
```
Because Next.js reloads model files too.
</br>
Without this → OverwriteModelError.

### 🧠 STEP 5 — Password Hash Utility
```
src/lib/hash.ts
```
```
import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hashed: string
) {
  return bcrypt.compare(password, hashed);
}
```
Why 12?
</br>
Salt rounds
</br>
Slower = more secure
</br>
10–12 is standard

### 🧠 STEP 6 — JWT Utility
Create:
```
src/lib/jwt.ts
```
```
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
```
**You now control signing & verifying manually.**

### 🧠 STEP 7 — Register Route
**Create:**
```
src/app/api/auth/register/route.ts
```
```
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/hash";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.parse(body);

    await connectDB();

    const existingUser = await User.findOne({ email: parsed.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(parsed.password);

    await User.create({
      ...parsed,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}
```
### 🧠 TEST REGISTER
***Use Postman:***</br>
POST http://localhost:3000/api/auth/register
</br>
***Body JSON:***
```
{
  "name": "Tanvir",
  "email": "tanvir@test.com",
  "password": "123456"
}
```
**Check MongoDB → password should be hashed.**
</br>

#### 🚀 STOP HERE
Before continuing to Login:
</br>
**Confirm:**
* ✅ Project runs
* ✅ DB connects
* ✅ Register works
* ✅ Password hashed

Then we continue to:

🔐 Login route</br>
🍪 HTTP-only cookie</br>
🛡 Middleware protection</br>
👤 /me route</br>
🔓 Logout</br>

Reply:</br>
Register working ✅</br>
Then we move to the most important part — LOGIN & JWT flow 🔥</br>
