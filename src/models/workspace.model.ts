import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Document from "./document.model";
import { WorkSpaceUser } from "./workspaceUser.model";

@Entity("workspace_table_19")
export class Workspace {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
  })
  name: string;

  @OneToMany(() => Document, (document) => document.workspace)
  document: Document[];

  @OneToMany(() => WorkSpaceUser, (workspaceUser) => workspaceUser.workspace)
  workspaceUser: WorkSpaceUser[];
}
