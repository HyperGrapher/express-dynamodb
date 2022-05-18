import express, { Express, Request, Response } from "express";
const app: Express = express();
import dotenv from "dotenv";
import userRoutes from "./api/routes/UserRoute";
import blogRoutes from "./api/routes/BlogRoute";
import { ROUTES } from "./config/constants";

dotenv.config();
const port = process.env.PORT || "5000";

// Register routes
app.use(ROUTES.user, userRoutes);
app.use(ROUTES.blog, blogRoutes);
// Register middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Root endpoint
app.get("/", (req: Request, res: Response) => {
	res.json({ message: "success", error: null });
});

app.listen(port, () => {
	console.log(`Server is running at: http://localhost:${port}`);
});
