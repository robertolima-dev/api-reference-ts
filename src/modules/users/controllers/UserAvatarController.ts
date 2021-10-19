import { Request, Response } from 'express';
import AppError from 'src/middlewares/errors/AppError';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {

        let avatarFilename
        if (request.file && request.file.filename) {
            avatarFilename = request.file.filename
        }

        const updateAvatarUser = new UpdateUserAvatarService();

        if (!avatarFilename) {
            throw new AppError('File not found!')
        }

        const user = await updateAvatarUser.execute({
            user_id: request.user.id,
            avatarFilename
        });

        return response.json(user)
    }
}
