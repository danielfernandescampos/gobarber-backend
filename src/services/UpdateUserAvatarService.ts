import { getRepository } from "typeorm";
import User from "../models/User";
import path from 'path';
import fs from 'fs';
import uploadConfif from '../config/upload';
import { fromString } from "uuidv4";

interface Request {
    user_id: string;
    avatarFileName: string;
}

export default class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne(user_id);
        if(!user) {
            throw new Error('Onlt authenticated users can change avatar.')
        }
        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfif.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }
        user.avatar = avatarFileName;
        await usersRepository.save(user);
        return user;
    }
}
