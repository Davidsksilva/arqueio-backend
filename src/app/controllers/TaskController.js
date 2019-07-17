import * as Yup from 'yup';

import Task from '../models/Task';
import Project from '../models/Project';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const checkProject = await Project.findByPk(req.params.id);

    if (!checkProject) {
      return res.status(400).json({ error: 'Project does not exist.' });
    }

    req.body.project_id = req.params.id;

    const { title, description, deadline, project_id } = await Task.create(
      req.body
    );

    return res.json({
      title,
      description,
      deadline,
      project_id,
    });
  }

  async index(req, res) {
    const checkProject = await Project.findByPk(req.params.id);

    if (!checkProject) {
      return res.status(400).json({ error: 'Project does not exist.' });
    }

    const tasks = await Task.findAll({
      where: { project_id: req.params.id },
      attributes: ['id', 'title', 'description', 'deadline'],
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(tasks);
  }
}

export default new TaskController();
