import express, { Request, Response } from "express";
const router = express.Router();

router
	.route("/")
	.get((req: Request, res: Response) => {
		res.json({ message: "Get All Posts", error: null });
	})
	.post((req: Request, res: Response) => {
		res.json({ message: "Post a blog post", error: null });
	});

router
	.route("/:blogId")
	.get((req: Request, res: Response) => {
		res.json({ message: `Get blog post with ID: ${req.params.blogId}`, error: null });
	})
	.patch((req: Request, res: Response) => {
		res.json({ message: `Patch blog post with ID: ${req.params.blogId}`, error: null });
	})
	.delete((req: Request, res: Response) => {
		res.json({ message: `Delete blog post with ID: ${req.params.blogId}`, error: null });
	});

export default router;
