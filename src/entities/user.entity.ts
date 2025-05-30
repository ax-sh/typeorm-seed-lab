import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  userName?: string;

  @OneToMany(
    () => Post,
    (post) => post.author,
  )
  posts?: Post[];
}
