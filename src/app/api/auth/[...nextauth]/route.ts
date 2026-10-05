import { handlers } from "@/auth";

// Mounts the Auth.js endpoints (`/api/auth/*`): the CSRF token endpoint, the
// callback endpoint, and the session endpoint. The handlers are the only place
// Auth.js accepts credentials over HTTP; the application itself never reads a
// password from a request body.
export const { GET, POST } = handlers;