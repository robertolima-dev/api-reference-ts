import { Request, Response } from 'express';
import AuthUserService from '../services/AuthUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class AuthController {

    public async login(request: Request, response: Response): Promise<Response> {

        const { email, password } = request.body

        const authUser = new AuthUserService();

        const users = await authUser.execute({ email, password });

        return response.json(users)
    }

    public async me(request: Request, response: Response): Promise<Response> {

        const user = request.user

        return response.json(user)
    }
}
