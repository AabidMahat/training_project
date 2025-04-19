import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.model";
import { Workspace } from "./workspace.model";

export enum Status {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

@Entity("request_table_20")
export class Request {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  request_type: string;

  @Column({
    type: "varchar",
  })
  requested_role: string;

  @Column({
    type: "varchar",
    default: "pending",
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.requests, {
    onDelete: "CASCADE",
  })
  workspace: Workspace;
}
