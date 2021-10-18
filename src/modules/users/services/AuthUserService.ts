import { User } from "../model/User";
import UserRepositoy from "../repositories/sequelize/UserRepository";
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import AppError from "../../../middlewares/errors/AppError";

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: User;
    token: string;
}

class AuthUserService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const userRepositoy = new UserRepositoy()

        const user = await userRepositoy.findByEmail(email)

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new AppError('Email/Senha não autenticados')
        }

        const token = sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            'teste_de_secret',
            {
                subject: user.id,
                expiresIn: '1d',
            });


        const userToResponse = await userRepositoy.findById(user.id)

        return {
            user: userToResponse,
            token
        };
    }
}

export default AuthUserService;
