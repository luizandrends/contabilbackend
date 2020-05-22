import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

class UserController {
  public async get(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const checkUserProvider = await userRepository.findOne({
      where: { id: request.user.id, provider: true },
    });

    if (!checkUserProvider) {
      return response
        .status(401)
        .json({ error: 'Only providers can get users' });
    }

    const findUser = await userRepository.findOne({
      where: { id: request.params.id },
    });

    const { name, email, cpf, provider } = findUser;

    return response.json({ name, email, cpf, provider });
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const checkUserProvider = await userRepository.findOne({
      where: { id: request.user.id, provider: true },
    });

    if (!checkUserProvider) {
      return response
        .status(401)
        .json({ error: 'Only providers can get users' });
    }

    const findAllUsers = await userRepository.find();

    const [{ name, email, cpf, provider }] = findAllUsers;

    return response.json({ name, email, cpf, provider });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, password } = request.body;

    const userRepository = getRepository(User);

    const emailExists = await userRepository.findOne({
      where: { email },
    });

    const cpfExists = await userRepository.findOne({
      where: { cpf },
    });

    if (emailExists || cpfExists) {
      return response
        .status(400)
        .json({ error: 'Email or CPF already exists' });
    }

    const hashedPassword = await hash(password, 8);

    const createUsers = await userRepository.create({
      name,
      email,
      cpf,
      password: hashedPassword,
      provider: false,
    });

    await userRepository.save(createUsers);

    return response.json({ name, email, cpf });
  }
}

export default new UserController();
