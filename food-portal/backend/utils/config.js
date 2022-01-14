import dotenv from "dotenv"
dotenv.config();

export const db_uri = process.env.FOODOHOLIC_DB_URI;
export const sv_port = process.env.PORT;
export const dev_env = process.env.DENV;

