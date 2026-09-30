# Deployment

## Frontend on Netlify

This repository includes `netlify.toml` for the Create React App frontend. Connect the repository in Netlify; the build base, command, output directory, and SPA route fallback are already configured.

## Backend on Render

The frontend and backend are deployed as two connected services because Netlify hosts the static React site, not this long-running Express server.

1. Create a MongoDB Atlas database and copy its connection string. Make sure database network access allows connections from Render.
2. Push the repository containing `render.yaml` to GitHub. In Render, choose **New → Blueprint**, select this repository and confirm the `portfolio-api` service. Render reads its build and start commands from `render.yaml`.
3. When prompted, enter `MONGODB_URI`, `JWT_SECRET`, and `ADMIN_EMAIL`. After it deploys, copy the backend's public URL from Render.
4. In Netlify, import the same repository. `netlify.toml` configures the client build and SPA fallback. Set `REACT_APP_API_URL` to the Render URL, for example `https://portfolio-api.onrender.com` (no trailing slash), then deploy.
5. Copy the Netlify site origin, such as `https://your-site.netlify.app`, into the Render service's `FRONTEND_URL` environment variable, then redeploy the Render service. For multiple allowed site origins, separate them with commas.
6. Trigger another Netlify deploy after changing `REACT_APP_API_URL`; Netlify embeds it during the build.

The backend is not deployed by Netlify's static-site build. Deploy it separately, then configure the frontend and backend origins above so API requests and CORS work in production.
