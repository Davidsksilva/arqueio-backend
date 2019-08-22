import * as Yup from 'yup';

import Post from '../models/Post';

import Tag from '../models/Tag';

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      tags: Yup.array().of(Yup.string()),
      image_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { title, description, image_id, owner_id } = await Post.create(
      req.body
    );

    const { tags } = req.body;

    tags.forEach(async tag => {
      const checkTag = await Tag.findOne({
        where: {
          name: tag,
        },
      });

      if (checkTag) {
        checkTag.images_count += 1;

        await checkTag.save();
      }

      await Tag.create({
        name: tag,
      });
    });

    return res.json({
      title,
      description,
      image_id,
      owner_id,
      tags,
    });
  }
}

export default new PostController();
