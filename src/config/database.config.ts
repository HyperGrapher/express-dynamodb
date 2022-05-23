import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// Connect to the AWS
AWS.config.update({
	region: "us-east-1",
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Connect to the document
export const dynamoClient = new AWS.DynamoDB.DocumentClient();
