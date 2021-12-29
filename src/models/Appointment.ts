import { uuid } from "uuidv4";

class Appointment {
    id: string;

    date: Date;

    provider: string;

    constructor({ provider, date }: Omit<Appointment, 'id'>) { // omit: 1º arg pega todos os parâmetros, 2º arg exclui 1 parâmetro
        this.id = uuid();
        this.provider = provider;
        this.date = date
    }
}

export default Appointment;
