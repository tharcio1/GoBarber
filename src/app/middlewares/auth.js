import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // vamos utilizar essa biblioteca para utilizar o async e o await junto com o try catch no metodo verify

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ error: 'Token not provided' }); // 401 : not authorized
  }

  const [bearer, token] = authHeader.split(' ');
  //poderia ser assim: const [, token] = authHeader.split(' '); // desse modo descartamos a primeira posição e pegamos apenas a segunda que é a que nos interessa.

  try{
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch(err) {
    return res.status(401).json({ error: 'Token invalid' }); //401: not authorized, token inválido.
  }
};
