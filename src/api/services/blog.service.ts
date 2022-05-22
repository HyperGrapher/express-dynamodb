import { IPostDTO, IPostDetailDTO } from "../interfaces/blog.dto";

export const getAllPosts = async (): Promise<IPostDTO[]> => {
	return [];
};

export const getPostById = async (postId: string): Promise<IPostDTO> => {
	return {
		id: "123",
		text: "post_text",
		title: "title",
		username: "postOwner",
        comments: []
	};
};


export const createPost = async (): Promise<IPostDTO | {}> => {
	return {};
};