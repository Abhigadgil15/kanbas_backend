import express from "express";
import session from "express-session";
import cors from "cors";
import "dotenv/config";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentsRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentsRoute from "./Kanbas/Enrollments/routes.js";

const app = express();

// CORS configuration
app.use(cors({
  credentials: true,
  origin: process.env.NETLIFY_URL || "http://localhost:3000",
}));

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

// Middleware
app.use(express.json());

// Routes
UserRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
ModuleRoutes(app);
AssignmentsRoutes(app);
EnrollmentsRoute(app);

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});