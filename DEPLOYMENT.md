# Deployment

## Frontend on Netlify

This repository includes `netlify.toml` for the Create React App frontend. Connect the repository in Netlify; the build base, command, output directory, and SPA route fallback are already configured.

## Backend on Render

The frontend and backend are deployed as two connected services because Netlify hosts the static React site, not this long-running Express server.

1. Create a MongoDB Atlas database and copy its connection string. Make sure the database network access allows connections from your backend host.
2. In Render, create a **Web Service** from this GitHub repository. Set **Root Directory** to `server`, **Build Command** to `npm install`, and **Start Command** to `npm start`.
3. Add these environment variables to the Render service: `MONGODB_URI`, `JWT_SECRET`, and `ADMIN_EMAIL`. Render will provide a public backend URL after it deploys.
4. In Netlify, import the same repository. `netlify.toml` sets the client build directory and SPA fallback. Set `REACT_APP_API_URL` to the Render backend origin, for example `https://your-api.onrender.com` (no trailing slash), then deploy.
5. Copy the Netlify site origin, such as `https://your-site.netlify.app`, into the Render service's `FRONTEND_URL` environment variable. For multiple allowed origins, separate them with commas. Redeploy the Render service after changing it.
6. Trigger a fresh Netlify deploy after setting `REACT_APP_API_URL` (Netlify embeds this value during the build).

The backend is not deployed by Netlify's static-site build. Deploy it separately, then configure the frontend and backend origins above so API requests and CORS work in production.
