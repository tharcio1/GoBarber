import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL, // um campo virtual eh um campo que nunca vai existir na base de dados
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,
    },{
        sequelize,
      }
    );

    // os hooks são metodos que irão ser executados antes ou depois de uma determinada ação
    // no caso de baixo ele está sendo usando para executar algo antes de salvar os dados
    // a cima no banco de dados (seja criação ou atualização).

    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }//fim if
    })//fim metodo addHook

    return this;
  }//fim metodo init

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' }); //belongsTo associa a classe user a classe file, nesse caso ele diz que User pertence a file, e vai armazenar um id de file dentro de user
                                                              //no segundo parametro passamos o nome do campo que vai representar o id de file (foreign key) dentro de User
  }//fim metodo associate

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }//fim metodo checkPassword

}//fim classe User

export default User;
