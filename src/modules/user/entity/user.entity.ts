import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true, nullable: true })
    name: string;

    @Column({ nullable: true })
    lastname: string;

    @Column({ unique: true, nullable: true })
    identification: string;

    @Column({ nullable: true })
    id_type: string;

    @Column({ nullable: true })
    account_verify_code: string;

    @Column({ default: 'I' })
    status: string;

    @Column()
    created: Date;

    @Column({ nullable: true })
    deleted: Date;

    @Column({ nullable: true })
    updated: Date;
}