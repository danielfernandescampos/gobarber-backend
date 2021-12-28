import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter) //repassa qualquer rota (get, post, delete...) que venha do /appointments para o appointmentsRouter

export default routes;
