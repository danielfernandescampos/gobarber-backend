import { getRepository } from "typeorm";
import path from 'path';
import fs from 'fs';
import uploadConfif from '@config/upload';
import { fromString } from "uuidv4";
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface Request {
    user_id: string;
    avatarFileName: string | undefined;
}

export default class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne(user_id);
        if(!user) {
            throw new AppError('Onlt authenticated users can change avatar.', 401)
        }
        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfif.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }
        if(avatarFileName) {
            user.avatar = avatarFileName;
        }
        await usersRepository.save(user);
        return user;
    }
}
