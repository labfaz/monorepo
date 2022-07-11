import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { nanoid } from "nanoid";
import Artist from "./Artist";
import Request from "./Requests"
import { Deficiency } from "./Deficiency";

export interface IUser {
  email: string;
  password: string;
}

// To work with admin bro classes must extend BaseEntity
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string = nanoid();

  @OneToOne(() => Artist, (artist) => artist.user, {
    eager: true,
    cascade: ["remove", "update"],
  })
  artist: Artist;

  @OneToMany(() => Request, request => request.course)
  courses: Request[]

  @ManyToMany(() => Deficiency, { eager: true })
  @JoinTable()
  deficiencies: Deficiency[]

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean

  @Column({ default: false })
  banned: boolean

  @Column("boolean", { default: false })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
