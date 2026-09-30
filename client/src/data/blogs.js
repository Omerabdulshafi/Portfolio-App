const legacyBlogs = [
  {
    _id: '1',
    title: 'Getting Started with MERN Stack',
    content: `## What is the MERN stack?

  MERN is a JavaScript-based stack for building full-stack web applications. MongoDB stores application data, Express and Node.js power the backend API, and React creates the interactive user interface.

  ## How the pieces work together

  1. React sends a request from the browser.
  2. Express receives and validates the request.
  3. Node.js runs the server-side application logic.
  4. MongoDB stores or retrieves the requested data.
  5. The API returns a response that React renders for the user.

  ## A practical project structure

  Keep the application divided into clear responsibilities:

  - **client/** contains React pages, components, hooks, and styles.
  - **server/routes/** defines API endpoints.
  - **server/models/** describes MongoDB documents.
  - **server/middleware/** handles authentication and shared request logic.

  This structure makes features easier to test and prevents UI code from becoming tightly coupled to database code.

  ## Best practices

  Use environment variables for database credentials, validate incoming data on the server, return consistent HTTP status codes, and keep reusable UI elements in components. Start with a small feature such as authentication or a project list, then add validation, loading states, and error handling before expanding the application.`,
    coverImage: '/weddev.png',
    tags: ['javascript', 'react', 'tutorial'],
    createdAt: '2024-01-15'
  },
  {
    _id: '2',
    title: 'Health Tech Innovations in 2024',
    content: `## Technology is changing healthcare

  Digital healthcare tools are making it easier for patients and care teams to communicate, track information, and make decisions. The best solutions are designed around real needs rather than technology alone.

  ## Telemedicine

  Video consultations and secure messaging can reduce travel and improve access to specialists. A useful telemedicine product should provide clear appointment scheduling, reliable notifications, accessible interfaces, and a simple way to share follow-up instructions.

  ## AI-assisted diagnostics

  Machine learning can help identify patterns in images, symptoms, and patient records. These systems should support trained professionals rather than replace clinical judgment. Results need to be explainable, reviewed, and tested for bias across different populations.

  ## Responsible health technology

  Privacy, security, and accessibility must be part of the design from the beginning. Applications should collect only the information they need, protect it in transit and at rest, and give users understandable choices about how their data is used.

  The most valuable health technology is practical, trustworthy, and available to the people who need it most.`,
    coverImage: '/health-and-wellness.jpg',
    tags: ['health', 'tech', 'innovation'],
    createdAt: '2024-02-10'
  },
  {
    _id: '3',
    title: 'Building Secure Web Applications',
    content: `## Start with a threat model

  Before writing security code, identify what you are protecting, who might attack it, and what could happen if an account or endpoint were compromised. This makes security decisions specific to the application instead of relying on assumptions.

  ## Authentication and authorization

  Authentication verifies who a user is. Authorization decides what that user can do. Keep those responsibilities separate, use short-lived access tokens where appropriate, and check permissions on every protected server endpoint.

  ## Protect user data

  - Hash passwords with a slow, adaptive algorithm such as bcrypt.
  - Validate and normalize input on the server.
  - Use parameterized database queries and trusted ORM methods.
  - Store secrets in environment variables, never in source control.
  - Serve production traffic over HTTPS.

  ## Secure the frontend and API

  Configure CORS for known origins, add rate limits to sensitive endpoints, return safe error messages, and avoid exposing stack traces in production. Content Security Policy and secure cookie settings can provide additional protection in browser-based applications.

  Security is an ongoing process. Review dependencies, log suspicious activity without recording secrets, and test the application regularly as features and threats change.`,
    coverImage: '/Health-Tech.jpg',
    tags: ['web', 'security', 'tutorial'],
    createdAt: '2024-01-28'
  }
];

export default legacyBlogs;
