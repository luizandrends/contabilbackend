import { Request, Response } from 'express';

class FileController {
  public async store(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }
}

export default new FileController();
