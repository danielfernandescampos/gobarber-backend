import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    date: Date;
    provider: string;
}

// dependency inversion: sempre que o service tiver uma dependencia externa (appointmentRepository), me vez de instanciar a classe dentro do service, vamos receber dentro do constructor

class CreateAppointmentService {
    private appointmentRepository: AppointmentsRepository;

    constructor(appointmentRepository: AppointmentsRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    public execute({date, provider}: RequestDTO): Appointment {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentRepository.findByDate(appointmentDate) // jogar regra de negócio pro service

        if(findAppointmentInSameDate) {
            throw Error('This appointment has already been booked');
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate });

        return appointment;
    }
}

export default CreateAppointmentService;
