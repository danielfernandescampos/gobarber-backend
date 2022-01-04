import { Router } from 'express';
import { parseISO } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

// SoC: separation of concerns
// routes: se preocupa só com receber a requisição, chamar outro arquivo e devolver a resposta
appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.getAll()
    return response.json(appointments)
});

appointmentsRouter.post('/', (request, response) => {  // não precisa passar o /appointments pq já está sendo passado no index
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentRepository
        )

        const appointment = createAppointment.execute({date: parsedDate, provider})

        return response.json(appointment);
    } catch (err: any) {
        return response.status(400).json({ error: err.message })
    }
});


export default appointmentsRouter
