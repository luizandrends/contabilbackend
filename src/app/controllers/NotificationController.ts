import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Notification from '../schemas/Notification';

import User from '../models/User';

class NotificationController {
  public async list(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const checkUserProvider = await userRepository.findOne({
      where: { id: request.user.id, provider: true },
    });

    if (!checkUserProvider) {
      return response
        .status(401)
        .json({ error: 'Only providers can get notifications' });
    }

    const findNotifications = await Notification.find();

    return response.json(findNotifications);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const checkUserProvider = await userRepository.findOne({
      where: { id: request.user.id, provider: true },
    });

    if (!checkUserProvider) {
      return response
        .status(401)
        .json({ error: 'Only providers can update notifications' });
    }

    const { id } = request.params;

    const updateNotification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    return response.json(updateNotification);
  }
}

export default new NotificationController();
