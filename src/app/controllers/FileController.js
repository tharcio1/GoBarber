import File from '../models/File';

class FileController{
  async store(req,res) {
    const { originalname: name, filename: path } = req.file;// o req.file contem os dados do arquivo que esta sendo salvo, ele é retornado ao executar o upload.single

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }//fim store
}//fim classe FileController

export default new FileController();
