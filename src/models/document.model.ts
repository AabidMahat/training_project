import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.model";
import { MinLength } from "class-validator";

@Entity("document")
export default class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
    length: 255,
  })
  title: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  @MinLength(10, { message: "Content should be atleast 10 words long" })
  content: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  documentUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.documents)
  user: User;
}
