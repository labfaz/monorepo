import { Column, Entity, PrimaryColumn, BeforeInsert, CreateDateColumn, BaseEntity } from 'typeorm'
import { nanoid } from 'nanoid'


// To work with admin bro classes must extend BaseEntity
@Entity()
export class User extends BaseEntity {

  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: false })
  isVerified: boolean

  @Column({ default: false })
  banned: boolean

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date

  @BeforeInsert()
  addId() {
    this.id = nanoid()
  }

  @Column('boolean', { default: false })
  active: boolean
}

export default User
