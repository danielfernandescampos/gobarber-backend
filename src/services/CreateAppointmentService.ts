import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
    date: Date;
    provider_id: string;
}

// dependency inversion: sempre que o service tiver uma dependencia externa (appointmentRepository), me vez de instanciar a classe dentro do service, vamos receber dentro do constructor

class CreateAppointmentService {

    public async execute({date, provider_id}: RequestDTO): Promise<Appointment> {

        const appointmentRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate) // regra de negócio no service

        if(findAppointmentInSameDate) {
            throw new AppError('This appointment has already been booked');
        }

        const appointment = appointmentRepository.create({
            provider_id,
            date: appointmentDate });

        await appointmentRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
