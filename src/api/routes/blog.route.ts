import express, { Request, Response } from "express";
import { logRouteAndTime } from "../middlewares/logger.middleware";
import { index, detail, create, update, destroy } from "../controllers/blog.controller";

const router = express.Router();

// Register middleware for logging request
router.use(logRouteAndTime);

// Routes without params
router.route("/").get(index).post(create);

// Routes with params
router.route("/:postId").get(detail).patch(update).delete(destroy);

export default router;
