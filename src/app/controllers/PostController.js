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
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];

      const checkTag = await Tag.findOne({
        where: {
          name: tag,
        },
      });

      if (checkTag) {
        checkTag.images_count += 1;

        await checkTag.save();
      } else {
        await Tag.create({
          name: tag,
          images_count: 1,
        });
      }
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
