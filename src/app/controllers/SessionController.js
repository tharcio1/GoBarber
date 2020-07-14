import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: {email: email} });

    if(!user) {
      return res.status(401).json({ error: 'User not found' }); //401 = not authorized
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign( { id }, authConfig.secret, {//no metodo sign colocamos os dados que queremos salvar, ou seja, o payload e também,
        expiresIn: authConfig.expiresIn, //define a data de expiração do token
      }), // o segundo parametro é um texto encriptado no site md5online.org que pode ser qualquer texto

    }) // fim do return

  }
}

export default new SessionController();
