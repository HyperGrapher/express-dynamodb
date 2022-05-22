import { BasicResponse } from "./api/interfaces/responses.dto";
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import userRoutes from "./api/routes/user.routes";
import blogRoutes from "./api/routes/blog.route";
import { ROUTES } from "./config/constants.config";
import helmet from "helmet";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || "5000";

// Register middlewares
app.use(express.json()); // Parses json request body
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded.
app.use(helmet()); // Adds recomended response headers for additional security.

// Register routes
app.use(ROUTES.user, userRoutes);
app.use(ROUTES.blog, blogRoutes);

// Root endpoint
app.get("/", (req: Request, res: Response<BasicResponse>) => {
	res.status(200).json({ message: "success", error: null });
});

// Initilize the app
app.listen(port, () => {
	console.log(`Server is running at: http://localhost:${port}`);
});
