import { Router } from 'express';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const authenticate = new AuthenticateUserService();
    const { user, token } = await authenticate.execute({ email, password });
    return response.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
        },
        token,
    });
});

export default sessionsRouter;
