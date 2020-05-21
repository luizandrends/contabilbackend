import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'validation fails' });
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(400).json({ error: 'error' });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return response.status(401).json({ error: 'error' });
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const { id, name, cpf, provider } = user;

    return response.json({ user: { id, name, cpf, provider }, token });
  }
}

export default new SessionController();
