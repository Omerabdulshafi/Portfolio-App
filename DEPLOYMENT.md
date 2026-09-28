# Deployment

## Frontend on Netlify

This repository includes `netlify.toml` for the Create React App frontend. Connect the repository in Netlify; the build base, command, output directory, and SPA route fallback are already configured.

1. Deploy the backend separately to a Node.js host that supports a long-running Express server, and configure its `MONGODB_URI`, `JWT_SECRET`, and `ADMIN_EMAIL` environment variables.
2. In Netlify, add the environment variable `REACT_APP_API_URL` with the backend's public origin, such as `https://your-api.example.com` (no trailing slash).
3. In the backend host, set `FRONTEND_URL` to the Netlify site origin, such as `https://your-site.netlify.app`. For multiple allowed sites, separate origins with commas.
4. Trigger a fresh Netlify deploy after setting `REACT_APP_API_URL`.

The backend is not deployed by Netlify's static-site build. Deploy it separately, then configure the frontend and backend origins above so API requests and CORS work in production.
