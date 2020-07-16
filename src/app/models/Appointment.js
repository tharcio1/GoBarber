import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize){
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );//fim super.init

    return this;
  }//fim static init

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }); // sempre que fizermos uma relação duas vezes com a mesma classe devemos usar um apelido
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }//fim metodo associate
}//fim classe Appointment

export default Appointment;
