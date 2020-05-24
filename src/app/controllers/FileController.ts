import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import File from '../models/File';
import User from '../models/User';

class FileController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userRepository = getRepository(User);
    const fileRepository = getRepository(File);

    const findUser = await userRepository.findOne({
      where: { id },
    });

    const findFiles = await fileRepository.find({
      where: { user_id: findUser.id },
    });

    return response.json(findFiles);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { originalname: name, filename: path } = request.file;

    const fileRepository = getRepository(File);

    const createFiles = await fileRepository.create({
      name,
      path,
      url: `http://localhost:3333/files/${path}`,
      user_id: request.user.id,
    });

    await fileRepository.save(createFiles);

    return response.json({
      file: createFiles,
    });
  }
}

export default new FileController();
