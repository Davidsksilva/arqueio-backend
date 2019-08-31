import * as Yup from 'yup';
import Project from '../models/Project';
import File from '../models/File';
import User from '../models/User';

class ProjectController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const projects = await Project.findAll({
      where: { owner_id: req.userId },
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'name', 'description', 'cover_id'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['name', 'path'],
        },
      ],
    });

    return res.json(projects);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { name, description, cover_id } = req.body;

    const project = await Project.create({
      owner_id: req.userId,
      name,
      description,
      cover_id,
    });

    return res.json(project);
  }

  async delete(req, res) {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['name', 'email'],
        },
      ],
    });

    /**
     * Check if user was the permission to delete
     */
    if (project.owner_id !== req.userId) {
      return res.status(401).json({
        error: 'Only the project owner can delete it.',
      });
    }

    project.closed_at = new Date();

    await project.save();

    return res.json(project);
  }

  async update(req, res) {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['name', 'email'],
        },
      ],
    });

    /**
     * Check if user was the permission to update
     */
    if (project.owner_id !== req.userId) {
      return res.status(401).json({
        error: 'Only the project owner can update it.',
      });
    }

    const { id, name, description } = await project.update(req.body);

    return res.json({
      id,
      name,
      description,
    });
  }
}

export default new ProjectController();
