import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import File from '../models/File';

class FileController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { originalname: name, filename: path } = request.file;

    const fileRepository = getRepository(File);

    const createFiles = await fileRepository.create({
      name,
      path,
      user_id: request.user.id,
    });

    await fileRepository.save(createFiles);

    const url = `http://localhost:3333/files/${createFiles.path}`;

    return response.json({
      file: createFiles,
      url,
    });
  }
}

export default new FileController();
