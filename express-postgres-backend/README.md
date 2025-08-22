# Express + PostgreSQL Backend (JWT Auth, Posts CRUD, Comments, Image Upload)

This is a complete backend for a React frontend. It provides:

- User registration/login with **JWT**.
- User profile management.
- CRUD for **Posts** with optional image upload.
- Users can only edit/delete **their own** posts and comments.
- Add/update/delete **comments** on posts.
- PostgreSQL ORM via **Prisma**.

## Tech Stack

- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT (jsonwebtoken) + bcryptjs
- Multer for image uploads
- Zod for request validation

## Getting Started

### 1) Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL running locally or in Docker

### 2) Clone and install
```bash
npm install
```

### 3) Configure environment
Copy `.env.example` to `.env` and update values (especially `DATABASE_URL` and `JWT_SECRET`). Example:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/express_backend?schema=public"
JWT_SECRET="change_me_to_a_long_random_string"
PORT=4000
```

Create the database if it doesn't exist (e.g., `createdb express_backend`).

### 4) Initialize Prisma & DB
```bash
npm run prisma:generate
npm run prisma:migrate    # or `npm run prisma:push` for a quick non-migration sync
```

You can also open the GUI:
```bash
npm run prisma:studio
```

### 5) Run the server
```bash
npm run dev
# or
npm start
```

Server will start on `http://localhost:4000`.

### 6) API Endpoints

#### Auth
- `POST /api/auth/register` – body: `{ name, email, password }`
- `POST /api/auth/login` – body: `{ email, password }`

Both return `{ user, token }`. Use the token as `Authorization: Bearer <token>`.

#### Users
- `GET /api/users/me` – current user profile
- `PUT /api/users/me` – body: `{ name?, bio? }`

#### Posts
- `GET /api/posts` – list **published** posts (public)
- `GET /api/posts/:id` – single post
- `POST /api/posts` – create post (auth required), multipart form fields:
  - `title` (string, required)
  - `content` (string, required)
  - `published` (boolean, optional)
  - `image` (file, optional) – uploaded image; URL returned as `/uploads/<filename>`
- `PUT /api/posts/:id` – update **own** post (auth required), same fields as create
- `DELETE /api/posts/:id` – delete **own** post (auth required)

#### Comments
- `POST /api/posts/:postId/comments` – add comment to a post
- `PUT /api/comments/:id` – update **own** comment
- `DELETE /api/comments/:id` – delete **own** comment

### Ownership & Security
- The `ownsResource` middleware checks that the authenticated user is the resource owner before allowing updates/deletes on posts and comments.
- Passwords are hashed with bcrypt.
- Tokens expire in 7 days (configure to your needs).

### Project Structure
```
src/
  config/prisma.js
  controllers/
    auth.controller.js
    user.controller.js
    post.controller.js
    comment.controller.js
  middleware/
    auth.js
    error.js
  routes/
    auth.routes.js
    user.routes.js
    post.routes.js
    comment.routes.js
  utils/uploader.js
  index.js
prisma/
  schema.prisma
uploads/            # served statically at /uploads
.env.example
```

### Notes
- This project uses `"type": "module"` so you can use ESM `import` syntax in Node.js.
- In production, serve images via a CDN or object storage (S3, GCS) rather than local disk.
- Add rate limiting/helmet/csrf, etc., for hardened security in production.

## Testing with curl

```
# Register
curl -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json"   -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'

# Login
curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json"   -d '{"email":"alice@example.com","password":"secret123"}'
# => copy token into TOKEN below

# Create a post with image
curl -X POST http://localhost:4000/api/posts   -H "Authorization: Bearer TOKEN"   -F "title=My First Post"   -F "content=Hello world"   -F "published=true"   -F "image=@/path/to/image.jpg"
```

## License
MIT
