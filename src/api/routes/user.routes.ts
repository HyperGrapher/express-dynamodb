import express, { Request, Response } from "express";
import { BasicResponse } from "../interfaces/responses.dto";
import { logRouteAndTime } from "../middlewares/logger.middleware";

const router = express.Router();

// Register middle ware for logging request
router.use(logRouteAndTime);

// Routes without params
router
	.route("/")
	.get((req: Request, res: Response<BasicResponse>) => {
		res.json({ message: "Get User", error: null });
	})
	.post((req: Request, res: Response<BasicResponse>) => {
		res.status(201).json({ message: "Post User", error: null });
	});

// Routes with params
router
	.route("/:userId")
	.get((req: Request<{ userId: string }, {}, {}, {}>, res: Response<BasicResponse>) => {
		res.status(200).json({ message: `Get user with ID: ${req.params.userId}`, error: null });
	})
	.patch((req: Request<{ userId: string }, {}, {}, {}>, res: Response<BasicResponse>) => {
		res.status(204).json({ message: `Patch user with ID: ${req.params.userId}`, error: null });
	})
	.delete((req: Request<{ userId: string }, {}, {}, {}>, res: Response<BasicResponse>) => {
		res.status(200).json({ message: `Delete user with ID: ${req.params.userId}`, error: null });
	});

export default router;
