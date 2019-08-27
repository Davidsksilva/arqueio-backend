import * as Yup from 'yup';
import RefFolder from '../models/RefFolder';
import Reference from '../models/Reference';
import File from '../models/File';

class RefFolderController {
  async store(req, res) {
    const schema = Yup.object.shape({
      name: Yup.string().required(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro na validação, insira um nome válido.' });
    }

    const { name, description } = req.body;

    const folder = await RefFolder.create({
      owner_id: req.userId,
      name,
      description,
    });

    return res.json(folder);
  }

  async all(req, res) {
    const { page = 1 } = req.query;

    const folders = await RefFolder.findAll({
      where: {
        owner_id: req.userId,
      },
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'name', 'description'],
    });

    await folders.forEach(async folder => {
      const references = await Reference.findAll({
        where: {
          folder_id: folder.folder_id,
        },
        limite: 4,
        attributes: ['id', 'description', 'image_id'],
        include: [
          {
            model: File,
            as: 'image',
            attributes: ['name', 'path'],
          },
        ],
      });

      folder.sampleReferences = references;
    });

    return res.json(folders);
  }
}

export default new RefFolderController();
