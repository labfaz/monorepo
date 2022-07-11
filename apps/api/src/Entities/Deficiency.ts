import { nanoid } from "nanoid"
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Deficiency extends BaseEntity {
  @PrimaryColumn()
  id: string = nanoid()

  @Column()
  name: string

  @Column({ name: 'is_custom', default: true } )
  isCustom: boolean = true

  @Column({
    nullable: true
  })
  createdBy?: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
