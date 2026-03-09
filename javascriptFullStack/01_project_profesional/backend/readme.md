# 🧠 The 7-Layer Backend Architecture (Industry Style)

Typical layered architecture:

```
Client
  ↓
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Database
```

But large systems often expand it into 7 layers:

```
1. Router
2. Controller
3. Validator / Middleware
4. Service
5. Repository
6. Model / Entity
7. Database
```

Let’s break each one clearly.

## 1️⃣ Router Layer

Job: Decide which controller should handle the request.</br>
Example:

```
router.post("/register", userController.register);
router.post("/login", userController.login);
```

The router only maps:

```
URL  →  Controller
```

## 2️⃣ Controller Layer

Job: Handle HTTP.</br>
Responsibilities:

1. read req.body
2. read req.params
3. call service
4. send response

Example:

```
async function register(req, res) {
  const user = await userService.register(req.body);

  res.status(201).json(user);
}
```

Controller should be very thin.

## 3️⃣ Validator / Middleware Layer

Job: Validate incoming data.

Example:

```
function validateRegister(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Invalid input");
  }

  next();
}
```

Used before controller:

```
Route → Validator → Controller
```

## 4️⃣ Service Layer

This is the brain of your application.</br>
Responsibilities:

- business logic
- rules
- workflows
- security decisions

Example:

```
async function register(data) {
  const existing = await userRepo.findByEmail(data.email);

  if (existing) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(data.password);

  return userRepo.create({
    email: data.email,
    password: hashed
  });
}
```

This layer contains the real application behavior.

## 5️⃣ Repository Layer

This layer talks to the database.

Example:

```
export default {
  findByEmail(email) {
    return db.users.find(u => u.email === email);
  },

  create(user) {
    db.users.push(user);
    return user;
  }
};
```

Responsibilities:

- queries
- inserts
- updates
- deletes

No business logic here.

## 6️⃣ Model / Entity Layer

This defines data structure.

Example:

```
const User = {
  id: String,
  email: String,
  password: String,
};
```

Or in ORMs like Prisma:

```
model User {
  id       String @id
  email    String
  password String
}
```

## 7️⃣ Database Layer

The storage system.

Examples:

- PostgreSQL
- MongoDB
- MySQL
- Redis

These systems store the actual data.

## 🔁 Full Request Flow

When a request happens:

```
Client sends POST /register
```

Step-by-step:

```
Router
  ↓
Validator
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

## Then response goes back.

## 📦 Example Real Folder Structure

```
project
│
├── routes
│     userRoutes.js
│
├── controllers
│     userController.js
│
├── services
│     userService.js
│
├── repositories
│     userRepository.js
│
├── models
│     userModel.js
│
├── middleware
│     validation.js
│
└── server.js
```

## 🧠 Why senior engineers design systems this way

Because large systems must support:

- millions of users
- multiple developers
- easy testing
- easy maintenance
- reusable logic

Without layers, projects become spaghetti code.

## 🚀 One more advanced thing (very important)

Large companies often add two more layers:

```
Controller
   ↓
Service
   ↓
Use Case
   ↓
Repository
```

This is called:

Clean Architecture

or

Hexagonal Architecture

Used by companies like:

- Netflix
- Amazon
- Uber

## 🧠 What you should focus on right now

Since you are learning pure Node.js HTTP, the perfect learning stack is:

```
Router
Controller
Service
Repository
```

If you master these 4 layers, you will already think like a backend engineer.
