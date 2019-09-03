import { Op } from 'sequelize';

import Post from '../models/Post';
import File from '../models/File';
import Furnisher from '../models/Furnisher';

class GaleryController {
  async index(req, res) {
    const { page = 1, tag = null, filter = null } = req.query;

    const posts = await Post.findAll({
      where:
        (tag && tag !== 'novidade') || filter
          ? {
              tags: {
                [Op.contains]: filter ? filter.split(' ') : [tag],
              },
            }
          : undefined,
      order: tag === 'novidade' ? [['createdAt', 'DESC']] : undefined,
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'title',
        'description',
        'owner_id',
        'image_id',
        'tags',
      ],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['name', 'path'],
        },
        {
          model: Furnisher,
          as: 'sponsor',
          attributes: [
            'id',
            'name',
            'description',
            'email',
            'contact',
            'address',
          ],
          include: [
            {
              model: File,
              as: 'imageUrl',
              attributes: ['name', 'path'],
            },
          ],
        },
      ],
    });

    res.json(posts);
  }
}

export default new GaleryController();
