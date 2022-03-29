import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositoy';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
    date: Date;
    provider_id: string;
}

// dependency inversion: sempre que o service tiver uma dependencia externa (appointmentRepository), me vez de instanciar a classe dentro do service, vamos receber dentro do constructor

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmentsRepository,
    ) {};

    public async execute({date, provider_id}: IRequestDTO): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate) // regra de negócio no service

        if(findAppointmentInSameDate) {
            throw new AppError('This appointment has already been booked');
        }

        const appointment = await this.appointmentRepository.create({
            provider_id,
            date: appointmentDate });

        return appointment;
    }
}

export default CreateAppointmentService;
