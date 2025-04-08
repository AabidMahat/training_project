import bcrypt from "bcryptjs";

import { IsEmail, IsIn, MinLength } from "class-validator";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Document from "./document.model";
import { WorkSpaceUser } from "./workspaceUser.model";
import { Request } from "./request.model";
import { Workspace } from "./workspace.model";

@Entity("user_table_26")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    unique: true,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  @MinLength(5, { message: "Passwod should be 5 length long" })
  password: string;

  @Column({
    type: "varchar",
    default: "editor",
  })
  @IsIn(["viewer", "editor", "admin"], {
    message: "Please Provide the valid role",
  })
  role: string;

  confirmPassword?: string;

  @CreateDateColumn({
    nullable: true,
  })
  passwordChangeAt: Date;

  resetToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Document, (document) => document.user)
  documents: Document[];

  @OneToMany(() => WorkSpaceUser, (workspaceUser) => workspaceUser.workspace)
  workspaceUser: WorkSpaceUser[];

  @OneToMany(() => Request, (request) => request.user)
  requests: Request[];

  @OneToMany(() => Workspace, (workspace) => workspace.owner)
  ownerWorkspace: Workspace[];

  chnagePasswordAfter(JWTTimestamp: number) {
    if (this.passwordChangeAt)
      return Math.floor(this.passwordChangeAt.getTime() / 1000) > JWTTimestamp;

    return false;
  }
}
