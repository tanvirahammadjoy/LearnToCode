# A good backend engineer does not start coding immediately. Before starting a project, there are several thinking steps. These steps help avoid messy code and bad architecture later. 🚀

## Alright, let’s build the professional backend project structure used in real-world apps with Node.js and Express.js. This structure helps keep code clean, scalable, and maintainable. 🚀

### 1️⃣ The Professional Folder Structure
**Example backend project:**
```
project/
│
├── src/
│   ├── server.js
│   ├── app.js
│   │
│   ├── routes/
│   │     └── auth.routes.js
│   │
│   ├── controllers/
│   │     └── auth.controller.js
│   │
│   ├── services/
│   │     └── auth.service.js
│   │
│   ├── models/
│   │     └── user.model.js
│   │
│   ├── middleware/
│   │     └── auth.middleware.js
│   │
│   ├── config/
│   │     └── db.js
│   │
│   └── utils/
│         └── jwt.js
│
└── package.json
```

This pattern is used in many backend systems.

### 2️⃣ server.js (Entry Point)
This file starts the server.
```
import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
Think of it as the engine start button.
### 3️⃣ app.js (Express Setup)
Here we configure Express.js.
```
import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

export default app;
```
**Responsibilities:**
- configure middleware
- connect routes
- initialize the app

### 4️⃣ Routes (Entry for Requests)
Routes decide which controller should run.

Example:
```
routes/auth.routes.js
```
```
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
```
**Flow:**
```
Request → Route → Controller
```

### 5️⃣ Controllers (Handle Requests)
Controllers receive the request and send responses.
```
controllers/auth.controller.js
```
```
import { createUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
};
```
Controllers should stay thin.</br>
Their job is:
```
Request → Call Service → Send Response
```
### 6️⃣ Services (Business Logic)
Services contain the main logic.
- services/auth.service.js
```
services/auth.service.js
```
```
import User from "../models/user.model.js";

export const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};
```
This separation keeps logic reusable.

### 7️⃣ Models (Database Layer)
Models interact with the database like MongoDB or PostgreSQL.

Example:
```
models/user.model.js
```
```
const users = [];

export default {
  create(user) {
    users.push(user);
    return user;
  }
};
```
In real apps, this would use an ORM like Prisma.

### 8️⃣ Middleware (Request Processing)
Middleware runs before reaching controllers.

Example authentication middleware:
```
middleware/auth.middleware.js
```
```
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
```
Often used with JSON Web Token authentication.

### 9️⃣ Complete Request Flow

When a request comes:
```
Client
  ↓
Server
  ↓
Express App
  ↓
Middleware
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
Database
  ↓
Response
```

