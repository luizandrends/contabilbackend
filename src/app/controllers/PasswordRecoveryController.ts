import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import PasswordRecovery from '../models/UserPasswordRecovery';
import RecoveryMail from '../services/Mail/EtherealService';

class PasswordRecoveryController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const userRepository = getRepository(User);
    const passwordRecoveryRepository = getRepository(PasswordRecovery);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(400).json({ error: 'Email dosent exists' });
    }

    const createToken = passwordRecoveryRepository.create({
      user_id: user.id,
    });

    await passwordRecoveryRepository.save(createToken);

    await RecoveryMail.sendMail(user.email, createToken.token);

    return response.json(createToken);
  }
}

export default new PasswordRecoveryController();
