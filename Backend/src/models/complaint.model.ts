import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Request from './request.model';
import Category from './categories.model';

@Table({
  tableName: 'complaints',
  timestamps: true, // Automatically add createdAt and updatedAt
})
export default class Complaint extends Model<Complaint> {



  @ForeignKey(() => Request)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  requestId!: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  additionalDetails?: string;

  @BelongsTo(() => Request)
  request!: Request;

  @BelongsTo(() => Category)
  category!: Category;
}
