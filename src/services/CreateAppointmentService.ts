import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    date: Date;
    provider: string;
}

// dependency inversion: sempre que o service tiver uma dependencia externa (appointmentRepository), me vez de instanciar a classe dentro do service, vamos receber dentro do constructor

class CreateAppointmentService {

    public async execute({date, provider}: RequestDTO): Promise<Appointment> {

        const appointmentRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate) // regra de negócio no service

        if(findAppointmentInSameDate) {
            throw Error('This appointment has already been booked');
        }

        const appointment = appointmentRepository.create({
            provider,
            date: appointmentDate });

        await appointmentRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
