import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model'; 

// Define the Request model
@Table({
  tableName: 'requests',
  timestamps: true, // Automatically add createdAt and updatedAt
})
export default class Request extends Model<Request> {



  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ticketImg?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  sceneImg?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  submittedAt!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  approvedImg?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bogieNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  seatNo?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'pending', // Default status
  })
  status!: string;

  @BelongsTo(() => User)
  user!: User;
}
