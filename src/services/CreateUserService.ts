import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from "../models/User";

interface Request {
    name: string;
    email:string;
    password: string;
}

export default class CreateUserService {
    async execute({ name, email, password }: Request ): Promise<User> {
        const usersRepository = getRepository(User);
        const checkIfUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkIfUserExists) {
            throw new Error('This e-mail has already been taken')
        }

        const hashedPassword = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);
        return user;
    }
}
