import { User } from "../model/User";
import UserRepositoy from "../repositories/sequelize/UserRepository";
import redisCache from '../../../config/redis/RedisCache'

class ListUserService {
    public async execute(): Promise<User[] | null> {

        const userRepositoy = new UserRepositoy()

        let users = await redisCache.recover<User[]>('api-reference-USERS_LIST')

        if (!users) {
            users = await userRepositoy.findAll()

            await redisCache.save('api-reference-USERS_LIST', users);
        }

        return users;
    }
}

export default ListUserService;
