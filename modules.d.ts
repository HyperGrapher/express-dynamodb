declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		AWS_REGION: string;
		AWS_ACCESS_KEY: string;
		AWS_SECRET_KEY: string;
	}
}
