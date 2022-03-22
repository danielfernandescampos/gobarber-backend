import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';
import appointmentsRouter from 'routes/appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); //repassa qualquer rota (get, post, delete...) que venha do /appointments para o appointmentsRouter
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
