# The professional Python + Django environment setup used by many backend developers.
# This workflow keeps every project isolated, clean, and production-ready. 🚀

## 1️⃣ Install Python

Download and install the latest version from:

https://www.python.org/downloads/

During installation make sure you check:

☑ Add Python to PATH

Verify installation:
```
python --version
pip --version
```

## 2️⃣ Create a project folder

Example:
```
mkdir django-projects
cd django-projects
```
Create your project workspace.

## 3️⃣ Create a virtual environment

Professional developers never install packages globally.

Create a virtual environment:
```
python -m venv venv
```
This creates a folder:
```
venv/
```
This environment isolates dependencies per project.

## 4️⃣ Activate the environment
Windows
```
venv\Scripts\activate
```
Linux / Mac
```
source venv/bin/activate
```
Your terminal should show something like:
```
(venv) C:\projects\
```
That means the environment is active.
## 5️⃣ Install Django

Now install Django inside the virtual environment:
```
pip install django
```
Verify:
```
django-admin --version
```
## 6️⃣ Create a Django project
```
django-admin startproject mysite
or safer:
python -m django startproject mysite
```
Now your structure will look like:
```
django-projects/
│
├── venv/
│
└── mysite/
    ├── manage.py
    └── mysite/
        ├── __init__.py
        ├── settings.py
        ├── urls.py
        ├── asgi.py
        └── wsgi.py
```
## 7️⃣ Run the development server

Go inside the project:
```
cd mysite
```
Run server:
```
python manage.py runserver
```
Open browser:
```
Open browser:
```
You will see the Django welcome page.

## 8️⃣ Create your first app

Django projects contain apps.

Example:
```
python manage.py startapp users
```
Structure:
```
mysite/
│
├── users/
│   ├── models.py
│   ├── views.py
│   ├── admin.py
│   ├── apps.py
│   └── migrations/
```
## 9️⃣ Professional dependency management

Save dependencies:
```
pip freeze > requirements.txt
```
Later you can reinstall everything with:
```
pip install -r requirements.txt
```
## 🔟 Professional Django workflow (real backend engineers)

Typical workflow:
```
Create Project
     ↓
Create Apps
     ↓
Define Models
     ↓
Run Migrations
     ↓
Create API / Views
     ↓
Add Authentication
     ↓
Deploy
```
### ⚡ Since you already know Node.js

Here is a quick comparison:
```
| Concept      | Node.js           | Django         |
| ------------ | ----------------- | -------------- |
| Server       | Express           | Django         |
| Router       | Express Router    | urls.py        |
| Controller   | Controller        | views.py       |
| Database ORM | Prisma / Mongoose | Django ORM     |
| Auth         | JWT               | Django Auth    |
| Migration    | Prisma migrate    | Django migrate |

```
🔥 Next step I recommend for you

Learn these Django topics:

1. 1️⃣ Django ORM
2. 2️⃣ Django Authentication System
3. 3️⃣ Django REST API with Django REST Framework
4. 4️⃣ Django Admin Panel
5. 5️⃣ Production deployment
