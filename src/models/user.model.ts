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

@Entity("user_table")
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
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @Column({
    type: "varchar",
    default: "editor",
  })
  @IsIn(["admin", "editor", "viewer"], { message: "Invalid Role" })
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

  chnagePasswordAfter(JWTTimestamp: number) {
    if (this.passwordChangeAt)
      return Math.floor(this.passwordChangeAt.getTime() / 1000) > JWTTimestamp;

    return false;
  }
}
