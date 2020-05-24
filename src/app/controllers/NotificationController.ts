import { Request, Response } from 'express';

class NotificationController {
  public async list(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }
}

export default new NotificationController();
