import Tag from '../models/Tag';

class TagController {
  async store(req, res) {
    const { name } = req.body;

    const checkTag = await Tag.findOne({
      where: {
        name,
      },
    });

    if (checkTag) {
      checkTag.images_count += 1;

      await checkTag.save();

      return res.json(checkTag);
    }
    const tag = await Tag.create({
      name,
    });

    return res.json(tag);
  }

  async index(req, res) {
    const tags = await Tag.findAll({
      attributes: ['id', 'name', 'images_count'],
    });

    res.json(tags);
  }
}

export default new TagController();
