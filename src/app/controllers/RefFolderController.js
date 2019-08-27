import RefFolder from '../models/RefFolder';
import Reference from '../models/Reference';
import File from '../models/File';

class RefFolderController {
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
