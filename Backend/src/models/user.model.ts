import { Table, Column, Model, DataType } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define the User model
@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model<User> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken?: string;

  // Method to compare password
  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  // Method to generate access token
  generateAccessToken(): string {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRY;

    if (!secret || !expiresIn) {
      throw new Error('ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY is not defined');
    }

    return jwt.sign(
      {
        _id: this.id,
        email: this.email,
        fullname: this.fullname,
      },
      secret,
      {
        expiresIn,
      }
    );
  }

  // Method to generate refresh token
  generateRefreshToken(): string {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const expiresIn = process.env.REFRESH_TOKEN_EXPIRY;

    if (!secret || !expiresIn) {
      throw new Error('REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY is not defined');
    }

    return jwt.sign(
      {
        _id: this.id,
      },
      secret,
      {
        expiresIn,
      }
    );
  }
}
