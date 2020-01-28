import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './userModel';
import { Scooter } from './scooterModel';

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn() // autogenerated
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column({ type: 'timestamp', toUTC: false } as any)
    startDate: Date;

    @Column({ type: 'timestamp', toUTC: false } as any)
    endDate: Date;

    @ManyToOne(() => User, user => user.event, { onDelete: 'CASCADE', cascade: ['remove'] })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Scooter, scooter => scooter.event, { onDelete: 'CASCADE', cascade: ['remove'] })
    @JoinColumn()
    scooter: Scooter;
}
