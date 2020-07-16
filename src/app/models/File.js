import Sequelize, { Model } from 'sequelize';

class File extends Model{
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return(`http://localhost:3333/files/${this.path}`);
          }//fim get
        }//fim url
      },//fim obj1
      {
        sequelize,
      }//fim obj2
    );//fim super.init

    return this;
  }//fim static init
}//fim classe file

export default File;
