import * as Yup from 'yup';
import Reference from '../models/Project';

class ReferenceController {
  async store(req, res) {
    const schema = Yup.object.shape({
      image_id: Yup.string().required(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro na validação, insira uma descrição válida.' });
    }

    const { image_id, description } = req.body;

    const reference = await Reference.create({
      owner_id: req.userId,
      image_id,
      description,
    });

    return res.json(reference);
  }
}

export default new ReferenceController();
