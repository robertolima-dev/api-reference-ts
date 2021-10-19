import { User } from "../model/User";
import UserRepositoy from "../repositories/sequelize/UserRepository";
import AppError from "src/middlewares/errors/AppError";
import DiskStorageProvider from '../../../providers/StorageProvider/DiskStorageProvider'
import redisCache from '../../../config/redis/RedisCache'

interface IRequest {
    user_id: string
    avatarFilename: string
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

        const userRepositoy = new UserRepositoy()
        const storageProvider = new DiskStorageProvider()

        const user = await userRepositoy.findById(user_id)

        if(!user) {
            throw new AppError("User not found!");
        }

        if(user.avatar) {
            await storageProvider.deleteFile(user.avatar)
        }

        const fileName = await storageProvider.saveFile(avatarFilename)

        user.avatar = fileName

        await redisCache.invalidate('api-reference-USERS_LIST');

        await userRepositoy.updateAvatar(user_id, user.avatar)

        return user

    }
}

export default UpdateUserAvatarService;
