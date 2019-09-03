/* eslint-disable no-await-in-loop */
import * as Yup from 'yup';

import Product from '../models/Product';
import File from '../models/File';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      image: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { name, description, image, specs } = await Product.create(req.body);

    return res.json({
      name,
      description,
      image_id: image,
      specs,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const Products = await Product.findAll({
      where: { owner_id: req.userId },
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
    const Product = await Product.findByPk(req.params.id);

    if (!Product) {
      return res.status(400).json({ error: 'Product does not exist.' });
    }

    return res.json(Product);
  }

  async update(req, res) {
    const Product = await Product.findByPk(req.params.id);

    /**
     * Check if Product exists
     */

    if (!Product) {
      return res.status(400).json({ error: 'Product does not exist.' });
    }

    if (Product.owner_id !== req.userId) {
      return res.status(401).json({ error: 'Permission denied.' });
    }

    const {
      title,
      description,
      image_id,
      owner_id,
      tags,
      products_ids,
    } = await Product.update(req.body);

    return res.json(title, description, image_id, owner_id, tags, products_ids);
  }
}

export default new ProductController();
