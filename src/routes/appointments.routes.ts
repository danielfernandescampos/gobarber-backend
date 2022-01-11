import { Router } from 'express';
import { parseISO } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated)

// SoC: separation of concerns
// routes: se preocupa só com receber a requisição, chamar outro arquivo e devolver a resposta
appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find()
    return response.json(appointments)
});

appointmentsRouter.post('/', async (request, response) => {  // não precisa passar o /appointments pq já está sendo passado no index
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService()

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id
        })

        return response.json(appointment);
    } catch (err: any) {
        return response.status(400).json({ error: err.message })
    }
});


export default appointmentsRouter
