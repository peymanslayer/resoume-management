import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";


@Entity('resoume')
export class Resoume {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', nullable: true })
    description: string

    @Column({ type: 'varchar', nullable: false })
    education: string

    @Column({ type: 'json', nullable: false })
    skills: string[]

    @Column({ type: 'varchar', nullable: true })
    experience: string
}