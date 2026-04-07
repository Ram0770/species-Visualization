# SpeciesVision

SpeciesVision is a production-ready full-stack bacterial species visualization platform with role-based access for students and lecturers.

## 1. Project Structure

```text
Species Project/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    app.js
    server.js
    package.json
    .env.example
  frontend/
    src/
      components/
      hooks/
      pages/
      services/
      App.jsx
      main.jsx
      index.css
    index.html
    package.json
    tailwind.config.js
    postcss.config.js
    vite.config.js
    .env.example
```

## 2. Database and Seed Data

1. The runtime backend uses MongoDB.
2. On backend startup, the server seeds the same 20 bacterial species on first startup if the collection is empty.

## 3. Backend Setup (Node + Express + MongoDB)

1. Go to backend:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update `.env` values:
   - MongoDB connection string
   - JWT secret
   - Google client ID
   - Cloudinary keys

5. Start backend:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

### Backend API Endpoints

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/google`

Species:
- `GET /api/species`
- `GET /api/species/:id`
- `POST /api/species` (lecturer)
- `PUT /api/species/:id` (lecturer)
- `DELETE /api/species/:id` (lecturer)
- `POST /api/species/upload/image` (lecturer)
- `GET /api/species/stats/overview`

## 4. Frontend Setup (React + Tailwind)

1. Open a second terminal and go to frontend:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update `.env` values:
   - `VITE_API_BASE_URL=http://localhost:5000/api`
   - `VITE_GOOGLE_CLIENT_ID=<your_google_client_id>`

5. Start frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

## 5. Feature Coverage

- JWT authentication
- Google OAuth login
- Role-based access control (student/lecturer)
- Species CRUD
- Cloudinary image upload
- Dynamic search (scientific name, scientist, year)
- Species detail page
- Statistics dashboard with Recharts
- Responsive modern glassmorphism UI

## 6. Render Deployment (Backend)

1. Push repository to GitHub.
2. In Render, create a new **Web Service** from the backend.
3. Configure:
   - Build command: `npm install`
   - Start command: `npm start`
   - Root directory: `backend`
4. Add environment variables from `backend/.env.example`.
5. Ensure your MongoDB Atlas cluster is reachable from Render and `MONGO_URI` is set.

## 7. Vercel Deployment (Frontend)

1. In Vercel, import the same repository.
2. Set frontend root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables:
   - `VITE_API_BASE_URL=<your_render_backend_url>/api`
   - `VITE_GOOGLE_CLIENT_ID=<your_google_client_id>`
6. Deploy.

## 8. Notes

- Lecturer-only routes are protected in frontend and backend.
- Google accounts are auto-created on first sign-in.
- If a species scientific name already exists, backend returns conflict.
- Configure `MONGO_URI` for the backend database connection.
- For permanent image storage across restarts/redeploys, configure Cloudinary in `backend/.env`:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
