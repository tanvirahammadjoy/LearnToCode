# 🔐 Complete Backend Authentication System

A **complete backend authentication system** built with **JavaScript, Node.js, Express.js, MongoDB, and JWT**.
This project demonstrates how to build a **secure and scalable authentication system** including **user registration, login, protected routes, password hashing, and token-based authentication**.

The goal of this project is to deeply understand how authentication works in modern backend applications.

---

# 🚀 Features

### Authentication

- User Registration
- User Login
- Password Hashing with bcrypt
- JWT Authentication
- Protected Routes
- Token Verification Middleware

### Security

- Password hashing with bcrypt
- JWT token authentication
- Environment variable protection using dotenv
- Secure API design

### User Management

- Create user
- Login user
- Fetch authenticated user profile
- Update user profile
- Delete account

---

# 🛠 Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **MongoDB** – Database
- **Mongoose** – ODM for MongoDB
- **JWT (jsonwebtoken)** – Authentication tokens
- **bcrypt** – Password hashing
- **dotenv** – Environment variable management

---

# 📁 Project Structure

```
backend-auth-system
│
├── src
│   │
│   ├── config
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers
│   │   └── auth.controller.js
│   │
│   ├── models
│   │   └── user.model.js
│   │
│   ├── routes
│   │   └── auth.routes.js
│   │
│   ├── middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── services
│   │   └── auth.service.js
│   │
│   ├── utils
│   │   ├── generateToken.js
│   │   └── hashPassword.js
│   │
│   ├── validators
│   │   └── auth.validator.js
│   │
│   ├── constants
│   │   └── messages.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests
│   └── auth.test.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 🔑 Authentication Flow

1. User registers with fullName, userName, email & password
2. Password is **hashed using bcrypt**
3. User logs in with credentials
4. Server **generates JWT token** like accessToken & refreshToken
5. Client stores the tokens
6. Client sends token in **Authorization header**
7. Middleware verifies token for protected routes

---

# 📡 API Endpoints

### Register User

```
POST /api/v1/auth/register
```

### Login User

```
POST /api/v1/auth/login
```
### Refresh_Token
```
POST /api/v1/auth/refresh_token
```
### Logout
```
POST /api/v1/auth/logout
```

### Get Profile

```
GET /api/v1/auth/profile
```

### Update Profile

```
PUT /api/v1/auth/profile
```

### Delete Account

```
DELETE /api/v1/auth/profile
```

---

# ⚠️ Edge Cases to Handle

Good authentication systems must handle edge cases such as:

- Duplicate email registration
- Invalid email format
- Weak password validation
- Incorrect login credentials
- Expired JWT tokens
- Missing authentication token
- Invalid token
- Database connection failure
- User not found
- Password comparison failure

---

# 🔐 Security Considerations

To make the system more secure:

- Use **strong password validation**
- Set **JWT expiration time**
- Use **HTTP-only cookies** for tokens
- Implement **rate limiting** for login attempts
- Add **helmet middleware** for security headers
- Use **CORS properly**

---

# 🧪 Testing Ideas

You can test the system using:

- Postman
- Thunder Client
- Insomnia
- Frontend application

Test cases:

- Register new user
- Login with correct credentials
- Login with wrong password
- Access protected route without token
- Access protected route with token

---

# 🔍 Future Improvements

This project can be expanded with:

- Email verification
- Password reset system
- Refresh tokens
- Role-based authentication (Admin/User)
- OAuth login (Google, GitHub)
- Two-factor authentication
- Rate limiting
- Account lock after failed login attempts

---

# 🌍 Things to Explore

If you want to go deeper into backend authentication:

- Session vs JWT authentication
- Access token vs refresh token
- OAuth authentication
- API security best practices
- Microservice authentication
- Redis for token storage
- Cookie-based authentication

---

# 📚 Learning Goals

This project helps understand:

- Backend authentication architecture
- Secure password storage
- Token-based authentication
- Middleware design in Express
- REST API security practices

---

# 🤝 Contribution

Feel free to fork this repository and improve the project.

---

# 📜 License

This project is open source and available under the MIT License.

---

# We’ll implement a clean Node.js authentication backend with:

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- dotenv

This will be a solid beginner → intermediate backend architecture.

## 1️⃣ Install Dependencies

First initialize the project.

```
npm init -y
```

Install dependencies:

```
npm install express mongoose bcryptjs jsonwebtoken dotenv cors
```

Dev dependency:

```
npm install nodemon --save-dev
```

Update package.json:

```
"scripts": {
 "dev": "nodemon src/server.js"
}
```

## 2️⃣ .env

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/auth-system
JWT_SECRET=supersecretkey
```

## 3️⃣ src/server.js

Server entry point.

```
import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 4️⃣ src/app.js

Main express configuration.

```
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export default app;
```

## 5️⃣ src/config/db.js

MongoDB connection.

```
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
```

## 6️⃣ src/models/user.model.js

User schema.

```
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
```

---

## 7️⃣ src/utils/hashPassword.js

```
import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
```

## 8️⃣ src/utils/generateToken.js

```
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};

export default generateToken;
```

---

## 9️⃣ src/services/auth.service.js

Business logic.

```
import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

export const registerUserService = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  return user;
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await comparePassword(password, user.password);

  if (!match) {
    throw new Error("Invalid credentials");
  }

  return user;
};
```

## 🔟 src/controllers/auth.controller.js

```
import generateToken from "../utils/generateToken.js";
import {
  registerUserService,
  loginUserService
} from "../services/auth.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      message: "User registered",
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await loginUserService(req.body);

    res.json({
      message: "Login successful",
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};
```

## 1️⃣1️⃣ src/routes/auth.routes.js

```
import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
```

## 1️⃣2️⃣ src/middleware/auth.middleware.js

JWT protection middleware.

```
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
```
---
## 1️⃣3️⃣ src/middleware/error.middleware.js
Global error handler.
```
const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Server Error"
  });
};

export default errorMiddleware;
```
## 1️⃣4️⃣ Test API
Run server:
```
npm run dev
```
Test with Postman or Thunder Client.

### Register
```
POST /api/auth/register
```
```
{
 "email":"tanvir@email.com",
 "password":"123456"
}
```
