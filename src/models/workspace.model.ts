import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Document from "./document.model";
import { WorkSpaceUser } from "./workspaceUser.model";
import { Request } from "./request.model";
import { Activity } from "./activity.model";

@Entity("workspace_table_21")
export class Workspace {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
  })
  name: string;

  @OneToMany(() => Document, (document) => document.workspace)
  document: Document[];

  @OneToMany(() => Request, (request) => request.workspace)
  requests: Request[];

  @OneToMany(() => WorkSpaceUser, (workspaceUser) => workspaceUser.workspace)
  workspaceUser: WorkSpaceUser[];

  @OneToMany(() => Activity, (activity) => activity.workspace)
  activity: Activity[];
}
