import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from "../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User,
    token: string
}
@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {};

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Incorrect user or password', 401);
        }
        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            throw new AppError('Incorrect user or password', 401);
        }
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });
        return { user, token }
    }
}
