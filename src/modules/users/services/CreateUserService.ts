import { User } from "../model/User";
import UserRepositoy from "../repositories/sequelize/UserRepository";
import { v4 as uuidv4 } from 'uuid';
import redisCache from '../../../config/redis/RedisCache'
import bcrypt from 'bcrypt'
import FakeUserRepositoy from "../repositories/sequelize/fake/FakeUserRepository";
const saltRounds = 10

interface IRequest {
    name: string
    email: string
    password: string
    phone: string
    test?: boolean
}

class CreateUserService {
    public async execute({ name, email, password, phone, test }: IRequest): Promise<User> {

        const passwordHashed = bcrypt.hashSync(password, saltRounds);

        const data = {
            id: uuidv4(),
            password: passwordHashed,
            status: true,
            name,
            email,
            phone,
        }

        if(!test) {

            await redisCache.invalidate('api-reference-USERS_LIST');

            const userRepositoy = new UserRepositoy()

            const user = await userRepositoy.create(data)

            return user;

        } else {

            const userRepositoy = new FakeUserRepositoy()

            const user = await userRepositoy.create(data)

            return user;
        }
    }
}

export default CreateUserService;
