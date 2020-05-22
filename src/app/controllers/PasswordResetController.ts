import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UserPasswordRecovery from '../models/UserPasswordRecovery';
import User from '../models/User';

class PasswordResetController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { token, password, confirmPassword } = request.body;

    const userPasswordRecovery = getRepository(UserPasswordRecovery);
    const userRepository = getRepository(User);

    const findUserToken = await userPasswordRecovery.findOne({
      where: { token },
    });

    if (!findUserToken) {
      return response.json({ error: 'Token not found' });
    }

    if (password !== confirmPassword) {
      return response.status(400).json({ error: 'Password does not match' });
    }

    const findUser = await userRepository.findOne({
      where: { id: findUserToken.user_id },
    });

    const newPassword = await hash(password, 8);

    findUser.password = newPassword;

    await userRepository.save(findUser);

    return response.json(findUser);
  }
}

export default new PasswordResetController();
