import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { Workspace } from "./workspace.model";

@Entity("worksspace_user_20")
export class WorkSpaceUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.workspaceUser)
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceUser)
  workspace: Workspace;

  @Column({
    type: "varchar",
  })
  role: string;
}
