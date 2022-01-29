import dotenv from "dotenv"
dotenv.config();

export const db_uri = process.env.FOODOHOLIC_DB_URI;
export const sv_port = process.env.PORT;
export const dev_env = process.env.DENV;
export const secret_key = process.env.SECRET;
export const server_email = process.env.SERVER_EMAIL;
export const server_password = process.env.SERVER_PASS;
export const oauth_client_id = process.env.GOOGLE_OAUTH_CLIENT_ID;

