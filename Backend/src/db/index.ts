import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';
import User from '../models/user.model';
import Request from '../models/request.model';
import Category from '../models/categories.model';
import Complaint from '../models/complaint.model';

dotenv.config({ path: './.env' });

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_DIALECT,
  CA_PATH
} = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME || !DB_DIALECT || !CA_PATH) {
  throw new Error('One or more environment variables are missing');
}

const sequelize = new Sequelize({
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT), 
  database: DB_NAME,
  dialect: DB_DIALECT as any, 
  models: [User,Request,Category,Complaint], 
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(CA_PATH).toString(), 
    }
  }
});



export default sequelize;
