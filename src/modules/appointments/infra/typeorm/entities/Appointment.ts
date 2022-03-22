import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // usando o tupeORM não é necessário usar o constructor -> ele cria automaticamente
    // constructor({ provider, date }: Omit<Appointment, 'id'>) { // omit: 1º arg pega todos os parâmetros, 2º arg exclui 1 parâmetro
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date
    // }
}

export default Appointment;
