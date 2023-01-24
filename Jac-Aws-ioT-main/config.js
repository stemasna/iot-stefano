// env reading package
import * as dotenv from 'dotenv';

dotenv.config()

const secretMasterName = process.env.SECRET_MASTER_NAME;
const secretMasterUrl = process.env.SECRET_MASTER_URL;
const host = process.env.HOST;
const MONGODB_URI = process.env.MONGODB_URI;

export { secretMasterName, secretMasterUrl, host, MONGODB_URI}