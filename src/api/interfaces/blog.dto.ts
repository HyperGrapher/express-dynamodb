export interface IPostDTO {
	id: string;
	text: string;
	title: string;
	username: string;
	comments: ICommentDTO[];
}

export type IPostCreateBody = Pick<IPostDTO, "text" | "username" | "title">;

export interface ICommentDTO {
	id: string;
	text: string;
	username: string;
}

export interface IPostDetailDTO {
	error: null | boolean;
	message: string;
	data: IPostDTO | null;
}

export interface IPostListDTO {
	error: null | boolean;
	message: string;
	data: IPostDTO[];
}

