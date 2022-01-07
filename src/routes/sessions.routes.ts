import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;
        const authenticate = new AuthenticateUserService();
        const { user } = await authenticate.execute({ email, password });
        return response.json({
            id: user.id,
            name: user.name,
            email: user.email
        })

    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
