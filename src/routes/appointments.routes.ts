import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

// SoC: separation of concerns

appointmentsRouter.post('/', (request, response) => {  // não precisa passar o /appointments pq já está sendo passado no index
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentRepository.findByDate(parsedDate)

    if(findAppointmentInSameDate) {
        return response
            .status(400)
            .json({message: 'This appointment has already been booked'})
    }

    const appointment = appointmentRepository.create({ provider, date: parsedDate });

    return response.json(appointment);
})

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.getAll()
    return response.json(appointments)
})

export default appointmentsRouter
