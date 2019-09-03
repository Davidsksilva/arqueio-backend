/* eslint-disable no-await-in-loop */
import * as Yup from 'yup';

import Product from '../models/Product';
import File from '../models/File';
import User from '../models/User';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      image: Yup.number().required(),
    });

    const user = User.findByPk(req.userId);
    const furnisher = user.furnisher_id;

    if (!furnisher) {
      return res
        .status(401)
        .json({ error: 'Permission denied. You cannot create a product.' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    req.body.furnisher = furnisher;

    const { name, description, image, specs } = await Product.create(req.body);

    return res.json({
      name,
      description,
      image_id: image,
      specs,
      furnisher,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const user = User.findByPk(req.userId);
    const furnisher = user.furnisher_id;

    if (!user.furnisher) {
      return res.status(401).json({ error: 'Permission denied.' });
    }

    const Products = await Product.findAll({
      where: { furnisher },
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'name', 'description', 'specs'],
      include: [
        {
          model: File,
          as: 'imageUrl',
          attributes: ['name', 'path'],
        },
      ],
    });

    return res.json(Products);
  }

  async one(req, res) {
    const product = await Product.findByPk(req.params.id);

    const user = User.findByPk(req.userId);
    const furnisher = user.furnisher_id;

    if (!product) {
      return res.status(400).json({ error: 'Product does not exist.' });
    }

    if (!user.furnisher) {
      return res
        .status(401)
        .json({ error: 'Permission denied. You are not a furnisher.' });
    }

    if (product.funisher !== furnisher) {
      return res.status(401).json({ error: 'Permission denied.' });
    }

    return res.json(product);
  }

  async update(req, res) {
    const product = await Product.findByPk(req.params.id);

    const user = User.findByPk(req.userId);
    const furnisher = user.furnisher_id;

    /**
     * Check if Product exists
     */

    if (!product) {
      return res.status(400).json({ error: 'Product does not exist.' });
    }

    if (!user.furnisher) {
      return res
        .status(401)
        .json({ error: 'Permission denied. You are not a furnisher.' });
    }

    if (product.funisher !== furnisher) {
      return res.status(401).json({ error: 'Permission denied.' });
    }

    const { name, description, image, specs } = await Product.update(req.body);

    return res.json({
      name,
      description,
      image_id: image,
      specs,
      furnisher,
    });
  }
}

export default new ProductController();
