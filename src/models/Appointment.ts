import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp with time zone')
    date: Date;

    // usando o tupeORM não é necessário usar o constructor -> ele cria automaticamente
    // constructor({ provider, date }: Omit<Appointment, 'id'>) { // omit: 1º arg pega todos os parâmetros, 2º arg exclui 1 parâmetro
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date
    // }
}

export default Appointment;
