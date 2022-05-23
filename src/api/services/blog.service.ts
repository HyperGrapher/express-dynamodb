import { IPostCreateBody } from "./../interfaces/blog.dto";
import { IPostDTO } from "../interfaces/blog.dto";
import { dynamoClient } from "../../config/database.config";
import { AWSError } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { PromiseResult } from "aws-sdk/lib/request";
import { getRandomInt } from "../helpers/randomNumber";
import { TABLE_NAME } from "../../config/constants.config";

export const getAllPosts = async (): Promise<PromiseResult<DocumentClient.ScanOutput, AWSError>> => {
	const params = {
		TableName: TABLE_NAME,
	};

	return await dynamoClient.scan(params).promise();
};

export const getPostById = async (postId: string): Promise<PromiseResult<DocumentClient.GetItemOutput, AWSError>> => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			postId,
		},
	};

	return await dynamoClient.get(params).promise();
};

export const createPost = async (
	body: IPostCreateBody
): Promise<PromiseResult<DocumentClient.PutItemOutput, AWSError>> => {
	const post = {
		...body,
		created_at: new Date().toISOString(),
		postId: String(getRandomInt(1000)),
	};
	console.log(post);

	const params = {
		TableName: TABLE_NAME,
		Item: post,
	};

	return await dynamoClient.put(params).promise();
};

export const updatePost = async (
	body: IPostDTO,
	postId: string
): Promise<PromiseResult<DocumentClient.PutItemOutput, AWSError>> => {
	const post = {
		...body,
		postId,
	};
	console.log(post);

	const params = {
		TableName: TABLE_NAME,
		Item: post,
		Key: {
			postId: postId,
		},
	};

	return await dynamoClient.update(params).promise();
};

export const deletePost = async (postId: string): Promise<PromiseResult<DocumentClient.PutItemOutput, AWSError>> => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			postId,
		},
	};

	return await dynamoClient.delete(params).promise();
};
