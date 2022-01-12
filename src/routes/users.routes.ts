import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({ name, email, password });
        return response.json({
            name: user.name,
            email: user.email,
            id: user.id,
            created_at: user.created_at,
            updated_at: user.updated_at
        });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch('/avatar', ensureAuthenticated, async(request, response) => {
    return response.json({ ok: true })
} )

export default usersRouter;
