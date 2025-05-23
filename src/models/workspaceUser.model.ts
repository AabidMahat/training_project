import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { Workspace } from "./workspace.model";

@Entity("table_user_workspace")
export class WorkSpaceUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.workspaceUser)
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceUser, {
    onDelete: "CASCADE",
  })
  workspace: Workspace;

  @Column({
    type: "varchar",
  })
  role: string;
}
