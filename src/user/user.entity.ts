import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public username: string;

    @Column()
    @Exclude()
    public password: string;

    @Column({
        nullable: true
    })
    @Exclude()
    public refreshToken?: string;

    // constructor(partial: Partial<User>) {
    //     Object.assign(this, partial);
    // }
}