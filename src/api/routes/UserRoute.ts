import express, { Request, Response } from "express";
const router = express.Router();

router
	.route("/")
	.get((req: Request, res: Response) => {
		res.json({ message: "Get User", error: null });
	})
	.post((req: Request, res: Response) => {
		res.json({ message: "Post User", error: null });
	});

router
	.route("/:userId")
	.get((req: Request, res: Response) => {
		res.json({ message: `Get user with ID: ${req.params.userId}`, error: null });
	})
	.patch((req: Request, res: Response) => {
		res.json({ message: `Patch User user with ID: ${req.params.userId}`, error: null });
	})
	.delete((req: Request, res: Response) => {
		res.json({ message: `Delete User user with ID: ${req.params.userId}`, error: null });
	});

export default router;
