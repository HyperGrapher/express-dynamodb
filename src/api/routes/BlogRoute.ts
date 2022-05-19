import express, { Request, Response } from "express";
import { BasicResponse } from "../interfaces/BasicResponse";
import { logRouteAndTime } from "../middlewares/Logger";

const router = express.Router();

// Register middle ware for logging request
router.use(logRouteAndTime);

// Routes without params
router
	.route("/")
	.get((req: Request, res: Response<BasicResponse>) => {
		res.json({ message: "Get All Posts", error: null });
	})
	.post((req: Request, res: Response<BasicResponse>) => {
		res.status(201).json({ message: "Post a blog post", error: null });
	});

// Routes with params
router
	.route("/:blogId")
	.get((req: Request<{ blogId: string }, {}, {}, {}>, res: Response<BasicResponse>) => {
		res.json({ message: `Get blog post with ID: ${req.params.blogId}`, error: null });
	})
	.patch((req: Request<{ blogId: string }, {}, {}, {}>, res: Response<BasicResponse>) => {
		res.status(200).json({ message: `Patch blog post with ID: ${req.params.blogId}`, error: null });
	})
	.delete((req: Request<{ blogId: string }, {}, {}, {}>, res: Response<BasicResponse>) => {
		res.status(200).json({ message: `Delete blog post with ID: ${req.params.blogId}`, error: null });
	});

export default router;
