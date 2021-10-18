import AppError from '../../../middlewares/errors/AppError';
import { User } from "../model/User";
import UserRepositoy from '../repositories/sequelize/UserRepository';

interface IRequest {
    id: string;
}

class DeleteUserService {
    public async execute({ id }: IRequest): Promise<User> {

        const userRepositoy = new UserRepositoy()

        const user = await userRepositoy.findById(id)

        if (!user) {
            throw new AppError("User not found!");
        }

        await userRepositoy.delete(id)

        return user;
    }
}

export default DeleteUserService;
