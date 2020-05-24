import { Request, Response } from 'express';

import Notification from '../schemas/Notification';

class NotificationController {
  public async list(request: Request, response: Response): Promise<Response> {
    const findNotifications = await Notification.find();

    return response.json(findNotifications);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }
}

export default new NotificationController();
