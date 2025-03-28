import bcrypt from "bcryptjs";

import { IsEmail, IsIn, MinLength } from "class-validator";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Document from "./document.model";
import { WorkSpaceUser } from "./workspaceUser.model";
import { Request } from "./request.model";

@Entity("user_table_25")
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
  email: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  password: string;

  @Column({
    type: "varchar",
    default: "editor",
  })
  role: string;

  confirmPassword?: string;

  @CreateDateColumn({
    nullable: true,
  })
  passwordChangeAt: Date;

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

  chnagePasswordAfter(JWTTimestamp: number) {
    if (this.passwordChangeAt)
      return Math.floor(this.passwordChangeAt.getTime() / 1000) > JWTTimestamp;

    return false;
  }
}
