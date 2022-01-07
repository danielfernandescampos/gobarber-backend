import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); //repassa qualquer rota (get, post, delete...) que venha do /appointments para o appointmentsRouter
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
