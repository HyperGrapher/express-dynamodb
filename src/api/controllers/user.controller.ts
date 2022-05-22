import express, { Request, Response } from "express";
import { BasicResponse } from "../interfaces/responses.dto";

export const index = (req: Request, res: Response) => {
	res.json({ message: "Get All Users", error: null });
};

export const detail = (req: Request<{ postId: string }>, res: Response) => {
	res.json({ message: `Get user with ID: ${req.params.postId}`, error: null });
};

export const create = (req: Request, res: Response) => {
	res.status(201).json({ message: "Create a user", error: null });
};

export const update = (req: Request<{ postId: string }>, res: Response<BasicResponse>) => {
	res.status(200).json({ message: `Patch user with ID: ${req.params.postId}`, error: null });
};

export const destroy = (req: Request<{ postId: string }>, res: Response<BasicResponse>) => {
	res.status(200).json({ message: `Delete user with ID: ${req.params.postId}`, error: null });
};
