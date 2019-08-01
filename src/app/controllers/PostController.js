import * as Yup from 'yup';

import Post from '../models/Post';

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { title, description, image_id, owner_id } = await Post.create(
      req.body
    );

    return res.json({
      title,
      description,
      image_id,
      owner_id,
    });
  }
}

export default new PostController();
