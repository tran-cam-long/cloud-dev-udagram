import {Table, Column, Model, CreatedAt, UpdatedAt} from 'sequelize-typescript';


@Table
export class CommentItem extends Model<CommentItem> {
  @Column
  public content!: string;

  @Column
  public url!: string;

  @Column
  public feedItemId!: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();
}
