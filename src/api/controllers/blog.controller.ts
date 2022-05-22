import express, { Request, Response } from "express";
import { IPostDTO, IPostCreateBody, IPostDetailDTO } from "../interfaces/blog.dto";
import { BasicResponse } from "../interfaces/responses.dto";
import { getAllPosts, getPostById } from "../services/blog.service";

export const index = async (req: Request, res: Response) => {
	try {
		const posts: IPostDTO[] = await getAllPosts();

		// If no post exists, return response with message
		if (posts && posts.length === 0) {
			return res.status(404).json({
				data: [],
				message: "No post found",
				error: true,
			});
		}

		// Finally return data
		return res.status(200).json({
			data: posts,
			message: "success",
			error: null,
		});
	} catch (error) {
		return res.status(500).json({ message: "An error occured", error: true });
	}
};

export const detail = async (req: Request<{ postId: string }>, res: Response) => {
	try {
		const { postId } = req.params;

		// Check if the param is a number.
		if (isNaN(Number(postId))) {
			return res.status(400).json({
				message: "Request parameter is NaN",
				error: true,
			});
		}

		const post: IPostDTO = await getPostById(postId);

		// If no post exists respond accordingly
		if (!post) {
			return res.status(404).json({
				data: {},
				message: "No post found",
				error: true,
			});
		}

		// Finally respond with data
		return res.status(200).json({
			data: post,
			message: "success",
			error: null,
		});
	} catch (error) {
		res.status(500).json({ message: "An error occured", error: true });
	}
};

export const create = async (req: Request<{}, {}, IPostCreateBody>, res: Response) => {
	res.status(201).json({ message: `Post a blog post | ${req.body.username}`, error: null });
};

export const update = (req: Request<{ postId: string }>, res: Response<BasicResponse>) => {
	res.status(200).json({ message: `Patch blog post with ID: ${req.params.postId}`, error: null });
};

export const destroy = (req: Request<{ postId: string }>, res: Response<BasicResponse>) => {
	res.status(200).json({ message: `Delete blog post with ID: ${req.params.postId}`, error: null });
};
