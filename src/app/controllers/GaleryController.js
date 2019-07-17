import Post from '../models/Post';
import File from '../models/File';
import User from '../models/User';

class GaleryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const posts = await Post.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'title', 'description', 'owner_id', 'image_id'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name'],
        },
      ],
    });

    res.json(posts);
  }
}

export default new GaleryController();
