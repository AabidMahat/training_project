import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.model";
import Document from "./document.model";
import { Workspace } from "./workspace.model";

@Entity("activity_table_26")
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  action: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Document, (document) => document.id)
  document: Document;

  @ManyToOne(() => Workspace, (workspace) => workspace.activity, {
    onDelete: "CASCADE",
  })
  workspace: Workspace;
}
