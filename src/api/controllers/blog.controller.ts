import { Request, Response } from "express";
import { IPostDTO, IPostCreateBody } from "../interfaces/blog.dto";
import { getAllPosts, getPostById, createPost, deletePost, updatePost } from "../services/blog.service";

export const index = async (req: Request, res: Response) => {
	try {
		const posts = await getAllPosts();

		// If no post exists, return response with message
		if (posts && posts.Count === 0) {
			return res.status(404).json({
				data: [],
				message: "error",
				error: {
					message: "No post found in the table",
				},
			});
		}

		// Finally return data
		return res.status(200).json({
			data: posts.Items,
			message: "success",
			error: null,
		});
	} catch (error) {
		return res.status(500).json({ message: "error", error });
	}
};

export const detail = async (req: Request<{ postId: string }>, res: Response) => {
	const { postId } = req.params;

	// Check if the param is a number.
	if (isNaN(Number(postId))) {
		return res.status(400).json({
			data: {},
			message: "error",
			error: {
				message: "Request parameter is NaN",
			},
		});
	}

	try {
		const post = await getPostById(postId);

		// If post object is empty, respond accordingly
		if (Object.keys(post).length === 0) {
			return res.status(404).json({
				data: {},
				message: "error",
				error: {
					message: `Post with provided postId "${postId}" doesn't exist!`,
				},
			});
		}

		// Finally respond with data
		return res.status(200).json({
			data: post.Item,
			message: "success",
			error: null,
		});
	} catch (error) {
		res.status(500).json({ message: "error", error });
	}
};

export const create = async (req: Request<{}, {}, IPostCreateBody>, res: Response) => {
	// Check if request body exist or all required fields exist
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({
			message: "error",
			error: {
				message: "Request body is empty",
			},
		});
	} else if (Object.keys(req.body).length < 3) {
		return res.status(400).json({
			message: "error",
			error: {
				message: "Please provide all required fields",
			},
		});
	}

	try {
		await createPost(req.body);
		res.status(201).json({ message: `success`, error: null });
	} catch (error: any) {
		res.status(error.statusCode).json({ message: "error", error });
	}
};

export const update = async (req: Request<{ postId: string }, {}, IPostDTO>, res: Response) => {
	const { postId } = req.params;

	// Check if the param is a number.
	if (isNaN(Number(postId))) {
		return res.status(400).json({
			message: "Request parameter is NaN",
			error: true,
		});
	}

	try {
		const post = await updatePost(postId, req.body);
		res.status(201).json({ message: `success`, error: null, data: post });
	} catch (error: any) {
		res.status(error.statusCode).json({ message: "error", error });
	}
};

export const destroy = async (req: Request<{ postId: string }>, res: Response) => {
	const { postId } = req.params;
	// Check if the param is a number.
	if (isNaN(Number(postId))) {
		return res.status(400).json({
			message: "Request parameter is NaN",
			error: true,
		});
	}

	try {
		await deletePost(postId);
		res.status(200).json({ message: `success`, error: null });
	} catch (error: any) {
		res.status(error.statusCode).json({ message: "error", error });
	}
};
