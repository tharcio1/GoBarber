import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp','uploads'),
    filename: (req, file, cb) =>{
      crypto.randomBytes(16, (err, res) => {
        if(err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));//O primeiro parametro é um erro, mas se ele passou pelo if acima não tem erro, logo passamos null.
                                            //O segundo parametro é a resposta do randombytes(res) transformado em string e o formato que queremos os bytes gerados de forma aleátoria.
                                            //extname é a extensão do arquivo que o usuário fez upload, ou seja, estamos extraindo do nome apenas a extensão do arquivo e descartando o nome, para salvar apenas o randombytes + extensão.
      })//fim crypto
    },//fim filename
  }),//fim storage
};//fim export default
