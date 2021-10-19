import { User } from "../model/User";
import path from 'path'
import UserRepositoy from "../repositories/sequelize/UserRepository";
import AppError from "src/middlewares/errors/AppError";
import uploadConfig from '../../../config/upload'
import fs from "fs";


interface IRequest {
    user_id: string
    avatarFilename: string
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

        const userRepositoy = new UserRepositoy()

        const user = await userRepositoy.findById(user_id)

        if(!user) {
            throw new AppError("User not found!");
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFilename

        await userRepositoy.update(user_id, user)

        return user

    }
}

export default UpdateUserAvatarService;
