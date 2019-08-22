/* eslint-disable no-await-in-loop */
import * as Yup from 'yup';

import Post from '../models/Post';

import Tag from '../models/Tag';

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      tags: Yup.array()
        .of(Yup.string())
        .required(),
      image_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { title, description, image_id, owner_id } = await Post.create(
      req.body
    );

    const { tags } = req.body;
    for (let i = 0; i < tags.length; i + 1) {
      const tag = tags[i];
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
        name: tags,
        images_count: 1,
      });
    }

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
